import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferParamComponent } from './offer-param.component';

describe('OfferParamComponent', () => {
  let component: OfferParamComponent;
  let fixture: ComponentFixture<OfferParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferParamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
