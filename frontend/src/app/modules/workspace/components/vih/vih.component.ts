import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import icApps from '@iconify/icons-ic/twotone-apps';
import icStar from '@iconify/icons-ic/twotone-star';
import { scaleIn400ms } from '../../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../../@vex/animations/fade-in-right.animation';
import { TableColumn } from '../../../../../@vex/interfaces/table-column.interface';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { stagger40ms } from '../../../../../@vex/animations/stagger.animation';
import { MatDialog } from '@angular/material/dialog';
import icAssessment from '@iconify/icons-ic/twotone-assessment';
// services
import { ReportService } from '@core/services/report/report.service';
import { CommonService } from '@core/services/common/common.service';

@Component({
  selector: 'vex-vih',
  templateUrl: './vih.component.html',
  styleUrls: ['./vih.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class VihComponent implements OnInit {
  menuOpen = false;

  activeCategory: 'frequently' | 'starred' | 'all' | 'family' | 'friends' | 'colleagues' | 'business' = 'all';

  icStar = icStar;
  icApps = icApps;
  icAssessment = icAssessment;

  loading = false
  urlReport = ''
  constructor(
    private dialog: MatDialog,
    private _reportService: ReportService,
    private _commonService: CommonService
  ) { }

  ngOnInit() {
    this._commonService.loadingReport$.subscribe((value) => {
      this.loading = value
    })
  }

  callReport(values) {
    this.urlReport = ''
    this._reportService.postReportPDF(values)
    .subscribe(
      (data) => {
        switch (data.type) {
          case HttpEventType.DownloadProgress:
            //this._snackBarService.setMensajeReactivo('Descargando: ' + Math.round((data.loaded / data.total) * 100) + ' %.');
            break;
          case HttpEventType.Response:
            //this._snackBarService.setMensajeReactivo('Descarga culminada, espere unos segundos.');
            const downloadedFile = new Blob([data.body], { type: data.body.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = 'Reporte.pdf';
            a.href = URL.createObjectURL(downloadedFile);
            this.urlReport = a.href
            document.querySelector("iframe").src = this.urlReport
            this._commonService.setLoadingReport(false)
            break;
        }
      },
      (error) => {
        this._commonService.setLoadingReport(false)
        //this._snackBarService.setMensajeReactivo('Error en la descarga');
        //this._snackBar.dismiss();
      });
  }
  openMenu() {
    this.menuOpen = true;
  }
}