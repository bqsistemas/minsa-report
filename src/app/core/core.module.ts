import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContainerModule } from '../../@vex/directives/container/container.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { SkeletonModule } from '../fake/skeleton/skeleton.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatRadioModule } from '@angular/material/radio';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ScrollbarModule } from '../../@vex/components/scrollbar/scrollbar.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ComboEnumComponent } from './components/combo-enum/combo-enum.component';
import { AutocompleteDreComponent } from './components/autocomplete-dre/autocomplete-dre.component';
import { AutocompleteUgelComponent } from './components/autocomplete-ugel/autocomplete-ugel.component';
import { AutocompleteIieeComponent } from './components/autocomplete-iiee/autocomplete-iiee.component';
import { ComboComponenteComponent } from './components/combo-componente/combo-componente.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ButtonActionFormComponent } from './components/button-action-form/button-action-form.component';


@NgModule({
  declarations: [
    ComboEnumComponent,
    AutocompleteDreComponent,
    AutocompleteUgelComponent,
    AutocompleteIieeComponent,
    ComboComponenteComponent,
    ConfirmDialogComponent,
    ButtonActionFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule,
    ContainerModule,
    MatAutocompleteModule,
    IconModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    ScrollingModule,
    ScrollbarModule,
    MatRadioModule,
    MatProgressSpinnerModule,

    SkeletonModule
  ],
  exports: [
    ComboEnumComponent,
    AutocompleteDreComponent,
    AutocompleteUgelComponent,
    AutocompleteIieeComponent,
    ComboComponenteComponent,
    ButtonActionFormComponent
  ],
  entryComponents: [
  ]
})
export class CoreModule { }
