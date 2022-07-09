import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { mergeDeep } from 'src/@vex/utils/merge-deep';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEventType } from '@angular/common/http';

import icAttachFile from '@iconify/icons-ic/twotone-attach-file';
import icAdd from '@iconify/icons-ic/twotone-add';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icCloudDownload from '@iconify/icons-ic/twotone-cloud-download';

import theme from '../../../../@vex/utils/tailwindcss';
import { environment } from 'src/environments/environment';
// models
import { Option } from './../../interfaces/option';
import { QuestionConfig } from '../../interfaces/question-config';
// services
import { GestorArchivosService } from '@core/services/gestor-archivos/gestor-archivos.service';

@Component({
  selector: 'vex-resolve-question-carga-archivos',
  templateUrl: './resolve-question-carga-archivos.component.html',
  styleUrls: ['./resolve-question-carga-archivos.component.scss']
})
export class ResolveQuestionCargaArchivosComponent implements OnInit {

  @Input() question: QuestionConfig;
  @Input() codigoItem: any;
  @Input() readOnly: boolean = true;
  @Input() control: FormControl;
  @Input() controlSize: FormControl = null;
  @Input() controlExtension: FormControl = null;
  @Input() controlNameFile: FormControl = null;
  @Output() changeValue: EventEmitter<any> = new EventEmitter();

  @ViewChild('fileUpload', { static: false })
  fileUpload: ElementRef; files = [];

  subscriptions: Subscription = new Subscription();

  // --------------
  icAttachFile = icAttachFile;
  icAdd = icAdd;
  constructor(
    private _gestorArchivo: GestorArchivosService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.control.valueChanges.subscribe((value) => {
      this.changeValue.emit({
        value,
        control: this.control,
        codigoItem: this.codigoItem
      });
    }));
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  onFileChange(event) {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      const file = fileUpload.files[0];
      const extension = file.name.split('.')[file.name.split('.').length - 1];
      const nombre = 'adjunto-' + this.codigoItem + '-' + (new Date()).getTime().toString() + '.' + extension;
      const formData = new FormData();
      formData.append('archivo', file, nombre);

      this._gestorArchivo.postUpload(formData, nombre).then((value: any) => {
        debugger;
        const data = (value.body ? JSON.parse(value.body.data) : null);
        if (data?.data.codigoDocumento) {
          this.control.setValue(data?.data.codigoDocumento);
          this.controlSize.setValue(file.size / 1024 / 1024);
          this.controlExtension.setValue(extension);
          this.controlNameFile.setValue(nombre);
          this.snackbar.open('Se guardó con éxito.', 'Éxito!', {
            duration: 2500
          });
        } else {
          this.snackbar.open(data ? data?.data.messages.join(', ') : 'Error al adjuntar', 'Aviso!', {
            panelClass: 'bg-deep-orange-500',
            duration: 3500
          });
        }
      }).catch((value: any) => {
        this.snackbar.open(value.error?.messages?.join(', '), 'Aviso!', {
          panelClass: 'bg-deep-orange-500',
          duration: 3500
        });
      });
    };
    fileUpload.click();
  }
  deleteFile() {
    this.control.setValue(null);
    this.controlSize.setValue(null);
    this.controlExtension.setValue(null);
    this.controlNameFile.setValue(null);
  }
  downloadFile() {
    this._gestorArchivo.postDownload(this.control.value, this.controlNameFile.value).subscribe((data: any) => {
      switch (data.type) {
        case HttpEventType.DownloadProgress:
          break;
        case HttpEventType.Response:
          const downloadedFile = new Blob([data.body], { type: data.body.type });
          const a = document.createElement('a');
          a.setAttribute('style', 'display:none;');
          document.body.appendChild(a);
          a.download = this.controlNameFile.value;
          a.href = URL.createObjectURL(downloadedFile);
          a.target = '_blank';
          a.click();
          document.body.removeChild(a);
          break;
      }
    },
      error => {
        this.snackbar.open('Error en la descarga', 'Aviso!', {
          panelClass: 'bg-deep-orange-500',
          duration: 3500
        });
      });
  }
}
