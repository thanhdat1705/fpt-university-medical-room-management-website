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

@Component({
  selector: 'app-view-eliminated-medicine',
  templateUrl: './view-eliminated-medicine.component.html',
  styleUrls: ['./view-eliminated-medicine.component.scss']
})

export class ViewEliminatedMedicineComponent implements OnInit {

  selectFields = "Id, Quantity, CreateDate, Reason, Medicine.Name, Medicine.MedicineUnit, medicineInInventory, Medicine.MedicineSubgroup, Medicine.MedicineClassification";
  eliminatedMedicineList: EliminatedMedicineResponse[];
  loading = false;
  pageSize = 10;
  pageIndex = 1;
  total = 0;
  searchRecord: Record<string, ValueCompare> = {};
  sortField = "CreateDate";
  sortOrder = 0;
  medicineUnitList: MedicineUnitResponse[];
  medicineClassificationList: MedicineClassificationResponse[];
  medicineSubGroupList: MedicineSubgroupResponse[];
  //value
  searchMedicineValue: string;
  unitValue: string;
  classificationValue: string;
  subgroupValue: string;


  searchEliminatedMedicineRequest: SearchRequest = {
    limit: this.pageSize,
    page: this.pageIndex,
    sortField: this.sortField,
    sortOrder: this.sortOrder,
    searchValue: this.searchRecord,
    selectFields: this.selectFields,
  }


  constructor(
    private summaryService: SummaryService,
    private medicineService: MedicineService,
  ) { }

  ngOnInit(): void {
    this.getAllMedicineClassification();
    this.getAllMedicineSubgroup();
    this.getAllMedicineUnit();
    this.searchEliminatedMedicine();
    this.searchRecord['Medicine.Name'] = null;
    this.searchRecord['Medicine.MedicineUnit.Id'] = null;
    this.searchRecord['Medicine.MedicineSubgroup.Id'] = null;
    this.searchRecord['Medicine.MedicineClassification.Id'] = null;
  }

  searchEliminatedMedicineName() {

    if (this.searchMedicineValue != null) {
      this.searchName.value = this.searchMedicineValue;
      this.searchRecord['Medicine.Name'] = this.searchName;
      console.log(this.searchEliminatedMedicineRequest);
    } else {
      this.searchRecord['Medicine.Name'] = null;
    }
    this.searchEliminatedMedicine();
  }

  searchName: ValueCompare = {
    value: '',
    compare: 'Contains'
  }
  searchUnit: ValueCompare = {
    value: '',
    compare: 'Equals'
  }
  searchSubgroup: ValueCompare = {
    value: '',
    compare: 'Equals'
  }
  searchClassification: ValueCompare = {
    value: '',
    compare: 'Equals'
  }

  onSearchUnit() {
    if (this.unitValue != null) {
      this.searchUnit.value = this.unitValue;
      this.searchRecord['Medicine.MedicineUnit.Id'] = this.searchUnit;
      console.log(this.searchEliminatedMedicineRequest);
    } else {
      this.searchRecord['Medicine.MedicineUnit.Id'] = null;
    }
    this.searchEliminatedMedicine();
  }

  onSearchClassification() {
    if (this.classificationValue != null) {
      this.searchClassification.value = this.classificationValue;
      this.searchRecord['Medicine.MedicineClassification.Id'] = this.searchClassification;
      console.log(this.searchEliminatedMedicineRequest);
    } else {
      this.searchRecord['Medicine.MedicineClassification.Id'] = null;
    }
    this.searchEliminatedMedicine();
  }

  onSearchSubGroup() {
    if (this.subgroupValue != null) {
      this.searchSubgroup.value = this.subgroupValue
      this.searchRecord['Medicine.MedicineSubgroup.Id'] = this.searchSubgroup;
      console.log(this.searchEliminatedMedicineRequest);
    } else {
      this.searchRecord['Medicine.MedicineSubgroup.Id'] = null;
    }
    this.searchEliminatedMedicine();
  }

  //Get medicine attribute data

  getAllMedicineSubgroup() {
    this.summaryService.getAllMedicineSubgroup().subscribe(
      (response) => {
        this.medicineSubGroupList = response.data;
      }, (error) => {

      }
    );
  }

  getAllMedicineClassification() {
    this.summaryService.getAllMedicineClassification().subscribe(
      (response) => {
        this.medicineClassificationList = response.data;
      }, (error) => {

      }
    );
  }

  getAllMedicineUnit() {
    this.summaryService.getAllMedicineUnit().subscribe(
      (response) => {
        console.log(response.data);
        this.medicineUnitList = response.data;
      }, (error) => {

      }
    );
  }

  onQueryParamsChange(param: NzTableQueryParams) {

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
