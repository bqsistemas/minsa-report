import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VexRoutes } from '../../../../../@vex/interfaces/vex-route.interface';

// components
import { HepatitisComponent } from './hepatitis.component';

const routes: VexRoutes = [
  {
    path: '',
    component: HepatitisComponent,
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
export class HepatitisRoutingModule { }
