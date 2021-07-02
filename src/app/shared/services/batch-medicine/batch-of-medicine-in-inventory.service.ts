import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralHelperService } from '../general-helper.service';
import { SummaryService } from '../summary.service';

@Injectable({
  providedIn: 'root'
})
export class BatchOfMedicineInInventoryService {

  param: '';

  constructor(
    private summaryService: SummaryService,
    private router: Router,
    private generalService: GeneralHelperService
  ) { }

  getBatchOfMedicineInInventory(id: any) {
    this.summaryService.getEliminatedMedicineDetails(id, this.param).subscribe(
      (response) => {
        this.router.navigate(['/batch-medicine-management/eliminated-medicine-details', id], {
          fragment: response.data
        });
        console.log(response.data);
      },
      (error) => {
        this.router.navigate(['/batch-medicine-management/eliminated-medicines-list']);
        console.log(error);
        this.generalService.createErrorNotification(error);
      }
    )
  }
}
