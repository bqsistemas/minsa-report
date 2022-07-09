import { Component, OnInit } from '@angular/core';
import icApps from '@iconify/icons-ic/twotone-apps';
import icStar from '@iconify/icons-ic/twotone-star';
import { scaleIn400ms } from '../../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../../@vex/animations/fade-in-right.animation';
import { TableColumn } from '../../../../../@vex/interfaces/table-column.interface';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { stagger40ms } from '../../../../../@vex/animations/stagger.animation';
import { MatDialog } from '@angular/material/dialog';
import icMenu from '@iconify/icons-ic/twotone-menu';

@Component({
  selector: 'vex-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class ComponentesComponent implements OnInit {
  menuOpen = false;

  activeCategory: 'frequently' | 'starred' | 'all' | 'family' | 'friends' | 'colleagues' | 'business' = 'all';

  icStar = icStar;
  icApps = icApps;
  icMenu = icMenu;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openContact(id?: any['id']) {
    /*this.dialog.open(ContactsEditComponent, {
      data: id || null,
      width: '600px'
    });*/
  }
  openMenu() {
    this.menuOpen = true;
  }
}