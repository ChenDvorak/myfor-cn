import { Injectable } from '@angular/core';
import { ServicesBase } from '../../shared/services/common';

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
    private base: ServicesBase
  ) { }
}
