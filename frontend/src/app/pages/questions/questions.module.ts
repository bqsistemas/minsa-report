import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '@visurel/iconify-angular';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { QuestionDialogComponent } from './components/question-dialog/question-dialog.component';


@NgModule({
  declarations: [QuestionsComponent, QuestionDialogComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    IconModule,
    MatListModule,
    MatIconModule,
    MatDialogModule
  ],
  entryComponents: [
    QuestionDialogComponent
  ]
})
export class QuestionsModule {
}
