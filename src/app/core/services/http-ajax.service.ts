import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEventType, HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { BlockUI, NgBlockUI } from 'ng-block-ui';
// import { AuthService } from './../../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpAjaxService {
  // @BlockUI() blockUI: NgBlockUI;

  constructor(
    // private _authService: AuthService,
    private httpClient: HttpClient
  ) { }

  private getOptionsHttp() {
    const token = ''; // this._authService.getToken();
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token, //JWT
        'apikey': environment.apiKey,
        'Content-Type': 'application/json',
      })
    };
  }
  private getOptionsHttpFile() {
    let token = localStorage.getItem("jwt");
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'apikey': environment.apiKey,
        'Content-Type': 'multipart/form-data',
      })
    };
  }

  /*GET*/

  get(url: string, parametros?: any) {
    let optionsHttp = this.getOptionsHttp();
    if (parametros) {
      optionsHttp['params'] = new HttpParams();
      Object.keys(parametros).forEach(function (key) {
        optionsHttp['params'] = optionsHttp['params'].append(key, parametros[key]);
      });
    }
    return this.httpClient.get(url, optionsHttp).toPromise();
  }
  getWithOutPromise(url: string, parametros?: any) {
    let optionsHttp = this.getOptionsHttp();
    if (parametros) {
      optionsHttp['params'] = new HttpParams();
      Object.keys(parametros).forEach(function (key) {
        optionsHttp['params'] = optionsHttp['params'].append(key, parametros[key]);
      });
    }
    return this.httpClient.get(url, optionsHttp);
  }
  post<T>(url: string, parametros: any): Observable<T> {
    return this.httpClient.post<T>(url, parametros);
  }
  postFile(url: string, formData: FormData): any {
    var optionsHttp = this.getOptionsHttpFile();
    optionsHttp['reportProgress'] = true;
    optionsHttp['observe'] = 'events';
    return this.httpClient.post(url, formData, optionsHttp).toPromise();
  }
  postFileDownload(url: string, parametros: any): any {
    var optionsHttp = this.getOptionsHttpFile();
    optionsHttp['responseType'] = 'blob';
    optionsHttp['reportProgress'] = true;
    optionsHttp['observe'] = 'events';
    return this.httpClient.post(url, parametros, optionsHttp);
  }
}
