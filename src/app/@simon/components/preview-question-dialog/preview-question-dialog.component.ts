import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import icClose from '@iconify/icons-ic/twotone-close';

// models
import { QuestionConfig } from '../../interfaces/question-config';

@Component({
  selector: 'vex-preview-question-dialog',
  templateUrl: './preview-question-dialog.component.html',
  styleUrls: ['./preview-question-dialog.component.scss']
})
export class PreviewQuestionDialogComponent implements OnInit {

  question: QuestionConfig;
  testControl: FormControl = new FormControl();
  testOtherControl: FormControl = new FormControl();

  // -----------------------------
  icClose = icClose;
  constructor(
    private dialogRef: MatDialogRef<PreviewQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) {
    this.question = _data.question;
  }

  ngOnInit(): void {
  }

}
