import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpAjaxService } from './../http-ajax.service';
import { BehaviorSubject } from 'rxjs';

import { environment } from './../../../../environments/environment';

// models
import { PageRequest } from './../../models/general/page-request/page-request';
import { Indicador } from './../../models/indicador/indicador';
@Injectable({
  providedIn: 'root'
})
export class IndicadorService {
  private estado = new BehaviorSubject<boolean>(null);
  estado$ = this.estado.asObservable();
  private mostrarMenuEstados = new BehaviorSubject<boolean>(null);
  mostrarMenuEstados$ = this.mostrarMenuEstados.asObservable();

  constructor(
    private httpclient: HttpClient,
    private httpAjaxService: HttpAjaxService
  ) { }

  // querys
  get(key: string) {
    return this.httpAjaxService.get(`${environment.apis.configuracion}/indicador/`, { id: key });
  }
  getPaginate(request: PageRequest, query: string, lastKey: string, idComponenteKey: string, esActivo: boolean = null) {
    let filtro: any = { page: request.page, pageSize: request.pageSize, query, lastKey, idComponenteKey };
    if (esActivo || esActivo === false) {
      filtro.esActivo = esActivo;
    }
    return this.httpAjaxService.get(`${environment.apis.configuracion}/indicador/paginate`,
      filtro);
  }
  getPaginateForGrid(request: PageRequest, query: string, lastKey: string, idComponenteKey: string, esActivo: boolean = null) {
    let filtro: any = { page: request.page, pageSize: request.pageSize, query, lastKey, idComponenteKey };
    if (esActivo || esActivo === false) {
      filtro.esActivo = esActivo;
    }
    return this.httpAjaxService.get(`${environment.apis.configuracion}/indicador/paginateforgrid`,
      filtro);
  }
  // comands
  postAdd(indicador: Indicador) {
    return this.httpclient.post(`${environment.apis.configuracion}/indicador/add`, indicador).toPromise();
  }
  putUpdate(indicador: Indicador) {
    return this.httpclient.put(`${environment.apis.configuracion}/indicador/update`, indicador).toPromise();
  }
  putUpdateEstadoActivo(indicador: Indicador) {
    return this.httpclient.put(`${environment.apis.configuracion}/indicador/updateestadoactivo`, indicador).toPromise();
  }
  setEstado(value: any) {
    this.estado.next(value);
  }
  setMenuEstados(value: any) {
    this.mostrarMenuEstados.next(value);
  }
}
