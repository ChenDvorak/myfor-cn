import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { LoginOutModule } from '../../components/login-out/login-out.module';
import { BlogsModule } from '../../components/blogs/blogs.module';

import { UsersRoutingModule } from './users-routing.module';
import { DetailComponent } from './detail/detail.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { CommentListComponent } from './comment-list/comment-list.component';


@NgModule({
  declarations: [DetailComponent, BlogListComponent, CommentListComponent],
  imports: [
    SharedModule,
    UsersRoutingModule,
    LoginOutModule,
    BlogsModule
  ]
})
export class UsersModule { }
