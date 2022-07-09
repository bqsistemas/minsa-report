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
import icAssessment from '@iconify/icons-ic/twotone-assessment';

@Component({
  selector: 'vex-vih',
  templateUrl: './vih.component.html',
  styleUrls: ['./vih.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class VihComponent implements OnInit {
  menuOpen = false;

  activeCategory: 'frequently' | 'starred' | 'all' | 'family' | 'friends' | 'colleagues' | 'business' = 'all';

  icStar = icStar;
  icApps = icApps;
  icAssessment = icAssessment;

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