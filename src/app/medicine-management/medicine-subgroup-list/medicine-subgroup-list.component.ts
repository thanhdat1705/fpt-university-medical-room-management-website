import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PageInfo } from 'src/app/shared/models/page-info';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchMedicineSubgroupRequest } from 'src/app/shared/requests/medicine-subgroup/search-request';
import { SearchRequest, SearchRequest1, ValueCompare } from 'src/app/shared/requests/search-request';
import { MedicineSubgroupResponse } from 'src/app/shared/responses/medicine-subgroup/medicine-subgroup-response';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';

@Component({
  selector: 'app-medicine-subgroup-list',
  templateUrl: './medicine-subgroup-list.component.html',
  styleUrls: ['./medicine-subgroup-list.component.scss']
})
export class MedicineSubgroupListComponent implements OnInit {

  subgroupList: MedicineSubgroupResponse[] = [];

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
  selectFields = "id, name";
  searchSubgroupRequest = new SearchRequest1(this.pageSize, this.pageIndex, this.sortFieldList, this.sortOrderList, this.searchValueMap, this.selectFields)
  

  constructor(
    private service: MedicineService,
    private generalService: GeneralHelperService,) { }

  ngOnInit(): void {
  }

  resetTable() {
    this.searchSubgroupRequest.limit = 5;
    this.searchSubgroupRequest.page = 1;
    this.searchSubgroupRequest.sortOrder = 1;
    this.searchSubgroupRequest.sortField = "Name";
  }

  searchSubgroup() {
    this.tableLoading = true;
    this.service.searchMedicineSubgroup(this.searchSubgroupRequest.getParamsString()).subscribe(
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
    this.subgroupList = responseUnit.data;
    console.log('medicineList ', this.subgroupList);
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

    this.searchSubgroupRequest.limit = pageSize;
    this.searchSubgroupRequest.page = pageIndex;
    this.searchSubgroupRequest.sortOrder = this.sortOrderList;
    this.searchSubgroupRequest.sortField = this.sortFieldList;

    this.searchSubgroup();

  }


  inputChange(value: any) {
    console.log('value -- ', value);
    this.resetTable();
    this.generalService.setValueCompare(this.searchValue, this.searchName, 'Name', this.searchValueMap);
    if (value !== '') {
      this.searchSubgroupRequest.limit = 5;
      this.searchSubgroupRequest.page = 1;
      this.searchSubgroup();

    } else {
      this.searchSubgroupRequest.limit = 5;
      this.searchSubgroupRequest.page = 1;
      this.pageSize = 5;
      this.searchSubgroup();
    }
  }

  deleteSubgroup() {

  }
}
