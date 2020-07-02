import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { LoginOutModule } from '../../components/login-out/login-out.module';
import { BlogsModule } from '../../components/blogs/blogs.module';

import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';
import { HomeListComponent } from './home-list/home-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

@NgModule({
  declarations: [IndexComponent, HomeListComponent, BlogDetailComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
    LoginOutModule,
    BlogsModule
  ]
})
export class HomeModule { }
