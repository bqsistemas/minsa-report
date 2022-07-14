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
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SkeletonModule } from '../../../../fake/skeleton/skeleton.module';

import { CoreModule } from '../../../../core/core.module';

import { ManualRoutingModule } from './manual-routing.module';
import { ManualComponent } from './manual.component';
import { IndicadorTableComponent } from './components/indicador-table/indicador-table.component';
import { IndicadorDialogComponent } from './components/indicador-dialog/indicador-dialog.component';


@NgModule({
  declarations: [ManualComponent, IndicadorTableComponent, IndicadorDialogComponent],
  imports: [
    CommonModule,
    ManualRoutingModule,
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
    MatSelectModule,

    SkeletonModule
  ],
  entryComponents: [
    IndicadorDialogComponent
  ]
})
export class ManualModule { }
