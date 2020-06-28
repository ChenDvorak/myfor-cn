import { NgModule } from '@angular/core';
import { LoginBoxComponent } from './login-box/login-box.component';

import { SharedModule } from '../../shared/shared.module';

const EXPORT_COMPONENTS = [
  LoginBoxComponent
];

@NgModule({
  declarations: [...EXPORT_COMPONENTS],
  imports: [
    SharedModule
  ],
  exports: [...EXPORT_COMPONENTS]
})
export class LoginOutModule { }
