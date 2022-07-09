import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpAjaxService } from './../http-ajax.service';

import { environment } from './../../../../environments/environment';

// models
import { PageRequest } from './../../models/general/page-request/page-request';
import { Item } from './../../models/item/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private httpclient: HttpClient,
    private httpAjaxService: HttpAjaxService
  ) { }
  //querys
  get(key: string) {
    return this.httpAjaxService.get(`${environment.apis.configuracion}/item/`, { key });
  }
  getPaginate(request: PageRequest, query: string, lastKey: string, idAspectoKey: string) {
    return this.httpAjaxService.get(`${environment.apis.configuracion}/item/paginate`,
      { page: request.page, pageSize: request.pageSize, query, lastKey, idAspectoKey });
  }
  getSearchForInstrument(request: PageRequest, query: string, lastKey: string, idAspectoKey: string) {
    return this.httpAjaxService.get(`${environment.apis.configuracion}/item/searchforinstrument`,
      { page: request.page, pageSize: request.pageSize, query, lastKey, idAspectoKey });
  }
  //comands
  postAdd(item: Item) {
    return this.httpclient.post(`${environment.apis.configuracion}/item/add`, item).toPromise();
  }
  putUpdate(item: Item) {
    return this.httpclient.put(`${environment.apis.configuracion}/item/update`, item).toPromise();
  }
  delete(item: Item) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: item.id,
      },
    };
    return this.httpclient.delete(`${environment.apis.configuracion}/item/delete`, options).toPromise();
  }
}
