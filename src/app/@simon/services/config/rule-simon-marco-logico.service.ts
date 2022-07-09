import { Injectable } from '@angular/core';

import { Enum } from 'src/app/core/models/enum/enum';
import { Rol } from 'src/app/core/models/rol/rol';

import { AuthService } from './../../../core/services/auth/auth.service';

import { environmentBusinessRules } from './../../../../environments/environment-business-rules';
import { Subscription } from 'rxjs';
import { MarcoLogico } from '@core/models/marco-logico/marco-logico';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RuleSimonMarcoLogicoService {

    rolSedeUser: Rol;
    environmentBusinessRules = environmentBusinessRules;

    subscriptions: Subscription = new Subscription();
    // --------------------------------

    constructor(
        private _authService: AuthService
    ) {
        this.subscriptions.add(_authService.rolSede$.subscribe((value) => {
            this.rolSedeUser = value;
        }));
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
    getRule(rule: string) {
        return environmentBusinessRules.rules[rule].roles.find(x => x.rol === this.rolSedeUser.codigoRol);
    }
    // PARA ['MARCO-LOGICO', 'PLAN-MONITOREO']
    getType(rule: string, type: string) {
        const currentRule = environmentBusinessRules.rules[rule].roles.find(x => x.rol === this.rolSedeUser.codigoRol);
        return currentRule.types.find(x => x.type === type);
    }
    getTypes(rule: string, enums: Enum[]) {
        const currentRule = environmentBusinessRules.rules[rule].roles.find(x => x.rol === this.rolSedeUser.codigoRol);
        return enums.filter(x => currentRule.types.some(y => y.type === x.id));
    }
    getTypesWithTypes(rule: string, enums: Enum[], types: any[]) {
        return enums.filter(x => types.some(y => y.type === x.id));
    }
    // validations
    fnIsAuthorize(marcoLogico: MarcoLogico) {
        const rule = this.getRule(environmentBusinessRules.typeRules.marcoLogico);
        // si el usuario tiene permitido ver y/o editar el tipo de marco lógico del marcoLogico
        if (rule.types.some(x => x.type === marcoLogico.enuTipo)) {
            if (marcoLogico.enuTipo === environment.enums.configuracion.tipoMarcoLogico.children.nacional) {
                return true;
            } else {
                // validar sólo que pueda observar lo que corresponde a su sede
                if (marcoLogico.sede.codigoSede === this.rolSedeUser.codigoSede) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }
    // ---------------------------------------------
}
