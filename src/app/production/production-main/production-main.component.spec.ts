import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMainComponent } from './production-main.component';

describe('ProductionMainComponent', () => {
  let component: ProductionMainComponent;
  let fixture: ComponentFixture<ProductionMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
