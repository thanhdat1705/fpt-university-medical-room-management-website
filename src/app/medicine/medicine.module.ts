import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicineRoutingModule } from './medicine-routing.module';
import { InsertMedicineComponent } from './insert-medicine/insert-medicine.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [InsertMedicineComponent],
  exports:[
    InsertMedicineComponent,
  ],
  imports: [
    CommonModule,
    MedicineRoutingModule,
    SharedModule.forChild(),
  ]
})
export class MedicineModule { }
