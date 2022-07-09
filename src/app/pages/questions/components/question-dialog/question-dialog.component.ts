import { Component, Inject, OnInit } from '@angular/core';
import icLaunch from '@iconify/icons-ic/twotone-launch';
import icClose from '@iconify/icons-ic/twotone-close';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from '../../questions.component';

@Component({
  selector: 'vex-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss']
})
export class QuestionDialogComponent implements OnInit {

  icLaunch = icLaunch;
  icClose = icClose;

  constructor(@Inject(MAT_DIALOG_DATA) public question: Question) { }

  ngOnInit() {
  }

}
