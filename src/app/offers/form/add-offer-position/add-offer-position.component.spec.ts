import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfferPositionComponent } from './add-offer-position.component';

describe('AddOfferPositionComponent', () => {
  let component: AddOfferPositionComponent;
  let fixture: ComponentFixture<AddOfferPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOfferPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOfferPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
