import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ACCESS_TOKEN_STORAGE_KEY from '../shared/authorization.token';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(
    @Inject(ACCESS_TOKEN_STORAGE_KEY)
    private readonly accessTokenStorageKey: string
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = window.localStorage.getItem(this.accessTokenStorageKey);

    return next.handle(
      accessToken
        ? request.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        : request
    );
  }
}
