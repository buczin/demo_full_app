import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPositionFormComponent } from './order-position-form.component';

describe('OrderPositionFormComponent', () => {
  let component: OrderPositionFormComponent;
  let fixture: ComponentFixture<OrderPositionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPositionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPositionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
