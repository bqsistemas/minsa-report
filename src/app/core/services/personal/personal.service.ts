import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpAjaxService } from './../http-ajax.service';
import { mergeDeep } from 'src/@vex/utils/merge-deep';

import { environment } from './../../../../environments/environment';

// models
import { PageRequest } from './../../models/general/page-request/page-request';
import { Persona } from './../../models/persona/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  private estado = new BehaviorSubject<boolean>(null);
  estado$ = this.estado.asObservable();

  private instrumento = new BehaviorSubject<Persona>(null);
  instrumento$ = this.instrumento.asObservable();

  constructor(
    private httpclient: HttpClient,
    private httpAjaxService: HttpAjaxService
  ) { }
  //querys
  postPaginate(request: PageRequest, lastKey: string, muestra: string, filter: any) {
    let path = '';
    switch (muestra) {
      case environment.enums.configuracion.tipoActor.children.especialistaMINEDU:
        path = 'listarpaginadopersonal';
        break;
      case environment.enums.configuracion.tipoActor.children.especialistaDRE:
        path = 'listarpaginadopersonaldre';
        break;
      case environment.enums.configuracion.tipoActor.children.especialistaUGEL:
        path = 'listarpaginadopersonalugel';
        break;
      case environment.enums.configuracion.tipoActor.children.directorIE:
        path = 'listarpaginadodirectorescentral';
        break;
      case environment.enums.configuracion.tipoActor.children.docente:
        path = 'listarpaginadodocentesnexus';
        break;
      case environment.enums.configuracion.tipoActor.children.directorCETPRO:
        path = 'listarpaginadodirectorcetproinstitutos';
        break;
      default:
        return null;
        break;
    }
    filter.dre = filter.dre?.codigoSede;
    filter.ugel = filter.ugel?.codigoSede;
    filter.codInstitucion = filter.queryIE?.codigoSede;
    filter.queryIE = filter.queryIE?.codigoSede ? '' : filter.queryIE;
    return this.httpAjaxService.post(`${environment.apis.personal}/personal/` + path,
      mergeDeep({ ...filter }, { page: request.page, pageSize: request.pageSize, lastKey })).toPromise();
  }
  //comands
  // methods
  setEstado(value: any) {
    this.estado.next(value);
  }
}
