import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';

import { ErrorAuthComponent } from './error-auth.component';

const routes: VexRoutes = [
  {
    path: '',
    component: ErrorAuthComponent,
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
export class ErrorAuthRoutingModule { }
