import { Component, OnInit } from '@angular/core';
import { LoginOutService, LoginModel } from '../login-out.service';
import { CommonService } from '../../../shared/services/common';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.sass']
})
export class LoginBoxComponent implements OnInit {

  logining = false;
  loginModel: LoginModel = {
    account: '',
    password: ''
  };
  constructor(
    private loginOut: LoginOutService,
    private common: CommonService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.logining = true;
    this.loginOut.login(this.loginModel).subscribe(r => {
      if (r.status === 200) {
        location.href = '/';
        return;
      } else if (r.status === 400) {
        this.common.snackOpen(r.data as unknown as string);
      }
      this.logining = false;
    });
  }
}
