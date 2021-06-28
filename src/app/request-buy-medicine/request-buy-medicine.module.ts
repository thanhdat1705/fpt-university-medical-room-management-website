import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestBuyMedicineRoutingModule } from './request-buy-medicine-routing.module';
import { BuyMedicineListComponent } from './buy-medicine-list/buy-medicine-list.component';
import { SharedModule } from '../shared/shared.module';
import { CreateRequestComponent } from './buy-medicine-list/create-request/create-request.component';
import { CheckOutRequestBuyMedicineGuard } from '../shared/guards/check-out-request-buy-medicine.guard';
import { AddMedicineRequestComponent } from './buy-medicine-list/create-request/add-medicine-request/add-medicine-request.component';


@NgModule({
  declarations: [ 
    BuyMedicineListComponent, 
    CreateRequestComponent, AddMedicineRequestComponent],
  imports: [
    CommonModule,
    RequestBuyMedicineRoutingModule,
    SharedModule.forChild(),
  ],
  providers: [
    CheckOutRequestBuyMedicineGuard,
  ]
})
export class RequestBuyMedicineModule { }
