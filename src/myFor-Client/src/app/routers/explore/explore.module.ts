import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreUnloggedInComponent } from './explore-unlogged-in/explore-unlogged-in.component';
import { IndexComponent } from './index/index.component';
import { ExploreListComponent } from './explore-list/explore-list.component';


@NgModule({
  declarations: [ExploreUnloggedInComponent, IndexComponent, ExploreListComponent],
  imports: [
    SharedModule,
    ExploreRoutingModule
  ]
})
export class ExploreModule { }
