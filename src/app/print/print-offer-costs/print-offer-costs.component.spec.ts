import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintOfferCostsComponent } from './print-offer-costs.component';

describe('PrintOfferCostsComponent', () => {
  let component: PrintOfferCostsComponent;
  let fixture: ComponentFixture<PrintOfferCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintOfferCostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintOfferCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
