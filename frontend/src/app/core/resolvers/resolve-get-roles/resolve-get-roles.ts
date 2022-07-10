// resolver.ts
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
// services
import { AuthService } from '../../../core/services/auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ResolveGetRoles implements Resolve<any> {

    constructor(
        private _authService: AuthService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this._authService.postListasedes().pipe(
            map(async (data: any) => {
                await this._authService.setSedes(data.data);
                return data;
            })
        ).toPromise();
    }
}