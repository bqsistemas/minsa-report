import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import icClose from '@iconify/icons-ic/twotone-close';
// services
import { CommonService } from '@core/services/common/common.service';
//N models
import { Disa } from '@core/models/disa/disa';
import { Red } from '@core/models/red/red';
import { Microred } from '@core/models/microred/microred';
import { Ubigeo } from '@core/models/ubigeo/ubigeo';
import { Establecimiento } from '@core/models/establecimiento/establecimiento';


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

  //mockup data
  tipoPoblacionData = [{
    id: '1',
    name: 'ABC'
  }]
  grupoEtarioData = [{
    id: '1',
    name: 'ABC'
  }]
  sexoData = [{
    id: '1',
    name: 'Masculino'
  },{
    id: '2',
    name: 'Femenino'
  }]
  mesData = [{
    id: '1',
    name: 'Enero'
  },{
    id: '2',
    name: 'Febrero'
  }]
  periodoData = [{
    id: '1',
    name: 'Periodo A'
  },{
    id: '2',
    name: 'periodo B'
  }]

  constructor(
    private _formBuilder: FormBuilder,
    private _commonService: CommonService
  ) {
    this.form = this.createForm();
   }

  ngOnInit(): void {
    this.fetchDisa()
    this.fetchDepartamento()

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
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  createForm(): FormGroup {
    return new FormGroup({
      disa: new FormControl('', []),
      red: new FormControl('', []),
      microRed: new FormControl('', []),
      establecimiento: new FormControl('', []),
      departamento: new FormControl('', []),
      provincia: new FormControl('', []),
      distrito: new FormControl('', []),
      tipoPoblacion: new FormControl('', []),
      grupoEtario: new FormControl('', []),
      sexo: new FormControl('', []),
      mes: new FormControl('', []),
      periodo: new FormControl('', []),
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
}
