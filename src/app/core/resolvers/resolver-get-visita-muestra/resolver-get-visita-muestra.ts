// resolver.ts
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
// services
import { VisitaMuestraService } from '../../../core/services/visita-muestra/visita-muestra.service';
// models
import { VisitaMuestra } from '../../../core/models/visita-muestra/visita-muestra';

@Injectable()
export class ResolverGetVisitaMuestra implements Resolve<any> {

    constructor(
        private _visitaMuestraService: VisitaMuestraService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        if (route.params.id_visita_muestra) {
            return this._visitaMuestraService.get(route.params.id_visita_muestra);
        } else {
            return null;
        }
    }
}
