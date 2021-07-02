import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { DateTime } from 'src/app/shared/models/date-time';
import { FilterTable } from 'src/app/shared/models/filterTable';
import { Medicine } from 'src/app/shared/models/medicine';
import { PageInfo } from 'src/app/shared/models/page-info';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { MedicineClassificationResponse } from 'src/app/shared/responses/medicine-classification/medicine-classification-response';
import { MedicineSubgroupResponse } from 'src/app/shared/responses/medicine-subgroup/medicine-subgroup-response';
import { MedicineUnitResponse } from 'src/app/shared/responses/medicine-unit/medicine-unit-response';
import { MedicineResponse } from 'src/app/shared/responses/medicine/medicine';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss']
})
export class MedicineListComponent implements OnInit {

  unitSelected = false;
  classSelected = false;
  subgroupSelected = false;

  detailLoading = false;
  tableLoading = false;

  medicineList: MedicineResponse[] = [];
  pageInfo: PageInfo = { isFirstPage: true, isLastPage: false, numberOfPage: 1, info: null };
  page: number;
  pageLimit: number;

  totalRecord!: number;
  pageSize = 10;
  pageIndex = 1;
  sortOrderList = 1;
  sortFieldList = "CreateDate";

  isLoading = false;
  noSuggest = false;
  isSearch = false;
  selectedMedicine: string;
  suggestList: MedicineResponse[] = [];

  searchForm: FormGroup;
  searchValue = '';
  medicineId: string;

  unitValue = null;
  classValue = null;
  subgroupValue = null;

  /*---------------------------------------------------------------------------------------------------------------------*/
  /*---------------------------------------------------------------------------------------------------------------------*/
  // searchRecord: Record<string, ValueCompare> = {};
  searchValueMap: Map<string, ValueCompare> = new Map;

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
  searchClass: ValueCompare = {
    value: '',
    compare: 'Equals'
  }

  selectFields = "id, name, medicineUnit, medicineClassification, medicineSubgroup, createDate";
  searchMedicineRequest = new SearchRequest(this.pageSize, this.pageIndex, this.sortFieldList, this.sortOrderList, this.searchValueMap, this.selectFields)
  // SearchRequest = {
  //   limit: 10,
  //   page: 1,
  //   sortField: "Createdate",
  //   sortOrder: 0,
  //   searchValue: null,
  //   selectFields: this.searchFields,
  // };

  // filterUnit: FilterTable[] = [];
  // filterClass: FilterTable[] = [];
  // filterSubgroup: FilterTable[] = [];
  filterUnit: MedicineUnitResponse[] = [];
  filterClass: MedicineClassificationResponse[] = [];
  filterSubgroup: MedicineSubgroupResponse[] = [];


  /*---------------------------------------------------------------------------------------------------------------------*/
  /*---------------------------------------------------------------------------------------------------------------------*/
  constructor(private fb: FormBuilder,
    public service: MedicineService,
    private generalService: GeneralHelperService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    // this.searchMedicine();
    
    this.getAllUnit();
    this.getAllSubgroup();
    this.getAllClass();


  
  }


  get f() { return this.searchForm.controls; }

  getCreateTime(time: string) {
    return this.generalService.getDate(time);
  }

  resetTable() {
    this.searchMedicineRequest.limit = 10;
    this.searchMedicineRequest.page = 1;
    this.searchMedicineRequest.sortOrder = 1;
    this.searchMedicineRequest.sortField = "CreateDate";
  }

  /*---------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------------------------ Get All -------------------------------------------------------------*/
  getAllUnit() {
    this.service.getAllMedicineUnit().subscribe(
      (response) => {
        // for (let unit of response.data) {
        //   let tmp = { text: unit.name, value: unit.id };
        //   this.filterUnit = [...this.filterUnit, tmp]
        // }
        this.filterUnit = response.data;
      },
      (error) => {
        console.log("get all error");
        this.generalService.createErrorNotification(error);
      }
    )
  }

  getAllSubgroup() {
    this.service.getAllMedicineSubgroup().subscribe(
      (response) => {
        // for (let unit of response.data) {
        //   let tmp = { text: unit.name, value: unit.id };
        //   this.filterSubgroup = [...this.filterSubgroup, tmp]
        // }
        this.filterSubgroup = response.data;
      },
      (error) => {
        console.log("get all error");
        this.generalService.createErrorNotification(error);
      }
    )
  }

  getAllClass() {
    this.service.getAllMedicineClassification().subscribe(
      (response) => {
        // for (let unit of response.data) {
        //   let tmp = { text: unit.name, value: unit.id };
        //   this.filterClass = [...this.filterClass, tmp]
        // }
        this.filterClass = response.data;
      },
      (error) => {
        console.log("get all error");
        this.generalService.createErrorNotification(error);
      }
    )
  }


  /*---------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------------------------ Change ------------------------------------------------------------*/
  inputChange(value: any) {
    this.generalService.setValueCompare(this.searchValue, this.searchName, 'Name', this.searchValueMap);
      this.generalService.setValueCompare(null, this.searchUnit, 'MedicineUnitId', this.searchValueMap);
      this.generalService.setValueCompare(null, this.searchSubgroup, 'MedicineSubgroupId', this.searchValueMap);
      this.generalService.setValueCompare(null, this.searchClass, 'MedicineClassificationId', this.searchValueMap);
    this.resetTable();
    if (value !== '') {
      this.pageSize = 10;
      this.searchMedicineRequest.limit = 10;
      this.searchMedicineRequest.page = 1;
      this.searchMedicine();

    } else {
      this.generalService.setValueCompare(null, this.searchName, 'Name', this.searchValueMap);
      this.generalService.setValueCompare(null, this.searchUnit, 'MedicineUnitId', this.searchValueMap);
      this.generalService.setValueCompare(null, this.searchSubgroup, 'MedicineSubgroupId', this.searchValueMap);
      this.generalService.setValueCompare(null, this.searchClass, 'MedicineClassificationId', this.searchValueMap);
      this.searchMedicineRequest.limit = 10;
      this.searchMedicineRequest.page = 1;
      this.pageSize = 10;
      this.searchMedicine();
    }
  }


  onSearchUnit(value: string) {
    console.log(value);
    console.log(value === '');
    console.log(value === null);
    if (value !== '' && value !== null) {
      this.resetTable();
      this.unitSelected = true;
      this.generalService.setValueCompare(value, this.searchUnit, 'MedicineUnitId', this.searchValueMap);
      this.searchMedicineRequest.limit = 10;

    } else {
      this.resetTable();
      this.unitSelected = false;
      this.generalService.setValueCompare(null, this.searchUnit, 'MedicineUnitId', this.searchValueMap);
      this.searchMedicineRequest.limit = 10;

    }
    this.searchMedicine();
  }

  onSearchClass(value: string) {
    if (value !== '' && value !== null) {
      this.resetTable();
      this.classSelected = true;
      this.generalService.setValueCompare(value, this.searchClass, 'MedicineClassificationId', this.searchValueMap);
      this.searchMedicineRequest.limit = 10;

    } else {
      this.resetTable();
      this.classSelected = false;
      this.generalService.setValueCompare(null, this.searchClass, 'MedicineClassificationId', this.searchValueMap);
      this.searchMedicineRequest.limit = 10;

    }
    this.searchMedicine();
  }

  onSearchSubgroup(value: string) {
    if (value !== '' && value !== null) {
      this.resetTable();
      this.subgroupSelected = true;
      this.generalService.setValueCompare(value, this.searchSubgroup, 'MedicineSubgroupId', this.searchValueMap);
      this.searchMedicineRequest.limit = 10;

    } else {
      this.resetTable();
      this.subgroupSelected = false;
      this.generalService.setValueCompare(null, this.searchSubgroup, 'MedicineSubgroupId', this.searchValueMap);
      this.searchMedicineRequest.limit = 10;

    }
    this.searchMedicine();
  }

  /*---------------------------------------------------------------------------------------------------------------------*/
  /*---------------------------------------------------------------------------------------------------------------------*/
  // detailMedicine(id: string) {
  //   this.router.navigate(['medicine-management/medicine-list/details-medicine'], { queryParams: { id: id } })
  // }

  deleteMedicine(id: string) {
    this.tableLoading = true;
    this.service.deleteMedicine(id).subscribe(
      (response) => {
        this.searchMedicine();
        this.tableLoading = false;
        this.generalService.messageNz('success', `Xóa thành công`);
      }, (error) => {
        console.log('delete error');
        this.tableLoading = false;
        this.generalService.createErrorNotification(error);
      }
    )
  }

  searchMedicine() {
    this.tableLoading = true;
    // this.searchName.value = this.searchValue
    // this.searchMedicineRequest.SearchValue = this.searchRecord;
    this.service.searchMedicine(this.searchMedicineRequest).subscribe(
      (response) => {
        this.tableLoading = false;
        this.getData(response.data);
      },
      (error) => {
        console.log('search error');
        this.tableLoading = false;
        this.generalService.createErrorNotification(error);
      }
    )
  }


  getData(responseMedicineData: ResponseSearch) {
    this.pageInfo.info = responseMedicineData.info;
    this.page = this.pageInfo.info.page;
    this.pageLimit = this.pageInfo.info.limit;
    this.totalRecord = this.pageInfo.info.totalRecord;
    this.medicineList = responseMedicineData.data;
    console.log('medicineList ', this.medicineList);

  }


  onQueryParamsChange(params: NzTableQueryParams) {
    console.log("params -- ", params);
    const { pageIndex, pageSize, sort, filter } = params;
    this.pageSize = params.pageSize;
    this.pageIndex = params.pageIndex;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    sortOrder === 'ascend' || null ? this.sortOrderList = 0 : this.sortOrderList = 1;
    sortField == null ? this.sortFieldList = 'CreateDate' : this.sortFieldList = sortField;
    this.searchName.value = this.searchValue;
    // this.searchMedicineRequest = {
    //   limit: pageSize,
    //   page: pageIndex,
    //   sortField: this.sortFieldList,
    //   sortOrder: this.sortOrderList,
    //   searchValue: this.searchRecord,
    //   selectFields: this.searchFields
    // }

    this.searchMedicineRequest.limit = pageSize;
    this.searchMedicineRequest.page = pageIndex;
    this.searchMedicineRequest.sortOrder = this.sortOrderList;
    this.searchMedicineRequest.sortField = this.sortFieldList;

    this.searchMedicine();

  }



}
