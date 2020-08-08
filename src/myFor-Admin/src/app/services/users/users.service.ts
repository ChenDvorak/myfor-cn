import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ServicesBase, Result, ROUTER_PREFIX } from '../common.service';
import { debounceTime, catchError, retry, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import sha256 from 'crypto-js/sha256';
import { enc } from 'crypto-js';
import { Global } from 'app/global';

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

export interface UserItem {
  id: number;
  account: string;
  email: string;
  avatar: string;
  createDate: string;
}

export interface NewUser
{
  email: string;
  account: string;
  password: string;
}

/**
 * 管理员
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private base: ServicesBase,
    private router: Router
  ) { }

  /*
  登录
  */
  login(loginInfo: LoginInfo): Observable<Result<UserInfo>> {
    loginInfo.password = sha256(loginInfo.password).toString();

    const words = enc.Utf8.parse(JSON.stringify(loginInfo));
    const base64 = enc.Base64.stringify(words);
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    const URL = `${ROUTER_PREFIX}accounts/login`;
    return this.http.patch<Result<UserInfo>>(URL, `\"${base64}\"`, { headers })
    .pipe(
      debounceTime(500),
      catchError(this.base.handleError)
    );
  }

  /**
   * 登出
   * @param syncServer 是否同步服务器
   */
  logout(syncServer: boolean = true): Observable<Result> {
    if (!syncServer) {
      Global.RemoveLocalLoginData();
      this.router.navigate(['/auth', 'login']);
      return;
    }
    const URL = `${ROUTER_PREFIX}accounts/logout`;
    return this.http.patch<Result>(URL, '')
    .pipe(
      debounceTime(500),
      catchError(this.base.handleError),
      mergeMap((r: Result) => {
        if (r.status === 204) {
          Global.RemoveLocalLoginData();
          this.router.navigate(['/auth', 'login']);
        }
        return of(r);
      })
    );
  }

  //  当前用户是否登录
  isLogged(): Observable<boolean> {
    const URL = `${ROUTER_PREFIX}accounts/isLoggedIn`;
    return this.http.get<boolean>(URL)
    .pipe(
      mergeMap((result: any) => {
        const isLoggedIn: boolean = result.status === 204;
        return of(isLoggedIn);
      }),
      retry(1)
    );
  }

  /**
   * 获取系统管理员列表
   */
  getAdministartorList(index: number, size: number, account: string): Observable<Result> {
    let p = new HttpParams();

    if (account) {
      p = p.append('account', account);
    }
    if (index <= 0) {
      index = 1;
    }
    p = p.append('index', index.toString())
      .append('size', size.toString());

    return this.http.get<Result>(`${ROUTER_PREFIX}administartors?${p.toString()}`)
    .pipe(
      debounceTime(1000),
      retry(1),
      catchError(this.base.handleError)
    );
  }

  createAdministartor(model: NewUser): Observable<Result> {
    const postModel: NewUser = {
      ...model
    };
    postModel.password = sha256(postModel.password).toString();
    const words = enc.Utf8.parse(JSON.stringify(postModel));
    const base64 = enc.Base64.stringify(words);
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<Result>(`${ROUTER_PREFIX}Administartors`, `\"${base64}\"`, { headers })
    .pipe(
      debounceTime(500),
      catchError(this.base.handleError)
    );
  }
}
