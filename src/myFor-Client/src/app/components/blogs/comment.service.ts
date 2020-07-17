import { Injectable } from '@angular/core';
import { ServicesBase, Result, DEFAULT_RESULT, ROUTE_PREFIX, Paginator } from '../../shared/services/common';
import { Identity } from '../../global';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, retry, mergeMap } from 'rxjs/operators';

export interface Comment {
  id: number;
  authorName: string;
  authorAccount: string;
  avatar: string;
  dateTime: string;
  content: string;
  agreeCount: number;
}
/**
 * 用户刚刚添加的评论
 */
export interface IntroComment {
  avatar: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private base: ServicesBase,
    private identity: Identity,
    private http: HttpClient
  ) { }

  /**
   * 获取博文的评论列表
   */
  getCommentsList(blogCode: string, index: number, size: number): Observable<Result<Paginator<Comment> | string>> {
    const p: HttpParams = new HttpParams()
    .set('index', index.toString())
    .set('size', size.toString());
    return this.http.get<Result>(`${ROUTE_PREFIX}blogs/${blogCode}/comments?${p.toString()}`)
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
    content = content.replace(/\n/g, '\\n');
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Result>(`${ROUTE_PREFIX}blogs/${code}/comments`, `"${content}"`, { headers })
    .pipe(
      catchError(this.base.handleError)
    );
  }
}
