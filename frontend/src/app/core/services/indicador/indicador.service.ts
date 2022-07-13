import { Injectable } from '@angular/core';
import { PageRequest } from '@core/models/general/page-request/page-request';
import { environment } from 'src/environments/environment';
import { HttpAjaxService } from '../http-ajax.service';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {

  constructor(
    private httpAjaxService: HttpAjaxService
  ) { }

  // querys
  get(key: string) {
    return this.httpAjaxService.get(`${environment.apis.backend}/indicador/`, { id: key });
  }
  getPaginate(request: PageRequest, query: string) {
    let filtro: any = { page: request.page, pageSize: request.pageSize, query };
    return this.httpAjaxService.get(`${environment.apis.backend}/indicador/paginate`,
      filtro);
  }
}
