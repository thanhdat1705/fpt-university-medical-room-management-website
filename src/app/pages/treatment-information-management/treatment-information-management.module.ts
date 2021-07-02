import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { TreatmentInformationManagementRoutingModule } from './treatment-information-management-routing.module';
import { AddTreatmentInformationComponent } from './add-treatment-information/add-treatment-information.component';
import { TreatmentInformationDetailsComponent } from './add-treatment-information/treatment-information-details/treatment-information-details.component';
import { ViewTreatmentInformationListComponent } from './view-treatment-information-list/view-treatment-information-list.component';
import { ViewTreatmentInformationComponent } from './view-treatment-information-list/view-treatment-information/view-treatment-information.component';


@NgModule({
  declarations: [AddTreatmentInformationComponent, TreatmentInformationDetailsComponent, ViewTreatmentInformationListComponent, ViewTreatmentInformationComponent],
  
  imports: [
    CommonModule,
    SharedModule.forChild(),
    TreatmentInformationManagementRoutingModule
  ]
})
export class TreatmentInformationManagementModule { }
