import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscussRoutingModule } from './discuss-routing.module';
import { DiscussingListComponent } from './discussing-list/discussing-list.component';


@NgModule({
  declarations: [DiscussingListComponent],
  imports: [
    CommonModule,
    DiscussRoutingModule
  ]
})
export class DiscussModule { }
