import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { mergeDeep } from 'src/@vex/utils/merge-deep';
import { Subscription } from 'rxjs';

import { AppDateAdapter, APP_DATE_FORMATS } from '@core/adapters/format-date';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import theme from '../../../../@vex/utils/tailwindcss';
// models
import { Option } from './../../interfaces/option';
import { QuestionConfig } from '../../interfaces/question-config';

@Component({
  selector: 'vex-resolve-question-fecha-hora',
  templateUrl: './resolve-question-fecha-hora.component.html',
  styleUrls: ['./resolve-question-fecha-hora.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ]
})
export class ResolveQuestionFechaHoraComponent implements OnInit {

  @Input() question: QuestionConfig;
  @Input() codigoItem: any;
  @Input() readOnly: boolean = true;
  @Input() control: FormControl;
  @Output() changeValue: EventEmitter<any> = new EventEmitter();

  subscriptions: Subscription = new Subscription();

  minDate: Date;
  maxDate: Date;

  constructor() { }

  ngOnInit(): void {
    if (this.question.resolve.withScore) {
      this.minDate = new Date(this.question.resolve.options[0].scoreMin);
      this.maxDate = new Date(this.question.resolve.options[this.question.resolve.options.length - 1].scoreMax);
    }

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
}
