import { Component, OnInit } from '@angular/core';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { EliminatedMedicineResponse } from 'src/app/shared/responses/eliminated-medicine-response';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';
import { SummaryService } from 'src/app/shared/services/summary.service';


@Component({
  selector: 'app-view-eliminated-medicine',
  templateUrl: './view-eliminated-medicine.component.html',
  styleUrls: ['./view-eliminated-medicine.component.scss']
})

export class ViewEliminatedMedicineComponent implements OnInit {

  searchFields = "Id, Quantity, CreateDate, Reason, Medicine.Name, Medicine.MedicineUnit, BatchMedicineInInventory";
  eliminatedMedicineList: EliminatedMedicineResponse[];
  loading = false;
  pageSize = 10;
  pageIndex = 1;
  total = 0;

  searchEliminatedMedicineRequest: SearchRequest = {
    limit: this.pageSize,
    page: this.pageIndex,
    sortField: '',
    sortOrder: 0,
    searchValue: null,
    selectFields: this.searchFields,
  }

  searchRecord: Record<string, ValueCompare> = {};

  constructor(
    private summaryService: SummaryService,
    private medicineService: MedicineService
    ) { }

  ngOnInit(): void {
    this.searchEliminatedMedicine();
  }

  searchEliminatedMedicine() {
    this.summaryService.searchEliminateMedicine(this.searchEliminatedMedicineRequest).subscribe(
      (response) => {
        this.getData(response.data);
        console.log(this.eliminatedMedicineList);
      }, (error) => {
        console.log(error);
      }
    );
  }

  deletedEliminatedMedicine(id: any) {
    this.summaryService.deleteEliminatedMedicineDetails(id).subscribe(
      (response) => {
        this.getData(response.data);
        this.searchEliminatedMedicine();
      }, (error) => {
        console.log(error);
      }
    );
  }

  getData(responseData: ResponseSearch) {
    if (responseData.data.length == 0 && responseData.info.page > 1) {
      this.searchEliminatedMedicineRequest.page = this.searchEliminatedMedicineRequest.page - 1;
      console.log("back 1 page");
      this.searchEliminatedMedicine();
      return;
    }
    this.eliminatedMedicineList = responseData.data;
    console.log('medicine list' + JSON.stringify(this.eliminatedMedicineList));
    this.total = responseData.info.totalRecord;
    console.log('total: ' + this.total);
  }

  

}
