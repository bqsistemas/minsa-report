import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VexRoutes } from '../../../../../@vex/interfaces/vex-route.interface';

// components
import { ComponentesComponent } from './componentes.component';

const routes: VexRoutes = [
  {
    path: '',
    component: ComponentesComponent,
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
export class ComponentesRoutingModule { }
