import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VexRoutes } from '../../../../../@vex/interfaces/vex-route.interface';

// components
import { ManualComponent } from './manual.component';

const routes: VexRoutes = [
  {
    path: '',
    component: ManualComponent,
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: true
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManualRoutingModule { }
