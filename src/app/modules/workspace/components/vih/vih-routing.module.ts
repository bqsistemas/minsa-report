import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VexRoutes } from '../../../../../@vex/interfaces/vex-route.interface';

// components
import { VihComponent } from './vih.component';

const routes: VexRoutes = [
  {
    path: '',
    component: VihComponent,
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
export class VihRoutingModule { }
