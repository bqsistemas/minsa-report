import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import icClose from '@iconify/icons-ic/twotone-close';

// models
import { QuestionConfig } from '../../interfaces/question-config';
import { Option } from '../../interfaces/option';

@Component({
  selector: 'vex-descriptions-question-dialog',
  templateUrl: './descriptions-question-dialog.component.html',
  styleUrls: ['./descriptions-question-dialog.component.scss']
})
export class DescriptionsQuestionDialogComponent implements OnInit {

  options: Option[];

  // -----------------------------
  icClose = icClose;
  constructor(
    private dialogRef: MatDialogRef<DescriptionsQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) {
    this.options = _data.options;
  }

  ngOnInit(): void {
  }

}
