import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPositionFormUpdateComponent } from './order-position-form-update.component';

describe('OrderPositionFormUpdateComponent', () => {
  let component: OrderPositionFormUpdateComponent;
  let fixture: ComponentFixture<OrderPositionFormUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPositionFormUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPositionFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
