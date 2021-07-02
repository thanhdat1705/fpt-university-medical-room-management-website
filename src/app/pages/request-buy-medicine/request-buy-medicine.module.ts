import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RequestBuyMedicineRoutingModule } from './request-buy-medicine-routing.module';
import { BuyMedicineListComponent } from './buy-medicine-list/buy-medicine-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateRequestComponent } from './buy-medicine-list/create-request/create-request.component';
import { CheckOutRequestBuyMedicineGuard } from '../../shared/guards/check-out-request-buy-medicine.guard';
import { AddMedicineRequestComponent } from './buy-medicine-list/create-request/add-medicine-request/add-medicine-request.component';
import { DetailBuyMedicineComponent } from './buy-medicine-list/detail-buy-medicine/detail-buy-medicine.component';
import { UpdateMedicineRequestComponent } from './buy-medicine-list/update-medicine-request/update-medicine-request.component';
import { CheckOutUpdateRequestBuyMedicineGuard } from '../../shared/guards/check-out-update-request-buy-medicine.guard';


@NgModule({
  declarations: [ 
    BuyMedicineListComponent, 
    CreateRequestComponent, 
    AddMedicineRequestComponent, 
    DetailBuyMedicineComponent, 
    UpdateMedicineRequestComponent
  ],
  imports: [
    CommonModule,
    RequestBuyMedicineRoutingModule,
    SharedModule.forChild(),
  ],
  providers: [
    CheckOutRequestBuyMedicineGuard,
    CheckOutUpdateRequestBuyMedicineGuard,
  ]
})
export class RequestBuyMedicineModule { }
