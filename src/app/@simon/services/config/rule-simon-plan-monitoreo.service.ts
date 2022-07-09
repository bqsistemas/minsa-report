import { Injectable } from '@angular/core';

import { Enum } from 'src/app/core/models/enum/enum';
import { Rol } from 'src/app/core/models/rol/rol';

import { AuthService } from './../../../core/services/auth/auth.service';

import { environmentBusinessRules } from './../../../../environments/environment-business-rules';
import { Subscription, combineLatest } from 'rxjs';
import { PlanMonitoreo } from '@core/models/plan-monitoreo/plan-monitoreo';
import { environment } from 'src/environments/environment';
import { Institucion } from '@core/models/institucion/institucion';

@Injectable({
  providedIn: 'root'
})
export class RuleSimonPlanMonitoreoService {

  rolSedeUser: Rol;
  institucion: Institucion;
  environmentBusinessRules = environmentBusinessRules;

  subscriptions: Subscription = new Subscription();
  // --------------------------------

  constructor(
    private _authService: AuthService
  ) {
    const computedSubscribe = combineLatest([
      _authService.rolSede$,
      _authService.institucion$
    ]);
    this.subscriptions.add(computedSubscribe.subscribe(([rolSede, institucion]) => {
      this.rolSedeUser = rolSede;
      this.institucion = institucion;
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
  // ---------------------------------------------
  // validations
  fnIsAuthorize(planMonitoreo: PlanMonitoreo) {
    const rule = this.getRule(environmentBusinessRules.typeRules.planMonitoreo);
    console.log(this.rolSedeUser);
    // si el usuario tiene permitido ver y/o editar el tipo de marco lógico del marcoLogico
    if (rule.types.some(x => x.type === planMonitoreo.enuTipo)) {
      if (planMonitoreo.enuTipo === environment.enums.configuracion.tipoPlanMonitoreo.children.nacional) {
        return true;
      } else {
        // validar sólo que pueda observar lo que corresponde a su sede
        if (planMonitoreo.sede.codigoSede === this.rolSedeUser.codigoSede) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }
  fnIsAuthorizeAsignacionMuestra(planMonitoreo: PlanMonitoreo) {
    const isDirector = environmentBusinessRules.rolActorRelations.some(
      x => x.rol === this.rolSedeUser.codigoRol
        && x.actor === environment.enums.configuracion.tipoActor.children.directorIE
    );
    console.log(isDirector);

    console.log(this.institucion);
    // 2 = tipo ugel : si es IIEE se busca planes de la ugel a la que pertenece
    if ((planMonitoreo.sede != null
      && planMonitoreo.sede.codigoSede === (isDirector ? this.institucion.codigoUgel : this.rolSedeUser.codigoSede)
      && planMonitoreo.sede.tipoSede === (isDirector ? 2 : this.rolSedeUser.tipoSede)) // ugel
      || planMonitoreo.sede == null
      || planMonitoreo.ugels.some(y => y.codigoSede === (isDirector ? this.institucion.codigoUgel : this.rolSedeUser.codigoSede)
        && y.tipoSede === (isDirector ? 2 : this.rolSedeUser.tipoSede))) {
      return true;
    } else {
      return false;
    }
  }
}
