import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutInsertBatchGuard } from '../shared/guards/checkout-insert-batch.guard';
import { AddBatchMedicineComponent } from './batch-medicine-list/add-batch-medicine/add-batch-medicine.component';
import { BatchMedicineListComponent } from './batch-medicine-list/batch-medicine-list.component';
import { EliminateMedicineComponent } from './medicine-elimination/eliminate-medicine.component';
import { ViewEliminatedMedicineDetailsComponent } from './medicine-elimination/view-eliminated-medicine-details/view-eliminated-medicine-details.component';
import { ViewEliminatedMedicineComponent } from './medicine-elimination/view-eliminated-medicine/view-eliminated-medicine.component';

const routes: Routes = [
  {
    path: 'batch-medicine-list',
    component: BatchMedicineListComponent,
    data: {
      title: 'Danh sách lô nhập'
    },
  },
  {
    path: 'batch-medicine-list/add-import-batch',
    component: AddBatchMedicineComponent,
    data: {
      title: 'Thêm lô nhập'
    },
    canDeactivate: [CheckoutInsertBatchGuard]
  },
  {
    path: 'eliminate-medicine',
    component: EliminateMedicineComponent
  },
  {
    path: 'eliminated-medicines-list',
    component: ViewEliminatedMedicineComponent
  },
  {
    path: 'eliminated-medicine-details/:id',
    component: ViewEliminatedMedicineDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchMedicineManagementRoutingModule { }
