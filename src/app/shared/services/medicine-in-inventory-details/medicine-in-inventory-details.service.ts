import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralHelperService } from '../general-helper.service';
import { SummaryService } from '../summary.service';

@Injectable({
  providedIn: 'root'
})
export class MedicineInInventoryDetailsService {
  param = "id, quantity, createdDate, importMedicine, medicine, medicine.medicineClassification,medicine.medicineSubgroup, importMedicine.importBatch, periodicInventory";

  constructor(
    private summaryService: SummaryService,
    private router: Router,
    private generalService: GeneralHelperService
  ) { }

  getMedicineInInventoryDetails(idBatch: string, idMedicine: string) {
    this.summaryService.getMedicineInInventoryDetails(idBatch, this.param).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/batch-medicine-management/batch-of-medicine-details', idBatch], {
          fragment: response.data
        });
        console.log(response.data);
      },
      (error) => {
        this.router.navigate(['/batch-medicine-management/batch-of-medicine', idMedicine]);
        console.log(error);
        this.generalService.createErrorNotification(error);
      }
    );
  }
}
