import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';

@Component({
  selector: 'vex-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  question: string;
  title: string = '';
  message: string = '';
  // -------------------
  icClose = icClose;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    this.question = _data.question;
    this.title = _data.title ? _data.title : 'Pregunta';
    this.message = _data.message ? _data.message : '';
  }

  ngOnInit(): void {
  }
  close(answer: any) {
    this.dialogRef.close(answer);
  }
}
