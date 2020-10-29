import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClientHelpersComponent } from './update-client-helpers.component';

describe('UpdateClientHelpersComponent', () => {
  let component: UpdateClientHelpersComponent;
  let fixture: ComponentFixture<UpdateClientHelpersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateClientHelpersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateClientHelpersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
