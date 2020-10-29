import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionOrderFormUpdateComponent } from './production-order-form-update.component';

describe('ProductionOrderFormUpdateComponent', () => {
  let component: ProductionOrderFormUpdateComponent;
  let fixture: ComponentFixture<ProductionOrderFormUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionOrderFormUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionOrderFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
