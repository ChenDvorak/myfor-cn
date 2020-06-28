import { NgModule } from '@angular/core';
import { LoginBoxComponent } from './login-box/login-box.component';

import { SharedModule } from '../../shared/shared.module';
import { SignUpBoxComponent } from './sign-up-box/sign-up-box.component';

const EXPORT_COMPONENTS = [
  LoginBoxComponent,
  SignUpBoxComponent
];

@NgModule({
  declarations: [...EXPORT_COMPONENTS],
  imports: [
    SharedModule
  ],
  exports: [...EXPORT_COMPONENTS]
})
export class LoginOutModule { }
