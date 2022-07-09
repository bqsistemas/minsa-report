import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { AuthService } from '@core/services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private _authService: AuthService,
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
                if ([400, 401, 403].includes(err.status)) {
                    // auto logout if 400, 401 or 403 response returned from api
                    debugger;
                    this.router.navigate(['/pages/401']);
                }

                const error = (err && err?.error && err?.error?.message) || err?.statusText;
                return throwError(error);
            })
        );
    }
}