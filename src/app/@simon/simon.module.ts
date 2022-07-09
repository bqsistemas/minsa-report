import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '@visurel/iconify-angular';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

import { QuestionCantidadComponent } from './components/question-cantidad/question-cantidad.component';
import { QuestionCargaArchivosComponent } from './components/question-carga-archivos/question-carga-archivos.component';
import { QuestionCasillaVerificacionComponent } from './components/question-casilla-verificacion/question-casilla-verificacion.component';
import { QuestionConfigurationFormComponent } from './components/question-configuration-form/question-configuration-form.component';
import { QuestionCuadroComentarioComponent } from './components/question-cuadro-comentario/question-cuadro-comentario.component';
import { QuestionCuadroTextoSimpleComponent } from './components/question-cuadro-texto-simple/question-cuadro-texto-simple.component';
import { QuestionFechaHoraComponent } from './components/question-fecha-hora/question-fecha-hora.component';
import { QuestionOpcionMultipleComponent } from './components/question-opcion-multiple/question-opcion-multiple.component';
import { QuestionRankingEstrellasComponent } from './components/question-ranking-estrellas/question-ranking-estrellas.component';
import { QuestionTypeFormComponent } from './components/question-type-form/question-type-form.component';
import { OtherOptionFormComponent } from './components/other-option-form/other-option-form.component';
import { ResolveQuestionOpcionMultipleComponent } from './components/resolve-question-opcion-multiple/resolve-question-opcion-multiple.component';
import { ResolveQuestionCasillaVerificacionComponent } from './components/resolve-question-casilla-verificacion/resolve-question-casilla-verificacion.component';
import { ResolveQuestionConfigurationFormComponent } from './components/resolve-question-configuration-form/resolve-question-configuration-form.component';
import { ResolveQuestionCantidadComponent } from './components/resolve-question-cantidad/resolve-question-cantidad.component';
import { ResolveQuestionFechaHoraComponent } from './components/resolve-question-fecha-hora/resolve-question-fecha-hora.component';
import { ResolveQuestionRankingEstrellasComponent } from './components/resolve-question-ranking-estrellas/resolve-question-ranking-estrellas.component';
import { ResolveQuestionCuadroComentarioComponent } from './components/resolve-question-cuadro-comentario/resolve-question-cuadro-comentario.component';
import { ResolveQuestionCargaArchivosComponent } from './components/resolve-question-carga-archivos/resolve-question-carga-archivos.component';
import { ResolveQuestionCuadroTextoSimpleComponent } from './components/resolve-question-cuadro-texto-simple/resolve-question-cuadro-texto-simple.component';
import { PreviewQuestionDialogComponent } from './components/preview-question-dialog/preview-question-dialog.component';
import { DescriptionsQuestionDialogComponent } from './components/descriptions-question-dialog/descriptions-question-dialog.component';

@NgModule({
  declarations: [
    OtherOptionFormComponent,
    QuestionCantidadComponent,
    QuestionCargaArchivosComponent,
    QuestionCasillaVerificacionComponent,
    QuestionConfigurationFormComponent,
    QuestionCuadroComentarioComponent,
    QuestionCuadroTextoSimpleComponent,
    QuestionFechaHoraComponent,
    QuestionOpcionMultipleComponent,
    QuestionRankingEstrellasComponent,
    QuestionTypeFormComponent,
    ResolveQuestionOpcionMultipleComponent,
    ResolveQuestionCasillaVerificacionComponent,
    ResolveQuestionConfigurationFormComponent,
    ResolveQuestionCantidadComponent,
    ResolveQuestionFechaHoraComponent,
    ResolveQuestionRankingEstrellasComponent,
    ResolveQuestionCuadroComentarioComponent,
    ResolveQuestionCargaArchivosComponent,
    ResolveQuestionCuadroTextoSimpleComponent,
    PreviewQuestionDialogComponent,
    DescriptionsQuestionDialogComponent
  ],
  imports: [
    CommonModule,

    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    IconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatTabsModule,
    NgxMaterialTimepickerModule,
    MatTooltipModule,
    MatChipsModule,
    MatDialogModule,
    MatListModule
  ],
  exports: [
    OtherOptionFormComponent,
    QuestionCantidadComponent,
    QuestionCargaArchivosComponent,
    QuestionCasillaVerificacionComponent,
    QuestionConfigurationFormComponent,
    QuestionCuadroComentarioComponent,
    QuestionCuadroTextoSimpleComponent,
    QuestionFechaHoraComponent,
    QuestionOpcionMultipleComponent,
    QuestionRankingEstrellasComponent,
    QuestionTypeFormComponent,
    // resolve
    ResolveQuestionOpcionMultipleComponent,
    ResolveQuestionCasillaVerificacionComponent,
    ResolveQuestionConfigurationFormComponent,
    ResolveQuestionCantidadComponent,
    ResolveQuestionFechaHoraComponent,
    ResolveQuestionRankingEstrellasComponent,
    ResolveQuestionCuadroComentarioComponent,
    ResolveQuestionCargaArchivosComponent,
    ResolveQuestionCuadroTextoSimpleComponent
  ],
  entryComponents: [
    PreviewQuestionDialogComponent,
    DescriptionsQuestionDialogComponent
  ]
})
export class SimonModule { }