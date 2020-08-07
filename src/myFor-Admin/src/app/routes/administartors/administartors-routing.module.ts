import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministartorListComponent } from './administartor-list/administartor-list.component';

const routes: Routes = [
  { path: '', component: AdministartorListComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministartorsRoutingModule { }
