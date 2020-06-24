import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Identity } from '../global';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MustLoggedInGuard implements CanActivate {

  constructor(
    private identity: Identity,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /**
     * if not logged in, redirect to login page
     */
    if (this.identity.isLoggedIn) {
      return true;
    }

    return new Observable<boolean | UrlTree>(ob => {
      ob.next(this.router.parseUrl('/explore'));
      ob.complete();
    });
  }
}
