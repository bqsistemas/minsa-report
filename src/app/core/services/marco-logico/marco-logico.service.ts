import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpAjaxService } from './../http-ajax.service';

import { environment } from './../../../../environments/environment';
import { environmentBusinessRules } from 'src/environments/environment-business-rules';

// services
import { AuthService } from '../auth/auth.service';
// models
import { PageRequest } from './../../models/general/page-request/page-request';
import { MarcoLogico } from './../../models/marco-logico/marco-logico';
import { Rol } from '@core/models/rol/rol';
import { RuleSimonMarcoLogicoService } from 'src/app/@simon/services/config/rule-simon-marco-logico.service';

@Injectable({
  providedIn: 'root'
})
export class MarcoLogicoService {
  private estado = new BehaviorSubject<boolean>(null);
  estado$ = this.estado.asObservable();
  private mostrarMenuEstados = new BehaviorSubject<boolean>(null);
  mostrarMenuEstados$ = this.mostrarMenuEstados.asObservable();

  constructor(
    private httpclient: HttpClient,
    private httpAjaxService: HttpAjaxService,
    private _authService: AuthService,
    public _ruleMarcoLogicoService: RuleSimonMarcoLogicoService,
  ) { }
  //querys
  get(key: string) {
    return this.httpAjaxService.get(`${environment.apis.configuracion}/marcologico/`, { id: key });
  }
  getResolve(key: string) {
    return this.httpAjaxService.getWithOutPromise(`${environment.apis.configuracion}/marcologico/`, { id: key });
  }
  postPaginate(request: PageRequest, query: string, lastKey: string, sede: any, isAdmin: boolean, esActivo: boolean = null) {
    sede.tipoSede = Number(sede.tipoSedeIndice);
    let filtro: any = { page: request.page, pageSize: request.pageSize, query, lastKey, sede, isAdmin };
    if (esActivo || esActivo === false) {
      filtro.esActivo = esActivo;
    }
    return this.httpAjaxService.post(`${environment.apis.configuracion}/marcologico/paginate`,
      filtro).toPromise();
  }
  postPaginateForGrid(request: PageRequest, query: string, lastKey: string, sede: any, isAdmin: boolean, esActivo: boolean = null) {
    sede.tipoSede = Number(sede.tipoSedeIndice);
    let filtro: any = { page: request.page, pageSize: request.pageSize, query, lastKey, sede, isAdmin };
    if (esActivo || esActivo === false) {
      filtro.esActivo = esActivo;
    }
    return this.httpAjaxService.post(`${environment.apis.configuracion}/marcologico/paginateforgrid`,
      filtro).toPromise();
  }
  postSearchForPlan(request: PageRequest, query: string, lastKey: string, sede: any, isAdmin: boolean) {
    sede.tipoSede = Number(sede.tipoSedeIndice);

    return this.httpAjaxService.post(`${environment.apis.configuracion}/marcologico/searchforplan`,
      { page: request.page, pageSize: request.pageSize, query, lastKey, sede, isAdmin }).toPromise();
  }
  //comands
  postAdd(marco: MarcoLogico) {
    return this.httpclient.post(`${environment.apis.configuracion}/marcologico/add`, marco).toPromise();
  }
  putUpdate(marco: MarcoLogico) {
    return this.httpclient.put(`${environment.apis.configuracion}/marcologico/update`, marco).toPromise();
  }
  putUpdateEstadoActivo(marco: MarcoLogico) {
    return this.httpclient.put(`${environment.apis.configuracion}/marcologico/updateestadoactivo`, marco).toPromise();
  }
  putUpdateComponentes(marco: MarcoLogico) {
    return this.httpclient.put(`${environment.apis.configuracion}/marcologico/updatecomponentes`, marco).toPromise();
  }
  putUpdateValidez(marco: MarcoLogico) {
    return this.httpclient.put(`${environment.apis.configuracion}/marcologico/updatevalidez`, marco).toPromise();
  }
  setEstado(value: any) {
    this.estado.next(value);
  }
  setMenuEstados(value: any) {
    this.mostrarMenuEstados.next(value);
  }
}
