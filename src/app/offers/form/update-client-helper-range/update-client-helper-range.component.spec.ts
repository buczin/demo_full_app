import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClientHelperRangeComponent } from './update-client-helper-range.component';

describe('UpdateClientHelperRangeComponent', () => {
  let component: UpdateClientHelperRangeComponent;
  let fixture: ComponentFixture<UpdateClientHelperRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateClientHelperRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateClientHelperRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
