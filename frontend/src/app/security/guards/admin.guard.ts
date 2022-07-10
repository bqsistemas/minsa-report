import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from './../../../environments/environment';
import { AuthService } from '@core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private _authService: AuthService
  ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem(environment.codeJwt);
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const tokenDecript = this.jwtHelper.decodeToken(token);
      if (tokenDecript.ID_INICIO_SESION) {
        this._authService.postGenerarTokenRefresh().toPromise().then((value) => {
          if (!value) {
            this.router.navigate(['pages/ads']);
          }
        });
        return true;
      } else {
        this.router.navigate(['pages/ads']);
        return false;
      }
    }
    this.router.navigate(['pages/ads']);
    return false;
  }

}
