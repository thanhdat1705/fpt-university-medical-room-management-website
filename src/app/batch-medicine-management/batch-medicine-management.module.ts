import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { BatchMedicineManagementRoutingModule } from './batch-medicine-management-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BatchMedicineListComponent } from './batch-medicine-list/batch-medicine-list.component';
import { AddBatchMedicineComponent } from './batch-medicine-list/add-batch-medicine/add-batch-medicine.component';
import { MedicineService } from '../shared/services/medicine/medicine.service';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
registerLocaleData(localeVi);

@NgModule({
  declarations: [
    BatchMedicineListComponent,
    AddBatchMedicineComponent
  ],
  imports: [
    CommonModule,
    BatchMedicineManagementRoutingModule,
    SharedModule.forChild(),
  ],
  providers: [
    MedicineService,
    CurrencyPipe,
    { provide: LOCALE_ID, useValue: 'vi' },
  ]
})
export class BatchMedicineManagementModule { }
