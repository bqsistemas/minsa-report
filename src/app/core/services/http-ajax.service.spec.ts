import { TestBed } from '@angular/core/testing';

import { HttpAjaxService } from './http-ajax.service';

describe('HttpAjaxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpAjaxService = TestBed.get(HttpAjaxService);
    expect(service).toBeTruthy();
  });
});
