import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VexRoutes } from '../../../../../@vex/interfaces/vex-route.interface';

// components
import { TmiComponent } from './tmi.component';

const routes: VexRoutes = [
  {
    path: '',
    component: TmiComponent,
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
export class TmiRoutingModule { }
