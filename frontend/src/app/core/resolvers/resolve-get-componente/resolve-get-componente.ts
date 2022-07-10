// resolver.ts
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
// services
import { ComponenteService } from '../../../core/services/componente/componente.service';

// models
import { Componente } from '../../../core/models/componente/componente';

@Injectable()
export class ResolveGetComponente implements Resolve<any> {

    constructor(
        private _componenteService: ComponenteService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        if (route.params.id_componente) {
            return this._componenteService.get(route.params.id_componente);
        } else {
            return null;
        }
    }
}
