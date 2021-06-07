import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PageInfo } from 'src/app/shared/models/page-info';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchMedicineUnitRequest } from 'src/app/shared/requests/medicine-unit/search-request';
import { MedicineUnitResponse } from 'src/app/shared/responses/medicine-unit/medicine-unit-response';
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
  pageSize = 10;
  pageIndex = 1;
  sortOrderList = 0;
  sortFieldList = "name";

  tableLoading = false;
  searchValue = '';

  searchUnitRequest: SearchMedicineUnitRequest = {
    MedicineUnitName: '',
    Limit: 5,
    Page: 1,
    SortField: 'name',
    SortOrder: 0,
  }
  constructor(private service: MedicineService) { }

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
    sortField == null ? this.sortFieldList = 'name' : this.sortFieldList = sortField;
    this.searchUnitRequest = {
      MedicineUnitName: this.searchValue,
      Limit: pageSize,
      Page: pageIndex,
      SortField: this.sortFieldList,
      SortOrder: this.sortOrderList
    }

    this.searchUnit();

  }


  inputChange(value: any) {
    console.log('value -- ', value);
    // this.searchValue = value;
    console.log(this.pageSize);
    if (value !== '') {
      this.pageSize = 5;
      this.searchUnitRequest = {
        MedicineUnitName: this.searchValue,
        Limit: 5,
        Page: 1,
        SortField: "name",
        SortOrder: 0
      }
      this.searchUnit();

    } else {
      this.searchUnitRequest = {
        MedicineUnitName: '',
        Limit: 5,
        Page: 1,
        SortField: "name",
        SortOrder: 0
      }
      this.pageSize = 5;
      this.searchUnit();
    }
  }

  deleteUnit() {

  }

}
