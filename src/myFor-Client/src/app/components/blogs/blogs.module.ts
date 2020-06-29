import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BlogsListComponent } from './blogs-list/blogs-list.component';

const EXPORT_COMPONENTS = [
  BlogsListComponent
];

@NgModule({
  declarations: [...EXPORT_COMPONENTS],
  imports: [
    SharedModule
  ],
  exports: [...EXPORT_COMPONENTS]
})
export class BlogsModule { }
