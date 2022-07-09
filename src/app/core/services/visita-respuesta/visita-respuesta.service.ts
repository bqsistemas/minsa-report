import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpAjaxService } from './../http-ajax.service';
import { mergeDeep } from 'src/@vex/utils/merge-deep';

import { environment } from './../../../../environments/environment';

// models
import { PageRequest } from './../../models/general/page-request/page-request';
import { VisitaRespuesta } from '@core/models/visita-respuesta/visita-respuesta';

@Injectable({
  providedIn: 'root'
})
export class VisitaRespuestaService {

  constructor(
    private httpclient: HttpClient,
    private httpAjaxService: HttpAjaxService
  ) { }
  // querys
  getByVisitaAndAspecto(idVisitaMuestra: string, idAspecto: string) {
    return this.httpAjaxService.get(`${environment.apis.ejecucion}/visitarespuesta/byvisitaandaspecto`,
      { idVisitaMuestra, idAspecto });
  }
  // commands
  postAddList(respuesta: VisitaRespuesta) {
    return this.httpclient.post(`${environment.apis.ejecucion}/visitarespuesta/addlist`, respuesta).toPromise();
  }
}
