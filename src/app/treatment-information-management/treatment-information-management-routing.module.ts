import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBatchMedicineComponent } from '../batch-medicine-management/batch-medicine-list/add-batch-medicine/add-batch-medicine.component';
import { AddTreatmentInformationComponent } from './add-treatment-information/add-treatment-information.component';
import { ViewTreatmentInformationListComponent } from './view-treatment-information-list/view-treatment-information-list.component';
import { ViewTreatmentInformationComponent } from './view-treatment-information-list/view-treatment-information/view-treatment-information.component';


const routes: Routes = [
  {
    path: 'add-treatment-information',
    component: AddTreatmentInformationComponent,
    data: {
      title: "Tạo đơn điều trị"
    }
  },
  {
    path: 'view-treatment-information-list',
    component: ViewTreatmentInformationListComponent,
    data: {
      title: "Danh sách đơn điều trị"
    }
  },
  {
    path: 'view-treatment-information/:id',
    component: ViewTreatmentInformationComponent,
    data: {
      title: "Đơn điều trị"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatmentInformationManagementRoutingModule { }
