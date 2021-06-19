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

@Component({
  selector: 'app-view-eliminated-medicine',
  templateUrl: './view-eliminated-medicine.component.html',
  styleUrls: ['./view-eliminated-medicine.component.scss']
})

export class ViewEliminatedMedicineComponent implements OnInit {

  selectFields = "Id, Quantity, CreateDate, Reason, Medicine.Name, Medicine.MedicineUnit, medicineInInventory, Medicine.MedicineSubgroup, Medicine.MedicineClassification";
  eliminatedMedicineList: EliminatedMedicineResponse[];
  loading = false;
  pageSize = 3;
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
  filterUnitValue: string;
  filterClassificationValue: string;
  filterSubgroupValue: string;


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
    private generalService: GeneralHelperService
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
      this.searchNameValue.value = this.searchMedicineValue;
      this.searchRecord['Medicine.Name'] = this.searchNameValue;
      console.log(this.searchEliminatedMedicineRequest);
    } else {
      this.searchRecord['Medicine.Name'] = null;
    }
    this.searchEliminatedMedicine();
  }

  searchNameValue: ValueCompare = {
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
    this.generalService.getValueCompare(this.filterUnitValue, this.unitValueCompare, 'Medicine.MedicineUnit.Id', this.searchRecord);
    this.searchEliminatedMedicine();
  }

  onSearchClassification() {
    this.generalService.getValueCompare(this.filterClassificationValue, this.classificationValueCompare, 'Medicine.MedicineClassification.Id', this.searchRecord);
    this.searchEliminatedMedicine();
  }

  onSearchSubGroup() {
    this.generalService.getValueCompare(this.filterSubgroupValue, this.subgroupValueCompare, 'Medicine.MedicineSubgroup.Id', this.searchRecord);
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
    this.loading = true;
    const currentSort = params.sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    sortOrder === 'ascend' || null ? this.sortOrder = 0 : this.sortOrder = 1;
    sortField == null ? this.sortField = 'CreatedDate' : this.sortField = sortField;

    if (sortOrder == "ascend") {
      this.sortOrder = 1;
    } else if (sortOrder == "descend") {
      this.sortOrder = 0;
    }

    this.searchEliminatedMedicineRequest.page = params.pageIndex;
    this.searchEliminatedMedicineRequest.sortField = this.sortField;
    this.searchEliminatedMedicineRequest.sortOrder = this.sortOrder;
    this.searchEliminatedMedicine();
  }

  searchEliminatedMedicine() {
    this.summaryService.searchEliminateMedicine(this.searchEliminatedMedicineRequest).subscribe(
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
