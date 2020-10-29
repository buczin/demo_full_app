import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintOrderProductionComponent } from './print-order-production.component';

describe('PrintOrderProductionComponent', () => {
  let component: PrintOrderProductionComponent;
  let fixture: ComponentFixture<PrintOrderProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintOrderProductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintOrderProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
