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

  getDepartamentos(disa: string){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/departamentos/${disa}`)
  }
  getProvincias(disa: string, departamento: string){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/provincias/${disa}/${departamento}`)
  }
  getDistritos(disa: string, departamento: string, provincia: string){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/distritos/${disa}/${departamento}/${provincia}`)
  }
  getMeses(){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/meses`)
  }
  getPeriodo(){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/periodo`)
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
  getEstablecimiento(establecimiento: string){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/datosestablecimiento/${establecimiento}`)
  }
  getEtnias(){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/etnias`)
  }
  getTipoPoblacion(){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/tipoPoblacion`)
  }
  getGrupoEtarios(){
    return this.httpAjaxService.get(`${environment.apis.backend}/common/grupoEtarios`)
  }

  setLoadingReport(value: boolean) {
    this.loadingReport.next(value);
  }
}
