import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddUpdateUsedFilmComponent } from './form-add-update-used-film.component';

describe('FormAddUpdateUsedFilmComponent', () => {
  let component: FormAddUpdateUsedFilmComponent;
  let fixture: ComponentFixture<FormAddUpdateUsedFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAddUpdateUsedFilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddUpdateUsedFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
