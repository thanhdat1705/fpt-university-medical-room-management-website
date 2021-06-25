import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBatchMedicineComponent } from '../batch-medicine-management/batch-medicine-list/add-batch-medicine/add-batch-medicine.component';
import { AddTreatmentInformationComponent } from './add-treatment-information/add-treatment-information.component';


const routes: Routes = [
  {
    path: 'add-treatment-information',
    component: AddTreatmentInformationComponent,
    data: {
      title: "Tạo đơn điều trị"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatmentInformationManagementRoutingModule { }
