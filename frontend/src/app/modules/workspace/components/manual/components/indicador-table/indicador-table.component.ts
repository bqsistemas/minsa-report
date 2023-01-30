import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
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
import { stagger20ms } from '../../../../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../../../../@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from '../../../../../../../@vex/animations/scale-fade-in.animation';
// models
import { Indicador } from '@core/models/Indicador/indicador';
// services
import { IndicadorService } from '@core/services/indicador/indicador.service';
// Indicadores
import { IndicadorDialogComponent } from '../indicador-dialog/indicador-dialog.component';
import { TranslateItemsPerPage } from '@core/adapters/translate-items-per-page';

@Component({
  selector: 'vex-indicador-table',
  templateUrl: './indicador-table.component.html',
  styleUrls: ['./indicador-table.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard',
        hideRequiredMarker: false
      } as MatFormFieldDefaultOptions
    }
  ],
  animations: [
    stagger20ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
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
      label: 'DISA',
      property: 'disa',
      type: 'text',
      cssClasses: ['font-medium'], visible: true
    },
    {
      label: 'RED',
      property: 'red',
      type: 'text',
      cssClasses: ['font-medium'], visible: true
    },
    {
      label: 'MICRORED',
      property: 'mred',
      type: 'text',
      cssClasses: ['text-secondary'], visible: true
    },
    {
      label: 'EESS',
      property: 'renaes',
      type: 'text',
      cssClasses: ['text-secondary'], visible: true
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
    this.paginator._intl.itemsPerPageLabel = "Ítems por página";
    this.paginator._intl.getRangeLabel = TranslateItemsPerPage;
    
    this.fnSearch(this.page + 1)
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
      width: '950px',
      data: {
        indicador: indicador ? indicador : null
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'new') {
        this.fnResetSearch();
      }
      if (result && result.action === 'edit') {
      }
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
    this._indicadorService.postPaginate(
      { page, pageSize: this.pageSize } as any,
      this.searchCtrl.value).then((value: any) => {
        this.isLoading = false; // apagamos el skeleton load
        this.totalRows = value.rowCount;
        this.Indicadores = value.results;
        this.dataSource.data = value.results;
      }).catch((value) => {
        this.isLoading = false; // apagamos el skeleton load
        this.withError = true;
      });
  }
  fnEliminar(row, e){
    this._indicadorService.putDelete(row.idMaestroIngreso)
      .then((value) => {
        this.fnResetSearch()
      })
      .catch((error) => {
        this.snackbar.open('Error de elimnación', 'Aviso!', {
          panelClass: 'bg-deep-orange-500',
          duration: 3500
        });
      });
  }
  // methods
}