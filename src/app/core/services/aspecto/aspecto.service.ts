import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpAjaxService } from './../http-ajax.service';

import { environment } from './../../../../environments/environment';

// models
import { PageRequest } from './../../models/general/page-request/page-request';
import { Aspecto } from './../../models/aspecto/aspecto';

@Injectable({
  providedIn: 'root'
})
export class AspectoService {
  private estado = new BehaviorSubject<boolean>(null);
  estado$ = this.estado.asObservable();
  private mostrarMenuEstados = new BehaviorSubject<boolean>(null);
  mostrarMenuEstados$ = this.mostrarMenuEstados.asObservable();

  constructor(
    private httpclient: HttpClient,
    private httpAjaxService: HttpAjaxService
  ) { }
  //querys
  get(key: string) {
    return this.httpAjaxService.get(`${environment.apis.configuracion}/aspecto/`, { key });
  }
  getPaginate(request: PageRequest, query: string, lastKey: string, idComponenteKey: string, esActivo: boolean = null) {
    let filtro: any = { page: request.page, pageSize: request.pageSize, query, lastKey, idComponenteKey };
    if (esActivo || esActivo === false) {
      filtro.esActivo = esActivo;
    }
    return this.httpAjaxService.get(`${environment.apis.configuracion}/aspecto/paginate`,
      filtro);
  }
  getPaginateForGrid(request: PageRequest, query: string, lastKey: string, idComponenteKey: string, esActivo: boolean = null) {
    let filtro: any = { page: request.page, pageSize: request.pageSize, query, lastKey, idComponenteKey };
    if (esActivo || esActivo === false) {
      filtro.esActivo = esActivo;
    }
    return this.httpAjaxService.get(`${environment.apis.configuracion}/aspecto/paginateforgrid`,
      filtro);
  }
  //comands
  postAdd(aspecto: Aspecto) {
    return this.httpclient.post(`${environment.apis.configuracion}/aspecto/add`, aspecto).toPromise();
  }
  putUpdate(aspecto: Aspecto) {
    return this.httpclient.put(`${environment.apis.configuracion}/aspecto/update`, aspecto).toPromise();
  }
  putUpdateEstadoActivo(aspecto: Aspecto) {
    return this.httpclient.put(`${environment.apis.configuracion}/aspecto/updateestadoactivo`, aspecto).toPromise();
  }
  setEstado(value: any) {
    this.estado.next(value);
  }
  setMenuEstados(value: any) {
    this.mostrarMenuEstados.next(value);
  }
}