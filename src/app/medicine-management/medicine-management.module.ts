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
import { DetailsMedicineComponent } from './medicine-list/details-medicine/details-medicine.component';
import { CheckoutDetailMedicineGuard } from '../shared/guards/checkout-detail-medicine.guard';
import { CheckoutInsertMedicineGuard } from '../shared/guards/checkout-insert-medicine.guard';


@NgModule({
  declarations: [
    AddMedicineComponent,
    MedicineListComponent,
    MedicineUnitListComponent,
    MedicineSubgroupListComponent,
    MedicineClassificationListComponent,
    DetailsMedicineComponent
  ],
  imports: [
    CommonModule,
    MedicineManagementRoutingModule,
    SharedModule.forChild(),
  ],
  providers: [
    MedicineService,
    CheckoutDetailMedicineGuard,
    CheckoutInsertMedicineGuard
  ]
})
export class MedicineManagementModule { }
