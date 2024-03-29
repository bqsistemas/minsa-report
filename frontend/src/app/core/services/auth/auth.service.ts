import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpAjaxService } from './../http-ajax.service';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from './../../../../environments/environment';

// models
import { User } from '../../models/user/user';
import { Rol } from '../../models/rol/rol';
import { CryptService } from '../crypt/crypt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: User = null;
  private idInicioSesion = new BehaviorSubject<string>(null);
  idInicioSesion$ = this.idInicioSesion.asObservable();
  private user = new BehaviorSubject<User>(null);
  user$ = this.user.asObservable();
  public menus: any[];

  constructor(
    private httpclient: HttpClient,
    private httpAjaxService: HttpAjaxService,
    private jwtHelper: JwtHelperService,
    private _crypService: CryptService
  ) { }
  //comands
  postLogin(authParams: any) {
    return this.httpAjaxService.post(`${environment.apis.apiLogin}`, {
      username: authParams.username,
      password: authParams.password
    }).pipe(map(async (data: any) => {
      if (data.auth_token) {
        // this.setUser(data.data.user);
        localStorage.setItem(environment.codeJwt, data.auth_token);
        const permisos: any = await this.httpAjaxService.getWithOutPromise(`${environment.apis.apiSecurity}/permisos/`).toPromise()
        const appName = permisos?.authorization?.auth_apps[environment.appName]

        let hasRole121 = false
        for(const k in permisos?.authorization?.permissions){
            const objectAppPermissions = permisos?.authorization?.permissions[k][environment.appName]
            if(objectAppPermissions 
                && objectAppPermissions[environment.module] 
                && objectAppPermissions[environment.module].indexOf(environment.role) >= 0) hasRole121 = true
        }

        if(!appName || !hasRole121){
            localStorage.removeItem(environment.codeJwt);
            return -1
        }

        return data;
      } else {
        return null;
      }
    })).toPromise();
  }
  postLogout() {
    localStorage.removeItem(environment.codeJwt);
    this.stopRefreshTokenTimer();
    location.href = "/tablero-vih/";
  }
  setPermisos() {
    return this.httpAjaxService.getWithOutPromise(`${environment.apis.apiSecurity}/permisos/`)
  }

  setUser(value: User) {
    this.userData = value;
    this.user.next(value);
  }
  getUser() {
    const token = localStorage.getItem(environment.codeJwt);
    if (token) {
      return ({
        nombres: this.userData?.nombres,
        apellidoPaterno: this.userData?.apellidoPaterno,
        apellidoMaterno: this.userData?.apellidoMaterno,
        numeroDocumento: this.userData?.numeroDocumento,
        tipoDocumento: this.userData?.tipoDocumento,
        diresa: this.userData?.diresa,
        permissions: this.userData?.permissions
      } as User);
    } else {
      return null;
    }
  }
  // helper methods

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const token = localStorage.getItem(environment.codeJwt);
    const jwtToken = JSON.parse(atob(token.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    // this.refreshTokenTimeout = setTimeout(() => this.postGenerarTokenRefresh().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
