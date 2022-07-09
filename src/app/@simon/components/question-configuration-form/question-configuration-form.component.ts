import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { environment } from './../../../../environments/environment';
// models
import { QuestionConfig } from './../../interfaces/question-config';
// data
import { configs } from './../../services/config';
// services
import { ConfigService } from './../../services/config/config.service';
// components
import { PreviewQuestionDialogComponent } from '../preview-question-dialog/preview-question-dialog.component';

@Component({
  selector: 'vex-question-configuration-form',
  templateUrl: './question-configuration-form.component.html',
  styleUrls: ['./question-configuration-form.component.scss']
})
export class QuestionConfigurationFormComponent implements OnInit {

  @Input() questionEdit: QuestionConfig;
  @Output() saveQuestion: EventEmitter<any> = new EventEmitter();
  @Output() cancelCreateItem: EventEmitter<any> = new EventEmitter();

  environment = environment;
  typesQuestion: QuestionConfig[] = configs;
  question: QuestionConfig;
  form: FormGroup;
  // ------------------------------
  constructor(
    private _configService: ConfigService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = this.createForm();
    if (this.questionEdit) {
      this.form.controls.title.setValue(this.questionEdit.resolve.title);
      this.form.controls.type.setValue(this.selectTypeQuestion(this.questionEdit.type));
    }
  }

  createForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [Validators.required]),
      type: new FormControl(null, [Validators.required])
    });
  }
  typeSelectionChange(value: any) {
    this.question = value.value;
  }
  selectTypeQuestion(type: string) {
    const value = this.typesQuestion.find(x => x.type === type);
    this.question = value;
    return value;
  }
  // save
  saveQuestionItem(value: QuestionConfig) {
    if (this.form.valid) {
      value.resolve.title = this.form.get('title').value;
      this.saveQuestion.emit(value);
    } else {
      this.form.markAllAsTouched();
    }
  }
  fnCancelCreateItem(value: any) {
    this.cancelCreateItem.emit({});
  }
  fnPreview(question: any) {
    const dialogRef = this.dialog.open(PreviewQuestionDialogComponent, {
      width: '800px',
      data: {
        question
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
