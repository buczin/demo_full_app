import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMycompanyComponent } from './form-mycompany.component';

describe('FormMycompanyComponent', () => {
  let component: FormMycompanyComponent;
  let fixture: ComponentFixture<FormMycompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMycompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMycompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
