import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscussingListComponent } from './discussing-list/discussing-list.component';

const routes: Routes = [
  { path: '', component: DiscussingListComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscussRoutingModule { }
