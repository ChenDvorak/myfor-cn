import { Injectable } from '@angular/core';
import { ServicesBase, Result, DEFAULT_RESULT, ROUTE_PREFIX, Paginator } from '../../shared/services/common';
import { Identity } from '../../global';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, retry, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Comment } from '../../components/blogs/comment.model';
import { BlogItem } from '../../components/blogs/blog.models';

export interface UserDetail {
  name: string;
  account: string;
  avatar: string;
  introdution: string;
  createDate: string;
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private base: ServicesBase,
    private identity: Identity,
    private http: HttpClient,
    private router: Router
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
          r.data.introdution = '';
        }
        return of(r);
      })
    );
  }
}
