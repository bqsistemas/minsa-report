import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import icClose from '@iconify/icons-ic/twotone-close';


@Component({
  selector: 'vex-form-report',
  templateUrl: './form-report.component.html',
  styleUrls: ['./form-report.component.scss']
})
export class FormReportComponent implements OnInit {

  form: FormGroup;
  subscriptions: Subscription = new Subscription();

  icClose = icClose

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
  departamentoData = [{
    id: '1',
    name: 'Lima'
  },{
    id: '2',
    name: 'Lambayeque'
  }]
  provinciaData = [{
    id: '1',
    name: 'Lima'
  },{
    id: '2',
    name: 'Callao'
  }]
  distritoData = [{
    id: '1',
    name: 'Jesús María'
  },{
    id: '2',
    name: 'Lince'
  }]

  constructor(
    private _formBuilder: FormBuilder,
  ) {
    this.form = this.createForm();
   }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  createForm(): FormGroup {
    return new FormGroup({
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

}
