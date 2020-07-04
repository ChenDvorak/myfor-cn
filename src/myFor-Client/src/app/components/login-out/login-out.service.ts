import { Injectable } from '@angular/core';
import { ServicesBase, Result } from '../../shared/services/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    private http: HttpClient
  ) { }

  /**
   * 用户注册
   */
  signUp(model: SignUpModel): Observable<Result> {
    return this.http.post<Result>(`/api/clients/Accounts/signup`, model)
    .pipe(
      catchError(this.base.handleError)
    );
  }
}
