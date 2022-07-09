import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsChartsInstrumentosPlanMuestrasLocalComponent } from './widgets-charts-instrumentos-plan-muestras-local.component';

import { HighchartsChartModule } from 'highcharts-angular';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WidgetsChartsInstrumentosPlanMuestrasLocalComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    IconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    HighchartsChartModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    WidgetsChartsInstrumentosPlanMuestrasLocalComponent
  ]
})
export class WidgetsChartsInstrumentosPlanMuestrasLocalModule { }
