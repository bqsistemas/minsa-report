import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'vex-button-action-form',
  templateUrl: './button-action-form.component.html',
  styleUrls: ['./button-action-form.component.scss']
})
export class ButtonActionFormComponent implements OnInit {

  @Input() textButton: string;
  @Input() statusButton: FormControl;
  @Input() class: string[];
  @Input() icon: any;
  @Input() color: string;
  @Input() colorButton: string;
  @Output() actionFunction: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  fnActionFunction() {
    if (!this.statusButton.value) {
      this.statusButton.setValue(true);
      this.actionFunction.emit();
    }
  }
}
