import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import icSearch from '@iconify/icons-ic/twotone-search';

// services
import { AuxiliarService } from './../../services/auxiliar/auxiliar.service';
import { AuthService } from './../../services/auth/auth.service';
import { Rol } from '../../models/rol/rol';

import { RequireMatch as RequireMatch } from './../../validators/require-match';

@Component({
  selector: 'vex-autocomplete-dre',
  templateUrl: './autocomplete-dre.component.html',
  styleUrls: ['./autocomplete-dre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteDreComponent implements OnInit {

  @Input() name: string;
  @Input() label: string;
  @Input() cls: string;
  @Input() value: FormControl;
  @Input() takeUserSede: boolean;

  options: any[] = [];
  filteredOptions: Observable<any[]>;
  userRol: Rol;

  subscriptions: Subscription = new Subscription();
  // ----------------------------------------
  icSearch = icSearch;
  constructor(
    private _auxiliarService: AuxiliarService,
    private _authService: AuthService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    // validar si tiene el validator required
    if (this.value.validator) {
      const validator = this.value.validator({} as AbstractControl);

      if (validator && validator.required) {
        this.value.setValidators([Validators.required, RequireMatch]);
      }
    }
    if (this.takeUserSede) {
      // trae y setea la sede por defecto del usuario
      this.subscriptions.add(this._authService.rolSede$.subscribe((value) => {
        this.userRol = value;
        if (!this.value.value) {
          this.value.setValue({
            codigoSede: value.codigoSede,
            anexo: value.anexo,
            nombreSede: value.nombreSede,
            tipoSede: value.tipoSedeIndice
          });
        }
        this.cd.markForCheck();
      }));
    } else {
      this._auxiliarService.getListarDre().then((value: any) => {
        if (value.success) {
          this.options = value.data;
        }
      });
      this.filteredOptions = this.value.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  getDisplayFn() {
    return (val) => this.display(val);
  }

  private display(value): string {
    return value ? (value.nombre ? value.nombre : value.nombreSede) : value;
  }

  selected(value) {
    this.value.setValue({
      codigoSede: value.option.value.id,
      anexo: '0',
      nombreSede: value.option.value.nombre,
      tipoSede: Number(value.option.value.tipo)
    });
    this.cd.markForCheck();
  }
  private _filter(value: any): any[] {
    let filterValue = '';
    if (value.nombreSede || value.nombre) {
      filterValue = value.nombreSede ? value.nombreSede.toLowerCase() : value.nombre.toLowerCase();
    } else {
      filterValue = value.toLowerCase();
    }
    return this.options.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }
}
