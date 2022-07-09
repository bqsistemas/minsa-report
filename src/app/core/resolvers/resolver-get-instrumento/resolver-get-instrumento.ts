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
export class ResolverGetInstrumento implements Resolve<any> {

    constructor(
        private _instrumentoService: InstrumentoService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        if (route.params.id_instrumento) {
            return this._instrumentoService.get(route.params.id_instrumento);
        } else {
            return null;
        }
    }
}
