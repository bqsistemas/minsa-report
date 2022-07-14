import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Indicador } from '@core/models/Indicador/indicador';

import icSubject from '@iconify/icons-ic/twotone-subject';
import icShortText from '@iconify/icons-ic/twotone-short-text';
import icClose from '@iconify/icons-ic/twotone-close';
import icDelete from '@iconify/icons-ic/twotone-delete';

import { environment } from './../../../../../../../environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// Models
import { Disa } from '@core/models/disa/disa';
import { Microred } from '@core/models/microred/microred';
import { Establecimiento } from '@core/models/establecimiento/establecimiento';
import { Red } from '@core/models/red/red';
import { GrupoEtario } from '@core/models/grupoEtario/grupo-etario';
import { Mes } from '@core/models/mes/mes';
import { Etnia } from '@core/models/etnia/etnia';
import { Ubigeo } from '@core/models/ubigeo/ubigeo';
// services
import { IndicadorService } from '@core/services/indicador/indicador.service';
import { CommonService } from '@core/services/common/common.service';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'vex-indicador-dialog',
  templateUrl: './indicador-dialog.component.html',
  styleUrls: ['./indicador-dialog.component.scss']
})
export class IndicadorDialogComponent implements OnInit {
  indicador: Indicador;
  form: FormGroup;
  environment = environment;
  action = 'new';

  statusButtonSave: FormControl = new FormControl(false);
  user:any = null
  // ----------------------
  icClose = icClose;
  icSubject = icSubject;
  icShortText = icShortText;
  icDelete = icDelete;

  disaData: Disa[] = []
  redData: Red[] = []
  microRedData: Microred[] = []
  establecimientoData: Establecimiento[] = []
  grupoEtarioData: GrupoEtario[] = []
  mesData: Mes[] = []
  etniaData: Etnia[] = []
  departamentoData: Ubigeo[] = []
  provinciaData: Ubigeo[] = []
  distritoData: Ubigeo[] = []
  sexoData = [{
    id: 'M',
    name: 'Masculino'
  },{
    id: 'F',
    name: 'Femenino'
  }]
 
  anioData = [{
    id: '2019',
    name: '2019'
  },{
    id: '2020',
    name: '2020'
  },{
    id: '2021',
    name: '2021'
  },{
    id: '2022',
    name: '2022'
  },{
    id: '2023',
    name: '2023'
  },{
    id: '2024',
    name: '2024'
  },{
    id: '2025',
    name: '2025'
  }]

  constructor(
    private _indicadorService: IndicadorService,
    private _commonService: CommonService,
    private _authService: AuthService,
    private dialogRef: MatDialogRef<IndicadorDialogComponent>,
    private _formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    this.indicador = _data.indicador;

    if (this.indicador) {
      this.action = 'edit';
      this.form = this.createForm();
      this.getDataToPatch()
    } else {
      this.form = this.createForm();
    }
  }

  ngOnInit(): void {
    this.user = this._authService.getUser()
    
    this.fetchDisa()
    this.fetchDepartamento()
    this.fetchMeses()
    this.fetchEtnia()
    this.fetchGrupoEtario()

    this.form.controls.disa.valueChanges.subscribe((disa) => {
      this.fetchRed(disa)
    })
    this.form.controls.red.valueChanges.subscribe((red) => {
      this.fetchMicroRed(this.form.value.disa ?? this.indicador.disa, red)
    })
    this.form.controls.mred.valueChanges.subscribe((microRed) => {
      this.fetchEstablecimiento(this.form.value.disa ?? this.indicador.disa, this.form.value.red  ?? this.indicador.red, microRed)
    })
    this.form.controls.dep.valueChanges.subscribe((departamento) => {
      this.fetchProvincia(departamento)
    })
    this.form.controls.prov.valueChanges.subscribe((provincia) => {
      this.fetchDistrito(this.form.value.dep  ?? this.indicador.dep, provincia)
    })
    if(this.action !== 'edit')
      this.form.get('disa').setValue(parseInt(this.user.diresa[0]))
  }
  createForm(): FormGroup {
    return new FormGroup({
      idMaestroIngreso: new FormControl(null, []),
      disa: new FormControl({value: null, disabled: true}, [Validators.required]),
      red: new FormControl(null, [Validators.required]),
      mred: new FormControl(null, [Validators.required]),
      renaes: new FormControl(null, [Validators.required]),
      anio: new FormControl(null, [Validators.required]),
      mes: new FormControl(null, [Validators.required]),
      dep: new FormControl(null, [Validators.required]),
      prov: new FormControl(null, [Validators.required]),
      dis: new FormControl(null, [Validators.required]),
      etapa: new FormControl(null, [Validators.required]),
      sexo: new FormControl(null, [Validators.required]),
      etnia: new FormControl(null, [Validators.required]),
      vinPersonaEstimada: new FormControl(null, [Validators.required, Validators.maxLength(1)]),
      itsPersonaEstimadaTamizajeSifilis: new FormControl(null, [Validators.required, Validators.maxLength(1)]),
      itsPersonaEstimadaDiagnosticoIts: new FormControl(null, [Validators.required, Validators.maxLength(1)]),
      tmiGestanteAtendidaVih: new FormControl(null, [Validators.required, Validators.maxLength(1)]),
      tmiGestanteAtendidaSifilis: new FormControl(null, [Validators.required, Validators.maxLength(1)]),
      tmiGestanteAtendidaHepatitisB: new FormControl(null, [Validators.required, Validators.maxLength(1)]),
    });
  }
  getDataToPatch(){
    this._indicadorService.get(this.indicador.idMaestroIngreso)
      .then((value: Indicador) => {
        this.indicador = new Indicador(value)
        // this.indicador.setMes()
        console.log(this.indicador)
        this.form.patchValue(value);
      })
  }
  fnAction() {
    if (this.action === 'new') {
      this.fnAdd(event);
    }
    if (this.action === 'edit') {
      this.fnEdit(event);
    }
  }
  fnEdit(event: Event) {
    if (this.form.valid) {
      const entidad = Object.assign({}, this.form.value);
      entidad.disa = this.indicador.disa
      entidad.renaes = parseInt(entidad.renaes)
      entidad.etapa = parseInt(entidad.etapa)
      this._indicadorService.putUpdate(entidad).then((value: any) => {
        this.snackbar.open('Se guardó con éxito.', 'Éxito!', {
          duration: 2500
        });
        this.dialogRef.close({
          action: 'edit',
          indicador: entidad
        });
        this.statusButtonSave.setValue(false); // volvemos a status ocioso el spinner del button save
      }).catch((error) => {
        console.log(error)
        this.snackbar.open('Error de edición', 'Aviso!', {
          panelClass: 'bg-deep-orange-500',
          duration: 3500
        });
        this.statusButtonSave.setValue(false); // volvemos a status ocioso el spinner del button save
      });
    } else {
      this.form.markAllAsTouched();
      this.statusButtonSave.setValue(false); // volvemos a status ocioso el spinner del button save
    }
  }
  fnAdd(event: Event) {
    if (this.form.valid) {
      const entidad = Object.assign({}, this.form.value);
      entidad.disa = parseInt(this.user.diresa[0])
      entidad.renaes = parseInt(entidad.renaes)
      entidad.etapa = parseInt(entidad.etapa)
      this._indicadorService.postAdd(entidad).then((value: any) => {
        this.action = 'edit';
        this.form.controls.id.setValue(value.idMaestroIngreso);
        this.indicador = value;
        this.snackbar.open('Se guardó con éxito.', 'Éxito!', {
          duration: 2500
        });
        this.dialogRef.close({
          action: 'new',
          indicador: this.indicador
        });
        this.statusButtonSave.setValue(false); // volvemos a status ocioso el spinner del button save
      }).catch((error) => {
        this.snackbar.open('Error de adición', 'Aviso!', {
          panelClass: 'bg-deep-orange-500',
          duration: 3500
        });
        this.statusButtonSave.setValue(false); // volvemos a status ocioso el spinner del button save
      });
    } else {
      this.form.markAllAsTouched();
      this.statusButtonSave.setValue(false); // volvemos a status ocioso el spinner del button save
    }
  }
  save() {
    this.dialogRef.close();
  }

  // fetch
  fetchDepartamento = () => {
    this._commonService.getDepartamentos()
      .then((response: any) => {
        this.departamentoData = response
      })
      .catch((err) => console.log(err))
  }
  fetchProvincia = (departamento) => {
    this._commonService.getProvincias(departamento)
      .then((response: any) => {
        this.provinciaData = response
      })
      .catch((err) => console.log(err))
  }
  fetchDistrito = (departamento, provincia) => {
    this._commonService.getDistritos(departamento, provincia)
      .then((response: any) => {
        this.distritoData = response
      })
      .catch((err) => console.log(err))
  }
  fetchDisa = () => {
    this._commonService.getDisas()
      .then((response: any) => {
        this.disaData = response 
      })
      .catch((err) => console.log(err))
  }
  fetchRed = (disa) => {
    this._commonService.getRedes(disa)
      .then((response: any) => {
        this.redData = response
      })
      .catch((err) => console.log(err))
  }
  fetchMicroRed = (disa, red) => {
    this._commonService.getMicroRedes(disa, red)
      .then((response: any) => {
        this.microRedData = response
      })
      .catch((err) => console.log(err))
  }
  fetchEstablecimiento = (disa, red, microRed) => {
    this._commonService.getEstablecimientos(disa, red, microRed)
      .then((response: any) => {
        this.establecimientoData = response
      })
      .catch((err) => console.log(err))
  }
  fetchMeses = () => {
    this._commonService.getMeses()
      .then((response: any) => {
        this.mesData = response
      })
      .catch((err) => console.log(err))
  }
  fetchEtnia = () => {
    this._commonService.getEtnias()
      .then((response: any) => {
        this.etniaData = response
      })
      .catch((err) => console.log(err))
  }
  fetchGrupoEtario = () => {
    this._commonService.getGrupoEtarios()
      .then((response: any) => {
        this.grupoEtarioData = response
      })
      .catch((err) => console.log(err))
  }
}
  