import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// icons
import icStar from '@iconify/icons-ic/twotone-star';
import icStarBorder from '@iconify/icons-ic/twotone-star-border';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icAdd from '@iconify/icons-ic/twotone-add';
import icSearch from '@iconify/icons-ic/twotone-search';
import icPlus from '@iconify/icons-ic/twotone-plus';
import icDeleteForever from '@iconify/icons-ic/twotone-delete-forever';
import icRefresh from '@iconify/icons-ic/twotone-refresh';
// models
import { Indicador } from '@core/models/Indicador/indicador';
// services
import { IndicadorService } from '@core/services/indicador/indicador.service';
// Indicadores
import { IndicadorDialogComponent } from '../indicador-dialog/indicador-dialog.component';

@Component({
  selector: 'vex-indicador-table',
  templateUrl: './indicador-table.component.html',
  styleUrls: ['./indicador-table.component.scss']
})
export class IndicadorTableComponent implements OnInit, AfterViewInit {
  Indicadores: Indicador[] = [];
  lastKeyForPaginate: string = '';
  isLoading = false;
  withError = false;
  totalRows = 0;

  subscriptions: Subscription = new Subscription();
  // -----------------------------
  page = 0;
  pageSize = 10;
  searchCtrl = new FormControl('');
  estadoFilter?: boolean = null;

  columns: TableColumn<Indicador>[] = [
    {
      label: 'CÓDIGO',
      property: 'codigo',
      type: 'text',
      cssClasses: ['font-medium'], visible: true
    },
    {
      label: 'NOMBRE',
      property: 'nombre',
      type: 'text',
      cssClasses: ['font-medium'], visible: true
    },
    {
      label: 'DESCRIPCIÓN',
      property: 'descripcion',
      type: 'text',
      cssClasses: ['text-secondary'], visible: true
    },
    {
      label: '',
      property: 'esActivo',
      type: 'button',
      cssClasses: ['text-secondary', 'w-10'], visible: true
    },
    {
      label: '',
      property: 'menu',
      type: 'button',
      cssClasses: ['text-secondary', 'w-10'], visible: true
    }
  ];

  dataSource: MatTableDataSource<Indicador> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  icMoreHoriz = icMoreHoriz;
  icStar = icStar;
  icStarBorder = icStarBorder;
  icDeleteForever = icDeleteForever;
  icEdit = icEdit;
  icSearch = icSearch;
  icAdd = icAdd;
  icPlus = icPlus;
  icRefresh = icRefresh;

  constructor(
    private _indicadorService: IndicadorService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,

  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.subscriptions.add(
      this.searchCtrl.valueChanges.pipe(
        debounceTime(300)
      ).subscribe((value) => {
        this.page = 0;
        this.fnSearch(this.page + 1, this.estadoFilter);
      })
    );
  }
  ngAfterViewInit() {
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  pageChanged(pageEvent: any) {
    this.page = pageEvent.pageIndex;
    this.fnSearch(pageEvent.pageIndex + 1, this.estadoFilter);
  }
  openIndicador(indicador: Indicador = null) {
    const dialogRef = this.dialog.open(IndicadorDialogComponent, {
      width: '600px',
      data: {
        indicador: indicador ? indicador : null
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'new') {
        this.fnResetSearch();
      }
      if (result && result.action === 'edit') {
        this.fnSetAspectoWithIndicadorEdited(result.indicador);
      }
    });
  }
  fnSetAspectoWithIndicadorEdited(indicador: Indicador) {
    this.Indicadores.forEach((value) => {
      // if (value.id === indicador.id) {
      //   value.nombre = indicador.nombre;
      //   value.descripcion = indicador.descripcion;
      //   value.referencia = indicador.referencia;
      // }
    });
  }
  fnResetSearch() {
    this.page = 0;
    this.estadoFilter = null;
    this.lastKeyForPaginate = '';
    this.Indicadores = [];
    this.fnSearch(this.page + 1, this.estadoFilter);
  }
  fnSearch(page: number = 1, estado: boolean = null) {
    if (this.isLoading) {
      return false;
    }

    this.withError = false;
    this.isLoading = true; // encendemos el skeleton load
    this._indicadorService.getPaginate(
      { page, pageSize: this.pageSize } as any,
      this.searchCtrl.value).then((value: any) => {
        this.isLoading = false; // apagamos el skeleton load
        if (!value.status.success) {
          this.withError = true;
          this.totalRows = 0;
          this.Indicadores = [];
          this.dataSource.data = [];
        } else {

          if (value['data'].length > 0) {
            this.lastKeyForPaginate = value['data'][value['data'].length - 1].id;
          }
          this.totalRows = value['totalRows'];
          this.Indicadores = value['data'];
          this.dataSource.data = value['data'];
        }
      }).catch((value) => {
        this.isLoading = false; // apagamos el skeleton load
        this.withError = true;
      });
  }
  // methods
}