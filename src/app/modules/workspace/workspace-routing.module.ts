import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VexRoutes } from '../../../@vex/interfaces/vex-route.interface';

// components

const routes: VexRoutes = [
  {
    path: '',
    children: [
      {
        path: 'componentes',
        loadChildren: () => import('./components/componentes/componentes.module').then(m => m.ComponentesModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
