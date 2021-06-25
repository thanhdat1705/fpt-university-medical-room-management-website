import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { ResponseServer } from 'src/app/shared/models/response-server';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { MedicineClassificationResponse } from 'src/app/shared/responses/medicine-classification/medicine-classification-response';
import { MedicineInInventoryResponse } from 'src/app/shared/responses/medicine-in-inventory/medicine-in-inventory';
import { MedicineSubgroupResponse } from 'src/app/shared/responses/medicine-subgroup/medicine-subgroup-response';
import { MedicineUnitResponse } from 'src/app/shared/responses/medicine-unit/medicine-unit-response';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineEliminationService } from 'src/app/shared/services/medicine-elimination/medicine-elimination.service';
import { SummaryService } from 'src/app/shared/services/summary.service';
import { EliminateMedicineComponent } from '../medicine-elimination/eliminate-medicine.component';

@Component({
  selector: 'app-medicine-in-inventory-list',
  templateUrl: './medicine-in-inventory-list.component.html',
  styleUrls: ['./medicine-in-inventory-list.component.scss']
})
export class MedicineInInventoryListComponent implements OnInit {

  medicineUnitList: MedicineUnitResponse[];
  medicineClassificationList: MedicineClassificationResponse[];
  medicineSubGroupList: MedicineSubgroupResponse[];
  medicineInInventoryList: MedicineInInventoryResponse[];
  loading = false;
  pageSize = 3;
  searchRecord: Record<string, ValueCompare> = {}
  total: number;
  pageIndex = 1;
  selectFields = "quantity, medicine, periodicInventory, medicine.medicineClassification, medicine.medicineSubgroup, medicine.medicineUnit";
  sortField = "";
  sortOrder = 0;
  searchMedicineNameValue: string;
  filterUnitValue: string;
  filterClassificationValue: string;
  filterSubgroupValue: string;

  medicineInInventorySearchRequest: SearchRequest = {
    limit: this.pageSize,
    page: this.pageIndex,
    searchValue: this.searchRecord,
    selectFields: this.selectFields,
    sortField: this.sortField,
    sortOrder: this.sortOrder,
  }

  NameValueCompare: ValueCompare = {
    value: '',
    compare: 'Contains'
  }
  unitValueCompare: ValueCompare = {
    value: '',
    compare: 'Equals'
  }
  subgroupValueCompare: ValueCompare = {
    value: '',
    compare: 'Equals'
  }
  classificationValueCompare: ValueCompare = {
    value: '',
    compare: 'Equals'
  }

  constructor(
    private summaryService: SummaryService,
    private generalService: GeneralHelperService,
    private modalService: NzModalService,
    private medicineEliminateService: MedicineEliminationService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getAllMedicineSubgroup();
    this.getAllMedicineClassification();
    this.getAllMedicineUnit();
    this.searchMedicineInInventory();
  }

  //Get medicine attribute data

  getAllMedicineSubgroup() {
    this.summaryService.getAllMedicineSubgroup().subscribe(
      (response) => {
        this.medicineSubGroupList = response.data;
      }, (error) => {
        this.generalService.createErrorNotification(error);
      }
    );
  }



  getAllMedicineClassification() {
    this.summaryService.getAllMedicineClassification().subscribe(
      (response) => {
        this.medicineClassificationList = response.data;
      }, (error) => {
        this.generalService.createErrorNotification(error);
      }
    );
  }

  getAllMedicineUnit() {
    this.summaryService.getAllMedicineUnit().subscribe(
      (response) => {
        console.log(response.data);
        this.medicineUnitList = response.data;
      }, (error) => {
        this.generalService.createErrorNotification(error);
      }
    );
  }


  onSearchClassification() {
    this.generalService.getValueCompare(this.filterClassificationValue, this.classificationValueCompare, 'Medicine.MedicineClassification.Id', this.searchRecord);
    this.searchMedicineInInventory();
  }

  onSearchUnit() {
    this.loading = true;
    this.generalService.getValueCompare(this.filterUnitValue, this.unitValueCompare, 'Medicine.MedicineUnit.Id', this.searchRecord);
    this.searchMedicineInInventory();
  }

  onSearchSubGroup() {
    this.loading = true;
    this.generalService.getValueCompare(this.filterSubgroupValue, this.subgroupValueCompare, 'Medicine.MedicineSubgroup.Id', this.searchRecord);
    this.searchMedicineInInventory();
  }

  searchMedicineName() {
    this.loading = true;
    this.generalService.getValueCompare(this.searchMedicineNameValue, this.NameValueCompare, 'Medicine.Name', this.searchRecord);
    this.searchMedicineInInventory();
  }

  getData(response: ResponseSearch) {
    if (response.info.page > 1 && response.data.length == 0) {
      this.medicineInInventorySearchRequest.page = this.medicineInInventorySearchRequest.page - 1;
      console.log("back 1 page");
      this.searchMedicineInInventory();
      return;
    }
    this.medicineInInventoryList = response.data;
    this.total = response.info.totalRecord;
    console.log(this.medicineInInventoryList);
  }

  searchMedicineInInventory() {
    this.summaryService.searchMedicineInInventory(this.medicineInInventorySearchRequest).subscribe(
      (response) => {
        console.log(response.data);
        this.getData(response.data);
        this.loading = false;
      }, (error) => {
        console.log(error);
      }
    );
  }

  sortTableColumn(params: NzTableQueryParams){
    this.loading = true;
    this.sortField = params.sort.find(item => item.value !== null).key;
    const sortParam = params.sort.find(item => item.value !== null).value;
    if (sortParam == "ascend") {
      this.sortOrder = 1;
    } else if (sortParam == "descend") {
      this.sortOrder = 0;
    }
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    this.loading = true;
    const currentSort = params.sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    sortOrder === 'ascend' || null ? this.sortOrder = 0 : this.sortOrder = 1;
    sortField == null ? this.sortField = '' : this.sortField = sortField;

    if (sortOrder == "ascend") {
      this.sortOrder = 1;
    } else if (sortOrder == "descend") {
      this.sortOrder = 0;
    }

    this.medicineInInventorySearchRequest.page = params.pageIndex;
    this.medicineInInventorySearchRequest.sortField = this.sortField;
    this.medicineInInventorySearchRequest.sortOrder = this.sortOrder;
    this.searchMedicineInInventory();
  }

  showEliminateMedicineModel(id: any, name: any, unitName: any, quantity: number): void {
    this.medicineEliminateService.setMedicineId(id);
    this.medicineEliminateService.setMedicineUnit(unitName);
    this.medicineEliminateService.setMedicineName(name);
    this.medicineEliminateService.setMedicineQuantity(quantity);
    this.modalService.create({
      nzTitle: 'Hủy thuốc ' + name,
      nzContent: EliminateMedicineComponent,
    });
  }
}
