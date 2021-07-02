import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PageInfo } from 'src/app/shared/models/page-info';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchMedicineUnitRequest } from 'src/app/shared/requests/medicine-unit/search-request';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { MedicineUnitResponse } from 'src/app/shared/responses/medicine-unit/medicine-unit-response';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';

@Component({
  selector: 'app-medicine-unit-list',
  templateUrl: './medicine-unit-list.component.html',
  styleUrls: ['./medicine-unit-list.component.scss']
})
export class MedicineUnitListComponent implements OnInit {

  unitList: MedicineUnitResponse[] = [];

  pageInfo: PageInfo = { isFirstPage: true, isLastPage: false, numberOfPage: 1, info: null };
  page: number;
  pageLimit: number;
  totalRecord!: number;
  pageSize = 5;
  pageIndex = 1;
  sortOrderList = 0;
  sortFieldList = "Name";

  tableLoading = false;
  searchValue = '';

  searchName: ValueCompare = {
    value: '',
    compare: 'Contains'
  }
  searchValueMap: Map<string, ValueCompare> = new Map;
  selectFields = "id, name, acronymUnit";
  searchUnitRequest = new SearchRequest(this.pageSize, this.pageIndex, this.sortFieldList, this.sortOrderList, this.searchValueMap, this.selectFields)
  // searchUnitRequest: SearchRequest = {
  //   limit: 5,
  //   page: 1,
  //   sortField: 'name',
  //   sortOrder: 0,
  //   searchValue: null,
  //   selectFields: this.searchFields,
  // }
  constructor(
    private service: MedicineService,
    private generalService: GeneralHelperService,) { }

  ngOnInit(): void {
  }


  // getAllUnit() {
  //   this.tableLoading = true;
  //   this.service.getAllMedicineUnit().subscribe(
  //     (response) => {
  //       console.log(response.data);
  //       this.unitList = response.data;
  //     },
  //     (error) => {
  //       console.log('get all unit error');
  //     }
  //   )
  // }
  resetTable() {
    this.searchUnitRequest.limit = 5;
    this.searchUnitRequest.page = 1;
    this.searchUnitRequest.sortOrder = 1;
    this.searchUnitRequest.sortField = "Name";
  }

  searchUnit() {
    this.tableLoading = true;
    this.service.searchMedicineUnit(this.searchUnitRequest).subscribe(
      (response) => {
        this.getData(response.data);
        this.tableLoading = false;
      },
      (error) => {
        this.tableLoading = false;
        console.log('get all unit error');
      }
    )
  }

  getData(responseUnit: ResponseSearch) {
    this.pageInfo.info = responseUnit.info;
    this.page = this.pageInfo.info.page;
    this.pageLimit = this.pageInfo.info.limit;
    this.totalRecord = this.pageInfo.info.totalRecord;
    this.unitList = responseUnit.data;
    console.log('medicineList ', this.unitList);
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
    sortField == null ? this.sortFieldList = 'Name' : this.sortFieldList = sortField;
    
    this.searchUnitRequest.limit = pageSize;
    this.searchUnitRequest.page = pageIndex;
    this.searchUnitRequest.sortOrder = this.sortOrderList;
    this.searchUnitRequest.sortField = this.sortFieldList;

    this.searchUnit();

  }


  inputChange(value: any) {
    console.log('value -- ', value);
    this.resetTable();
    this.generalService.setValueCompare(this.searchValue, this.searchName, 'Name', this.searchValueMap);
    if (value !== '') {
      this.searchUnitRequest.limit = 5;
      this.searchUnitRequest.page = 1;
      this.searchUnit();

    } else {
      this.searchUnitRequest.limit = 5;
      this.searchUnitRequest.page = 1;
      this.searchUnit();
    }
  }

  deleteUnit() {

  }

}
