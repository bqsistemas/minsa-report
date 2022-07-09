import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpAjaxService } from './../http-ajax.service';
import { BehaviorSubject } from 'rxjs';

import { environment } from './../../../../environments/environment';

// models
import { PageRequest } from './../../models/general/page-request/page-request';
import { Resultado } from './../../models/resultado/resultado';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
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
    return this.httpAjaxService.get(`${environment.apis.configuracion}/resultado/`, { id: key });
  }
  getPaginate(request: PageRequest, query: string, lastKey: string, idComponenteKey: string, esActivo: boolean = null) {
    let filtro: any = { page: request.page, pageSize: request.pageSize, query, lastKey, idComponenteKey };
    if (esActivo || esActivo === false) {
      filtro.esActivo = esActivo;
    }
    return this.httpAjaxService.get(`${environment.apis.configuracion}/resultado/paginate`,
      filtro);
  }
  getPaginateForGrid(request: PageRequest, query: string, lastKey: string, idComponenteKey: string, esActivo: boolean = null) {
    let filtro: any = { page: request.page, pageSize: request.pageSize, query, lastKey, idComponenteKey };
    if (esActivo || esActivo === false) {
      filtro.esActivo = esActivo;
    }
    return this.httpAjaxService.get(`${environment.apis.configuracion}/resultado/paginateforgrid`,
      filtro);
  }
  // comands
  postAdd(resultado: Resultado) {
    return this.httpclient.post(`${environment.apis.configuracion}/resultado/add`, resultado).toPromise();
  }
  putUpdate(resultado: Resultado) {
    return this.httpclient.put(`${environment.apis.configuracion}/resultado/update`, resultado).toPromise();
  }
  putUpdateEstadoActivo(resultado: Resultado) {
    return this.httpclient.put(`${environment.apis.configuracion}/resultado/updateestadoactivo`, resultado).toPromise();
  }
  setEstado(value: any) {
    this.estado.next(value);
  }
  setMenuEstados(value: any) {
    this.mostrarMenuEstados.next(value);
  }
}
