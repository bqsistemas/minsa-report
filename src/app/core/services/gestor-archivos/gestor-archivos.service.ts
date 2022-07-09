import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpAjaxService } from './../http-ajax.service';
import { mergeDeep } from 'src/@vex/utils/merge-deep';

import { environment } from './../../../../environments/environment';

import { Archivo } from './../../models/archivo/archivo';

@Injectable({
  providedIn: 'root'
})
export class GestorArchivosService {

  constructor(
    private httpclient: HttpClient,
    private httpAjaxService: HttpAjaxService
  ) { }
  // post
  postUpload(formData: FormData, nombre: string) {
    formData.append('descripcionDocumento', nombre);

    return this.httpAjaxService.postFile(`${environment.apis.archivos}/file/upload`, formData);
  }
  postDownload(codigo: string, name: string) {
    return this.httpAjaxService.postFileDownload(`${environment.apis.archivos}/file/${codigo}/${name}`, null);
  }
}
