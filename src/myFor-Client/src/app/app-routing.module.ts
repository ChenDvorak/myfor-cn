import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./routers/home/home.module').then(m => m.HomeModule),
    pathMatch: 'full',
    data: { preload: true, title: 'myFor' }
  },
  {
    path: 'explore',
    loadChildren: () => import('./routers/explore/explore.module').then(m => m.ExploreModule),
    data: { title: '随便看看' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
