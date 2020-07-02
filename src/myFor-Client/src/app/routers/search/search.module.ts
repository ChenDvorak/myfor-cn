import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { SearchRoutingModule } from './search-routing.module';
import { ResultsComponent } from './results/results.component';


@NgModule({
  declarations: [ResultsComponent],
  imports: [
    SharedModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
