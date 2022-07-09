// resolver.ts
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
// services
import { AspectoService } from '../../../core/services/aspecto/aspecto.service';
// models
import { Aspecto } from '../../../core/models/aspecto/aspecto';

@Injectable()
export class ResolveGetAspecto implements Resolve<any> {

    constructor(
        private _aspectoService: AspectoService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        if (route.params.id_aspecto) {
            return this._aspectoService.get(route.params.id_aspecto);
        } else {
            return null;
        }
    }
}