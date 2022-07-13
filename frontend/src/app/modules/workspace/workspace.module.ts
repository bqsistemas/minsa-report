import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { IndicadorTableComponent } from './manual/componentes/indicador-table/indicador-table.component';

@NgModule({
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
  ],
  declarations: [IndicadorTableComponent]
})
export class WorkspaceModule {

 }
