import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChangeOrderStatusComponent } from './form-change-order-status.component';

describe('FormChangeOrderStatusComponent', () => {
  let component: FormChangeOrderStatusComponent;
  let fixture: ComponentFixture<FormChangeOrderStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormChangeOrderStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChangeOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
