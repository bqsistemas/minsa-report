// resolver.ts
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// services
import { PlanMonitoreoService } from '../../../core/services/plan-monitoreo/plan-monitoreo.service';
import { RuleSimonPlanMonitoreoService } from 'src/app/@simon/services/config/rule-simon-plan-monitoreo.service';
// models
import { PlanMonitoreo } from '../../../core/models/plan-monitoreo/plan-monitoreo';

@Injectable()
export class ResolverGetPlanMonitoreoEjecucionMonitoreo implements Resolve<any> {

    constructor(
        private _planMonitoreoService: PlanMonitoreoService,
        private _rulePlanMonitoreoService: RuleSimonPlanMonitoreoService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        if (route.params.id_plan) {
            return this._planMonitoreoService.getFromEjecucion(route.params.id_plan);
        } else {
            return null;
        }
    }
}
