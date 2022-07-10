import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpAjaxService } from './../http-ajax.service';

import { environment } from './../../../../environments/environment';

// models
import { PageRequest } from './../../models/general/page-request/page-request';
import { Componente } from '@core/models/componente/componente';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {
  private estado = new BehaviorSubject<boolean>(null);
  estado$ = this.estado.asObservable();

  constructor(
    private httpclient: HttpClient,
    private httpAjaxService: HttpAjaxService
  ) { }
  get(key: string) {
    return this.httpAjaxService.get(`${environment.apis.configuracion}/componente/`, { key });
  }
  getPaginate(request: PageRequest, query: string, lastKey: string, esActivo: boolean = null) {
    let filtro: any = { page: request.page, pageSize: request.pageSize, query, lastKey };
    if (esActivo || esActivo === false) {
      filtro.esActivo = esActivo;
    }
    return this.httpAjaxService.get(`${environment.apis.configuracion}/componente/paginate`,
      filtro);
  }
  getPaginateForGrid(request: PageRequest, query: string, lastKey: string, esActivo: boolean = null) {
    let filtro: any = { page: request.page, pageSize: request.pageSize, query, lastKey };
    if (esActivo || esActivo === false) {
      filtro.esActivo = esActivo;
    }
    return this.httpAjaxService.get(`${environment.apis.configuracion}/componente/paginateforgrid`,
      filtro);
  }
  // comands
  postAdd(componente: Componente) {
    return this.httpclient.post(`${environment.apis.configuracion}/componente/add`, componente).toPromise();
  }
  putUpdate(componente: Componente) {
    return this.httpclient.put(`${environment.apis.configuracion}/componente/update`, componente).toPromise();
  }
  putUpdateEstadoActivo(componente: Componente) {
    return this.httpclient.put(`${environment.apis.configuracion}/componente/updateestadoactivo`, componente).toPromise();
  }
  setEstado(value: any) {
    this.estado.next(value);
  }
}
