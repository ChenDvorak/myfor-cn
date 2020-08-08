import { Injectable, isDevMode } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommonService, Result } from '../shared/services/common';
import { environment } from '../../environments/environment';
import { Identity } from '../global';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private common: CommonService,
    private identity: Identity
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const identityInfo = this.identity.getIdentityInfo();
    const jwt = identityInfo?.jwt;
    const sourceUrl = req.url;
    let newUrl = environment.host;
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

    return next.handle(SERVER_REQ)
      .pipe(
        mergeMap((resp) => {
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
            this.identity.clean();
            this.common.snackOpen('请先登录');
            open('login');
          }         break;
          case 403: {
            this.common.snackOpen('您没有权限访问');
            this.router.navigate(['/']);
          }         break;
          case 404: {
            this.router.navigate(['/pages', '404']);
          }         break;
          default: break;
        }
        return throwError(err);
      }));
  }
}
