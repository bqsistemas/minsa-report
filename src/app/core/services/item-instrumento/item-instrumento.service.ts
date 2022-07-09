import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpAjaxService } from './../http-ajax.service';

import { environment } from './../../../../environments/environment';

// models
import { PageRequest } from './../../models/general/page-request/page-request';
import { ItemInstrumento } from './../../models/item-instrumento/item-instrumento';

@Injectable({
  providedIn: 'root'
})
export class ItemInstrumentoService {

  constructor(
    private httpclient: HttpClient,
    private httpAjaxService: HttpAjaxService
  ) { }
  //querys
  get(key: string) {
    return this.httpAjaxService.get(`${environment.apis.configuracion}/iteminstrumento/`, { key });
  }
  getByInstrumento(idInstrumento: string) {
    return this.httpAjaxService.get(`${environment.apis.configuracion}/iteminstrumento/byinstrumento`,
      { idInstrumento });
  }
  getByInstrumentoForRules(idInstrumento: string) {
    return this.httpAjaxService.get(`${environment.apis.configuracion}/iteminstrumento/byinstrumentoforrules`,
      { idInstrumento });
  }
  getByInstrumentoAndAspecto(idInstrumento: string, idAspecto: string) {
    return this.httpAjaxService.get(`${environment.apis.configuracion}/iteminstrumento/byinstrumentoandaspecto`,
      { idInstrumento, idAspecto });
  }
  // commands
  postAdd(item: ItemInstrumento) {
    return this.httpclient.post(`${environment.apis.configuracion}/iteminstrumento/add`, item).toPromise();
  }
  putUpdateReglas(item: ItemInstrumento) {
    return this.httpclient.put(`${environment.apis.configuracion}/iteminstrumento/updatereglas`, item).toPromise();
  }
  putUpdateRequired(item: ItemInstrumento) {
    return this.httpclient.put(`${environment.apis.configuracion}/iteminstrumento/updaterequired`, item).toPromise();
  }
  delete(item: ItemInstrumento) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: item,
    };
    return this.httpclient.delete(`${environment.apis.configuracion}/iteminstrumento/delete`, options).toPromise();
  }
  postAddList(item: ItemInstrumento) {
    return this.httpclient.post(`${environment.apis.configuracion}/iteminstrumento/addlist`, item).toPromise();
  }
}
