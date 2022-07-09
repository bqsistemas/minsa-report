import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { mergeDeep } from 'src/@vex/utils/merge-deep';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { stagger60ms } from '../../../../@vex/animations/stagger.animation';
import theme from '../../../../@vex/utils/tailwindcss';

import icPlus from '@iconify/icons-ic/twotone-plus';
import icStar from '@iconify/icons-ic/twotone-star';
import icStarBorder from '@iconify/icons-ic/twotone-star-border';
import icMinus from '@iconify/icons-ic/twotone-minus';
import icPlusCircle from '@iconify/icons-fa-solid/plus-circle';
import icMinusCircle from '@iconify/icons-fa-solid/minus-circle';
import icLabel from '@iconify/icons-ic/twotone-label';

import { AppDateAdapter, APP_DATE_FORMATS } from '@core/adapters/format-date';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// models
import { Option } from './../../interfaces/option';
import { QuestionConfig } from '../../interfaces/question-config';
import { Subscription } from 'rxjs';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
@Component({
  selector: 'vex-question-fecha-hora',
  templateUrl: './question-fecha-hora.component.html',
  styleUrls: ['./question-fecha-hora.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ]
})
export class QuestionFechaHoraComponent implements OnInit {

  @Input() questionEdit: QuestionConfig;
  @Input() question: QuestionConfig;
  @Output() saveQuestion: EventEmitter<any> = new EventEmitter();
  @Output() previewQuestion: EventEmitter<any> = new EventEmitter();
  @Output() cancelCreateItem: EventEmitter<any> = new EventEmitter();

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  minLength: number = 1;
  flagShowMinus: boolean = true;
  form: FormGroup;
  label: FormControl = new FormControl('', [Validators.required]);
  etiquetas: string[] = [];

  subscriptions: Subscription = new Subscription();
  // ----------------------
  primaryTheme: NgxMaterialTimepickerTheme = {
    dial: {
      dialBackgroundColor: '#9e9e9e',
    },
    clockFace: {
      clockHandColor: '#9e9e9e'
    }
  };

  defaultItm: Option = {
    title: '',
    withDescription: false,
    description: '',
    value: '',
    score: 0,
    order: 0,
    isOther: false,
    isCorrect: false,
    scoreMin: '0',
    scoreMax: '0',
    format: 'DATE'
  };

  alternativas: Option[] = [
    mergeDeep({ ...this.defaultItm }, {
      order: 1,
    }),
    mergeDeep({ ...this.defaultItm }, {
      order: 2,
    }),
    mergeDeep({ ...this.defaultItm }, {
      order: 3,
    })
  ];
  @Input() withScore: FormControl;

  icPlus = icPlus;
  icMinus = icMinus;
  icPlusCircle = icPlusCircle;
  icMinusCircle = icMinusCircle;
  icLabel = icLabel;
  theme = theme;
  constructor(
    private _formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    if (this.questionEdit) {
      this.question = this.questionEdit;
      this.etiquetas = this.questionEdit.labels ? this.questionEdit.labels : [];
    } else {
      this.question.resolve.options = this.alternativas;
    }

    this.form = this.createForm();

    this.form.patchValue(this.question);

    // condición cuándo no tendrá clasificación el ítem
    this.fnLoadDefaultOptions();
    this.subscriptions.add(this.form.get('resolve').get('withScore').valueChanges.subscribe((value) => {
      if (value && this.form.get('resolve').get('options').value.length === 0) {
        this.fnBuildItemsForScore(2);
      } else if (value && this.form.get('resolve').get('options').value.length > 0) {

      } else {
        let options = this.form.get('resolve').get('options') as FormArray;
        options.clear();
      }
    }));
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  createForm(): FormGroup {
    return new FormGroup({
      type: new FormControl(this.question.type),
      name: new FormControl(this.question.name),
      labels: new FormControl(this.etiquetas),
      configuration: this._formBuilder.group({
        multipleAswers: new FormControl(this.question.configuration.multipleAswers),
        multipleOptions: new FormControl(this.question.configuration.multipleOptions, [Validators.required]),
        instructions: new FormControl(this.question.configuration.instructions, [Validators.maxLength(1000), Validators.required]),
        typeOption: new FormControl(this.question.configuration.typeOption, [Validators.required]),
        skipQuestion: new FormControl(this.question.configuration.skipQuestion, [Validators.required]),
        otherOption: new FormControl(this.question.configuration.otherOption, [Validators.required]),
        score: new FormControl(this.question.configuration.score, [Validators.required]),
        textArea: new FormControl(this.question.configuration.textArea, [Validators.required]),
        intervalScore: new FormControl(this.question.configuration.intervalScore, [Validators.required])
      }),
      resolve: this._formBuilder.group({
        order: new FormControl(this.question.resolve.order),
        title: new FormControl(this.question.resolve.title),
        withInstructions: new FormControl(this.question.resolve.withInstructions),
        instructions: new FormControl(this.question.resolve.instructions),
        withMultipleAnswers: new FormControl(this.question.resolve.withMultipleAnswers),
        withMultipleOptions: new FormControl(this.question.resolve.withMultipleOptions),
        typeOption: new FormControl(this.question.resolve.typeOption),
        withSkipQuestion: new FormControl(this.question.resolve.withOtherOption),
        withOtherOption: new FormControl(this.question.resolve.withOtherOption),
        isTextArea: new FormControl(this.question.resolve.isTextArea),
        withOnlyDate: new FormControl(this.question.resolve.withOnlyDate),
        formatOtherOption: new FormControl(this.question.resolve.formatOtherOption),
        intervalScore: new FormControl(this.question.resolve.intervalScore),
        withScore: new FormControl(this.question.resolve.withScore),
        options: new FormArray([])
      }),
      //meetingLink: new FormControl('', [Validators.required])
    });
  }
  fnSave() {
    if (this.form.valid) {
      this.form.controls.labels.setValue(this.etiquetas);
      this.saveQuestion.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }

  }
  fnAddLabel() {
    if (this.label.valid) {
      this.etiquetas.push(this.label.value);
      this.label.reset();
    }
  }
  fnCancel() {
    this.cancelCreateItem.emit({});
  }
  fnPreview() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
    }
    this.previewQuestion.emit(this.form.value);
  }
  fnLoadDefaultOptions() {
    // asignar alternativas por defecto
    const options = this.form.get('resolve').get('options') as FormArray;
    this.question.resolve.options.forEach((item) => {
      options.push(this.fnCreateOptionFormGroup(item));
    });
  }
  fnBuildItemsForScore(value: number) {
    this.alternativas = [];
    for (let i = 1; i <= value; i++) {
      this.alternativas.push(mergeDeep(
        { ...this.defaultItm }, {
        score: i,
        order: i,
        isCorrect: true,
        format: 'NUMBER'
      })
      );
    }
    // asignar alternativas por defecto
    let options = this.form.get('resolve').get('options') as FormArray;
    options.clear();
    this.alternativas.forEach((item) => {
      options.insert(item.order - 1, this.fnCreateOptionFormGroup(item));
    });
  }
  fnCreateOptionFormGroup(option: Option): FormGroup {
    return new FormGroup({
      title: new FormControl(option.title, []),
      withDescription: new FormControl(option.withDescription, []),
      description: new FormControl(option.description, [Validators.minLength(1000)]),
      value: new FormControl(option.value),
      score: new FormControl(option.score, [Validators.required]),
      scoreMin: new FormControl(option.scoreMin ? new Date(option.scoreMin) : new Date(), [Validators.required]),
      scoreMax: new FormControl(option.scoreMax ? new Date(option.scoreMax) : new Date(), [Validators.required]),
      order: new FormControl(option.order),
      isOther: new FormControl(option.isOther),
      isCorrect: new FormControl(option.isCorrect),
      format: new FormControl(option.format)
    });
  }
  fnAddItem(index: number) {
    const options = this.form.get('resolve').get('options') as FormArray;

    const newItem = this.fnCreateOptionFormGroup(mergeDeep({ ...this.defaultItm }, {}));
    options.insert(index + 1, newItem);

    this.fnConfigFlagMinus();
  }
  fnRemoveItem(index: number) {
    const options = this.form.get('resolve').get('options') as FormArray;

    options.removeAt(index);

    this.fnConfigFlagMinus();
  }
  fnConfigFlagMinus() {
    const options = this.form.get('resolve').get('options') as FormArray;

    this.flagShowMinus = (options.length <= this.minLength) ? false : true;
  }
  fnEditScore(option: FormControl, more: boolean) {
    const factor = more ? 1 : -1;
    if (option.get('score').value > 0 || (option.get('score').value === 0 && more)) {
      const value = (option.get('score').value as number) += factor;
      option.get('score').setValue(value);
    }
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.etiquetas.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(etiqueta: string): void {
    const index = this.etiquetas.indexOf(etiqueta);

    if (index >= 0) {
      this.etiquetas.splice(index, 1);
    }
  }
}