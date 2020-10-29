import { TestBed } from '@angular/core/testing';

import { ProductionServiceService } from './production-service.service';

describe('ProductionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductionServiceService = TestBed.get(ProductionServiceService);
    expect(service).toBeTruthy();
  });
});
