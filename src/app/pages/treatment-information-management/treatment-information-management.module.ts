import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { TreatmentInformationManagementRoutingModule } from './treatment-information-management-routing.module';
import { AddTreatmentInformationComponent } from './add-treatment-information/add-treatment-information.component';
import { TreatmentInformationDetailsComponent } from './add-treatment-information/treatment-information-details/treatment-information-details.component';
import { ViewTreatmentInformationListComponent } from './view-treatment-information-list/view-treatment-information-list.component';
import { ViewTreatmentInformationComponent } from './view-treatment-information-list/view-treatment-information/view-treatment-information.component';
import { ViewTreatmentInformationPeriodicReportComponent } from './view-treatment-information-periodic-report/view-treatment-information-periodic-report.component';
import { CheckoutUpdateTreatmentGuard } from 'src/app/shared/guards/checkout-update-treatment.guard';
import { ViewPatientTreatmentHistoryComponent } from './view-patient-treatment-history/view-patient-treatment-history.component';
import { PatientTreatmentDetailsComponent } from './view-patient-treatment-history/patient-treatment-details/patient-treatment-details.component'

@NgModule({
  declarations: [
    AddTreatmentInformationComponent, 
    TreatmentInformationDetailsComponent, 
    ViewTreatmentInformationListComponent, 
    ViewTreatmentInformationComponent, 
    ViewTreatmentInformationPeriodicReportComponent, 
    ViewPatientTreatmentHistoryComponent, PatientTreatmentDetailsComponent
  ],
  
  imports: [
    CommonModule,
    SharedModule.forChild(),
    TreatmentInformationManagementRoutingModule
  ],
  providers: [
    CheckoutUpdateTreatmentGuard
  ]
})
export class TreatmentInformationManagementModule { }
