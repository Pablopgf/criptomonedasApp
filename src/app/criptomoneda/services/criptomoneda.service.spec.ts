import { TestBed } from '@angular/core/testing';

import { CriptomonedaService } from './criptomoneda.service';

describe('CriptomonedaService', () => {
  let service: CriptomonedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriptomonedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
