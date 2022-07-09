import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { CustomLayoutErrorComponent } from './custom-layout-error/custom-layout-error.component';
import { CustomLayoutPagesComponent } from './custom-layout-pages/custom-layout-pages.component';
import { VexRoutes } from '../@vex/interfaces/vex-route.interface';

// resolvers
import { ResolveGetEnums } from './core/resolvers/resolve-get-enums/resolve-get-enums';
import { ResolveGetIgel } from './core/resolvers/resolve-get-igel/resolve-get-igel';
import { ResolveGetRoles } from './core/resolvers/resolve-get-roles/resolve-get-roles';
// guards
import { AdminGuard } from './security/guards/admin.guard';
import { AuthGuard } from './security/guards/auth.guard';

const childrenRoutes: VexRoutes = [
  {
    path: '',
    redirectTo: 'bienvenida',
    pathMatch: 'full'
  },
  {
    path: 'bienvenida',
    loadChildren: () => import('./pages/questions/questions.module').then(m => m.QuestionsModule)
  },
  {
    path: 'app',
    children: [
      {
        path: 'workspace',
        loadChildren: () => import('./modules/workspace/workspace.module').then(m => m.WorkspaceModule)
      }
    ]
  }
];
const childrenRoutesPages: VexRoutes = [
  {
    path: 'ads',
    loadChildren: () => import('./pages/errors/error-auth/error-auth.module').then(m => m.ErrorAuthModule)
  },
  {
    path: '401',
    loadChildren: () => import('./pages/errors/error-unauthorized/error-unauthorized.module').then(m => m.ErrorUnauthorizedModule)
  }
];
const routes: Routes = [
  {
    path: '',
    component: CustomLayoutComponent,
    resolve: { enums: ResolveGetEnums, roles_sede: ResolveGetRoles },
    children: childrenRoutes,
    canActivate: [AdminGuard]
  },
  {
    path: 'auth/:id',
    component: CustomLayoutErrorComponent
  },
  {
    path: 'pages',
    component: CustomLayoutPagesComponent,
    children: childrenRoutesPages
  },
  {
    path: '**',
    component: CustomLayoutPagesComponent,
    loadChildren: () => import('./pages/errors/error-404/error-404.module').then(m => m.Error404Module)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
