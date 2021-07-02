import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { BatchMedicineManagementRoutingModule } from './batch-medicine-management-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { BatchMedicineListComponent } from './batch-medicine-list/batch-medicine-list.component';
import { AddBatchMedicineComponent } from './batch-medicine-list/add-batch-medicine/add-batch-medicine.component';
import { MedicineService } from '../../shared/services/medicine/medicine.service';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
registerLocaleData(localeVi);
import { ViewEliminatedMedicineComponent } from './medicine-elimination/view-eliminated-medicine/view-eliminated-medicine.component';
import { EliminateMedicineComponent } from './medicine-elimination/eliminate-medicine.component';
import { ViewEliminatedMedicineDetailsComponent } from './medicine-elimination/view-eliminated-medicine-details/view-eliminated-medicine-details.component';
import { MedicineInInventoryListComponent } from './medicine-in-inventory-list/medicine-in-inventory-list.component';
import { MedicineInInventoryDetailsComponent } from './medicine-in-inventory-list/medicine-in-inventory-details/medicine-in-inventory-details.component';
import { ViewBatchOfTheMedicineComponent } from './medicine-in-inventory-list/view-batch-of-the-medicine/view-batch-of-the-medicine.component';
import { CheckoutInsertBatchGuard } from '../../shared/guards/checkout-insert-batch.guard';
import { DetailBatchMedicineComponent } from './batch-medicine-list/detail-batch-medicine/detail-batch-medicine.component';
import { AddImportMedicineComponent } from './batch-medicine-list/detail-batch-medicine/add-import-medicine/add-import-medicine.component';
import { DetailImportMedicineComponent } from './batch-medicine-list/detail-batch-medicine/detail-import-medicine/detail-import-medicine.component';


@NgModule({
  declarations: [
    BatchMedicineListComponent,
    AddBatchMedicineComponent,
    EliminateMedicineComponent,
    ViewEliminatedMedicineComponent,
    ViewEliminatedMedicineDetailsComponent,
    MedicineInInventoryListComponent,
    MedicineInInventoryDetailsComponent,
    ViewBatchOfTheMedicineComponent,
    DetailBatchMedicineComponent,
    AddImportMedicineComponent,
    DetailImportMedicineComponent,
  ],
  imports: [
    CommonModule,
    BatchMedicineManagementRoutingModule,
    SharedModule.forChild(),
  ],
  providers: [
    MedicineService,
    CurrencyPipe,
    CheckoutInsertBatchGuard,
    { provide: LOCALE_ID, useValue: 'vi' },
  ]
})
export class BatchMedicineManagementModule { }
