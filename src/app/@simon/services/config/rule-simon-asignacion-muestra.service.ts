import { Injectable } from '@angular/core';

import { Enum } from 'src/app/core/models/enum/enum';
import { Rol } from 'src/app/core/models/rol/rol';

import { AuthService } from './../../../core/services/auth/auth.service';

import { environmentBusinessRules } from './../../../../environments/environment-business-rules';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RuleSimonAsignacionMuestraService {

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
  getRuleForMonitor(monitor: string, rule: string) {
    return environmentBusinessRules.rules[rule].monitor.find(x => x.monitor === monitor);
  }
  getRuleForMuestra(muestra: string, rule: string) {
    return environmentBusinessRules.rules[rule].muestra.find(x => x.muestra === muestra);
  }
  // ---------------------------------------------
}
