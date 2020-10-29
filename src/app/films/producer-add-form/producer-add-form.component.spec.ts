import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerAddFormComponent } from './producer-add-form.component';

describe('ProducerAddFormComponent', () => {
  let component: ProducerAddFormComponent;
  let fixture: ComponentFixture<ProducerAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducerAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
