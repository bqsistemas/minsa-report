import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpAjaxService } from './../http-ajax.service';
import { mergeDeep } from 'src/@vex/utils/merge-deep';

import { environment } from './../../../../environments/environment';

// models
import { PageRequest } from './../../models/general/page-request/page-request';
import { Muestra } from './../../models/muestra/muestra';

@Injectable({
  providedIn: 'root'
})
export class MuestraService {

  constructor(
    private httpclient: HttpClient,
    private httpAjaxService: HttpAjaxService
  ) { }
  // querys
  postPaginate(request: PageRequest, lastKey: string, idInstrumento: string, filter: any) {
    filter.dre = filter.dre?.codigoSede;
    filter.ugel = filter.ugel?.codigoSede;
    filter.codigoSede = filter.codigoSede ? filter.codigoSede : filter.queryIE?.codigoSede;
    filter.queryIE = filter.queryIE?.codigoSede ? '' : filter.queryIE;

    return this.httpAjaxService.post(`${environment.apis.ejecucion}/muestra/paginate`,
      mergeDeep({ ...filter },
        { page: request.page, pageSize: request.pageSize, lastKey, idInstrumento, esActivo: true })).toPromise();
  }
  // querys for dashboards
  postResumenAsignacionMuestraNacional(idPlanMonitoreo: string, idInstrumento: string) {
    return this.httpAjaxService.post(`${environment.apis.ejecucion}/muestra/resumenasignacionmuestranacional`, {
      idPlanMonitoreo,
      idInstrumentoResumen: idInstrumento
    }).toPromise();
  }
  postResumenAsignacionMuestraDre(idPlanMonitoreo: string, idInstrumento: string, dre: string) {
    return this.httpAjaxService.post(`${environment.apis.ejecucion}/muestra/resumenasignacionmuestradre`, {
      idPlanMonitoreo,
      idInstrumentoResumen: idInstrumento,
      dre
    }).toPromise();
  }
  postResumenAsignacionMuestraUgel(idPlanMonitoreo: string, idInstrumento: string, ugel: string) {
    return this.httpAjaxService.post(`${environment.apis.ejecucion}/muestra/resumenasignacionmuestraugel`, {
      idPlanMonitoreo,
      idInstrumentoResumen: idInstrumento,
      ugel
    }).toPromise();
  }
  postResumenAsignacionMuestraIIEE(idPlanMonitoreo: string, idInstrumento: string, codigoSede: string) {
    return this.httpAjaxService.post(`${environment.apis.ejecucion}/muestra/resumenasignacionmuestraiiee`, {
      idPlanMonitoreo,
      idInstrumentoResumen: idInstrumento,
      codigoSede
    }).toPromise();
  }
  // commands
  postAddList(muestra: Muestra) {
    return this.httpclient.post(`${environment.apis.ejecucion}/muestra/addlist`, muestra).toPromise();
  }
  postReemplazo(muestra: Muestra) {
    return this.httpclient.post(`${environment.apis.ejecucion}/muestra/reemplazo`, muestra).toPromise();
  }
  putUpdateMonitorMultiple(muestra: Muestra) {
    return this.httpclient.put(`${environment.apis.ejecucion}/muestra/updatemonitormultiple`, muestra).toPromise();
  }
  putUpdateMonitor(muestra: Muestra) {
    return this.httpclient.put(`${environment.apis.ejecucion}/muestra/updatemonitor`, muestra).toPromise();
  }
  deleteMuestraMultiple(muestra: Muestra) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: muestra,
    };
    return this.httpclient.delete(`${environment.apis.ejecucion}/muestra/deletemuestramultiple`, options).toPromise();
  }
}
