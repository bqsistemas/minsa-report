// resolver.ts
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
// services
import { AuxiliarService } from '../../../core/services/auxiliar/auxiliar.service';

@Injectable()
export class ResolveGetIgelDre implements Resolve<any> {

    constructor(
        private _auxiliarService: AuxiliarService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this._auxiliarService.getListarDre();
    }
}