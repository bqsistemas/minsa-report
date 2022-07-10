import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationItemComponent } from './navigation-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { IconModule } from '@visurel/iconify-angular';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [NavigationItemComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    IconModule,
    MatIconModule,
    RouterModule,
    MatRippleModule,
    MatTooltipModule
  ],
  exports: [NavigationItemComponent]
})
export class NavigationItemModule {
}
