import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { mergeDeep } from 'src/@vex/utils/merge-deep';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import icAttachFile from '@iconify/icons-ic/twotone-attach-file';
import icAdd from '@iconify/icons-ic/twotone-add';
import icPlus from '@iconify/icons-ic/twotone-plus';
import icStar from '@iconify/icons-ic/twotone-star';
import icStarBorder from '@iconify/icons-ic/twotone-star-border';
import icMinus from '@iconify/icons-ic/twotone-minus';
import icPlusCircle from '@iconify/icons-fa-solid/plus-circle';
import icMinusCircle from '@iconify/icons-fa-solid/minus-circle';
import icLabel from '@iconify/icons-ic/twotone-label';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { stagger60ms } from '../../../../@vex/animations/stagger.animation';
import theme from '../../../../@vex/utils/tailwindcss';

// models
import { Option } from './../../interfaces/option';
import { QuestionConfig } from '../../interfaces/question-config';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'vex-question-carga-archivos',
  templateUrl: './question-carga-archivos.component.html',
  styleUrls: ['./question-carga-archivos.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class QuestionCargaArchivosComponent implements OnInit {

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
  // ----------------------
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
    format: 'TEXT'
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
  icAttachFile = icAttachFile;
  icAdd = icAdd;
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
  fnAddLabel() {
    if (this.label.valid) {
      this.etiquetas.push(this.label.value);
      this.label.reset();
    }
  }
  fnSave() {
    if (this.form.valid) {
      this.form.controls.labels.setValue(this.etiquetas);
      this.saveQuestion.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
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
  fnCreateOptionFormGroup(option: Option): FormGroup {
    return new FormGroup({
      title: new FormControl(option.title, [Validators.required, Validators.pattern('^[0-9]*$')]),
      withDescription: new FormControl(option.withDescription, []),
      description: new FormControl(option.description, [Validators.minLength(1000)]),
      value: new FormControl(option.value),
      score: new FormControl(option.score, [Validators.required, Validators.pattern('^[0-9]*$')]),
      scoreMin: new FormControl(option.score, [Validators.required, Validators.pattern('^[0-9]*$')]),
      scoreMax: new FormControl(option.score, [Validators.required, Validators.pattern('^[0-9]*$')]),
      order: new FormControl(option.order),
      isOther: new FormControl(option.isOther),
      isCorrect: new FormControl(option.isCorrect),
      format: new FormControl(option.format)
    });
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
