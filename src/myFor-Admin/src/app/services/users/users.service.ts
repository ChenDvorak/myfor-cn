import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ServicesBase, Result, ROUTER_PREFIX } from '../common.service';
import { debounceTime, catchError, retry, mergeMap } from 'rxjs/operators';

import sha256 from 'crypto-js/sha256';
import { enc } from 'crypto-js';

//  登录需要的信息
export interface LoginInfo {
  account: string;
  password: string;
}
//  登录后返回的用户信息
export interface UserInfo {
  userName: string;
  email: string;
  jwt: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private base: ServicesBase
  ) { }

  /*
  登录
  */
  login(loginInfo: LoginInfo): Observable<Result<UserInfo>> {
    loginInfo.password = sha256(loginInfo.password).toString();

    const words = enc.Utf8.parse(JSON.stringify(loginInfo));
    const base64 = enc.Base64.stringify(words);
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    const URL = `${ROUTER_PREFIX}login`;
    return this.http.patch<Result<UserInfo>>(URL, `\"${base64}\"`, { headers })
    .pipe(
      debounceTime(500),
      catchError(this.base.handleError)
    );
  }

  //  登出
  logout(): Observable<Result> {
    const URL = `${ROUTER_PREFIX}accounts/logout`;
    return this.http.patch<Result>(URL, '')
    .pipe(
      debounceTime(500),
      catchError(this.base.handleError)
    );
  }

  //  当前用户是否登录
  isLogged(): Observable<boolean> {
    const URL = `${ROUTER_PREFIX}accounts/islogged`;
    return this.http.get<boolean>(URL)
    .pipe(
      mergeMap((result: any) => {
        const isLoggedIn: boolean = result.status === 204;
        return of(isLoggedIn);
      }),
      retry(1)
    );
  }
}
