import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VexRoutes } from '../../../@vex/interfaces/vex-route.interface';

// components

const routes: VexRoutes = [
  {
    path: '',
    children: [
      {
        path: 'vih',
        loadChildren: () => import('./components/vih/vih.module').then(m => m.VihModule)
      },
      {
        path: 'tmi',
        loadChildren: () => import('./components/tmi/tmi.module').then(m => m.TmiModule)
      },
      {
        path: 'its',
        loadChildren: () => import('./components/its/its.module').then(m => m.ItsModule)
      },
      {
        path: 'hepatitis',
        loadChildren: () => import('./components/hepatitis/hepatitis.module').then(m => m.HepatitisModule)
      },
      {
        path: 'manual',
        loadChildren: () => import('./components/manual/manual.module').then(m => m.ManualModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
