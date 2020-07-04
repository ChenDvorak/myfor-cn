import { Component, OnInit } from '@angular/core';
import { LoginOutService, SignUpModel } from '../login-out.service';
import { CommonService } from '../../../shared/services/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-box',
  templateUrl: './sign-up-box.component.html',
  styleUrls: ['./sign-up-box.component.sass']
})
export class SignUpBoxComponent implements OnInit {

  signUping = false;
  signUp: SignUpModel = {
    account: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  constructor(
    private loginOut: LoginOutService,
    private common: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  postSignUp() {
    this.loginOut.signUp(this.signUp).subscribe(r => {
      if (r.status === 200) {
        this.common.snackOpen('注册成功');
        this.router.navigate(['/login']);
      } else if (r.data) {
        this.common.snackOpen(r.data);
      }
    });
  }
}
