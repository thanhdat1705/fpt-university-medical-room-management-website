import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PageInfo } from 'src/app/shared/models/page-info';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchMedicineSubgroupRequest } from 'src/app/shared/requests/medicine-subgroup/search-request';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { MedicineSubgroupResponse } from 'src/app/shared/responses/medicine-subgroup/medicine-subgroup-response';
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
  searchRecord: Record<string, ValueCompare> = {};
  searchFields = "id, name";
  searchSubgroupRequest: SearchRequest = {
    Limit: 5,
    Page: 1,
    SortField: 'name',
    SortOrder: 0,
    SearchValue: null,
    SelectFields: this.searchFields,
  }

  constructor(private service: MedicineService) { }

  ngOnInit(): void {
    this.searchRecord['Name'] = null;
  }

  resetTable() {
    this.pageSize = 5;
    this.pageIndex = 1;
    this.sortOrderList = 0;
    this.sortFieldList = "Name";
  }

  searchSubgroup() {
    this.tableLoading = true;
    this.service.searchMedicineSubgroup(this.searchSubgroupRequest).subscribe(
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
    this.searchSubgroupRequest = {
      Limit: pageSize,
      Page: pageIndex,
      SortField: this.sortFieldList,
      SortOrder: this.sortOrderList,
      SearchValue: this.searchRecord,
    SelectFields: this.searchFields,
    }

    this.searchSubgroup();

  }


  inputChange(value: any) {
    console.log('value -- ', value);
    // this.searchValue = value;
    console.log(this.pageSize);
    this.resetTable();
    this.searchName.value = this.searchValue;
    this.searchRecord['Name'] = this.searchName;
    if (value !== '') {
      this.pageSize = 5;
      this.searchSubgroupRequest = {
        Limit: 5,
        Page: 1,
        SortField: this.sortFieldList,
        SortOrder: this.sortOrderList,
        SearchValue: null,
    SelectFields: this.searchFields,
      }
      this.searchSubgroup();

    } else {
      this.searchSubgroupRequest = {
        Limit: 5,
        Page: 1,
        SortField: this.sortFieldList,
        SortOrder: this.sortOrderList,
        SearchValue: null,
    SelectFields: this.searchFields,
      }
      this.pageSize = 5;
      this.searchSubgroup();
    }
  }

  deleteSubgroup() {

  }
}
