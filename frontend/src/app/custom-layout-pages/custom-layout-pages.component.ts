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

// services
import { AuthService } from '@core/services/auth/auth.service';

// services

@Component({
  selector: 'vex-custom-layout-pages',
  templateUrl: './custom-layout-pages.component.html',
  styleUrls: ['./custom-layout-pages.component.scss']
})
export class CustomLayoutPagesComponent implements OnInit, OnDestroy {

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

    this.configService.updateConfig({
      id: ConfigName.ikaros,
      name: 'Ikaros',
      imgSrc: '//vex-landing.visurel.com/assets/img/layouts/ikaros.png',
      layout: 'horizontal',
      boxed: false,
      sidenav: {
        title: 'MINSA',
        imageUrl: 'assets/img/minsa/isotipo.png',
        showCollapsePin: true,
        state: 'collapsed'
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
