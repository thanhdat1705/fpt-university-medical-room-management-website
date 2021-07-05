import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutInsertTreatmentGuard } from 'src/app/shared/guards/checkout-insert-treatment.guard';
import { CheckoutUpdateTreatmentGuard } from 'src/app/shared/guards/checkout-update-treatment.guard';
import { AddBatchMedicineComponent } from '../batch-medicine-management/batch-medicine-list/add-batch-medicine/add-batch-medicine.component';
import { AddTreatmentInformationComponent } from './add-treatment-information/add-treatment-information.component';
import { ViewTreatmentInformationListComponent } from './view-treatment-information-list/view-treatment-information-list.component';
import { ViewTreatmentInformationComponent } from './view-treatment-information-list/view-treatment-information/view-treatment-information.component';
import { ViewTreatmentInformationPeriodicReportComponent } from './view-treatment-information-periodic-report/view-treatment-information-periodic-report.component';


const routes: Routes = [
  {
    path: 'add-treatment-information',
    component: AddTreatmentInformationComponent,
    data: {
      title: "Tạo đơn điều trị"
    },
    canDeactivate: [CheckoutInsertTreatmentGuard]

  },
  {
    path: 'treatment-information-list',
    component: ViewTreatmentInformationListComponent,
    data: {
      title: "Danh sách đơn điều trị"
    }
  },
  {
    path: 'treatment-information/:id',
    component: ViewTreatmentInformationComponent,
    data: {
      title: "Đơn điều trị"
    },
    canDeactivate: [CheckoutUpdateTreatmentGuard]

  },
  {
    path: 'treatment-information-periodc-report',
    component: ViewTreatmentInformationPeriodicReportComponent,
    data: {
      title: "Báo cáo cấp phát thuốc"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatmentInformationManagementRoutingModule { }
