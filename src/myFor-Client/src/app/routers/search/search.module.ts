import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { LoginOutModule } from '../../components/login-out/login-out.module';
import { BlogsModule } from '../../components/blogs/blogs.module';

import { SearchRoutingModule } from './search-routing.module';
import { ResultsComponent } from './results/results.component';


@NgModule({
  declarations: [ResultsComponent],
  imports: [
    SharedModule,
    SearchRoutingModule,
    LoginOutModule,
    BlogsModule
  ]
})
export class SearchModule { }
