import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { mergeDeep } from 'src/@vex/utils/merge-deep';
import { Subscription } from 'rxjs';

import theme from '../../../../@vex/utils/tailwindcss';
// models
import { Option } from './../../interfaces/option';
import { QuestionConfig } from '../../interfaces/question-config';
import { Numeric } from '@core/validators/numeric';

@Component({
  selector: 'vex-resolve-question-cantidad',
  templateUrl: './resolve-question-cantidad.component.html',
  styleUrls: ['./resolve-question-cantidad.component.scss']
})
export class ResolveQuestionCantidadComponent implements OnInit {

  @Input() question: QuestionConfig;
  @Input() codigoItem: any;
  @Input() readOnly: boolean = true;
  @Input() control: FormControl;
  @Output() changeValue: EventEmitter<any> = new EventEmitter();

  subscriptions: Subscription = new Subscription();

  min = 0;
  max = 0;

  constructor() { }

  ngOnInit(): void {
    if (this.question.resolve.withScore) {
      this.min = Number(this.question.resolve.options[0].scoreMin);
      this.max = Number(this.question.resolve.options[this.question.resolve.options.length - 1].scoreMax);

      this.control.setValidators(
        Validators.compose([this.control.validator,
        Validators.min(this.min), Validators.max(this.max),
          Numeric]));
      this.control.updateValueAndValidity({ emitEvent: false });
    } else {
      this.control.setValidators(
        Validators.compose([this.control.validator,
          Numeric]));
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
