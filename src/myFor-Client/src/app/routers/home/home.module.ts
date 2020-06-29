import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { LoginOutModule } from '../../components/login-out/login-out.module';

import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
    LoginOutModule
  ]
})
export class HomeModule { }
