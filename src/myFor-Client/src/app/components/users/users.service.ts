import { Injectable } from '@angular/core';
import { ServicesBase, Result, DEFAULT_RESULT, ROUTE_PREFIX } from '../../shared/services/common';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, retry, mergeMap } from 'rxjs/operators';

export interface UserDetail {
  name: string;
  account: string;
  avatar: string;
  email: string;
  introduction: string;
  createDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private base: ServicesBase,
    private http: HttpClient
  ) { }


  /**
   * 获取用户详情
   */
  getUserDetail(account: string): Observable<Result> {
    const R: Result = DEFAULT_RESULT;
    account = account.trim();
    if (!account) {
      R.data = '参数有误';
      return of(R);
    }
    return this.http.get<Result>(`${ROUTE_PREFIX}users/${account}`)
    .pipe(
      retry(1),
      catchError(this.base.handleError),
      mergeMap((r: Result) => {
        if (r.status === 200) {
          r.data = r.data as UserDetail;
          r.data.account = '@' + r.data.account;
        } else if (r.status === 410) {
          r.data = r.data as UserDetail;
          r.data.account = `用户 ${r.data.account} 不存在`;
          r.data.avatar = 'api/files/default.png';
          r.data.name = '';
          r.data.introduction = '';
        }
        return of(r);
      })
    );
  }

  /**
   * 获取用户自己的博文列表
   */
  getUserBlogs(index: number, size: number, account: string, s: string = ''): Observable<Result> {
    let p: HttpParams = new HttpParams()
    .set('index', index.toString())
    .set('size', size.toString());
    if (s === null) {
      s = '';
    }
    s = s.trim();
    if (s) {
      p = p.set('s', s.toString());
    }
    return this.http.get<Result>(`${ROUTE_PREFIX}users/${account}/blogs?${p.toString()}`)
    .pipe(
      retry(1),
      catchError(this.base.handleError)
    );
  }

  /**
   * 获取用户自己的博文列表
   */
  getUserComments(index: number, size: number, account: string, blogTitle: string = ''): Observable<Result> {
    let p: HttpParams = new HttpParams()
    .set('index', index.toString())
    .set('size', size.toString());
    if (blogTitle === null) {
      blogTitle = '';
    }
    blogTitle = blogTitle.trim();
    if (blogTitle) {
      p = p.set('blogTitle', blogTitle.toString());
    }
    return this.http.get<Result>(`${ROUTE_PREFIX}users/${account}/comments?${p.toString()}`)
    .pipe(
      retry(1),
      catchError(this.base.handleError)
    );
  }
}
