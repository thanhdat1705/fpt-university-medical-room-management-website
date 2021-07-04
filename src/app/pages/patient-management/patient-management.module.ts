import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientManagementRoutingModule } from './patient-management-routing.module';
import { ViewPatientListComponent } from './view-patient-list/view-patient-list.component';


@NgModule({
  declarations: [ViewPatientListComponent],
  imports: [
    CommonModule,
    PatientManagementRoutingModule
  ]
})
export class PatientManagementModule { }
