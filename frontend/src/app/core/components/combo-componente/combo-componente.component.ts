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
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';

import { environment } from './../../../../environments/environment';
import { EnumService } from './../../services/enum/enum.service';
import { Enum } from './../../models/enum/enum';
import { Componente } from '@core/models/componente/componente';


@Component({
  selector: 'vex-combo-componente',
  templateUrl: './combo-componente.component.html',
  styleUrls: ['./combo-componente.component.scss']
})
export class ComboComponenteComponent implements OnInit {

  @Input() name: string;

  @Input() label: string;
  @Input() cls: string;
  @Input() value: FormControl;

  @Input() options: Componente[] = [];

  constructor(
    private _enumService: EnumService,
    private cd: ChangeDetectorRef,
  ) {
  }
  ngOnInit(): void {
  }
  changeValue(value) {
    this.cd.markForCheck();
  }
}
