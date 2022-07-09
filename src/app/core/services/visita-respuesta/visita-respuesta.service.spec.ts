import { TestBed } from '@angular/core/testing';

import { VisitaRespuestaService } from './visita-respuesta.service';

describe('VisitaRespuestaService', () => {
  let service: VisitaRespuestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitaRespuestaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
