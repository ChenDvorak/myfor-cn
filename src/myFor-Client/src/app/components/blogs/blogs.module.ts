import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { BlogDetailBoxComponent } from './blog-detail-box/blog-detail-box.component';
import { CommentBoxComponent } from './comment-box/comment-box.component';

const EXPORT_COMPONENTS = [
  BlogsListComponent,
  BlogDetailBoxComponent,
  CommentBoxComponent
];

@NgModule({
  declarations: [...EXPORT_COMPONENTS],
  imports: [
    SharedModule
  ],
  exports: [...EXPORT_COMPONENTS]
})
export class BlogsModule { }
