import { TestBed } from '@angular/core/testing';

import { ItemInstrumentoService } from './item-instrumento.service';

describe('ItemInstrumentoService', () => {
  let service: ItemInstrumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemInstrumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
