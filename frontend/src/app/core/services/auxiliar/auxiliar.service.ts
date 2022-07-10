import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpAjaxService } from './../http-ajax.service';

import { environment } from './../../../../environments/environment';

// models
import { Igel } from '../../models/igel/igel';
import { Sede } from '@core/models/sede/sede';

@Injectable({
  providedIn: 'root'
})
export class AuxiliarService {
  private dataIgels: Igel[];

  constructor(
    private httpclient: HttpClient,
    private httpAjaxService: HttpAjaxService
  ) { }
  getInstitucionEducativa(codigoModular: string, anexo: string) {
    return this.httpAjaxService.get(`${environment.apis.auxiliar}/padron/getinstitucioneducativa`, {
      codigoModular,
      anexo
    });
  }
  getListarEtapa() {
    return this.httpAjaxService.get(`${environment.apis.auxiliar}/padron/listaretapa`, {});
  }
  getListarIgel() {
    return this.httpAjaxService.get(`${environment.apis.auxiliar}/padron/listarigel`, {});
  }
  getListarDre() {
    return this.httpAjaxService.get(`${environment.apis.auxiliar}/padron/listardre`, {});
  }
  getListarUgel(dre: string) {
    return this.httpAjaxService.get(`${environment.apis.auxiliar}/padron/listarugel`, { codigoDre: dre });
  }
  getListarModalidad(etapa: number) {
    return this.httpAjaxService.get(`${environment.apis.auxiliar}/siagie/listarmodalidad`, { idEtapa: etapa });
  }
  getListarNivel(etapa: number, modalidad: string) {
    return this.httpAjaxService.get(`${environment.apis.auxiliar}/siagie/listarniveleducativo`, { idEtapa: etapa, idModalidad: modalidad });
  }
  getListarCiclo(etapa: number, modalidad: string, nivel: string) {
    return this.httpAjaxService.get(`${environment.apis.auxiliar}/siagie/listarciclo`, { idEtapa: etapa, idModalidad: modalidad, idNivel: nivel });
  }
  getListarArea(anio: number, nivel: string) {
    return this.httpAjaxService.get(`${environment.apis.auxiliar}/siagie/listarareaconocimiento`, { anio, idNivel: nivel });
  }
  setIgels(value: Igel[]) {
    this.dataIgels = value;
  }
  getIgel(sede: any) {
    const dre = this.dataIgels.find(x => x.codigoDre === sede.codigoSede.substring(0, 4));

    if (sede.tipo === '1') { // DRE
      return dre;
    } else {
      return dre.listaUgel.find(x => x.id === sede.codigoSede);
    }
  }
}
