import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFvNumberComponent } from './form-fv-number.component';

describe('FormFvNumberComponent', () => {
  let component: FormFvNumberComponent;
  let fixture: ComponentFixture<FormFvNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFvNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFvNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
