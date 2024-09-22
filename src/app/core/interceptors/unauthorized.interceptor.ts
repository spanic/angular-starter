import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (error) => {
          if (!(error instanceof HttpErrorResponse)) {
            return;
          }

          this.snackBar.open(`${error.status} ${error.statusText}`);

          if (error.status === HttpStatusCode.Unauthorized) {
            this.router.navigate(['auth']);
          }
        },
      })
    );
  }
}
