import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTreatmentInformationPeriodicReportComponent } from './view-treatment-information-periodic-report.component';

describe('ViewTreatmentInformationPeriodicReportComponent', () => {
  let component: ViewTreatmentInformationPeriodicReportComponent;
  let fixture: ComponentFixture<ViewTreatmentInformationPeriodicReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTreatmentInformationPeriodicReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTreatmentInformationPeriodicReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
