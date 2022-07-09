import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { mergeDeep } from 'src/@vex/utils/merge-deep';
import { Subscription } from 'rxjs';

import theme from '../../../../@vex/utils/tailwindcss';
// models
import { Option } from './../../interfaces/option';
import { QuestionConfig } from '../../interfaces/question-config';

@Component({
  selector: 'vex-resolve-question-cuadro-texto-simple',
  templateUrl: './resolve-question-cuadro-texto-simple.component.html',
  styleUrls: ['./resolve-question-cuadro-texto-simple.component.scss']
})
export class ResolveQuestionCuadroTextoSimpleComponent implements OnInit {

  @Input() question: QuestionConfig;
  @Input() codigoItem: any;
  @Input() readOnly: boolean = true;
  @Input() control: FormControl;
  @Output() changeValue: EventEmitter<any> = new EventEmitter();

  subscriptions: Subscription = new Subscription();

  constructor() { }

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
}
