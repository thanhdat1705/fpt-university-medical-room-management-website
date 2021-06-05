import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicineManagementRoutingModule } from './medicine-management-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddMedicineComponent } from './medicine-list/add-medicine/add-medicine.component';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineService } from '../shared/services/medicine/medicine.service';


@NgModule({
  declarations: [
    AddMedicineComponent,
    MedicineListComponent
  ],
  imports: [
    CommonModule,
    MedicineManagementRoutingModule,
    SharedModule.forChild(),
  ],
  providers: [
    MedicineService,
  ]
})
export class MedicineManagementModule { }
