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
import { HttpEventType } from '@angular/common/http';
import { CommonService } from '@core/services/common/common.service';

@Component({
  selector: 'vex-tmi',
  templateUrl: './tmi.component.html',
  styleUrls: ['./tmi.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class TmiComponent implements OnInit {
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
    values.reportType = 'VIH'
    this._reportService.postReportPDF2(values)
    .then(
      (data: any) => {
        document.querySelector("iframe").srcdoc = data.template
        this.urlReport = "-"
      })
    .catch((err) => console.log(err));
  }
  openMenu() {
    this.menuOpen = true;
  }
  downloadPdf(){
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = 'Reporte.pdf';
    a.href = this.urlReport
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }
}