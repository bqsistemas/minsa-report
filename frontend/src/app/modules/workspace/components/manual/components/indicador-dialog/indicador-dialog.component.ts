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
// validators
import { Numeric } from '@core/validators/numeric';
import { distinctUntilChanged } from 'rxjs/operators';

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
  permissions: any = null
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
 
  anioData = []

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

    // set years
    const year = (new Date()).getFullYear()
    for(let i = year; i >= year - 3; i--){
      this.anioData.push({
        id: i.toString(),
        name: i
      })
    }
    
    if(this.action == 'new'){
      this.indicador = new Indicador({
        disa: this.user.diresa[0]
      })
      this.fetchDepartamento(this.indicador.disa)
    }
      
    this.fetchDisa()
    this.fetchMeses()
    this.fetchEtnia()
    this.fetchGrupoEtario()

    this.form.controls.disa.valueChanges.subscribe((disa) => {
      this.fetchRed(disa)
    })
    this.form.controls.red.valueChanges.subscribe((red) => {
      this.fetchMicroRed(this.form.getRawValue().disa ?? this.indicador.disa, red)
    })
    this.form.controls.mred.valueChanges.subscribe((microRed) => {
      this.fetchEstablecimiento(this.form.getRawValue().disa ?? this.indicador.disa, this.form.getRawValue().red  ?? this.indicador.red, microRed)
    })
    this.form.controls.renaes.valueChanges.subscribe((renaes) => {
      if(this.establecimientoData && this.establecimientoData?.length) {
        const { ubigeo } = this.establecimientoData.find(x => x.establecimiento === renaes)
        if(ubigeo) {
          this.form.get('dep').setValue(ubigeo.substring(0, 2))
          this.form.get('prov').setValue(ubigeo.substring(2, 4))
          this.form.get('dis').setValue(ubigeo.substring(4, 6))
        }
      }
    })
    this.form.controls.dep.valueChanges.subscribe((departamento) => {
      this.fetchProvincia(this.indicador.disa, departamento)
    })
    this.form.controls.prov.valueChanges.subscribe((provincia) => {
      this.fetchDistrito(this.indicador.disa, this.form.getRawValue().dep  ?? this.indicador.dep, provincia)
    })
    if(this.action !== 'edit'){
      this.permissions = this.getTransformPermissions(this.user?.permissions ?? {})
      this.setValueByPermissions()
    }
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
      vinPersonaEstimada: new FormControl(0, [Validators.required, Validators.maxLength(5), Numeric]),
      itsPersonaEstimadaTamizajeSifilis: new FormControl(0, [Validators.required, Validators.maxLength(5), Numeric]),
      itsPersonaEstimadaDiagnosticoIts: new FormControl(0, [Validators.required, Validators.maxLength(5), Numeric]),
      tmiGestanteAtendidaVih: new FormControl(0, [Validators.required, Validators.maxLength(5), Numeric]),
      tmiGestanteAtendidaSifilis: new FormControl(0, [Validators.required, Validators.maxLength(5), Numeric]),
      tmiGestanteAtendidaHepatitisB: new FormControl(0, [Validators.required, Validators.maxLength(5), Numeric]),
    });
  }
  getTransformPermissions(permissions: any) {
    let keys: string[] = []
    let entities = {
      diresa: [],
      red: [],
      microred: [],
      establecimiento: []
    }
    for(const k in permissions){
      if(permissions[k][environment.appName]) keys.push(k)
    }

    keys.forEach((k) => {
      k.split(',').forEach((e) => {
        const [ ent, val ] = e.split(':')
        switch(ent){
          case 'diresa':
            if(entities.diresa.indexOf(val) < 0) entities.diresa.push(val)
            break
          case 'red':
            if(entities.red.indexOf(val) < 0) entities.red.push(val)
            break
          case 'microred':
            if(entities.microred.indexOf(val) < 0) entities.microred.push(val)
            break
          case 'estab':
            if(entities.establecimiento.indexOf(val) < 0) entities.establecimiento.push(val)
            break
        }
      })
    })

    return entities
  }

  async setValueByPermissions() {
    if(this.permissions.diresa.length > 0)
      this.form.get('disa').setValue(parseInt(this.permissions.diresa[0]))

    if(this.permissions.red.length > 0){
      this.form.get('red').setValue(this.permissions.red[0])
      this.form.get('red').disable({onlySelf: true})
    }

    if(this.permissions.microred.length > 0){
      this.form.get('mred').setValue(this.permissions.microred[0])
      this.form.get('mred').disable({onlySelf: true})
    }

    if(this.permissions.diresa.length == 0 && this.permissions.establecimiento.length > 0){
      const establecimiento: any = await this._commonService.getEstablecimiento(this.permissions.establecimiento[0])
      if(establecimiento?.length > 0){
        this.form.get('disa').setValue(parseInt(establecimiento[0].disa))
        this.form.get('red').setValue(establecimiento[0].red)
        this.form.get('red').disable({onlySelf: true})
        this.form.get('mred').setValue(establecimiento[0].microRed)
        this.form.get('mred').disable({onlySelf: true})
        this.form.get('renaes').setValue(establecimiento[0].establecimiento)
        this.form.get('renaes').disable({onlySelf: true})
      }
    }
  }

  getDataToPatch(){
    this._indicadorService.get(this.indicador.idMaestroIngreso)
      .then((value: Indicador) => {
        this.indicador = new Indicador(value)
        this.fetchDepartamento(this.indicador.disa)
        // this.indicador.setMes()
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
      const entidad = Object.assign({}, this.form.getRawValue().value);
      entidad.disa = this.indicador.disa
      entidad.renaes = parseInt(entidad.renaes)
      entidad.etapa = parseInt(entidad.etapa)
      entidad.vinPersonaEstimada = parseInt(entidad.vinPersonaEstimada)
      entidad.itsPersonaEstimadaTamizajeSifilis = parseInt(entidad.itsPersonaEstimadaTamizajeSifilis)
      entidad.itsPersonaEstimadaDiagnosticoIts = parseInt(entidad.itsPersonaEstimadaDiagnosticoIts)
      entidad.tmiGestanteAtendidaVih = parseInt(entidad.tmiGestanteAtendidaVih)
      entidad.tmiGestanteAtendidaSifilis = parseInt(entidad.tmiGestanteAtendidaSifilis)
      entidad.tmiGestanteAtendidaHepatitisB = parseInt(entidad.tmiGestanteAtendidaHepatitisB)

      console.log(entidad)
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
      const entidad = Object.assign({}, this.form.getRawValue());
      entidad.disa = parseInt(this.user.diresa[0])
      entidad.renaes = parseInt(entidad.renaes)
      entidad.etapa = parseInt(entidad.etapa)
      entidad.vinPersonaEstimada = parseInt(entidad.vinPersonaEstimada)
      entidad.itsPersonaEstimadaTamizajeSifilis = parseInt(entidad.itsPersonaEstimadaTamizajeSifilis)
      entidad.itsPersonaEstimadaDiagnosticoIts = parseInt(entidad.itsPersonaEstimadaDiagnosticoIts)
      entidad.tmiGestanteAtendidaVih = parseInt(entidad.tmiGestanteAtendidaVih)
      entidad.tmiGestanteAtendidaSifilis = parseInt(entidad.tmiGestanteAtendidaSifilis)
      entidad.tmiGestanteAtendidaHepatitisB = parseInt(entidad.tmiGestanteAtendidaHepatitisB)
      delete entidad.idMaestroIngreso

      this._indicadorService.postAdd(entidad).then((value: any) => {
        this.action = 'edit';
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
  fetchDepartamento = (disa) => {
    this._commonService.getDepartamentos(disa)
      .then((response: any) => {
        this.departamentoData = response
      })
      .catch((err) => console.log(err))
  }
  fetchProvincia = (disa, departamento) => {
    this._commonService.getProvincias(disa, departamento)
      .then((response: any) => {
        this.provinciaData = response
      })
      .catch((err) => console.log(err))
  }
  fetchDistrito = (disa, departamento, provincia) => {
    this._commonService.getDistritos(disa, departamento, provincia)
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
  