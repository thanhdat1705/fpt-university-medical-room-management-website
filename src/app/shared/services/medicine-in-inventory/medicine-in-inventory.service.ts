import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SearchRequest, SearchRequestWithGroupByAndInclude, ValueCompare } from '../../requests/search-request';
import { GeneralHelperService } from '../general-helper.service';
import { SummaryService } from '../summary.service';

@Injectable({
  providedIn: 'root'
})
export class MedicineInInventoryService {
  MedicineInInventorySearchValueMap: Map<string, ValueCompare> = new Map

  medicineIdValueCompare: ValueCompare = {
    value: '',
    compare: 'Equals'
  }
 
  medicineInInventorySearchRequest = new SearchRequestWithGroupByAndInclude(1,0,'',0,this.MedicineInInventorySearchValueMap, "quantity, medicine.name, medicine.medicineClassification, medicine.medicineSubgroup, medicine.medicineUnit", null, null);

  constructor(
    private summaryService: SummaryService,
    private generalService: GeneralHelperService,
    private router: Router
  ) { }


  getMedicineInInventory(id: any){
    this.generalService.setValueCompare(id,this.medicineIdValueCompare,"medicineId",this.MedicineInInventorySearchValueMap);


    this.summaryService.searchMedicineInInventory(this.medicineInInventorySearchRequest).subscribe(
        (response) => {
          this.router.navigate(['/batch-medicine-management/batch-of-medicine', id], {
            fragment: response.data.data[0]
          });
          console.log(response.data);
        },
        (error) => {
          this.router.navigate(['/batch-medicine-management/medicine-in-inventory']);
          console.log(error);
          this.generalService.createErrorNotification(error);
        }
      )
  }
}
