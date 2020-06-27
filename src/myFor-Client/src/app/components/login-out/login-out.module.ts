import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';

import { SharedModule } from '../../shared/shared.module';

const EXPORT_COMPONENTS = [
  LoginComponent
];

@NgModule({
  declarations: [...EXPORT_COMPONENTS],
  imports: [
    SharedModule
  ],
  exports: [...EXPORT_COMPONENTS]
})
export class LoginOutModule { }
