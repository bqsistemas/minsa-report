import { TestBed } from '@angular/core/testing';

import { PlanMonitoreoService } from './plan-monitoreo.service';

describe('PlanMonitoreoService', () => {
  let service: PlanMonitoreoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanMonitoreoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
