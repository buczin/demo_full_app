import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAddFormComponent } from './system-add-form.component';

describe('SystemAddFormComponent', () => {
  let component: SystemAddFormComponent;
  let fixture: ComponentFixture<SystemAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
