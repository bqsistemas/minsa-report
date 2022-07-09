import { TestBed } from '@angular/core/testing';

import { MarcoLogicoService } from './marco-logico.service';

describe('MarcoLogicoService', () => {
  let service: MarcoLogicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcoLogicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
