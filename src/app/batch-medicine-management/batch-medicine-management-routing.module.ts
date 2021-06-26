import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutInsertBatchGuard } from '../shared/guards/checkout-insert-batch.guard';
import { AddBatchMedicineComponent } from './batch-medicine-list/add-batch-medicine/add-batch-medicine.component';
import { BatchMedicineListComponent } from './batch-medicine-list/batch-medicine-list.component';
import { DetailBatchMedicineComponent } from './batch-medicine-list/detail-batch-medicine/detail-batch-medicine.component';
import { EliminateMedicineComponent } from './medicine-elimination/eliminate-medicine.component';
import { ViewEliminatedMedicineDetailsComponent } from './medicine-elimination/view-eliminated-medicine-details/view-eliminated-medicine-details.component';
import { ViewEliminatedMedicineComponent } from './medicine-elimination/view-eliminated-medicine/view-eliminated-medicine.component';
import { MedicineInInventoryDetailsComponent } from './medicine-in-inventory-list/medicine-in-inventory-details/medicine-in-inventory-details.component';
import { MedicineInInventoryListComponent } from './medicine-in-inventory-list/medicine-in-inventory-list.component';
import { ViewBatchOfTheMedicineComponent } from './medicine-in-inventory-list/view-batch-of-the-medicine/view-batch-of-the-medicine.component';

const routes: Routes = [
  {
    path: 'batch-medicine-list',
    component: BatchMedicineListComponent,
    data: {
      title: 'Danh sách lô nhập'
    },
  },
  {
    path: 'batch-medicine-list/add-batch',
    component: AddBatchMedicineComponent,
    data: {
      title: 'Thêm lô nhập'
    },
    canDeactivate: [CheckoutInsertBatchGuard]
  },
  {
    path: 'batch-medicine-list/detail-batch/:id',
    component: DetailBatchMedicineComponent,
    data: {
      title: 'Chi tiết lô nhập'
    },
  },
  {
    path: 'eliminate-medicine',
    component: EliminateMedicineComponent,
  },
  {
    path: 'eliminated-medicines-list',
    component: ViewEliminatedMedicineComponent,
    data: {
      title: 'Danh sách thuốc đã hủy'
    },
  },
  {
    path: 'eliminated-medicine-details/:id',
    component: ViewEliminatedMedicineDetailsComponent,
    data: {
      title: 'chi tiết thuốc đã hủy'
    },
  },
  {
    path: 'medicine-in-inventory',
    component: MedicineInInventoryListComponent,
    data: {
      title: 'Danh sách thuốc hiện có'
    },
  },
  {
    path: 'batch-of-medicine/:id',
    component: ViewBatchOfTheMedicineComponent,
    data: {
      title: 'Chi tiết thuốc hiện có'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchMedicineManagementRoutingModule { }
