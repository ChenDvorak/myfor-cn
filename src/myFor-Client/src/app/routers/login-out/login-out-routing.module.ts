import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: '登录 / myFor' } },
  { path: 'signup', component: SignUpComponent, data: { title: '注册 / myFor' } },
  { path: '', redirectTo: '/account/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginOutRoutingModule { }
