import { Component, OnInit } from '@angular/core';
import { LoginOutService, SignUpModel } from '../login-out.service';

@Component({
  selector: 'app-sign-up-box',
  templateUrl: './sign-up-box.component.html',
  styleUrls: ['./sign-up-box.component.sass']
})
export class SignUpBoxComponent implements OnInit {

  signUp: SignUpModel = {
    account: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  constructor(
    private loginOut: LoginOutService
  ) { }

  ngOnInit(): void {
  }

}
