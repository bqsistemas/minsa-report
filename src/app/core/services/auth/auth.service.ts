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
import { Institucion } from '@core/models/institucion/institucion';
import { AuxiliarService } from '../auxiliar/auxiliar.service';
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
  private rolSede = new BehaviorSubject<Rol>(null);
  rolSede$ = this.rolSede.asObservable();
  private sedes = new BehaviorSubject<Rol[]>(null);
  sedes$ = this.sedes.asObservable();
  private institucion = new BehaviorSubject<Institucion>(null);
  institucion$ = this.institucion.asObservable();
  public menus: any[];

  constructor(
    private httpclient: HttpClient,
    private httpAjaxService: HttpAjaxService,
    private jwtHelper: JwtHelperService,
    private _crypService: CryptService,
    private _auxiliarService: AuxiliarService
  ) { }
  //comands
  postLogin(authParams: any) {
    return this.httpAjaxService.post(`${environment.apis.seguridad}/auth/login`, {
      user: authParams.user,
      password: authParams.password
    }).pipe(map((data: any) => {
      if (data.success) {
        const tokenDecript = this.jwtHelper.decodeToken(data.data.token);
        data.data.user.idInicioSesion = environment.encrypt ? this._crypService.decryptUsingAES256(tokenDecript.ID_INICIO_SESION) : tokenDecript.ID_INICIO_SESION;
        this.setUser(data.data.user);
        localStorage.setItem(environment.codeJwt, data.data.token);
        this.startRefreshTokenTimer();
        return data;
      } else {
        return null;
      }
    })).toPromise();
  }
  postGenerarToken(authParams: any) {
    return this.httpAjaxService.post(`${environment.apis.seguridad}/auth/generatetoken`, {
      tipoDocumento: authParams.tipoDocumento,
      numeroDocumento: authParams.numeroDocumento,
      nombre: authParams.nombre,
      apellidoPaterno: authParams.apellidoPaterno,
      apellidoMaterno: authParams.apellidoMaterno,
      idInicioSesion: authParams.idInicioSesion
    }).pipe(map((data: any) => {
      data.data.user.idInicioSesion = authParams.idInicioSesion;
      data.data.user.idTipoDocumento = authParams.tipoDocumento;
      this.setUser(data.data.user);
      localStorage.setItem(environment.codeJwt, data.data.token);
      this.startRefreshTokenTimer();
      return data;
    })).toPromise();
  }
  postGenerarTokenRefresh() {
    const authParams: User = this.userData ? this.userData : this.getUser();
    return this.httpclient.post(`${environment.apis.seguridad}/auth/refreshtoken`, {
      tipoDocumento: authParams.idTipoDocumento,
      numeroDocumento: authParams.numeroDocumento,
      nombre: authParams.nombres,
      apellidoPaterno: authParams.apellidoPaterno,
      apellidoMaterno: authParams.apellidoMaterno,
      idInicioSesion: authParams.idInicioSesion
    }).pipe(map((data: any) => {
      localStorage.removeItem(environment.codeJwt);
      if (data.success) {
        data.data.user.idInicioSesion = authParams.idInicioSesion;
        this.setUser(data.data.user);
        localStorage.setItem(environment.codeJwt, data.data.token);
        this.startRefreshTokenTimer();
        return true;
      } else {
        return false;
      }
    }));
  }
  postLogout() {
    localStorage.removeItem(environment.codeJwt);
    this.stopRefreshTokenTimer();
    location.href = environment.simon;
  }
  postListasedes() {
    return this.httpclient.post(`${environment.apis.seguridad}/security/listasedes`, {});
  }
  postGetMenus(codigoRol: string) {
    return this.httpclient.post(`${environment.apis.seguridad}/security/getmenus`, {
      codigoRol
    }).toPromise();
  }

  setUser(value: User) {
    this.userData = value;
    this.user.next(value);
  }
  setInstitucion(value: Institucion) {
    this.institucion.next(value);
  }
  setIdInicioSesion(value: string) {
    this.idInicioSesion.next(value);
  }
  async setSedes(value: Rol[]) {
    const currentRolSede = this.getRolSedeFromLocalStorage(value);
    if (currentRolSede) {
      this.setRolSede(currentRolSede);
    } else {
      this.setRolSede(value[0]);
    }
    this.setInstitucion(null);
    // si el rol por defecto es director, entonces traer los datos de la institución educativa
    if (environment.roles.directorIIEE === currentRolSede?.codigoRol) {
      await this._auxiliarService.getInstitucionEducativa(currentRolSede.codigoSede, currentRolSede.anexo).then((value: any) => {
        if (value.success) {
          value.data.codigoSede = value.data.codigoModular;
          this.setInstitucion(value.data);
        } else {
          console.log('error al traer institución');
        }
      }).catch((value: any) => {
        console.log('error al traer institución');
      });
    }

    this.sedes.next(value);
  }
  setRolSede(value: Rol) {
    this.rolSede.next(value);
    localStorage.setItem(environment.codeTokenRolSede, this._crypService.encryptUsingAES256(value.codigoRol
      + '|' + value.codigoSede + '|' + value.anexo + '|' + value.tipoSedeIndice));
  }
  setMenus(value: any[]) {
    this.menus = value;
  }
  getMenus() {
    return this.menus;
  }
  getRolSede() {
    return this.rolSede$;
  }
  getUser() {
    const token = localStorage.getItem(environment.codeJwt);
    if (token) {
      const tokenDecript = this.jwtHelper.decodeToken(token);
      return ({
        nombres: environment.encrypt ? this._crypService.decryptUsingAES256(tokenDecript.NOMBRES) : tokenDecript.NOMBRES,
        apellidoPaterno: environment.encrypt ? this._crypService.decryptUsingAES256(tokenDecript.APELLIDO_PATERNO) : tokenDecript.APELLIDO_PATERNO,
        apellidoMaterno: environment.encrypt ? this._crypService.decryptUsingAES256(tokenDecript.APELLIDO_MATERNO) : tokenDecript.APELLIDO_MATERNO,
        numeroDocumento: environment.encrypt ? this._crypService.decryptUsingAES256(tokenDecript.USUARIO_NUMERO_DOCUMENTO) : tokenDecript.USUARIO_NUMERO_DOCUMENTO,
        idTipoDocumento: environment.encrypt ? this._crypService.decryptUsingAES256(tokenDecript.USUARIO_ID_TIPO_DOCUMENTO) : tokenDecript.USUARIO_ID_TIPO_DOCUMENTO,
        idInicioSesion: environment.encrypt ? this._crypService.decryptUsingAES256(tokenDecript.ID_INICIO_SESION) : tokenDecript.ID_INICIO_SESION
      } as User);
    } else {
      return null;
    }
  }
  getRolSedeFromLocalStorage(sedes: Rol[]) {
    const rolsede = this._crypService.decryptUsingAES256(localStorage.getItem(environment.codeTokenRolSede));
    if (rolsede) {
      const splitRolSede = rolsede.split('|');
      return sedes.find(x => x.codigoRol === splitRolSede[0] && x.codigoSede === splitRolSede[1]
        && x.anexo === splitRolSede[2] && x.tipoSedeIndice === Number(splitRolSede[3]));
    }
    return null;
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
    this.refreshTokenTimeout = setTimeout(() => this.postGenerarTokenRefresh().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
