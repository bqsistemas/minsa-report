// resolver.ts
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
// services
import { AuthService } from '../../services/auth/auth.service';
import { catchError, map } from 'rxjs/operators';
// models
import { User } from '@core/models/user/user';
import { environment } from 'src/environments/environment';

@Injectable()
export class ResolveUser implements Resolve<any> {

    constructor(
        private _authService: AuthService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this._authService.setPermisos().pipe(
            map(async (response: any) => {
                this._authService.setUser({
                    apellidoMaterno: response.lastname_mother,
                    apellidoPaterno: response.lastname_father,
                    nombres: response.name,
                    numeroDocumento: response.document_number,
                    tipoDocumento: response.document_type,
                    userName: response.username,
                    diresa: response.authorization.diresa
                  } as User);
                return response;
            }, catchError((err, caught) => {
                localStorage.removeItem(environment.codeJwt);
                return null  
            }))
        ).toPromise();
    }
}