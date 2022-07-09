import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { mergeDeep } from 'src/@vex/utils/merge-deep';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import theme from '../../../../@vex/utils/tailwindcss';

import icComment from '@iconify/icons-ic/twotone-comment';
// models
import { Option } from './../../interfaces/option';
import { QuestionConfig } from '../../interfaces/question-config';
// components
import { DescriptionsQuestionDialogComponent } from '../descriptions-question-dialog/descriptions-question-dialog.component';

@Component({
  selector: 'vex-resolve-question-opcion-multiple',
  templateUrl: './resolve-question-opcion-multiple.component.html',
  styleUrls: ['./resolve-question-opcion-multiple.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResolveQuestionOpcionMultipleComponent implements OnInit {

  @Input() question: QuestionConfig;
  @Input() codigoItem: any;
  @Input() readOnly: boolean = true;
  @Input() control: FormControl;
  @Input() controlOther: FormControl = null;
  @Output() changeValue: EventEmitter<any> = new EventEmitter();

  showOther = false;
  showWithDescriptions = false;

  subscriptions: Subscription = new Subscription();
  // ----------------------
  icComment = icComment;
  constructor(
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.showWithDescriptions = this.question.resolve?.options?.some(x => x.withDescription);

    this.subscriptions.add(this.control.valueChanges.subscribe((value) => {
      this.fnCalculateShowOther(); // calcular si se muestra o no la caja de texto para otro
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
  fnCalculateShowOther() {
    this.showOther = this.control.value === 'OTHER';
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
  fnOpenDescriptionsOfOptions() {
    const dialogRef = this.dialog.open(DescriptionsQuestionDialogComponent, {
      width: '600px',
      data: {
        options: this.question.resolve.options
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
