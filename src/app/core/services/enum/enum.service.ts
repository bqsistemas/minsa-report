import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpAjaxService } from './../http-ajax.service';

import { environment } from './../../../../environments/environment';

//models
import { Enum } from './../../models/enum/enum';

@Injectable({
  providedIn: 'root'
})
export class EnumService {
  private enums = new BehaviorSubject<Enum[]>(null);
  private dataEnums: Enum[];
  enums$ = this.enums.asObservable();

  constructor(
    private httpclient: HttpClient,
    private httpAjaxService: HttpAjaxService
  ) { }

  // consultas
  getAll() {
    return this.httpAjaxService.getWithOutPromise(`${environment.apis.configuracion}/enum/all`, {});
  }
  getEnum(param: Enum): Enum[] {
    const item = this.dataEnums.filter(x => x.tipo === param.tipo);
    //item = this.setInkey(item);
    return item;
  }

  // methods
  setInkey(item: Enum) {
    /*item.children.forEach((element) => {
      element.inKey = element.key;
      if (element.children.length > 0) {
        this.setInkey(element);
      }
    });*/

    return item;
  }
  getYears() {
    return this.httpAjaxService.get(`${environment.apis.configuracion}/enum/years`, {});
  }
  getEnumByKey(key: string): Enum {
    const item = this.dataEnums.find(x => x.key === key);
    return item;
  }
  setEnums(value: Enum[]) {
    this.dataEnums = value;
    this.enums.next(value);
  }
}
