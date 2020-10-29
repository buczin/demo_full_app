import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmAddFormComponent } from './film-add-form.component';

describe('FilmAddFormComponent', () => {
  let component: FilmAddFormComponent;
  let fixture: ComponentFixture<FilmAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
