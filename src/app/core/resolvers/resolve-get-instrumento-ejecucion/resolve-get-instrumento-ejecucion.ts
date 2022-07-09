// resolver.ts
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
// services
import { InstrumentoService } from '../../../core/services/instrumento/instrumento.service';
// models
import { Instrumento } from '../../../core/models/instrumento/instrumento';

@Injectable()
export class ResolverGetInstrumentoEjecucion implements Resolve<any> {

    constructor(
        private _instrumentoService: InstrumentoService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        if (route.params.id_instrumento) {
            return this._instrumentoService.getFromEjecucion(route.params.id_instrumento);
        } else {
            return null;
        }
    }
}
