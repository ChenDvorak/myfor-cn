import { Injectable } from '@angular/core';
import { ServicesBase, Result, DEFAULT_RESULT, ROUTE_PREFIX, Paginator } from '../../shared/services/common';
import { Identity } from '../../global';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, retry, mergeMap } from 'rxjs/operators';
import { Comment } from './comment.service';

export interface NewBlog {
  title: string;
  content: string;
}
/**
 * 引用或见解
 */
export interface ReferenceFrom {
  code: string;
  title: string;
}

export interface BlogItem {
  /**
   * 编码
   */
  code: string;
  /**
   * 作者昵称
   */
  authorName: string;
  /**
   * 作者账号
   */
  authorAccount: string;
  /**
   * 作者头像
   */
  avatar: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 发布时间
   */
  postedTime: string;
  /**
   * 内容
   */
  content: string;
  /**
   * 是否为完整内容
   */
  isFull: boolean;
  /**
   * 评论数
   */
  commentCount: number;
  /**
   * 同意数
   */
  agreeCount: number;
  /**
   * 引用数
   */
  referenceCount: number;
  /**
   * 见解数
   */
  thinkCount: number;
}

export interface BlogDetail {
  /**
   * 编码
   */
  code: string;
  /**
   * 作者昵称
   */
  authorName: string;
  /**
   * 作者账号
   */
  authorAccount: string;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 发布时间
   */
  postedTime: string;
  /**
   * 内容
   */
  content: string;
  /**
   * 评论数
   */
  commentCount: number;
  /**
   * 同意数
   */
  agreeCount: number;
  /**
   * 是否已同意
   */
  agreed: boolean;
  /**
   * 引用数
   */
  referenceCount: number;
  /**
   * 见解数
   */
  thinkCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private base: ServicesBase,
    private identity: Identity,
    private http: HttpClient
  ) { }

  /**
   * 发表博文
   */
  postBlog(model: NewBlog): Observable<Result> {
    const R = DEFAULT_RESULT;
    if (!this.identity.isLoggedIn) {
      R.data = '请先登录';
      R.status = 401;
      return of(R);
    }

    model.title = model.title.trim();
    model.content = model.content.trim();
    if (!model.title) {
      R.data = '标题不能为空';
      return of(R);
    }
    if (!model.content) {
      R.data = '内容不能为空';
      return of(R);
    }
    return this.http.post<Result>(`${ROUTE_PREFIX}blogs`, model)
    .pipe(
      catchError(this.base.handleError)
    );
  }

  /**
   * 首页的博文列表
   */
  getBlogsByHomePage(index: number, size: number): Observable<Result<Paginator<BlogItem>>> {
    const p = new HttpParams().set('index', index.toString())
    .set('size', size.toString());
    return this.http.get<Result>(`${ROUTE_PREFIX}blogs/home?${p.toString()}`)
    .pipe(
      retry(1),
      catchError(this.base.handleError)
    );
  }

  /**
   * 搜索页的博文列表
   */
  getBlogsBySearch(index: number, size: number, s: string): Observable<Result<Paginator<BlogItem>>> {
    const p = new HttpParams().set('index', index.toString())
    .set('size', size.toString())
    .set('s', s ? s : '');
    return this.http.get<Result>(`${ROUTE_PREFIX}blogs/search?${p.toString()}`)
    .pipe(
      retry(1),
      catchError(this.base.handleError)
    );
  }

  /**
   * 获取博文详情
   * @param code 编码
   */
  getBlog(code: string): Observable<Result> {
    return this.http.get<Result>(`${ROUTE_PREFIX}blogs/${code}`)
    .pipe(
      retry(1),
      catchError(this.base.handleError)
    );
  }

  /**
   * 评论
   * 201
   */
  postComment(code: string, content: string): Observable<Result> {
    const R: Result = DEFAULT_RESULT;
    if (!content.trim()) {
      R.data = '评论内容不能位空';
      return of(R);
    }

    return this.http.post<Result>(`${ROUTE_PREFIX}blogs/${code}`, `"${content}"`)
    .pipe(
      catchError(this.base.handleError)
    );
  }

  /**
   * 同意或取消同意
   */
  agrees(code: string): Observable<Result> {
    return this.http.post<Result>(`${ROUTE_PREFIX}blogs/${code}/agrees`, '')
    .pipe(
      catchError(this.base.handleError),
      mergeMap((r: Result) => {
        if (r.status === 500) {
          r.data = '同意失败，请重试';
        }
        return of(r);
      })
    );
  }
}
