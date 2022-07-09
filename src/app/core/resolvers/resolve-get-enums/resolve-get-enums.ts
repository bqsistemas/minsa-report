// resolver.ts
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// services
import { EnumService } from '../../../core/services/enum/enum.service';


@Injectable()
export class ResolveGetEnums implements Resolve<any> {

    constructor(
        private _enumService: EnumService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this._enumService.getAll().pipe(
            map((data: any) => {
                this._enumService.setEnums(data);
                return data;
            })
        ).toPromise();
    }
}