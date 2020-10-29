import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOffersComponent } from './main-offers.component';

describe('MainOffersComponent', () => {
  let component: MainOffersComponent;
  let fixture: ComponentFixture<MainOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
