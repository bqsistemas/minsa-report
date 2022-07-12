import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpAjaxService } from './../http-ajax.service';
import { environment } from './../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private loadingReport = new BehaviorSubject<boolean>(false);
  loadingReport$ = this.loadingReport.asObservable();

  constructor(
    private httpAjaxService: HttpAjaxService
  ) { }

  getDepartamentos(){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/departamentos`)
  }
  getProvincias(departamento: string){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/provincias/${departamento}`)
  }
  getDistritos(departamento: string, provincia: string){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/distritos/${departamento}/${provincia}`)
  }
  getMeses(){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/meses`)
  }
  getDisas(){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/disas`)
  }
  getRedes(disa: string){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/redes/${disa}`)
  }
  getMicroRedes(disa: string, red: string){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/microredes/${disa}/${red}`)
  }
  getEstablecimientos(disa: string, red: string, microred: string){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/establecimientos/${disa}/${red}/${microred}`)
  }
  getEtnias(){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/etnias`)
  }
  getGrupoEtarios(){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/grupoEtarios`)
  }

  setLoadingReport(value: boolean) {
    this.loadingReport.next(value);
  }
}
