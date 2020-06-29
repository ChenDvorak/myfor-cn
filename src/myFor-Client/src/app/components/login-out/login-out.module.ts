import { NgModule } from '@angular/core';
import { LoginBoxComponent } from './login-box/login-box.component';

import { SharedModule } from '../../shared/shared.module';
import { SignUpBoxComponent } from './sign-up-box/sign-up-box.component';
import { CurrentUserNavComponent } from './current-user-nav/current-user-nav.component';

const EXPORT_COMPONENTS = [
  LoginBoxComponent,
  SignUpBoxComponent,
  CurrentUserNavComponent
];

@NgModule({
  declarations: [...EXPORT_COMPONENTS],
  imports: [
    SharedModule
  ],
  exports: [...EXPORT_COMPONENTS]
})
export class LoginOutModule { }
