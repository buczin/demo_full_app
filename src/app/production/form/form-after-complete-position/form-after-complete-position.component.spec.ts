import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAfterCompletePositionComponent } from './form-after-complete-position.component';

describe('FormAfterCompletePositionComponent', () => {
  let component: FormAfterCompletePositionComponent;
  let fixture: ComponentFixture<FormAfterCompletePositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAfterCompletePositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAfterCompletePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
