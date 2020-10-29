import { TestBed } from '@angular/core/testing';

import { PrintOfferService } from './print-offer.service';

describe('PrintOfferService', () => {
  let service: PrintOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
