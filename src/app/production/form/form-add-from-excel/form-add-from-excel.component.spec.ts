import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddFromExcelComponent } from './form-add-from-excel.component';

describe('FormAddFromExcelComponent', () => {
  let component: FormAddFromExcelComponent;
  let fixture: ComponentFixture<FormAddFromExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAddFromExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddFromExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
