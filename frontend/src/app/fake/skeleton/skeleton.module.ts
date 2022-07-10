import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutModule } from '../../../@vex/components/page-layout/page-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { SkeletonComponenteCardComponent } from './components/skeleton-componente-card/skeleton-componente-card.component';
import { SkeletonItemMenuComponent } from './components/skeleton-item-menu/skeleton-item-menu.component';

@NgModule({
  declarations: [
    SkeletonComponenteCardComponent,
    SkeletonItemMenuComponent
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    PageLayoutModule,
    FlexLayoutModule,
    MatIconModule,
    IconModule
  ],
  exports: [
    SkeletonItemMenuComponent,
    SkeletonComponenteCardComponent
  ]
})
export class SkeletonModule { }
