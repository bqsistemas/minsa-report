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
                console.log('response', response)
                const appName = response?.authorization?.auth_apps[environment.appName]

                let hasRole121 = false
                for(const k in response?.authorization?.permissions){
                    const objectAppPermissions = response?.authorization?.permissions[k][environment.appName]
                    if(objectAppPermissions 
                        && objectAppPermissions[environment.module] 
                        && objectAppPermissions[environment.module].indexOf(environment.role) >= 0) hasRole121 = true
                }
                if(!appName || !hasRole121){
                    localStorage.removeItem(environment.codeJwt);
                    location.reload()
                }

                this._authService.setUser({
                    apellidoMaterno: response.lastname_mother,
                    apellidoPaterno: response.lastname_father,
                    nombres: response.name,
                    numeroDocumento: response.document_number,
                    tipoDocumento: response.document_type,
                    userName: response.username,
                    diresa: response.authorization.diresa,
                    permissions: response?.authorization?.permissions
                  } as User);
                return response;
            }, catchError((err, caught) => {
                console.log('catch', err)
                localStorage.removeItem(environment.codeJwt);
                return null  
            }))
        ).toPromise();
    }
}