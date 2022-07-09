import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpAjaxService } from './../http-ajax.service';
import { mergeDeep } from 'src/@vex/utils/merge-deep';

import { environment } from './../../../../environments/environment';

// models
import { PageRequest } from './../../models/general/page-request/page-request';
import { VisitaMuestra } from './../../models/visita-muestra/visita-muestra';

@Injectable({
  providedIn: 'root'
})
export class VisitaMuestraService {
  private aspectosCompletados = new BehaviorSubject<string[]>(null);
  aspectosCompletados$ = this.aspectosCompletados.asObservable();
  private compromisos = new BehaviorSubject<string[]>(null);
  compromisos$ = this.compromisos.asObservable();
  private observacion = new BehaviorSubject<string>(null);
  observacion$ = this.observacion.asObservable();

  constructor(
    private httpclient: HttpClient,
    private httpAjaxService: HttpAjaxService
  ) { }
  // querys
  get(key: string) {
    return this.httpAjaxService.get(`${environment.apis.ejecucion}/visitamuestra/`, { id: key });
  }
  getTraining(idInstrumento: string) {
    return this.httpAjaxService.get(`${environment.apis.ejecucion}/visitamuestra/getfortraining`, { idInstrumento });
  }
  postPaginateForGrid(request: PageRequest, query: string, lastKey: string, idMuestra: string) {
    let filtro: any = { page: request.page, pageSize: request.pageSize, query, lastKey, idMuestra };
    return this.httpAjaxService.post(`${environment.apis.ejecucion}/visitamuestra/paginateforgrid`,
      filtro).toPromise();
  }
  // commands
  postAdd(visita: VisitaMuestra) {
    return this.httpclient.post(`${environment.apis.ejecucion}/visitamuestra/add`, visita).toPromise();
  }
  putUpdateProgramacion(visita: VisitaMuestra) {
    return this.httpclient.put(`${environment.apis.ejecucion}/visitamuestra/updateprogramacion`, visita).toPromise();
  }
  putUpdateInicioEjecucionSimple(visita: VisitaMuestra) {
    return this.httpclient.put(`${environment.apis.ejecucion}/visitamuestra/updateinicioejecucionsimple`, visita).toPromise();
  }
  putUpdateInicioEjecucionConRepresentante(visita: VisitaMuestra) {
    return this.httpclient.put(`${environment.apis.ejecucion}/visitamuestra/updateinicioejecucionconrepresentante`, visita).toPromise();
  }
  putUpdateReprogramacion(visita: VisitaMuestra) {
    return this.httpclient.put(`${environment.apis.ejecucion}/visitamuestra/updatereprogramacion`, visita).toPromise();
  }
  putUpdateCulminadaSinEjecucion(visita: VisitaMuestra) {
    return this.httpclient.put(`${environment.apis.ejecucion}/visitamuestra/updateculminadasinejecucion`, visita).toPromise();
  }
  putUpdateObservacionCompromisos(visita: VisitaMuestra) {
    return this.httpclient.put(`${environment.apis.ejecucion}/visitamuestra/updateobservacioncompromisos`, visita).toPromise();
  }
  putUpdateEjecutado(visita: VisitaMuestra) {
    return this.httpclient.put(`${environment.apis.ejecucion}/visitamuestra/updateejecutado`, visita).toPromise();
  }
  putUpdateEnProcesoCierre(visita: VisitaMuestra) {
    return this.httpclient.put(`${environment.apis.ejecucion}/visitamuestra/updateenprocesocierre`, visita).toPromise();
  }
  putUpdateAnularProcesoEjecucion(visita: VisitaMuestra) {
    return this.httpclient.put(`${environment.apis.ejecucion}/visitamuestra/updateanularprocesoejecucion`, visita).toPromise();
  }
  // methods
  setAspectosCompletados(value: string[]) {
    this.aspectosCompletados.next(value);
  }
  setCompromisos(value: string[]) {
    this.compromisos.next(value);
  }
  setObservacion(value: string) {
    this.observacion.next(value);
  }
}
