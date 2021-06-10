import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchMedicineManagementRoutingModule } from './batch-medicine-management-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BatchMedicineListComponent } from './batch-medicine-list/batch-medicine-list.component';
import { AddBatchMedicineComponent } from './batch-medicine-list/add-batch-medicine/add-batch-medicine.component';


@NgModule({
  declarations: [
    BatchMedicineListComponent,
    AddBatchMedicineComponent
  ],
  imports: [
    CommonModule,
    BatchMedicineManagementRoutingModule,
    SharedModule.forChild(),
  ]
})
export class BatchMedicineManagementModule { }
