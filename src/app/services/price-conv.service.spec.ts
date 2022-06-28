import { TestBed } from '@angular/core/testing';

import { PriceConvService } from './price-conv.service';

describe('PriceConvService', () => {
  let service: PriceConvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceConvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
