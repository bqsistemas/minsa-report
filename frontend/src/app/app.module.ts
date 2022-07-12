import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { CustomLayoutErrorModule } from './custom-layout-error/custom-layout-error.module';
import { CustomLayoutPagesModule } from './custom-layout-pages/custom-layout-pages.module';
import { JwtModule } from "@auth0/angular-jwt";
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { AuthInterceptor } from './security/interceptors/auth-interceptor';
import { ErrorInterceptor } from './security/interceptors/error-interceptor';
import { CryptInterceptor } from './security/interceptors/crypt-interceptor';
// resolvers
import { ResolveUser } from '@core/resolvers/resolve-user/resolve-user';

import { environment } from './../environments/environment';

export function tokenGetter() {
  return localStorage.getItem(environment.codeJwt);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Vex
    VexModule,
    CustomLayoutModule,
    CustomLayoutErrorModule,
    CustomLayoutPagesModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: []
      }
    }),
    NgxMaterialTimepickerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: CryptInterceptor, multi: true },
    ResolveUser
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
