import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MustLoggedInGuard } from './guards/must-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./routers/home/home.module').then(m => m.HomeModule),
    pathMatch: 'full',
    data: { preload: true, title: 'myFor' },
    //  canActivate: [MustLoggedInGuard]
  },
  {
    path: 'explore',
    loadChildren: () => import('./routers/explore/explore.module').then(m => m.ExploreModule),
    data: { title: '随便看看 / myFor' }
  },
  {
    path: 'account',
    loadChildren: () => import('./routers/login-out/login-out.module').then(m => m.LoginOutModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./routers/pages/pages.module').then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
