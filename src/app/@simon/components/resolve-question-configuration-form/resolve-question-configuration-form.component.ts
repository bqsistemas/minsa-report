import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';

import { environment } from './../../../../environments/environment';
// models
import { QuestionConfig } from './../../interfaces/question-config';

@Component({
  selector: 'vex-resolve-question-configuration-form',
  templateUrl: './resolve-question-configuration-form.component.html',
  styleUrls: ['./resolve-question-configuration-form.component.scss']
})
export class ResolveQuestionConfigurationFormComponent implements OnInit {

  @Input() number: number;
  @Input() question: QuestionConfig;
  @Input() codigoItem: any;
  @Input() readOnly: boolean = true;
  @Input() control: FormControl;
  @Input() controlOther: FormControl = null;
  @Input() controlSize: FormControl = null;
  @Input() controlExtension: FormControl = null;
  @Input() controlNameFile: FormControl = null;
  @Output() changeValue: EventEmitter<any> = new EventEmitter();

  environment = environment;

  constructor() { }

  ngOnInit(): void {
  }
  fnChange(value: any) {
    this.changeValue.emit(value);
  }
}
