import { Injectable } from '@angular/core';
import { HttpAjaxService } from './../http-ajax.service';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private httpAjaxService: HttpAjaxService
  ) { }

  postReportPDF(values: any){
    return this.httpAjaxService.postFileDownload(`${environment.apis.backend}/reports/ReportPdf`, values)
  }
  postReportPDF2(values: any){
    return this.httpAjaxService.post(`${environment.apis.backend}/reports/ReportPdf`, values).toPromise()
  }
}
 