import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchMedicineListComponent } from './batch-medicine-list/batch-medicine-list.component';

const routes: Routes = [
  {
    path: 'batch-medicine-list',
    component: BatchMedicineListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchMedicineManagementRoutingModule { }
