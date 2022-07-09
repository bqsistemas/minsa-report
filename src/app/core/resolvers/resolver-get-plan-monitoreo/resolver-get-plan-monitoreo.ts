// resolver.ts
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
// services
import { PlanMonitoreoService } from '../../../core/services/plan-monitoreo/plan-monitoreo.service';
import { RuleSimonPlanMonitoreoService } from 'src/app/@simon/services/config/rule-simon-plan-monitoreo.service';
// models
import { PlanMonitoreo } from '../../../core/models/plan-monitoreo/plan-monitoreo';
import { map } from 'rxjs/operators';

@Injectable()
export class ResolverGetPlanMonitoreo implements Resolve<any> {

    constructor(
        private _planMonitoreoService: PlanMonitoreoService,
        private _rulePlanMonitoreoService: RuleSimonPlanMonitoreoService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        if (route.params.id_plan) {
            return this._planMonitoreoService.getResolve(route.params.id_plan).pipe(
                map((plan: PlanMonitoreo) => {
                    const result = this._rulePlanMonitoreoService.fnIsAuthorize(plan);
                    if (result) {
                        return plan;
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
