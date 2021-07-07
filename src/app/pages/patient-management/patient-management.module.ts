import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientManagementRoutingModule } from './patient-management-routing.module';
import { ViewPatientListComponent } from './view-patient-list/view-patient-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewPatientTreatmentListComponent } from './view-patient-list/view-patient-treatment-list/view-patient-treatment-list.component';


@NgModule({
  declarations: [ViewPatientListComponent, ViewPatientTreatmentListComponent],
  imports: [
    CommonModule,
    SharedModule.forChild(),
    PatientManagementRoutingModule
  ]
})
export class PatientManagementModule { }
