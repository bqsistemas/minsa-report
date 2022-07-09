import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { ErrorAuthRoutingModule } from './error-auth-routing.module';
import { ErrorAuthComponent } from './error-auth.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ErrorAuthComponent],
  imports: [
    CommonModule,
    ErrorAuthRoutingModule,
    FlexLayoutModule,
    IconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class ErrorAuthModule {
}