import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';

import { EnumService } from './../../services/enum/enum.service';
import { Enum } from './../../models/enum/enum';


@Component({
  selector: 'vex-combo-enum',
  templateUrl: './combo-enum.component.html',
  styleUrls: ['./combo-enum.component.scss']
})
export class ComboEnumComponent implements OnInit {

  @Input() name: string;

  @Input() label: string;
  @Input() cls: string;
  @Input() value: FormControl;
  @Input() parent: FormControl = null;
  @Input() typeCode: string;
  @Input() enumeradoPadre?: number = null;

  @Input() enumsFilter: any[] = [];
  @Input() ruleCode: string = '';
  @Input() functionRuleFilter: Function = null;
  @Input() functionFilter: Function = null;

  options: Enum[] = [];

  subscriptions: Subscription = new Subscription();
  // ---------------------------------------
  constructor(
    private _enumService: EnumService,
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    if (this.parent) {
      this.subscriptions.add(this.parent.valueChanges.subscribe((value) => {
        this.fetchEnumeradoItems(value);
      }));
      this.fetchEnumeradoItems(this.parent.value);
    } else {
      this.fetchEnumeradoItems();
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  fetchEnumeradoItems(parentValue: any = null) {
    this.options = this._enumService.getEnum({ tipo: this.typeCode } as Enum);
    if (this.functionRuleFilter) {
      this.options = this.functionRuleFilter(this.ruleCode, this.options, this.enumsFilter);
    }
    if (this.functionFilter) {
      this.options = this.functionFilter(this.options, this.enumsFilter);
    }
    this.cd.markForCheck();
  }
  changeValue(value) {
    this.cd.markForCheck();
  }
}
