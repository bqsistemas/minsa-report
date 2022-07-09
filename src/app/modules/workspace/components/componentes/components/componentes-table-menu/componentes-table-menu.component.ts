import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import icViewHeadline from '@iconify/icons-ic/twotone-view-headline';
import { Icon } from '@visurel/iconify-angular';
import { fadeInRight400ms } from '../../../../../../../@vex/animations/fade-in-right.animation';
import icHistory from '@iconify/icons-ic/twotone-history';
import icStar from '@iconify/icons-ic/twotone-star';
import icStarBorder from '@iconify/icons-ic/twotone-star-border';
import icLabel from '@iconify/icons-ic/twotone-label';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import { stagger40ms } from '../../../../../../../@vex/animations/stagger.animation';

// services
import { ComponenteService } from '@core/services/componente/componente.service';

export interface EntityTableMenu {
  type: 'link' | 'subheading';
  id?: 'todos' | 'activos' | 'inactivos';
  icon?: Icon;
  label: string;
  value?: boolean;
  classes?: {
    icon?: string;
  };
}

@Component({
  selector: 'vex-componentes-table-menu',
  templateUrl: './componentes-table-menu.component.html',
  styleUrls: ['./componentes-table-menu.component.scss'],
  animations: [fadeInRight400ms, stagger40ms]
})
export class ComponentesTableMenuComponent implements OnInit {

  @Input() items: EntityTableMenu[] = [
    {
      type: 'link',
      id: 'todos',
      icon: icViewHeadline,
      label: 'Todos',
      value: null
    },
    {
      type: 'link',
      id: 'activos',
      icon: icStar,
      label: 'Activos',
      value: true
    },
    {
      type: 'link',
      id: 'inactivos',
      icon: icStarBorder,
      label: 'Inactivos',
      value: false
    }
  ];

  @Output() filterChange = new EventEmitter<any[]>();
  @Output() openAddNew = new EventEmitter<void>();

  activeCategory: EntityTableMenu['id'] = 'todos';
  icPersonAdd = icPersonAdd;

  constructor(
    private _componenteService: ComponenteService,
  ) { }

  ngOnInit() {
  }

  setFilter(category: EntityTableMenu['id'], value: boolean = null) {
    this.activeCategory = category;
    this._componenteService.setEstado(value);
  }

  isActive(category: EntityTableMenu['id']) {
    return this.activeCategory === category;
  }
}
