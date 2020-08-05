import { Injectable, isDevMode } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Global } from '../../global';

import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Result, CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private common: CommonService,
    private user: UsersService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const jwt = Global.JWT;
    const sourceUrl = req.url;
    let newUrl = environment.SERVER_URL;
    if (newUrl.endsWith('/') && sourceUrl.startsWith('/')) {
      newUrl = newUrl.substring(0, newUrl.length - 1) + sourceUrl;
    } else if (!newUrl.endsWith('/') && !sourceUrl.startsWith('/')) {
      newUrl += `/${sourceUrl}`;
    } else {
      newUrl += sourceUrl;
    }

    const SERVER_REQ = req.clone({
      url: newUrl,
      setHeaders: {
        Authorization: `Bearer ${jwt}`
      }
    });

    return next.handle(SERVER_REQ).pipe(
      mergeMap((resp: any) => {
        if (resp instanceof HttpResponse) {
          const R: Result = {
            status: resp.status,
            data: resp.body ? resp.body : {},
            location: null
          };
          switch (resp.status) {
            case 201:
              R.location = resp.headers.get('Location');
          }
          const DATA = resp.clone<Result>({
            body: R
          });
          return of(DATA);
        }
        return of(resp);
      }),
      catchError((err: HttpErrorResponse) => {
        if (isDevMode()) {
          console.error(`DEV: backend returned code ${err.status}`);
          console.error(`DEV: message: ${err.message}`);
          console.error(`DEV: error: ${err.error}`);
        }
        switch (err.status) {
          //  case 400: { } break;
          case 401: {
            this.common.snackOpen('请先登录');
            this.user.logout().subscribe();
          }         break;
          case 403: {
            this.common.snackOpen('您没有权限访问');
            this.user.logout().subscribe();
          }         break;
          case 404: {
            this.router.navigate(['/pages', '404']);
          }         break;
          default: break;
        }
        return throwError(err);
      })
    );
  }
}
