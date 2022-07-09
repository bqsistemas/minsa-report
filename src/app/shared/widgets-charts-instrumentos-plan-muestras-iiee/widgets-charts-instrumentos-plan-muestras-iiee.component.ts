import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icCloudDownload from '@iconify/icons-ic/twotone-cloud-download';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { scaleInOutAnimation } from 'src/@vex/animations/scale-in-out.animation';
import { mergeDeep } from 'src/@vex/utils/merge-deep';
import { Subscription } from 'rxjs';

// services
import { MuestraService } from '@core/services/muestra/muestra.service';
import { PlanMonitoreoService } from '@core/services/plan-monitoreo/plan-monitoreo.service';
import { InstrumentoService } from '@core/services/instrumento/instrumento.service';
// models
import { DasboardAsignacionMuestra } from '@core/models/dashboard-asignacion-muestra/dasboard-asignacion-muestra';
import { PlanMonitoreo } from '@core/models/plan-monitoreo/plan-monitoreo';
import { Igel } from '@core/models/igel/igel';
import { Instrumento } from '@core/models/instrumento/instrumento';
import { Rol } from '@core/models/rol/rol';

import * as Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';
More(Highcharts);
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);

@Component({
  selector: 'vex-widgets-charts-instrumentos-plan-muestras-iiee',
  templateUrl: './widgets-charts-instrumentos-plan-muestras-iiee.component.html',
  styleUrls: ['./widgets-charts-instrumentos-plan-muestras-iiee.component.scss'],
  animations: [scaleInOutAnimation]
})
export class WidgetsChartsInstrumentosPlanMuestrasIieeComponent implements OnInit, AfterViewInit {


  instrumentos: Instrumento[] = [];

  dataRegiones: any[] = [];
  dataDrillDownByRegiones: Highcharts.SeriesOptionsType[] = [];
  // -------------------------------------------
  isLoading = false;
  withError = false;

  cantidadTotal = 0;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = null;

  subscriptions: Subscription = new Subscription();
  // -----------------------------------------
  idInstrumento: FormControl = new FormControl('-1');
  @Input() idPlanMonitoreo: FormControl;
  @Input() igels: Igel[] = [];
  @Input() rolSede: Rol;
  @Output() fnCallback: EventEmitter<any> = new EventEmitter();

  data: DasboardAsignacionMuestra[];
  columns: TableColumn<DasboardAsignacionMuestra>[] = [
    {
      label: 'DRE',
      property: 'dreDescripcion',
      type: 'text',
      cssClasses: ['font-medium'], visible: true
    },
    {
      label: 'NIVEL',
      property: 'nivelDescripcion',
      type: 'text',
      cssClasses: ['font-medium'], visible: true
    },
    {
      label: 'Cantidad',
      property: 'cantidad',
      type: 'text',
      cssClasses: ['font-medium'], visible: true
    },
  ];
  pageSize = 5;

  dataSource = new MatTableDataSource<DasboardAsignacionMuestra>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  icMoreHoriz = icMoreHoriz;
  icCloudDownload = icCloudDownload;

  constructor(
    private _instrumentoService: InstrumentoService,
    private _muestraService: MuestraService,
    private _planMonitoreoService: PlanMonitoreoService
  ) { }

  ngOnInit() {
    this.fnSearch();
    this.fnFetchInstrumentos();
    this.subscriptions.add(this.idInstrumento.valueChanges.subscribe((value) => {
      this.fnSearch(value === '-1' ? null : value);
    }));
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  fnResetSearch() {
    this.data = [];
    this.dataSource.data = this.data;
    this.fnSearch();
  }
  fnSearch(instrumento: string = null) {
    if (this.isLoading) {
      return false;
    }

    this.withError = false;
    this.isLoading = true; // encendemos el skeleton load

    this._muestraService.postResumenAsignacionMuestraIIEE(this.idPlanMonitoreo.value, instrumento,
      this.rolSede.codigoSede).then((value: any) => {
        if (!value.success) {
          this.withError = true;
          this.data = [];
          this.dataSource.data = [];
          this.isLoading = false; // apagamos el skeleton load
        } else {
          this.data = value.data;
          this.dataSource.data = this.fnTransformData(value.data);
          if (this.data.length > 0) {
            this.fnGetData(this.dataSource.data); // formateamos la data para regiones (totales)

            this.fnSetOptionesChart(); // asignamos las opciones para el gráfico
          }

          this.isLoading = false; // apagamos el skeleton load
        }
      }).catch((value) => {
        this.isLoading = false; // apagamos el skeleton load
        this.withError = true;
      });
  }
  fnFetchInstrumentos() {
    this.withError = false;
    this.isLoading = true; // encendemos el skeleton load
    this._instrumentoService.postPaginateFromEjecucion(
      { page: 1, pageSize: 1000 } as any, '', '', this.idPlanMonitoreo.value).then((value: any) => {
        this.instrumentos = value.data;
      }).catch((value) => {
        console.log('error al consultar instrumentos');
      });
  }
  fnSetOptionesChart() {
    this.chartOptions = {
      colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
          radialGradient: {
            cx: 0.5,
            cy: 0.3,
            r: 0.7
          },
          stops: [
            [0, color],
            [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
          ]
        };
      }),
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Cantidad de muestras por nivel educativo'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y} muestras</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [
        {
          name: 'Regiones',
          colorByPoint: true,
          data: this.dataRegiones
        } as Highcharts.SeriesOptionsType
      ]
    };
  }
  fnTransformData(data: DasboardAsignacionMuestra[]) {
    this.cantidadTotal = data.reduce(function (prev, cur) {
      return prev + cur.cantidad;
    }, 0);

    this.fnCallback.emit({
      totalMuestras: this.cantidadTotal
    });

    return data.map(x => mergeDeep({
      ...x
    } as DasboardAsignacionMuestra, {
    } as DasboardAsignacionMuestra));
  }
  fnGetData(data: DasboardAsignacionMuestra[]) {
    data.forEach((item) => {
      if (!this.dataRegiones.some(x => x.id === item.idNivel)) {
        this.dataRegiones.push({
          id: item.idNivel,
          name: item.nivelDescripcion,
          y: 0
        });
      }
    });
    this.dataRegiones.forEach((region) => {
      region.y = data.filter(x => x.idNivel === region.id).reduce((prev, cur) => {
        return prev + cur.cantidad;
      }, 0);
    });
    this.dataRegiones = this.dataRegiones.sort((a, b) => (a.y > b.y ? -1 : 1));
  }
}
