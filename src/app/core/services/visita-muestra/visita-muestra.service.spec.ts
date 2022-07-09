import { TestBed } from '@angular/core/testing';

import { VisitaMuestraService } from './visita-muestra.service';

describe('VisitaMuestraService', () => {
  let service: VisitaMuestraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitaMuestraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
