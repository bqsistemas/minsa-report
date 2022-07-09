import { Component, Input, OnInit } from '@angular/core';
import { trackByRoute } from '../../utils/track-by';
import { NavigationService } from '../../services/navigation.service';
import icRadioButtonChecked from '@iconify/icons-ic/twotone-radio-button-checked';
import icRadioButtonUnchecked from '@iconify/icons-ic/twotone-radio-button-unchecked';
import { LayoutService } from '../../services/layout.service';
import { ConfigService } from '../../services/config.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { NavigationItem } from '../../interfaces/navigation-item.interface';
import { Router } from '@angular/router';

// services
import { AuthService } from '@core/services/auth/auth.service';
// models
import { Rol } from '@core/models/rol/rol';
import { Menu } from '@core/models/menu/menu';
import { environmentMenu } from 'src/environments/environment-menu';


@Component({
  selector: 'vex-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() collapsed: boolean;
  collapsedOpen$ = this.layoutService.sidenavCollapsedOpen$;
  title$ = this.configService.config$.pipe(map(config => config.sidenav.title));
  imageUrl$ = this.configService.config$.pipe(map(config => config.sidenav.imageUrl));
  showCollapsePin$ = this.configService.config$.pipe(map(config => config.sidenav.showCollapsePin));
  loadingMenu = false;

  rolSede: Rol;
  items = environmentMenu.menu;
  itemsMenu: any[] = [];
  trackByRoute = trackByRoute;
  icRadioButtonChecked = icRadioButtonChecked;
  icRadioButtonUnchecked = icRadioButtonUnchecked;

  subscriptions: Subscription = new Subscription();

  constructor(
    private navigationService: NavigationService,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private _authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    /* this.subscriptions.add(this._authService.rolSede$.subscribe((userRolSede: Rol) => {
      this.loadingMenu = true;
      this.rolSede = userRolSede;
      this._authService.postGetMenus(userRolSede.codigoRol).then((value: any) => {
        this.items = environmentMenu.menu;

        this.fnFiltrarMenu(value.data);
        this._authService.setMenus(this.itemsMenu);
        this.loadingMenu = false;
        if (!this.fnValidateAccessToRoute()) {
          debugger;
          this.router.navigate(['/pages/401']);
        }
      }).catch((value: any) => {
        this.loadingMenu = false;
        console.log("error obteniendo menú");
      });
    })); */
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  onMouseEnter() {
    this.layoutService.collapseOpenSidenav();
  }

  onMouseLeave() {
    this.layoutService.collapseCloseSidenav();
  }

  toggleCollapse() {
    this.collapsed ? this.layoutService.expandSidenav() : this.layoutService.collapseSidenav();
  }
  fnFiltrarMenu(dataMenu: Menu[]) {
    let menu: any[] = JSON.parse(JSON.stringify(this.items));
    menu.forEach((item) => {
      if (item.children) {
        item.children = this.fnFiltroMenu(item.children, dataMenu);
        item.children.forEach(ele => {
          if (ele.children) {
            ele.children = this.fnFiltroMenu(ele.children, dataMenu);
          }
        });
      }
    });

    menu = menu.filter(x => x.routePassport || (x.children?.length > 0));
    menu.forEach((item) => {
      if (item.children) {
        item.children = item.children.filter(x => x.routePassport || (x.children && x.children?.length > 0));
      }
    });

    this.itemsMenu = menu;
    this.navigationService.items = menu;
  }
  fnFiltroMenu(children: any[], dataMenu: Menu[]) {
    children = children.filter(x => !x.routePassport || (x.routePassport && dataMenu.some(y => y.urlMenu === x.routePassport)
      && (!x.dontView || !x.dontView.some(y => y === this.rolSede.codigoRol))));
    return children;
  }
  fnValidateAccessToRoute() {
    return this.fnValidateRouteWithItemsMenu(this.itemsMenu, this.router.url);
  }
  fnValidateRouteWithItemsMenu(menu: any[], url: string) {
    let authorized = false;
    menu.forEach((item) => {
      if (item.route && url.indexOf(item.route) >= 0) {
        if (!item.dontView || (item.dontView && !item.dontView.some(y => y === this.rolSede.codigoRol))) {
          authorized = true;
        }
      }
      if (item.children?.length > 0) {
        const response = this.fnValidateRouteWithItemsMenu(item.children, url);
        if (response) {
          authorized = true;
        }
      }
    });

    if (environmentMenu.menuAdicional.some(x => url.indexOf(x.url) >= 0 && x.roles.some(y => y === this.rolSede.codigoRol))) {
      authorized = true;
    }

    return authorized;
  }
}
