import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutRequestBuyMedicineGuard } from '../shared/guards/check-out-request-buy-medicine.guard';
import { BuyMedicineListComponent } from './buy-medicine-list/buy-medicine-list.component';
import { CreateRequestComponent } from './buy-medicine-list/create-request/create-request.component';

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
    path: 'create-request',
    component: CreateRequestComponent,
    data: {
      title: 'Tạo yêu cầu'
    },
    canDeactivate: [CheckOutRequestBuyMedicineGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestBuyMedicineRoutingModule { }
