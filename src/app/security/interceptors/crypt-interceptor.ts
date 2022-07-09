import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, mergeMap } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { AuthService } from '@core/services/auth/auth.service';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { CryptService } from '@core/services/crypt/crypt.service';

@Injectable({
    providedIn: 'root'
})
export class CryptInterceptor implements HttpInterceptor {

    tokenFromUI = 'jXn2r5u8x/A?D(G-KaPdSgVkYp3s6v9y';
    iv = 'AAAAAAAAAAAAAAAA';

    constructor(
        private _authService: AuthService,
        private _crypService: CryptService,
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!(request.body instanceof FormData) && !(request.responseType === 'blob')) {
            let bodyRequest = request.body;
            if (environment.encrypt && request.body) {
                bodyRequest = {
                    Request: this._crypService.encryptUsingAES256(JSON.stringify(request.body))
                };
            }
            const req = request.clone({ body: { ...bodyRequest } });
            if (environment.encrypt) {
                return next.handle(req).pipe(
                    mergeMap(async (event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {
                            const _body = await this.modifyBody(event.body);
                            return event.clone({ body: JSON.parse(_body) });
                        }
                    }));
            } else {
                return next.handle(req);
            }
        } else {
            return next.handle(request);
        }
    }
    private modifyBody(body: any) {
        return this._crypService.decryptUsingAES256(body.result);
    }
}