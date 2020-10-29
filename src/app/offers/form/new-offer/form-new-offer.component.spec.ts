import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewOfferComponent } from './form-new-offer.component';

describe('FormNewOfferComponent', () => {
  let component: FormNewOfferComponent;
  let fixture: ComponentFixture<FormNewOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNewOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
