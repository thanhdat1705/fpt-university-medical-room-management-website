import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { EliminatedMedicineResponse } from 'src/app/shared/responses/eliminated-medicine-response';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';
import { SummaryService } from 'src/app/shared/services/summary.service';
import { MedicineClassificationResponse } from 'src/app/shared/responses/medicine-classification/medicine-classification-response';
import { MedicineSubgroupResponse } from 'src/app/shared/responses/medicine-subgroup/medicine-subgroup-response';
import { MedicineUnitResponse } from 'src/app/shared/responses/medicine-unit/medicine-unit-response';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineEliminationService } from 'src/app/shared/services/medicine-elimination/medicine-elimination.service';
import { MatPlaceholder } from '@angular/material/form-field';

@Component({
  selector: 'app-view-eliminated-medicine',
  templateUrl: './view-eliminated-medicine.component.html',
  styleUrls: ['./view-eliminated-medicine.component.scss']
})

export class ViewEliminatedMedicineComponent implements OnInit {

  selectFields = "id, quantity, createDate, medicine.name, medicine.medicineUnit, medicineInInventoryDetail, medicine.medicineClassification, medicine.medicineSubgroup";
  eliminatedMedicineList: EliminatedMedicineResponse[];
  loading = false;
  pageSize = 10;
  pageIndex = 1;
  total = 0;
  searchValueMap: Map<string, ValueCompare> = new Map;
  sortField = "CreateDate";
  sortOrder = 0;
  medicineUnitList: MedicineUnitResponse[];
  medicineClassificationList: MedicineClassificationResponse[];
  medicineSubGroupList: MedicineSubgroupResponse[];
  //value
  searchMedicineValue: string;
  filterUnitValue: string;
  filterClassificationValue: string;
  filterSubgroupValue: string;


  // searchEliminatedMedicineRequest: SearchRequest = {
  //   limit: this.pageSize,
  //   page: this.pageIndex,
  //   sortField: this.sortField,
  //   sortOrder: this.sortOrder,
  //   searchValue: this.searchRecord,
  //   selectFields: this.selectFields,
  // }

  medicineInInventorySearchRequest = new SearchRequest(this.pageSize, this.pageIndex, this.sortField, this.sortOrder, this.searchValueMap, this.selectFields);


  constructor(
    private summaryService: SummaryService,
    private medicineEliminationService: MedicineEliminationService,
    private generalService: GeneralHelperService
  ) { }

  ngOnInit(): void {
    this.getAllMedicineClassification();
    this.getAllMedicineSubgroup();
    this.getAllMedicineUnit();
    this.searchEliminatedMedicine();
    // this.searchRecord['Medicine.Name'] = null;
    // this.searchRecord['Medicine.MedicineUnit.Id'] = null;
    // this.searchRecord['Medicine.MedicineSubgroup.Id'] = null;
    // this.searchRecord['Medicine.MedicineClassification.Id'] = null;
  }

  searchEliminatedMedicineName() {

    if (this.searchMedicineValue != null) {
      // this.searchNameValue.value = this.searchMedicineValue;
      this.generalService.setValueCompare(this.searchMedicineValue, this.searchNameValueCompare, 'medicine.Name', this.searchValueMap);

      // this.searchRecord['Medicine.Name'] = this.searchNameValue;
      // console.log(this.searchEliminatedMedicineRequest);
    } else {
      this.generalService.setValueCompare(null, this.searchNameValueCompare, 'medicine.Name', this.searchValueMap);

      // this.searchRecord['Medicine.Name'] = null;
    }
    this.searchEliminatedMedicine();
  }

  searchNameValueCompare: ValueCompare = {
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

  onSearchUnit() {
    this.generalService.setValueCompare(this.filterUnitValue, this.unitValueCompare, 'Medicine.MedicineUnit.Id', this.searchValueMap);
    this.searchEliminatedMedicine();
  }

  onSearchClassification() {
    this.generalService.setValueCompare(this.filterClassificationValue, this.classificationValueCompare, 'Medicine.MedicineClassification.Id', this.searchValueMap);
    this.searchEliminatedMedicine();
  }

  onSearchSubGroup() {
    this.generalService.setValueCompare(this.filterSubgroupValue, this.subgroupValueCompare, 'Medicine.MedicineSubgroup.Id', this.searchValueMap);
    this.searchEliminatedMedicine();
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

  onQueryParamsChange(params: NzTableQueryParams) {
    const currentSort = params.sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    sortOrder === 'ascend' || null ? this.sortOrder = 0 : this.sortOrder = 1;
    sortField == null ? this.sortField = 'medicineInInventoryDetail.createdDate' : this.sortField = sortField;

    if (sortOrder == "ascend") {
      this.sortOrder = 1;
    } else if (sortOrder == "descend") {
      this.sortOrder = 0;
    }
    this.pageSize = params.pageSize
    this.medicineInInventorySearchRequest.page = params.pageIndex;
    this.medicineInInventorySearchRequest.sortField = this.sortField;
    this.medicineInInventorySearchRequest.limit = this.pageSize;
    this.medicineInInventorySearchRequest.sortOrder = this.sortOrder;
    this.searchEliminatedMedicine();
  }

  searchEliminatedMedicine() {
    this.loading = true;
    this.medicineInInventorySearchRequest.searchValue = this.searchValueMap;
    this.summaryService.searchEliminateMedicine(this.medicineInInventorySearchRequest).subscribe(
      (response) => {
        this.getData(response.data);
        this.loading = false;

      }, (error) => {
        console.log(error);
        this.loading = false;

      }
    );
  }

  deletedEliminatedMedicine(id: any) {
    this.summaryService.deleteEliminatedMedicineDetails(id).subscribe(
      (response) => {
        this.pageIndex = 1;
        this.sortOrder = 0;
        this.searchValueMap = null;
        this.sortField = "CreateDate";
        this.searchEliminatedMedicine();
        this.generalService.messageNz('success', `Đã xóa lô hủy`);

        // this.
      }, (error) => {
        console.log(error);
      }
    );
  }

  getData(responseData: ResponseSearch) {
    if (responseData.data.length == 0 && responseData.info.page > 1) {
      this.medicineInInventorySearchRequest.page = this.medicineInInventorySearchRequest.page - 1;
      console.log("back 1 page");
      this.searchEliminatedMedicine();
      return;
    }
    this.eliminatedMedicineList = responseData.data;
    console.log(this.eliminatedMedicineList);
    this.total = responseData.info.totalRecord;
    console.log('total: ' + this.total);
  }

  getEliminatedMedicineDetails(id: any) {
    this.medicineEliminationService.getEliminatedMedicineDetails(id);
  }

  setToDefaultFilter() {
    this.searchMedicineValue = '';
    this.filterUnitValue = '';
    this.filterClassificationValue = '';
    this.filterSubgroupValue = '';
    this.searchValueMap = new Map;
    this.searchEliminatedMedicine();
  }



}
