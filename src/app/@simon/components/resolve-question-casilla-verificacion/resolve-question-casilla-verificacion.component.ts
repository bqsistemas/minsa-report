import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { mergeDeep } from 'src/@vex/utils/merge-deep';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';

import theme from '../../../../@vex/utils/tailwindcss';
// models
import { Option } from './../../interfaces/option';
import { QuestionConfig } from '../../interfaces/question-config';

@Component({
  selector: 'vex-resolve-question-casilla-verificacion',
  templateUrl: './resolve-question-casilla-verificacion.component.html',
  styleUrls: ['./resolve-question-casilla-verificacion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResolveQuestionCasillaVerificacionComponent implements OnInit {

  @Input() question: QuestionConfig;
  @Input() codigoItem: any;
  @Input() readOnly: boolean = true;
  @Input() control: FormControl;
  @Input() controlOther: FormControl;
  @Output() changeValue: EventEmitter<any> = new EventEmitter();

  subscriptions: Subscription = new Subscription();

  showFirst = false;
  showOther = false;
  selection = new SelectionModel<string>(true, []);

  constructor() { }

  ngOnInit(): void {
    this.subscriptions.add(this.control.valueChanges.subscribe((value) => {
      this.changeValue.emit({
        value,
        control: this.control,
        codigoItem: this.codigoItem
      });
      if (!this.showFirst) {
        if (value) {
          value.forEach(element => {
            this.selection.toggle(element);
          });
          this.fnCalculateShowOther();
        }
        this.showFirst = true;
      }
    }));
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  fnSelect(opcion: string, event: Event) {
    this.selection.toggle(opcion);

    this.control.setValue(this.selection.selected);

    this.fnCalculateShowOther();
  }
  fnCalculateShowOther() {
    this.showOther = this.control.value.some(x => x === 'OTHER');
    if (this.showOther) {
      this.controlOther.setValidators([Validators.required]);
      this.controlOther.updateValueAndValidity({ emitEvent: false });
    } else {
      if (this.controlOther) {
        this.controlOther.setValidators(null);
        this.controlOther.updateValueAndValidity({ emitEvent: false });
      }
    }
  }
}
