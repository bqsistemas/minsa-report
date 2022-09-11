import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import icClose from '@iconify/icons-ic/twotone-close';
// services
import { CommonService } from '@core/services/common/common.service';
import { AuthService } from '@core/services/auth/auth.service';
//N models
import { Disa } from '@core/models/disa/disa';
import { Red } from '@core/models/red/red';
import { Microred } from '@core/models/microred/microred';
import { Ubigeo } from '@core/models/ubigeo/ubigeo';
import { Establecimiento } from '@core/models/establecimiento/establecimiento';
import { GrupoEtario } from '@core/models/grupoEtario/grupo-etario';
import { Mes } from '@core/models/mes/mes';
import { Etnia } from '@core/models/etnia/etnia';
import { TipoPoblacion } from '@core/models/tipoPoblacion/tipo-poblacion';


@Component({
  selector: 'vex-form-report',
  templateUrl: './form-report.component.html',
  styleUrls: ['./form-report.component.scss']
})
export class FormReportComponent implements OnInit {

  form: FormGroup;
  subscriptions: Subscription = new Subscription();

  icClose = icClose

  disaData: Disa[] = []
  redData: Red[] = []
  microRedData: Microred[] = []
  departamentoData: Ubigeo[] = []
  provinciaData: Ubigeo[] = []
  distritoData: Ubigeo[] = []
  establecimientoData: Establecimiento[] = []
  grupoEtarioData: GrupoEtario[] = []
  mesData: Mes[] = []
  etniaData: Etnia[] = []
  tipoPoblacionData: TipoPoblacion[] = []

  user:any = null

  //mockup data
  sexoData = [{
    id: 'M',
    name: 'Masculino'
  },{
    id: 'F',
    name: 'Femenino'
  }]
 
  anioData = []

  @Output() callReport = new EventEmitter<any[]>();

  constructor(
    private _formBuilder: FormBuilder,
    private _commonService: CommonService,
    private _authService: AuthService
  ) {
    this.form = this.createForm();
   }

  ngOnInit(): void {
    this.user = this._authService.getUser()
    this.setContentArray()

    // set years
    const year = (new Date()).getFullYear()
    for(let i = year; i >= year - 3; i--){
      this.anioData.push({
        id: i.toString(),
        name: i
      })
    }

    this.form.controls.disa.valueChanges.subscribe((disa) => {
      if(disa) this.fetchRed(disa)
    })
    this.form.controls.red.valueChanges.subscribe((red) => {
      if(red) this.fetchMicroRed(this.form.getRawValue().disa, red)
    })
    this.form.controls.microRed.valueChanges.subscribe((microRed) => {
      if(microRed) this.fetchEstablecimiento(this.form.getRawValue().disa, this.form.getRawValue().red, microRed)
    })
    this.form.controls.departamento.valueChanges.subscribe((departamento) => {
      if(departamento) this.fetchProvincia(this.form.getRawValue().disa, departamento)
    })
    this.form.controls.provincia.valueChanges.subscribe((provincia) => {
      if(provincia) this.fetchDistrito(this.form.getRawValue().disa, this.form.getRawValue().departamento, provincia)
    })

    this.form.get('disa').setValue(parseInt(this.user.diresa[0]))

    this.fetchDisa()
    this.fetchDepartamento(this.form.getRawValue().disa)
    this.fetchMeses()
    this.fetchEtnia()
    this.fetchTipoPoblacion()
    this.fetchGrupoEtario()
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  createForm(): FormGroup {
    return new FormGroup({
      disa: new FormControl({value: null, disabled: true}, []),
      red: new FormControl('', []),
      microRed: new FormControl('', []),
      establecimiento: new FormControl(-1, []),
      departamento: new FormControl('', []),
      provincia: new FormControl('', []),
      distrito: new FormControl('', []),
      etnia: new FormControl('', []),
      tipoPoblacion: new FormControl('', []),
      grupoEtario: new FormControl(-1, []),
      sexo: new FormControl('', []),
      anio: new FormControl('', [Validators.required]),
      mes: new FormControl('', [Validators.required]),
    });
  }
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
        this.redData = [...this.redData, ...response]
      })
      .catch((err) => console.log(err))
  }
  fetchMicroRed = (disa, red) => {
    this._commonService.getMicroRedes(disa, red)
      .then((response: any) => {
        this.microRedData = [...this.microRedData, ...response]
      })
      .catch((err) => console.log(err))
  }
  fetchEstablecimiento = (disa, red, microRed) => {
    this._commonService.getEstablecimientos(disa, red, microRed)
      .then((response: any) => {
        this.establecimientoData = [...this.establecimientoData, ...response]
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
  fetchTipoPoblacion = () => {
    this._commonService.getTipoPoblacion()
      .then((response: any) => {
        this.tipoPoblacionData = response
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

  submitReport = () => {
    if (this.form.valid) {
      const values = Object.assign({}, this.form.getRawValue());
      values.disa = this.user.diresa[0]
      values.establecimiento = values.establecimiento === -1 ? '' : values.establecimiento
      this._commonService.setLoadingReport(true)
      this.callReport.emit(values);
    } else {
      this.form.markAllAsTouched();
    }
  }

  clear = () => {
    this.setContentArray()
    this.form.reset()
    this.form.patchValue({
      red:'',
      microRed:'',
      establecimiento:'',
      departamento:'',
      provincia:'',
      distrito:'',
      etnia:'',
      tipoPoblacion:-1,
      grupoEtario:-1,
      sexo:'',
    })
    this.form.get('disa').setValue(parseInt(this.user.diresa[0]))
  }

  setContentArray() {
    this.redData = [{  red: '', redDsc: 'TODOS' }]
    this.microRedData = [{ microRed: '', microRedDsc: 'TODOS' }]
    this.establecimientoData = [{ establecimiento: -1, establecimientoDsc: 'TODOS', ubigeo: '' }]
  }
}