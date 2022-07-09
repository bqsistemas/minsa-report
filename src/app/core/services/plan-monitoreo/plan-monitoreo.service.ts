import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpAjaxService } from './../http-ajax.service';

import { environment } from './../../../../environments/environment';

// models
import { PageRequest } from './../../models/general/page-request/page-request';
import { PlanMonitoreo } from './../../models/plan-monitoreo/plan-monitoreo';
import { Institucion } from '@core/models/institucion/institucion';

@Injectable({
  providedIn: 'root'
})
export class PlanMonitoreoService {
  private plan = new BehaviorSubject<PlanMonitoreo>(null);
  plan$ = this.plan.asObservable();
  private showPlanHowForm = new BehaviorSubject<boolean>(true);
  showPlanHowForm$ = this.showPlanHowForm.asObservable();
  private rule = new BehaviorSubject<any>(null);
  rule$ = this.rule.asObservable();
  private estado = new BehaviorSubject<boolean>(null);
  estado$ = this.estado.asObservable();
  private mostrarMenuEstados = new BehaviorSubject<boolean>(null);
  mostrarMenuEstados$ = this.mostrarMenuEstados.asObservable();

  // (monitoreo))
  drawerOpen = new BehaviorSubject<boolean>(false);
  drawerOpen$ = this.drawerOpen.asObservable();

  constructor(
    private httpclient: HttpClient,
    private httpAjaxService: HttpAjaxService
  ) { }
  //querys
  get(key: string) {
    return this.httpAjaxService.get(`${environment.apis.configuracion}/planmonitoreo/`, { id: key });
  }
  getResolve(key: string) {
    return this.httpAjaxService.getWithOutPromise(`${environment.apis.configuracion}/planmonitoreo/`, { id: key });
  }
  getFromEjecucion(key: string) {
    return this.httpAjaxService.get(`${environment.apis.ejecucion}/planmonitoreo/`, { id: key });
  }
  getFromEjecucionResolve(key: string) {
    return this.httpAjaxService.getWithOutPromise(`${environment.apis.ejecucion}/planmonitoreo/`, { id: key });
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
    return this.httpAjaxService.post(`${environment.apis.configuracion}/planmonitoreo/paginateforgrid`,
      filtro).toPromise();
  }
  postPaginateForGridFromEjecucion(request: PageRequest, query: string, lastKey: string, sede: any, institucion: Institucion,
    isDirector: boolean, codigoActor: string, esCulminado: boolean = null) {
    sede.tipoSede = Number(sede.tipoSedeIndice);
    let filtro: any = {
      page: request.page, pageSize: request.pageSize, query, lastKey, sede, institucion,
      isDirector, codigoActor, esCulminado
    };

    return this.httpAjaxService.post(`${environment.apis.ejecucion}/planmonitoreo/paginateforgrid`,
      filtro).toPromise();
  }
  //comands
  postAdd(plan: PlanMonitoreo) {
    return this.httpclient.post(`${environment.apis.configuracion}/planmonitoreo/add`, plan).toPromise();
  }
  putUpdate(plan: PlanMonitoreo) {
    return this.httpclient.put(`${environment.apis.configuracion}/planmonitoreo/update`, plan).toPromise();
  }
  putUpdateEstadoActivo(plan: PlanMonitoreo) {
    return this.httpclient.put(`${environment.apis.configuracion}/planmonitoreo/updateestadoactivo`, plan).toPromise();
  }
  putUpdateEstadoCulminado(plan: PlanMonitoreo) {
    return this.httpclient.put(`${environment.apis.configuracion}/planmonitoreo/updateestadoculminado`, plan).toPromise();
  }
  putUpdateComponentes(plan: PlanMonitoreo) {
    return this.httpclient.put(`${environment.apis.configuracion}/planmonitoreo/updatecomponentes`, plan).toPromise();
  }
  putUpdatePublicado(plan: PlanMonitoreo) {
    return this.httpclient.put(`${environment.apis.configuracion}/planmonitoreo/updatepublicado`, plan).toPromise();
  }
  delete(plan: PlanMonitoreo) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: plan.id,
      },
    };
    return this.httpclient.delete(`${environment.apis.configuracion}/planmonitoreo/delete`, options).toPromise();
  }
  // methods
  setPlan(value: PlanMonitoreo) {
    this.plan.next(value);
  }
  setRule(value: any) {
    this.rule.next(value);
  }
  setshowPlanHowForm(value: boolean) {
    this.showPlanHowForm.next(value);
  }
  setEstado(value: any) {
    this.estado.next(value);
  }
  setMenuEstados(value: any) {
    this.mostrarMenuEstados.next(value);
  }
}
