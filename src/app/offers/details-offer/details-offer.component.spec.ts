import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOfferComponent } from './details-offer.component';

describe('DetailsOfferComponent', () => {
  let component: DetailsOfferComponent;
  let fixture: ComponentFixture<DetailsOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
