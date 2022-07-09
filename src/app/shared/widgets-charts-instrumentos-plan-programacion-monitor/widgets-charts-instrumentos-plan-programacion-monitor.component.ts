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
import { EnumService } from '@core/services/enum/enum.service';
// models
import { PlanMonitoreo } from '@core/models/plan-monitoreo/plan-monitoreo';
import { Igel } from '@core/models/igel/igel';
import { Instrumento } from '@core/models/instrumento/instrumento';
import { Muestra } from '@core/models/muestra/muestra';
import { DashboardProgramacionMonitor } from '@core/models/dashboard-programacion-monitor/dashboard-programacion-monitor';
import { User } from '@core/models/user/user';
import { VisitaInstrumento } from '@core/models/visita-instrumento/visita-instrumento';
import { Enum } from '@core/models/enum/enum';
import { environment } from 'src/environments/environment';


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
  selector: 'vex-widgets-charts-instrumentos-plan-programacion-monitor',
  templateUrl: './widgets-charts-instrumentos-plan-programacion-monitor.component.html',
  styleUrls: ['./widgets-charts-instrumentos-plan-programacion-monitor.component.scss'],
  animations: [scaleInOutAnimation]
})
export class WidgetsChartsInstrumentosPlanProgramacionMonitorComponent implements OnInit, AfterViewInit {


  instrumentos: Instrumento[] = [];
  instrumento: Instrumento;
  visitas: VisitaInstrumento[] = [];
  data: Muestra[] = [];

  idInstrumento: FormControl = new FormControl(null);
  numerVisita: FormControl = new FormControl(null);

  dataPorEstado: any[] = [];
  dataPorNivel: any[] = [];

  lastKeyForPaginate: string = '';
  pageSize = 100000;
  // -------------------------------------------
  isLoading = false;
  withError = false;

  cantidadTotal = 0;

  HighchartsPorEstado: typeof Highcharts = Highcharts;
  chartOptionsPorEstado: Highcharts.Options = null;
  HighchartsPorNivel: typeof Highcharts = Highcharts;
  chartOptionsPorNivel: Highcharts.Options = null;

  subscriptions: Subscription = new Subscription();
  // -----------------------------------------
  @Input() idPlanMonitoreo: FormControl;
  @Input() igels: Igel[] = [];
  @Input() user: User;
  @Output() fnCallback: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  icMoreHoriz = icMoreHoriz;
  icCloudDownload = icCloudDownload;

  constructor(
    private _instrumentoService: InstrumentoService,
    private _enumService: EnumService,
    private _muestraService: MuestraService,
    private _planMonitoreoService: PlanMonitoreoService
  ) { }

  ngOnInit() {
    this.fnFetchInstrumentos();
    this.subscriptions.add(this.idInstrumento.valueChanges.subscribe((value) => {
      this.fnSearch(value === '-1' ? null : value);
    }));
    this.subscriptions.add(this.numerVisita.valueChanges.subscribe((value) => {
      if (!this.isLoading) {
        this.fnGetDataPorEstado(this.data); // formateamos la data para regiones (totales) POR ESTADO
        this.fnSetOptionesChartPorEstado(); // asignamos las opciones para el gráfico POR ESTADO
      }
    }));
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  ngAfterViewInit() {
  }
  fnResetSearch() {
    this.data = [];
    this.fnSearch();
  }
  fnSearch(instrumento: string = null) {
    if (this.isLoading) {
      return false;
    }

    // -------  Definición de filtro --------
    const filtro = {
      numeroDocumentoMonitor: this.user.numeroDocumento,
      tipoDocumentoMonitor: this.user.idTipoDocumento
    };
    // --------------------------------------
    this.withError = false;
    this.isLoading = true; // encendemos el skeleton load

    this._muestraService.postPaginate({ page: 1, pageSize: this.pageSize } as any, this.lastKeyForPaginate, this.idInstrumento.value,
      filtro).then((value: any) => {
        if (!value.status.success) {
          this.withError = true;
          this.data = [];
          this.isLoading = false; // apagamos el skeleton load
        } else {
          this.data = this.fnTransformData(value.data);
          // POR NIVEL
          if (this.data.length > 0) {
            this.fnGetDataPorNivel(this.data); // formateamos la data para regiones (totales) POR NIVEL
            this.fnSetOptionesChartPorNivel(); // asignamos las opciones para el gráfico POR NIVEL
            this.fnGetDataPorEstado(this.data); // formateamos la data para regiones (totales) POR ESTADO
            this.fnSetOptionesChartPorEstado(); // asignamos las opciones para el gráfico POR ESTADO
          }
          this.isLoading = false; // apagamos el skeleton load
        }
      }).catch((value) => {
        this.isLoading = false; // apagamos el skeleton load
        this.withError = true;
      });
  }
  fnFetchInstrumentos() {
    this._instrumentoService.postPaginateFromEjecucion(
      { page: 1, pageSize: 1000 } as any, '', '', this.idPlanMonitoreo.value).then((value: any) => {
        this.instrumentos = value.data;
        if (this.instrumentos.length > 0) {
          this.instrumento = this.instrumentos[0];
          this.visitas = this.instrumento.visitas;

          // setValues
          this.idInstrumento.setValue(this.instrumento.id);
          this.numerVisita.setValue(this.instrumento.visitas[0].numeroVisita);
        }
        this.fnSearch();
      }).catch((value) => {
        console.log('error al consultar instrumentos');
      });
  }
  fnSetOptionesChartPorEstado() {
    this.chartOptionsPorEstado = {
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
        text: 'Cantidad de muestras por estado de la visita'
      },
      subtitle: {
        text: 'Según visita seleccionada'
      },
      tooltip: {
        pointFormat: '<b>{point.y} muestras</b>'
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
            format: '<b>{point.percentage:.1f} %'
          },
          showInLegend: true
        }
      },
      series: [
        {
          name: 'Estados',
          colorByPoint: true,
          data: this.dataPorEstado
        } as Highcharts.SeriesOptionsType
      ]
    };
  }
  fnSetOptionesChartPorNivel() {
    this.chartOptionsPorNivel = {
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
        pointFormat: '<b>{point.y} muestras</b>'
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
            format: '<b>{point.percentage:.1f} %'
          },
          showInLegend: true
        }
      },
      series: [
        {
          name: 'Niveles',
          colorByPoint: true,
          data: this.dataPorNivel
        } as Highcharts.SeriesOptionsType
      ]
    };
  }
  fnTransformData(data: Muestra[]) {
    this.cantidadTotal = data.length;

    this.fnCallback.emit({
      totalMuestras: this.cantidadTotal
    });

    return data;
  }
  fnGetDataPorNivel(data: Muestra[]) {
    data.forEach((item) => {
      if (!this.dataPorNivel.some(x => x.id === item.idNivel)) {
        this.dataPorNivel.push({
          id: item.idNivel,
          name: item.nivelDescripcion,
          y: 0
        });
      }
    });
    this.dataPorNivel.forEach((region) => {
      region.y = data.filter(x => x.idNivel === region.id).length;
    });
    this.dataPorNivel = this.dataPorNivel.sort((a, b) => (a.y > b.y ? -1 : 1));
  }
  fnGetDataPorEstado(data: Muestra[]) {
    const estados: Enum[] = this._enumService.getEnum({ tipo: environment.enums.configuracion.tipoEstadoVisita.tipo } as Enum);
    const dataConVisitaCount = data.filter(x => x.visitas.some(y => y.numeroVisita === this.numerVisita.value)).length;

    this.dataPorEstado = estados.map(x => ({
      id: x.id,
      name: x.nombre,
      y: 0
    }));
    this.dataPorEstado.forEach((estado) => {
      if (estado.id === environment.enums.configuracion.tipoEstadoVisita.children.asignado) {
        estado.y = data.length - dataConVisitaCount;
      } else {
        estado.y = data.filter(x => x.visitas?.some(y => y?.enuEstado === estado.id && y.numeroVisita === this.numerVisita.value)).length;
      }
    });
    this.dataPorEstado = this.dataPorEstado
      .filter(x => ![
        environment.enums.configuracion.tipoEstadoVisita.children.enProcesoCierre,
        environment.enums.configuracion.tipoEstadoVisita.children.envioConError,
        environment.enums.configuracion.tipoEstadoVisita.children.noEjecutado
      ].some(y => y === x.id))
      .sort((a, b) => (a.y > b.y ? -1 : 1));
  }
}
