import { Component, OnInit } from '@angular/core';
import icInfo from '@iconify/icons-ic/twotone-info';

@Component({
  selector: 'vex-skeleton-componente-card',
  templateUrl: './skeleton-componente-card.component.html',
  styleUrls: ['./skeleton-componente-card.component.scss']
})
export class SkeletonComponenteCardComponent implements OnInit {

  icInfo = icInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
