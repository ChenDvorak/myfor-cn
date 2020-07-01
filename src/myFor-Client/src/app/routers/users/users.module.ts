import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { LoginOutModule } from '../../components/login-out/login-out.module';

import { UsersRoutingModule } from './users-routing.module';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [DetailComponent],
  imports: [
    SharedModule,
    UsersRoutingModule,
    LoginOutModule
  ]
})
export class UsersModule { }
