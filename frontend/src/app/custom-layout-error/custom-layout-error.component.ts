import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { LayoutService } from '../../@vex/services/layout.service';
import theme from '../../@vex/utils/tailwindcss';
import { filter, map, startWith } from 'rxjs/operators';
import { checkRouterChildsData } from '../../@vex/utils/check-router-childs-data';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ConfigService } from '../../@vex/services/config.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { SidebarComponent } from '../../@vex/components/sidebar/sidebar.component';
import { ConfigName } from 'src/@vex/interfaces/config-name.model';

import { environment } from 'src/environments/environment';
// services
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'vex-custom-layout-error',
  templateUrl: './custom-layout-error.component.html',
  styleUrls: ['./custom-layout-error.component.scss']
})
export class CustomLayoutErrorComponent implements OnInit, OnDestroy {

  sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
  isFooterVisible$ = this.configService.config$.pipe(map(config => config.footer.visible));
  isDesktop$ = this.breakpointObserver.observe(`(min-width: ${theme.screens.lg})`).pipe(
    map(state => state.matches)
  );

  toolbarShadowEnabled$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null),
    map(() => checkRouterChildsData(this.router.routerState.root.snapshot, data => data.toolbarShadowEnabled))
  );

  @ViewChild('configpanel', { static: true }) configpanel: SidebarComponent;

  constructor(
    private layoutService: LayoutService,
    private _authService: AuthService,
    private configService: ConfigService,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private router: Router) {

    if (this.route.snapshot.params.id) {
      const paramAuth = atob(this.route.snapshot.params.id).split('|%|');
      const idInicioSesion = atob(paramAuth[0]);
      const time = Number(atob(paramAuth[1]));
      const tipoDocumento = Number(atob(paramAuth[2]));
      const numeroDocumento = atob(paramAuth[3]);
      const nombre = atob(paramAuth[4]);
      const apellido = atob(paramAuth[5]);
      const currentTime = new Date().getTime();

      const apellidoPaterno = apellido.split(' ')[0] ? apellido.split(' ')[0] : '';
      const apellidoMaterno = apellido.split(' ')[1] ? apellido.split(' ')[1] : '';
      if (time >= currentTime) {
        this._authService.postGenerarToken({
          idInicioSesion,
          tipoDocumento,
          numeroDocumento,
          nombre,
          apellidoPaterno,
          apellidoMaterno
        }).then((value: any) => {
          if (value.success) {
            this.router.navigate(['']);
          }
        });
      }/* else {
        console.log('fuera de tiempo');
        this.router.navigate(['pages', 'ads']);
      }*/
    }

    this.configService.updateConfig({
      id: ConfigName.ikaros,
      name: 'Ikaros',
      imgSrc: '//vex-landing.visurel.com/assets/img/layouts/ikaros.png',
      layout: 'horizontal',
      boxed: false,
      sidenav: {
        title: 'MINSA',
        imageUrl: 'assets/img/simon/logo-simon.svg',
        showCollapsePin: true,
        state: 'expanded'
      },
      toolbar: {
        fixed: false
      },
      navbar: {
        position: 'in-toolbar'
      },
      footer: {
        fixed: true
      }
    });
  }

  ngOnInit() {
    /*this.layoutService.configpanelOpen$.pipe(
      untilDestroyed(this)
    ).subscribe(open => open ? this.configpanel.open() : this.configpanel.close());*/
  }

  ngOnDestroy(): void { }
}
