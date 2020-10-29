import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFilmBuyCostComponent } from './update-film-buy-cost.component';

describe('UpdateFilmBuyCostComponent', () => {
  let component: UpdateFilmBuyCostComponent;
  let fixture: ComponentFixture<UpdateFilmBuyCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFilmBuyCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFilmBuyCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
