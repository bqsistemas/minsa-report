import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';

import { ErrorUnauthorizedComponent } from './error-unauthorized.component';

const routes: VexRoutes = [
  {
    path: '',
    component: ErrorUnauthorizedComponent,
    data: {
      containerEnabled: true,
      toolbarShadowEnabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorUnauthorizedRoutingModule { }
