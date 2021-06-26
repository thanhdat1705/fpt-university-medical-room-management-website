import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { MedicineInInventoryDetailsResponse } from 'src/app/shared/responses/medicine-in-inventory-details/medicine-in-inventory-details';
import { MedicineInInventoryResponse } from 'src/app/shared/responses/medicine-in-inventory/medicine-in-inventory';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { SummaryService } from 'src/app/shared/services/summary.service';

@Component({
  selector: 'app-view-batch-of-the-medicine',
  templateUrl: './view-batch-of-the-medicine.component.html',
  styleUrls: ['./view-batch-of-the-medicine.component.scss']
})
export class ViewBatchOfTheMedicineComponent implements OnInit {
  id: any;
  medicineInInventoryDetails: MedicineInInventoryDetailsResponse[];
  loading = false;
  MedicineInInventoryDetailsSearchRecord: Record<string, ValueCompare> = {}
  total = 0;
  pageSize = 10;
  pageIndex = 1;
  medicineInInventoryDetailsSearchRequest: SearchRequest = {
    limit: this.pageSize,
    page: this.pageIndex,
    searchValue: this.MedicineInInventoryDetailsSearchRecord,
    selectFields: "id, medicineId, medicine.Name, quantity, importMedicine,importMedicine.importBbatch , medicine.medicineUnit",
    sortField: "importMedicine.ExpirationDate",
    sortOrder: 0
  }


  medicineIdValueCompare: ValueCompare = {
    value: '',
    compare: 'Equals'
  }

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    this.searchMedicineInInventoryDetails();
  }

  constructor(private summaryService: SummaryService,
    private activatedroute: ActivatedRoute,
    private generalService: GeneralHelperService
  ) {

  }

  searchMedicineInInventoryDetails() {
    // this.generalService.openWaitingPopupNz()
    this.generalService.getValueCompare(this.id, this.medicineIdValueCompare, 'medicineId', this.MedicineInInventoryDetailsSearchRecord);
    this.summaryService.searchMedicineInInventoryDetails(this.medicineInInventoryDetailsSearchRequest).subscribe(
      (response) => {
        this.getData(response.data);
      }, (error) => {
        console.log(error);
      }
    );
  }

  getData(response: ResponseSearch) {
    if (response.info.page > 1 && response.data.length == 0) {
      this.medicineInInventoryDetailsSearchRequest.page = this.medicineInInventoryDetailsSearchRequest.page - 1;
      console.log("back 1 page");
      this.searchMedicineInInventoryDetails();
      return;
    }
    this.medicineInInventoryDetails = response.data;
    this.total = response.info.totalRecord;
    console.log(this.medicineInInventoryDetails);
  }
}
