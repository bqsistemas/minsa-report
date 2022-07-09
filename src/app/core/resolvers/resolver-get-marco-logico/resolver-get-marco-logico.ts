// resolver.ts
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// services
import { MarcoLogicoService } from '../../../core/services/marco-logico/marco-logico.service';
import { RuleSimonMarcoLogicoService } from 'src/app/@simon/services/config/rule-simon-marco-logico.service';
// models
import { MarcoLogico } from '../../../core/models/marco-logico/marco-logico';

@Injectable()
export class ResolverGetMarcoLogico implements Resolve<any> {

    constructor(
        private _marcoLogicoService: MarcoLogicoService,
        private _ruleMarcoLogicoService: RuleSimonMarcoLogicoService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        if (route.params.id_marco) {
            // resolvemos y validamos que el marco pueda ser legible por el usuario en sesión
            return this._marcoLogicoService.getResolve(route.params.id_marco).pipe(
                map((marco: MarcoLogico) => {
                    const result = this._ruleMarcoLogicoService.fnIsAuthorize(marco);
                    if (result) {
                        return marco;
                    } else {
                        debugger;
                        this.router.navigate(['/pages/401']);
                        return null;
                    }
                })
            );
        } else {
            return null;
        }
    }
}
