import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./routers/home/home.module').then(m => m.HomeModule),
    pathMatch: 'full',
    data: { preload: true, title: 'myFor -- 思考，见解' }
  },
  {
    path: 'b',
    loadChildren: () => import('./routers/home/home.module').then(m => m.HomeModule),
    data: { preload: true },
  },
  {
    path: 'discuss',
    loadChildren: () => import('./routers/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./routers/search/search.module').then(m => m.SearchModule),
    data: { preload: true }
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
  { path: 'login', redirectTo: '/account/login' },
  {
    path: 'pages',
    loadChildren: () => import('./routers/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: ':account',
    loadChildren: () => import('./routers/users/users.module').then(m => m.UsersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
