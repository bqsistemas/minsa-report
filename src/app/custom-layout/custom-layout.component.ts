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

// services
import { EnumService } from './../core/services/enum/enum.service';
import { AuxiliarService } from './../core/services/auxiliar/auxiliar.service';
import { AuthService } from './../core/services/auth/auth.service';

import { environment } from './../../environments/environment';

@Component({
  selector: 'vex-custom-layout',
  templateUrl: './custom-layout.component.html',
  styleUrls: ['./custom-layout.component.scss']
})
export class CustomLayoutComponent implements OnInit, OnDestroy {

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
    private _enumService: EnumService,
    private _authService: AuthService,
    private _auxiliarService: AuxiliarService,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private router: Router) {

    if (!this.route.snapshot.data.roles_sede.success) {
      localStorage.removeItem(environment.codeJwt);
      location.href = '';
    } else {
    }
  }

  ngOnInit() {
    /*this.layoutService.configpanelOpen$.pipe(
      untilDestroyed(this)
    ).subscribe(open => open ? this.configpanel.open() : this.configpanel.close());*/
  }

  ngOnDestroy(): void { }
}
