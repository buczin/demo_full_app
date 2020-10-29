import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintOfferSettingsComponent } from './print-offer-settings.component';

describe('PrintOfferSettingsComponent', () => {
  let component: PrintOfferSettingsComponent;
  let fixture: ComponentFixture<PrintOfferSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintOfferSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintOfferSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
