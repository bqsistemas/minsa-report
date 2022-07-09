import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutModule } from '../../../@vex/components/page-layout/page-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { SkeletonComponenteCardComponent } from './components/skeleton-componente-card/skeleton-componente-card.component';

@NgModule({
  declarations: [
    SkeletonComponenteCardComponent
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
    SkeletonComponenteCardComponent
  ]
})
export class SkeletonModule { }
