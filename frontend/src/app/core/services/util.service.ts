import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { environment } from './../../../environments/environment';

export interface EntityConfirmDialog {
  title: 'Pregunta';
  question: '';
}

// components
import { ConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private dialog: MatDialog,
  ) { }

  leftPad(str: string, len: number, ch: string): string {
    len = len - str.length + 1;
    return len > 0 ?
      new Array(len).join(ch) + str : str;
  }
}
