import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchMedicineListComponent } from './batch-medicine-list/batch-medicine-list.component';
import { EliminateMedicineComponent } from './medicine-elimination/eliminate-medicine.component';
import { ViewEliminatedMedicineDetailsComponent } from './medicine-elimination/view-eliminated-medicine-details/view-eliminated-medicine-details.component';
import { ViewEliminatedMedicineComponent } from './medicine-elimination/view-eliminated-medicine/view-eliminated-medicine.component';
import { MedicineInInventoryDetailsComponent } from './medicine-in-inventory-list/medicine-in-inventory-details/medicine-in-inventory-details.component';
import { MedicineInInventoryListComponent } from './medicine-in-inventory-list/medicine-in-inventory-list.component';

const routes: Routes = [
  {
    path: 'batch-medicine-list',
    component: BatchMedicineListComponent
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
  {
    path: 'medicine-in-inventory',
    component: MedicineInInventoryListComponent
  },
  {
    path: 'medicine-in-inventory-details/:id',
    component: MedicineInInventoryDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchMedicineManagementRoutingModule { }
