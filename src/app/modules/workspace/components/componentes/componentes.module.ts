import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollbarModule } from '../../../../../@vex/components/scrollbar/scrollbar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ContainerModule } from '../../../../../@vex/directives/container/container.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SkeletonModule } from '../../../../fake/skeleton/skeleton.module';

import { CoreModule } from '../../../../core/core.module';

import { ComponentesRoutingModule } from './componentes-routing.module';
import { ComponentesComponent } from './componentes.component';
import { ComponentesTableMenuComponent } from './components/componentes-table-menu/componentes-table-menu.component';
import { ComponentesDataTableComponent } from './components/componentes-data-table/componentes-data-table.component';
import { ComponenteDialogFormComponent } from './components/componente-dialog-form/componente-dialog-form.component';


@NgModule({
  declarations: [ComponentesComponent, ComponentesTableMenuComponent, ComponentesDataTableComponent, ComponenteDialogFormComponent],
  imports: [
    CommonModule,
    ComponentesRoutingModule,
    CoreModule,

    FlexLayoutModule,
    IconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatRippleModule,
    MatDialogModule,
    ScrollbarModule,
    ReactiveFormsModule,
    ContainerModule,
    MatSidenavModule,
    MatDividerModule,
    MatSnackBarModule,
    MatInputModule,
    MatTooltipModule,

    SkeletonModule
  ],
  entryComponents: [
    ComponenteDialogFormComponent
  ]
})
export class ComponentesModule { }
