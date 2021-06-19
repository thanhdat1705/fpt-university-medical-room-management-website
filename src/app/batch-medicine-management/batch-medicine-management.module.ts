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
import { EliminateMedicineComponent } from './medicine-elimination/eliminate-medicine.component';
import { ViewEliminatedMedicineComponent } from './medicine-elimination/view-eliminated-medicine/view-eliminated-medicine.component';
import { ViewEliminatedMedicineDetailsComponent } from './medicine-elimination/view-eliminated-medicine-details/view-eliminated-medicine-details.component';
import { MedicineInInventoryListComponent } from './medicine-in-inventory-list/medicine-in-inventory-list.component';
import { MedicineInInventoryDetailsComponent } from './medicine-in-inventory-list/medicine-in-inventory-details/medicine-in-inventory-details.component';


@NgModule({
  declarations: [
    BatchMedicineListComponent,
    AddBatchMedicineComponent,
    EliminateMedicineComponent,
    ViewEliminatedMedicineComponent,
    ViewEliminatedMedicineDetailsComponent,
    MedicineInInventoryListComponent,
    MedicineInInventoryDetailsComponent,
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
