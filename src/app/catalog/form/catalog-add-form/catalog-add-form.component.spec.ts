import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogAddFormComponent } from './catalog-add-form.component';

describe('CatalogAddFormComponent', () => {
  let component: CatalogAddFormComponent;
  let fixture: ComponentFixture<CatalogAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
