import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicineManagementRoutingModule } from './medicine-management-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddMedicineComponent } from './medicine-list/add-medicine/add-medicine.component';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineService } from '../shared/services/medicine/medicine.service';
import { MedicineUnitListComponent } from './medicine-unit-list/medicine-unit-list.component';
import { MedicineSubgroupListComponent } from './medicine-subgroup-list/medicine-subgroup-list.component';
import { MedicineClassificationListComponent } from './medicine-classification-list/medicine-classification-list.component';


@NgModule({
  declarations: [
    AddMedicineComponent,
    MedicineListComponent,
    MedicineUnitListComponent,
    MedicineSubgroupListComponent,
    MedicineClassificationListComponent
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
