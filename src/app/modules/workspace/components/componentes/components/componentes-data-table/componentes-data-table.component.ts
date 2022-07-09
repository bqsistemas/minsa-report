import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TableColumn } from '../../../../../../../@vex/interfaces/table-column.interface';
import icStar from '@iconify/icons-ic/twotone-star';
import icStarBorder from '@iconify/icons-ic/twotone-star-border';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icAdd from '@iconify/icons-ic/twotone-add';
import icSearch from '@iconify/icons-ic/twotone-search';
import icPlus from '@iconify/icons-ic/twotone-plus';
import icDeleteForever from '@iconify/icons-ic/twotone-delete-forever';
import icRefresh from '@iconify/icons-ic/twotone-refresh';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger20ms } from '../../../../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../../../../@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from '../../../../../../../@vex/animations/scale-fade-in.animation';
import { MatDialog } from '@angular/material/dialog';
// services
import { ComponenteService } from '../../../../../../core/services/componente/componente.service';
// models
import { Componente } from 'src/app/core/models/componente/componente';
import { ComponenteDialogFormComponent } from '../componente-dialog-form/componente-dialog-form.component';

@Component({
  selector: 'vex-componentes-data-table',
  templateUrl: './componentes-data-table.component.html',
  styleUrls: ['./componentes-data-table.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ],
  animations: [
    stagger20ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class ComponentesDataTableComponent implements OnInit, AfterViewInit {

  componentes: Componente[] = [];
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

  columns: TableColumn<Componente>[] = [
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

  dataSource: MatTableDataSource<Componente> | null;

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
    private _componenteService: ComponenteService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,

  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.subscriptions.add(this._componenteService.estado$.subscribe((value) => {
      this.estadoFilter = value;
      this.page = 0;
      this.fnSearch(1, value);
    }));
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
    this._componenteService.setEstado(null);
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  pageChanged(pageEvent: any) {
    this.page = pageEvent.pageIndex;
    this.fnSearch(pageEvent.pageIndex + 1, this.estadoFilter);
  }
  openComponente(componente: Componente = null) {
    const dialogRef = this.dialog.open(ComponenteDialogFormComponent, {
      width: '600px',
      data: {
        componente: componente ? componente : null
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'new') {
        this.fnResetSearch();
      }
      if (result && result.action === 'edit') {
        this.fnSetAspectoWithComponenteEdited(result.componente);
      }
    });
  }
  fnSetAspectoWithComponenteEdited(componente: Componente) {
    this.componentes.forEach((value) => {
      if (value.id === componente.id) {
        value.nombre = componente.nombre;
        value.descripcion = componente.descripcion;
        value.referencia = componente.referencia;
      }
    });
  }
  fnResetSearch() {
    this.page = 0;
    this.estadoFilter = null;
    this.lastKeyForPaginate = '';
    this.componentes = [];
    this.fnSearch(this.page + 1, this.estadoFilter);
  }
  fnSearch(page: number = 1, estado: boolean = null) {
    if (this.isLoading) {
      return false;
    }

    this.withError = false;
    this.isLoading = true; // encendemos el skeleton load
    this._componenteService.getPaginate(
      { page, pageSize: this.pageSize } as any,
      this.searchCtrl.value, this.lastKeyForPaginate, estado).then((value: any) => {
        this.isLoading = false; // apagamos el skeleton load
        if (!value.status.success) {
          this.withError = true;
          this.totalRows = 0;
          this.componentes = [];
          this.dataSource.data = [];
        } else {

          if (value['data'].length > 0) {
            this.lastKeyForPaginate = value['data'][value['data'].length - 1].id;
          }
          this.totalRows = value['totalRows'];
          this.componentes = value['data'];
          this.dataSource.data = value['data'];
        }
      }).catch((value) => {
        this.isLoading = false; // apagamos el skeleton load
        this.withError = true;
      });
  }
  // methods
  fnEditEstadoActivo(componente: Componente, event: Event) {
    event.stopPropagation();
    componente.esActivo = !componente.esActivo;
    this._componenteService.putUpdateEstadoActivo(componente).then((value: any) => {
      if (value.success) {
        this.snackbar.open('Se guardó con éxito.', 'Éxito!', {
          duration: 2500
        });
      } else {
        componente.esActivo = !componente.esActivo;
        this.snackbar.open(value?.messages?.join(', '), 'Aviso!', {
          panelClass: 'bg-deep-orange-500',
          duration: 3500
        });
      }
    }).catch((error) => {
      componente.esActivo = !componente.esActivo;
      this.snackbar.open(error.message, 'Aviso!', {
        panelClass: 'bg-deep-orange-500',
        duration: 3500
      });
    });
  }
}