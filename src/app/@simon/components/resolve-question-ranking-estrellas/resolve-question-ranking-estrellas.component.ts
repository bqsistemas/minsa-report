import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { mergeDeep } from 'src/@vex/utils/merge-deep';
import { Subscription } from 'rxjs';

import icStar from '@iconify/icons-fa-solid/star';
import icStarBorder from '@iconify/icons-ic/twotone-star-border';

import theme from '../../../../@vex/utils/tailwindcss';
// models
import { Option } from './../../interfaces/option';
import { QuestionConfig } from '../../interfaces/question-config';

@Component({
  selector: 'vex-resolve-question-ranking-estrellas',
  templateUrl: './resolve-question-ranking-estrellas.component.html',
  styleUrls: ['./resolve-question-ranking-estrellas.component.scss']
})
export class ResolveQuestionRankingEstrellasComponent implements OnInit {

  @Input() question: QuestionConfig;
  @Input() codigoItem: any;
  @Input() readOnly: boolean = true;
  @Input() control: FormControl;
  @Output() changeValue: EventEmitter<any> = new EventEmitter();

  subscriptions: Subscription = new Subscription();

  valorSeleccionado = 0;
  // ----------------------
  icStar = icStar;
  icStarBorder = icStarBorder;

  constructor() { }

  ngOnInit(): void {
    this.subscriptions.add(this.control.valueChanges.subscribe((value) => {
      this.changeValue.emit({
        value,
        control: this.control,
        codigoItem: this.codigoItem
      });
      if (this.control.value) {
        this.valorSeleccionado = this.question.resolve.options.find(x => x.code === this.control.value).score;
      }
    }));
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  onClick(rating: number) {
    this.valorSeleccionado = rating;
    this.control.setValue(this.question.resolve.options.find(x => x.score === this.valorSeleccionado).code);
    return false;
  }
  showIcon(index: number) {
    if (this.valorSeleccionado >= index + 1) {
      return icStar;
    } else {
      return icStarBorder;
    }
  }
}
