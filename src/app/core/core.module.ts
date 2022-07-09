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
import { ComponenteSearchDialogComponent } from './components/componente-search-dialog/componente-search-dialog.component';
import { ResultadoSearchDialogComponent } from './components/resultado-search-dialog/resultado-search-dialog.component';
import { IndicadorSearchDialogComponent } from './components/indicador-search-dialog/indicador-search-dialog.component';
import { AspectoSearchDialogComponent } from './components/aspecto-search-dialog/aspecto-search-dialog.component';
import { RolSedeSelectorComponent } from './components/rol-sede-selector/rol-sede-selector.component';
import { RolCardComponent } from './components/rol-card/rol-card.component';
import { AutocompleteDreComponent } from './components/autocomplete-dre/autocomplete-dre.component';
import { AutocompleteUgelComponent } from './components/autocomplete-ugel/autocomplete-ugel.component';
import { AutocompleteIieeComponent } from './components/autocomplete-iiee/autocomplete-iiee.component';
import { MarcoLogicoSearchDialogComponent } from './components/marco-logico-search-dialog/marco-logico-search-dialog.component';
import { ComboEtapaComponent } from './components/combo-etapa/combo-etapa.component';
import { ChecklistUgelsComponent } from './components/checklist-ugels/checklist-ugels.component';
import { ChecklistActoresComponent } from './components/checklist-actores/checklist-actores.component';
import { ComboModalidadComponent } from './components/combo-modalidad/combo-modalidad.component';
import { ComboNivelComponent } from './components/combo-nivel/combo-nivel.component';
import { ComboCicloComponent } from './components/combo-ciclo/combo-ciclo.component';
import { ComboAreaComponent } from './components/combo-area/combo-area.component';
import { ItemAspectoSearchDialogComponent } from './components/item-aspecto-search-dialog/item-aspecto-search-dialog.component';
import { ComboComponenteComponent } from './components/combo-componente/combo-componente.component';
import { ComboResultadoComponent } from './components/combo-resultado/combo-resultado.component';
import { ComboIndicadorComponent } from './components/combo-indicador/combo-indicador.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ComboEnumMultipleComponent } from './components/combo-enum-multiple/combo-enum-multiple.component';
import { MuestraReemplazoDialogComponent } from './components/muestra-reemplazo-dialog/muestra-reemplazo-dialog.component';
import { MuestraReemplazoTableComponent } from './components/muestra-reemplazo-table/muestra-reemplazo-table.component';
import { ButtonActionFormComponent } from './components/button-action-form/button-action-form.component';


@NgModule({
  declarations: [
    ComboEnumComponent,
    ComponenteSearchDialogComponent,
    ResultadoSearchDialogComponent,
    IndicadorSearchDialogComponent,
    AspectoSearchDialogComponent,
    RolSedeSelectorComponent,
    RolCardComponent,
    AutocompleteDreComponent,
    AutocompleteUgelComponent,
    AutocompleteIieeComponent,
    MarcoLogicoSearchDialogComponent,
    ComboEtapaComponent,
    ChecklistUgelsComponent,
    ChecklistActoresComponent,
    ComboModalidadComponent,
    ComboNivelComponent,
    ComboCicloComponent,
    ComboAreaComponent,
    ItemAspectoSearchDialogComponent,
    ComboComponenteComponent,
    ComboResultadoComponent,
    ComboIndicadorComponent,
    ConfirmDialogComponent,
    ComboEnumMultipleComponent,
    MuestraReemplazoDialogComponent,
    MuestraReemplazoTableComponent,
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
    ComboEtapaComponent,
    AutocompleteDreComponent,
    AutocompleteUgelComponent,
    AutocompleteIieeComponent,
    ChecklistUgelsComponent,
    ChecklistActoresComponent,
    ComboModalidadComponent,
    ComboNivelComponent,
    ComboCicloComponent,
    ComboAreaComponent,
    ComboComponenteComponent,
    ComboResultadoComponent,
    ComboIndicadorComponent,
    ComboEnumMultipleComponent,
    MuestraReemplazoDialogComponent,
    ButtonActionFormComponent
  ],
  entryComponents: [
    RolSedeSelectorComponent
  ]
})
export class CoreModule { }
