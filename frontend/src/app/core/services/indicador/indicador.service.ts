import { Injectable } from '@angular/core';
import { PageRequest } from '@core/models/general/page-request/page-request';
import { Indicador } from '@core/models/Indicador/indicador';
import { environment } from 'src/environments/environment';
import { HttpAjaxService } from '../http-ajax.service';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {

  constructor(
    private httpAjaxService: HttpAjaxService
  ) { }

  // commands
  postAdd(indicador: Indicador) {
    return this.httpAjaxService.post(`${environment.apis.backend}/MaestroIngreso`, indicador).toPromise();
  }
  putUpdate(indicador: Indicador) {
    return this.httpAjaxService.put(`${environment.apis.backend}/MaestroIngreso`, indicador).toPromise();
  }
  putDelete(id: number) {
    return this.httpAjaxService.delete(`${environment.apis.backend}/MaestroIngreso/${id}`).toPromise();
  }
  // querys
  get(key: number) {
    return this.httpAjaxService.get(`${environment.apis.backend}/MaestroIngreso/${key}`);
  }
  postPaginate(request: PageRequest, searchTerm: string) {
    let filtro: any = { page: request.page, pageSize: request.pageSize, searchTerm: searchTerm };
    return this.httpAjaxService.post(`${environment.apis.backend}/MaestroIngreso/paged`,
      filtro).toPromise();
  }
}
