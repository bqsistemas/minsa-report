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
    this.itemsMenu = environmentMenu.menu;
    this.loadingMenu = false;
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
}
