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

  user:any = null

  //mockup data
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
    
    this.fetchDisa()
    this.fetchDepartamento()
    this.fetchMeses()
    this.fetchEtnia()
    this.fetchGrupoEtario()

    this.form.controls.disa.valueChanges.subscribe((disa) => {
      this.fetchRed(disa)
    })
    this.form.controls.red.valueChanges.subscribe((red) => {
      this.fetchMicroRed(this.form.value.disa, red)
    })
    this.form.controls.microRed.valueChanges.subscribe((microRed) => {
      this.fetchEstablecimiento(this.form.value.disa, this.form.value.red, microRed)
    })
    this.form.controls.departamento.valueChanges.subscribe((departamento) => {
      this.fetchProvincia(departamento)
    })
    this.form.controls.provincia.valueChanges.subscribe((provincia) => {
      this.fetchDistrito(this.form.value.departamento, provincia)
    })
    this.form.get('disa').setValue(parseInt(this.user.diresa[0]))
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  createForm(): FormGroup {
    return new FormGroup({
      disa: new FormControl({value: null, disabled: true}, []),
      red: new FormControl('', []),
      microRed: new FormControl('', []),
      establecimiento: new FormControl('', []),
      departamento: new FormControl('', []),
      provincia: new FormControl('', []),
      distrito: new FormControl('', []),
      etnia: new FormControl('', []),
      grupoEtario: new FormControl(-1, []),
      sexo: new FormControl('', []),
      anio: new FormControl('', [Validators.required]),
      mes: new FormControl('', [Validators.required]),
    });
  }
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

  submitReport = () => {
    if (this.form.valid) {
      const values = Object.assign({}, this.form.value);
      values.disa = this.user.diresa[0]
      this._commonService.setLoadingReport(true)
      this.callReport.emit(values);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
