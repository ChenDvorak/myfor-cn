import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BlogDetailBoxComponent } from './blog-detail-box/blog-detail-box.component';
import { CommentBoxComponent } from './comment-box/comment-box.component';
import { BlogsItemBoxComponent } from './blogs-item-box/blogs-item-box.component';
import { PostBlogBoxComponent } from './post-blog-box/post-blog-box.component';
import { PostCommentBoxComponent } from './post-comment-box/post-comment-box.component';
import { CommentBoxUserDetailComponent } from './comment-box-user-detail/comment-box-user-detail.component';

const EXPORT_COMPONENTS = [
  BlogDetailBoxComponent,
  CommentBoxComponent,
  BlogsItemBoxComponent,
  PostBlogBoxComponent,
  PostCommentBoxComponent,
  CommentBoxUserDetailComponent
];

@NgModule({
  declarations: [...EXPORT_COMPONENTS],
  imports: [
    SharedModule
  ],
  exports: [...EXPORT_COMPONENTS]
})
export class BlogsModule { }
