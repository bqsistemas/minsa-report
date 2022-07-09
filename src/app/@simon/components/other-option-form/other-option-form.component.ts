import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vex-other-option-form',
  templateUrl: './other-option-form.component.html',
  styleUrls: ['./other-option-form.component.scss']
})
export class OtherOptionFormComponent implements OnInit {

  @Output() eventEmit: EventEmitter<string> = new EventEmitter();
  @Input() controlValue: FormControl;
  constructor() { }

  ngOnInit(): void {
  }
  fnChangeOption(value) {
    //this.eventEmit.emit(value.value);
  }
}
