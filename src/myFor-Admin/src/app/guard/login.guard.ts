import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { Global } from '../global';
import { UsersService } from '../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private user: UsersService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.isLogged();
  }

  isLogged(): Observable<boolean | UrlTree> {
    return new Observable<boolean | UrlTree>((ob) => {
      this.user.isLogged().subscribe(r => {
        if (r) {
          ob.next(true);
        } else {
          ob.next(this.router.parseUrl('/auth/login'));
        }
        ob.complete();
      });
    });
  }
}
