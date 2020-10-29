import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOfferPositionComponent } from './update-offer-position.component';

describe('UpdateOfferPositionComponent', () => {
  let component: UpdateOfferPositionComponent;
  let fixture: ComponentFixture<UpdateOfferPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOfferPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOfferPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
