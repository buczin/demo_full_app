import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDonePositionComponent } from './form-done-position.component';

describe('FormDonePositionComponent', () => {
  let component: FormDonePositionComponent;
  let fixture: ComponentFixture<FormDonePositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDonePositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDonePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
