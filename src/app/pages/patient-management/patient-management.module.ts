import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientManagementRoutingModule } from './patient-management-routing.module';
import { ViewPatientListComponent } from './view-patient-list/view-patient-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ViewPatientListComponent],
  imports: [
    CommonModule,
    SharedModule.forChild(),
    PatientManagementRoutingModule
  ]
})
export class PatientManagementModule { }
