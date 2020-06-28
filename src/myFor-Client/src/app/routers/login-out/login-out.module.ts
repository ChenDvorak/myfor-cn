import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoginOutModule as LoginOutBoxModule } from '../../components/login-out/login-out.module';

import { LoginOutRoutingModule } from './login-out-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';


@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [
    SharedModule,
    LoginOutRoutingModule,
    LoginOutBoxModule
  ]
})
export class LoginOutModule { }
