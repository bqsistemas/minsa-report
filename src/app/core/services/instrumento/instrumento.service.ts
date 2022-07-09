import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpAjaxService } from './../http-ajax.service';

import { environment } from './../../../../environments/environment';

// models
import { PageRequest } from './../../models/general/page-request/page-request';
import { Instrumento } from './../../models/instrumento/instrumento';
import { VisitaInstrumento } from '@core/models/visita-instrumento/visita-instrumento';

@Injectable({
  providedIn: 'root'
})
export class InstrumentoService {
  private instrumento = new BehaviorSubject<Instrumento>(null);
  instrumento$ = this.instrumento.asObservable();

  constructor(
    private httpclient: HttpClient,
    private httpAjaxService: HttpAjaxService
  ) { }
  //querys
  get(key: string) {
    return this.httpAjaxService.get(`${environment.apis.configuracion}/instrumento/`, { id: key });
  }
  getFromEjecucion(key: string) {
    return this.httpAjaxService.get(`${environment.apis.ejecucion}/instrumento/`, { id: key });
  }
  getForTraining(key: string) {
    return this.httpAjaxService.get(`${environment.apis.configuracion}/instrumento/instrumentotraining/`, { idInstrumento: key });
  }
  postPaginate(request: PageRequest, query: string, lastKey: string, idPlanMonitoreo: string) {
    return this.httpAjaxService.post(`${environment.apis.configuracion}/instrumento/paginate`,
      { page: request.page, pageSize: request.pageSize, query, lastKey, idPlanMonitoreo }).toPromise();
  }
  postPaginateFromEjecucion(request: PageRequest, query: string, lastKey: string, idPlanMonitoreo: string) {
    return this.httpAjaxService.post(`${environment.apis.ejecucion}/instrumento/paginate`,
      { page: request.page, pageSize: request.pageSize, query, lastKey, idPlanMonitoreo }).toPromise();
  }
  //comands
  postAdd(instrumento: Instrumento) {
    return this.httpclient.post(`${environment.apis.configuracion}/instrumento/add`, instrumento).toPromise();
  }
  delete(instrumento: Instrumento) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: instrumento.id,
      },
    };
    return this.httpclient.delete(`${environment.apis.configuracion}/instrumento/delete`, options).toPromise();
  }
  putUpdate(instrumento: Instrumento) {
    return this.httpclient.put(`${environment.apis.configuracion}/instrumento/update`, instrumento).toPromise();
  }
  putUpdateEstadoActivo(instrumento: Instrumento) {
    return this.httpclient.put(`${environment.apis.configuracion}/instrumento/updateestadoactivo`, instrumento).toPromise();
  }
  putUpdateVisitas(instrumento: Instrumento) {
    return this.httpclient.put(`${environment.apis.configuracion}/instrumento/updatevisitas`, instrumento).toPromise();
  }
  putUpdateRecursos(instrumento: Instrumento) {
    return this.httpclient.put(`${environment.apis.configuracion}/instrumento/updaterecursos`, instrumento).toPromise();
  }
  putUpdateReglas(instrumento: Instrumento) {
    return this.httpclient.put(`${environment.apis.configuracion}/instrumento/updatereglas`, instrumento).toPromise();
  }
  putUpdatePublicado(instrumento: Instrumento) {
    return this.httpclient.put(`${environment.apis.configuracion}/instrumento/updatepublicado`, instrumento).toPromise();
  }
  putUpdateAspectos(instrumento: Instrumento) {
    return this.httpclient.put(`${environment.apis.configuracion}/instrumento/updateaspectos`, instrumento).toPromise();
  }
  putUpdateVisitaAnulada(instrumento: Instrumento, visita: VisitaInstrumento) {
    return this.httpclient.put(`${environment.apis.configuracion}/instrumento/updatevisitaanulada`, {
      idInstrumento: instrumento.id,
      numeroVisita: visita.numeroVisita,
      codigoVisita: visita.codigo
    }).toPromise();
  }
  // methods
  setInstrumento(value: Instrumento) {
    this.instrumento.next(value);
  }
}
