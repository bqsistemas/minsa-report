import { HttpInterceptor, HttpRequest, HttpHeaders, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private jwtHelper: JwtHelperService
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem(environment.codeJwt);

        if (token && !this.jwtHelper.isTokenExpired(token)) {
            const header = 'Bearer ' + token;
            if (req.headers.get('Content-Type') == null || req.headers.get('Content-Type').toString() !== 'multipart/form-data') {
                const headers = new HttpHeaders({
                    Authorization: 'Bearer ' + token,
                    apikey: environment.apiKey,
                    'Content-Type': 'application/json',
                });
                const reqWithAuth = req.clone({ headers: headers });
                return next.handle(reqWithAuth);
            }
            if (req.headers.get('Content-Type') != null && req.headers.get('Content-Type').toString() === 'multipart/form-data') {
                const headers = new HttpHeaders({
                    Authorization: 'Bearer ' + token,
                    apikey: environment.apiKey
                });
                headers['reportProgress'] = true;
                headers['observe'] = 'events';
                const reqWithAuth = req.clone({ headers: headers });
                return next.handle(reqWithAuth);
            }
        } else {
            const headers = new HttpHeaders({
                apikey: environment.apiKey
            });
            const reqWithAuth = req.clone({ headers: headers });
            return next.handle(reqWithAuth);
        }

        return next.handle(req);
    }
}