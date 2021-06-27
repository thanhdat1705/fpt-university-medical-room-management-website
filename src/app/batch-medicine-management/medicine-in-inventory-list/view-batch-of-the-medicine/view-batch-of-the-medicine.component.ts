import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { MedicineInInventoryDetailsResponse } from 'src/app/shared/responses/medicine-in-inventory-details/medicine-in-inventory-details';
import { MedicineInInventoryResponse } from 'src/app/shared/responses/medicine-in-inventory/medicine-in-inventory';
import { MedicineResponse } from 'src/app/shared/responses/medicine/medicine';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineEliminationService } from 'src/app/shared/services/medicine-elimination/medicine-elimination.service';
import { SummaryService } from 'src/app/shared/services/summary.service';
import { EliminateMedicineComponent } from '../../medicine-elimination/eliminate-medicine.component';

@Component({
  selector: 'app-view-batch-of-the-medicine',
  templateUrl: './view-batch-of-the-medicine.component.html',
  styleUrls: ['./view-batch-of-the-medicine.component.scss']
})
export class ViewBatchOfTheMedicineComponent implements OnInit {
  id: any;
  medicineInInventoryDetails: MedicineInInventoryDetailsResponse[];
  loading = false;
  medicineInInventory : MedicineInInventoryResponse;
  MedicineInInventoryDetailsSearchRecord: Record<string, ValueCompare> = {}
  total = 0;
  pageSize = 10;
  pageIndex = 1;
  searchRecord: Record<string, ValueCompare> = {}
  sortOrder = 0;
  sortField = "";

  medicineInInventoryDetailsSearchRequest: SearchRequest = {
    limit: this.pageSize,
    page: this.pageIndex,
    searchValue: this.MedicineInInventoryDetailsSearchRecord,
    selectFields: "id, quantity, importMedicine,importMedicine.importBatch , medicine.medicineUnit",
    sortField: this.sortField,
    sortOrder: this.sortOrder
  }

  MedicineIdValueCompare: ValueCompare = {
    value: '',
    compare: 'Equals'
  }

  medicineInInventorySearchRequest: SearchRequest = {
    limit: 1,
    page: 0,
    searchValue: this.searchRecord,
    selectFields: "quantity, medicine.name, medicine.medicineClassification, medicine.medicineSubgroup, medicine.medicineUnit",
    sortField:'',
    sortOrder: 0,
  }

  medicineIdValueCompare: ValueCompare = {
    value: '',
    compare: 'Equals'
  }

  

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    this.searchMedicineInInventoryDetails();
    this.getMedicineInInventory();
  }

  constructor(private summaryService: SummaryService,
    private activatedroute: ActivatedRoute,
    private generalService: GeneralHelperService,
    private medicineEliminateService: MedicineEliminationService,
    private modalService: NzModalService,
  ) {

  }

  getMedicineInInventory(){
    this.generalService.getValueCompare(this.id,this.medicineIdValueCompare,"medicineId",this.searchRecord);


    this.summaryService.searchMedicineInInventory(this.medicineInInventorySearchRequest).subscribe(
      (response) => {
        this.medicineInInventory = response.data.data[0];
        console.log(this.medicineInInventory);
      }, (error) => {
        console.log(error);
      }
    );
  }

  showEliminateMedicineModel(id: any, name: any, unitName: any, quantity: number): void {
    this.medicineEliminateService.setMedicineId(id);
    this.medicineEliminateService.setMedicineUnit(unitName);
    this.medicineEliminateService.setMedicineName(name);
    this.medicineEliminateService.setMedicineQuantity(quantity);
    this.modalService.create({
      nzTitle: 'Hủy thuốc trong lô ' + name,
      nzContent: EliminateMedicineComponent,
    });
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


  onQueryParamsChange(params: NzTableQueryParams) {
    const currentSort = params.sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    sortOrder === 'ascend' || null ? this.sortOrder = 0 : this.sortOrder = 1;
    sortField == null ? this.sortField = 'importMedicine.expirationDate' : this.sortField = sortField;

    if (sortOrder == "ascend") {
      this.sortOrder = 1;
    } else if (sortOrder == "descend") {
      this.sortOrder = 0;
    }

    this.medicineInInventoryDetailsSearchRequest.page = params.pageIndex;
    this.medicineInInventoryDetailsSearchRequest.sortField = this.sortField;
    this.medicineInInventoryDetailsSearchRequest.sortOrder = this.sortOrder;
    this.searchMedicineInInventoryDetails();
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
