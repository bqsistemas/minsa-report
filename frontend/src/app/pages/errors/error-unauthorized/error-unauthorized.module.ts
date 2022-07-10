import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorUnauthorizedRoutingModule } from './error-unauthorized-routing.module';
import { ErrorUnauthorizedComponent } from './error-unauthorized.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ErrorUnauthorizedComponent],
  imports: [
    CommonModule,
    ErrorUnauthorizedRoutingModule,
    FlexLayoutModule,
    IconModule,
    MatButtonModule
  ]
})
export class ErrorUnauthorizedModule {
}