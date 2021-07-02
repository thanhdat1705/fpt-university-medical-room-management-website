import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/shared/models/account';
import { SummaryService } from 'src/app/shared/services/summary.service';
import { SearchRequest } from 'src/app/shared/requests/search-request';
import { HttpParams } from '@angular/common/http';
import { PageInfo } from 'src/app/shared/models/page-info';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { MatSelectChange } from '@angular/material/select';
import { EmailValidator, FormBuilder, FormGroup } from '@angular/forms';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { ValueCompare } from 'src/app/shared/models/search-value';
import { FilterTable } from 'src/app/shared/models/filterTable';
import { AccountService } from 'src/app/shared/services/account/account.service';

interface SearchAccountAttribute {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-search-account',
  templateUrl: './search-account.component.html',
  styleUrls: ['./search-account.component.scss']
})

export class SearchAccountComponent implements OnInit {

  accountAttribute: SearchAccountAttribute[] = [
    { value: 'InternalCode', viewValue: 'Mã số' },
    { value: 'DisplayName', viewValue: 'Tên' },
    // { value: 'roleId', viewValue: 'Role' }
  ]

  searchAccountValue: any;

  roleValueCompare: ValueCompare = {
    value: '',
    compare: '='
  }

  activeValueCompare: ValueCompare = {
    value: '',
    compare: '='
  }

  contentValueCompare: ValueCompare = {
    value: '',
    compare: 'contains'
  }

  searchValueMap: Map<string, ValueCompare> = new Map;

  filterRole: FilterTable[] = [
    {
      text: "Quản lí",
      value: "1",
    },
    {
      text: "Nhân viên y tế",
      value: "2",
    },
    {
      text: "Bệnh nhân",
      value: "3",
    },
  ];

  filterActiveStatus: FilterTable[] = [
    {
      text: "Hoạt động",
      value: "true"
    },
    {
      text: "Dừng hoạt động",
      value: "false"
    },
  ];

  sortColumn = "";
  sortOrder = 0;
  selectedSearchAttribute: string;
  accountList: Account[];
  loading = true;
  pageSize = 2;
  pageIndex = 1;
  total = 0;
  activeStatus = null;
  role = null;
  searchForm: FormGroup;
  selectField = "Id, InternalCode, DisplayName, Role, Active";



  ngOnInit(): void {
    console.log(this.accountSearchRequest);

    this.loading = true;
    this.searchAccount();

  }

  onSearchRole(value: string) {
    if (value == null) {
      this.generalService.setValueCompare(null, this.roleValueCompare, 'RoleId', this.searchValueMap);

      // this.searchRecord['RoleId'] = null;
    } else {
      // console.log('role ne' + value);
      this.generalService.setValueCompare(value, this.roleValueCompare, 'RoleId', this.searchValueMap);

      // this.searchRole.value = value;
      // console.log(this.searchRole.value);
      // this.searchRecord['RoleId'] = this.searchRole;
    }
    this.searchAccount();

  }

  onSearchActiveStatus(value: string) {
    if (value == null) {
      this.generalService.setValueCompare(null, this.activeValueCompare, 'Active', this.searchValueMap);

      // this.searchRecord['Active'] = null;
    } else {
      // console.log('active ne' + value);
      // this.searchActive.value = value;
      // console.log(this.searchActive.value);
      // this.searchRecord['Active'] = this.searchActive;
      this.generalService.setValueCompare(value, this.activeValueCompare, 'Active', this.searchValueMap);

    }
    this.searchAccount();
  }

  onSearchAccountAttribute() {
    this.searchAccountValue = '';
  }

  search() {
    // this.contentValueCompare.value = this.searchAccountValue;
    console.log('name: ', this.searchAccountValue);


    this.accountAttribute.forEach(element => {
      if (element.value == this.selectedSearchAttribute) {
        this.generalService.setValueCompare(this.searchAccountValue, this.contentValueCompare, this.selectedSearchAttribute, this.searchValueMap);

        // this.searchRecord[this.selectedSearchAttribute] = this.searchContent;
      } else {
        this.generalService.setValueCompare(null, this.contentValueCompare, element.value, this.searchValueMap);

        // this.searchRecord[element.value] = null;
      }
    });

    this.searchAccount();
  }


  // searchAccountRequest: SearchRequest = {
  //   limit: this.pageSize,
  //   page: this.pageIndex,
  //   searchValue: this.searchRecord,
  //   sortField: this.sortColumn,
  //   selectFields: this.selectField,
  //   sortOrder: this.sortOrder,
  // };

  accountSearchRequest = new SearchRequest(this.pageSize, this.pageIndex, this.sortColumn, this.sortOrder, this.searchValueMap, this.selectField);


  listOfColumn = [
    {
      title: 'Mã số',
    },
    {
      title: 'Tên',
    },
    {
      title: 'Vai trò',
    },
    {
      title: 'Trạng thái',
    },
    {
      title: '',
    },
  ];

  onQueryParamsChange(params: NzTableQueryParams) {
    this.loading = true;
    const currentSort = params.sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    sortOrder === 'ascend' || null ? this.sortOrder = 0 : this.sortOrder = 1;
    sortField == null ? this.sortColumn = '' : this.sortColumn = sortField;
    if (sortOrder == "ascend") {
      this.sortOrder = 1;
    } else if (sortOrder == "descend") {
      this.sortOrder = 0;
    }

    this.accountSearchRequest.page = params.pageIndex;
    this.pageIndex = this.accountSearchRequest.page;
    this.searchAccount();
  }

  getData(responseData: ResponseSearch) {
    if (responseData.data.length == 0 && responseData.info.page > 1) {
      this.accountSearchRequest.page = this.accountSearchRequest.page - 1;
      console.log("back 1 page");
      this.searchAccount();
      return;
    }
    this.accountList = responseData.data;
    console.log('account list' + JSON.stringify(this.accountList));
    this.total = responseData.info.totalRecord;
    console.log('total: ' + this.total);
  }

  constructor(
    private summaryService: SummaryService,
    private generalService: GeneralHelperService,
    private accountService: AccountService
  ) { }

  searchAccount() {
    this.accountList = [];
    this.accountSearchRequest.page = this.pageIndex;
    this.accountSearchRequest.searchValue = this.searchValueMap;
    this.accountSearchRequest.sortField = this.sortColumn;
    this.accountSearchRequest.sortOrder = this.sortOrder;


    // this.searchAccountRequest = {
    //   limit: this.pageSize,
    //   page: this.pageIndex,
    //   searchValue: this.searchRecord,
    //   sortField: this.sortColumn,
    //   selectFields: this.selectField,
    //   sortOrder: this.sortOrder,
    // };

    this.summaryService.searchAccount(this.accountSearchRequest).subscribe(
      (response) => {
        console.log(response.data);

        this.getData(response.data)
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.generalService.createErrorNotification(error);
      });
  }

  getAccountDetails(id: any) {
    this.accountService.getMedicineDetails(id);
  }
}
