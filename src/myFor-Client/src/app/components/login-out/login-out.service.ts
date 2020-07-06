import { Injectable } from '@angular/core';
import { ServicesBase, Result, ROUTE_PREFIX } from '../../shared/services/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry, mergeMap } from 'rxjs/operators';
import { IdentityInfo, Identity } from '../../global';

import sha256 from 'crypto-js/sha256';
import { enc } from 'crypto-js';

export interface LoginModel {
  account: string;
  password: string;
}

export interface SignUpModel {
  account: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginOutService {

  constructor(
    private base: ServicesBase,
    private http: HttpClient,
    private identity: Identity
  ) { }

  login(model: LoginModel): Observable<Result<IdentityInfo>> {

    const post: LoginModel = {
      ...model
    };
    post.password = sha256(post.password).toString();
    const words = enc.Utf8.parse(JSON.stringify(post));
    const base64 = enc.Base64.stringify(words);
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.patch<Result>(`${ROUTE_PREFIX}Accounts/login`, `\"${base64}\"`, { headers })
    .pipe(
      retry(1),
      catchError(this.base.handleError),
      mergeMap((r: Result<IdentityInfo>) => {
        if (r.status === 200) {
          r.data = r.data as IdentityInfo;
          r.data.avatar = '/api' + r.data.avatar;
          this.identity.setIdentityInfo(r.data);
        }
        return of(r);
      })
    );

  }

  /**
   * 用户注册
   */
  signUp(model: SignUpModel): Observable<Result> {
    const R: Result = {
      status: 400,
      data: {},
      location: ''
    };
    model.account = model.account.trim();
    if (model.account.length < 2 || model.account.length > 20) {
      R.data = `注册账号长度不能小于${2}大于${20}`;
      return of(R);
    }
    model.password = model.password.trim();
    if (model.password.length < 6 || model.password.length > 20) {
      R.data = `密码长度不能小于${6}大于${20}`;
      return of(R);
    }
    if (model.password !== model.confirmPassword) {
      R.data = `两次密码不一致`;
      return of(R);
    }

    const post: SignUpModel = {
      ...model
    };
    post.password = sha256(post.password).toString();
    post.confirmPassword = sha256(post.confirmPassword).toString();

    const words = enc.Utf8.parse(JSON.stringify(post));
    const base64 = enc.Base64.stringify(words);
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<Result>(`${ROUTE_PREFIX}Accounts/signup`, `\"${base64}\"`, { headers })
    .pipe(
      catchError(this.base.handleError)
    );
  }
}
