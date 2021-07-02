import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutRequestBuyMedicineGuard } from '../../shared/guards/check-out-request-buy-medicine.guard';
import { CheckOutUpdateRequestBuyMedicineGuard } from '../../shared/guards/check-out-update-request-buy-medicine.guard';
import { BuyMedicineListComponent } from './buy-medicine-list/buy-medicine-list.component';
import { CreateRequestComponent } from './buy-medicine-list/create-request/create-request.component';
import { DetailBuyMedicineComponent } from './buy-medicine-list/detail-buy-medicine/detail-buy-medicine.component';
import { UpdateMedicineRequestComponent } from './buy-medicine-list/update-medicine-request/update-medicine-request.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'buy-medicine-list',
    pathMatch: 'full'
  },
  {
    path: 'buy-medicine-list',
    component: BuyMedicineListComponent,
  },
  {
    path: 'buy-medicine-list/create-request',
    component: CreateRequestComponent,
    data: {
      title: 'Tạo yêu cầu'
    },
    canDeactivate: [CheckOutRequestBuyMedicineGuard]
  },
  {
    path: 'buy-medicine-list/detail-request/:id',
    component: DetailBuyMedicineComponent,
    data: {
      title: 'Chi tiết yêu cầu'
    }
  },
  {
    path: 'buy-medicine-list/update-request/:id',
    component: UpdateMedicineRequestComponent,
    data: {
      title: 'Cập nhật yêu cầu'
    },
    canDeactivate: [CheckOutUpdateRequestBuyMedicineGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestBuyMedicineRoutingModule { }
