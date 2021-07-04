import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientManagementRoutingModule } from './patient-management-routing.module';
import { PatientManagementComponent } from './patient-management.component';


@NgModule({
  declarations: [PatientManagementComponent],
  imports: [
    CommonModule,
    PatientManagementRoutingModule
  ]
})
export class PatientManagementModule { }
