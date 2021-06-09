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
    { value: '', viewValue: '-Trống-' },
    { value: 'internalCode', viewValue: 'Mã số' },
    { value: 'displayName', viewValue: 'Tên' },
    // { value: 'roleId', viewValue: 'Role' }

  ]

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
      value: "1"
    },
    {
      text: "Dừng hoạt động",
      value: "0"
    },
  ];

  selectedValue: string;
  accountList: Account[];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  total = 0;

  searchForm: FormGroup;

  email = 'SE135751';
  name = 'Dũng';

  searchObject: ValueCompare = {
    compare: "contains",
    value: this.name
  }
  searchEmail: ValueCompare = {
    compare: "contains",
    value: this.email
  }

  SearchName = { 'DisplayName': this.searchObject };
  SearchEmail = { 'Email': this.searchEmail };

  searchRecordList: Record<string, ValueCompare>[5];

  searchAccountRequest: SearchRequest = {
    limit: this.pageSize,
    page: this.pageIndex,
    searchValue: null,
    sortField: '',
    selectFields: 'Id, InternalCode, DisplayName, Role, Active',
    sortOrder: 0,
  };

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

  selected() {
    console.log(this.selectedValue);
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    // this.searchAccountRequest.limit = params.pageSize;
    this.loading = true;
    this.searchAccountRequest.page = params.pageIndex;
    console.log("request: " + this.searchAccountRequest.page);
    this.pageIndex = this.searchAccountRequest.page;
    console.log("request: " + this.pageIndex);
    this.searchAccount();
  }

  getData(responseData: ResponseSearch) {
    if (responseData.data.length == 0 && responseData.info.page > 1) {
      this.searchAccountRequest.page = this.searchAccountRequest.page - 1;
      console.log("back 1 page");
      this.searchAccount();
      return;
    }
    this.accountList = responseData.data;
    console.log('account list' + JSON.stringify(this.accountList));
    this.total = responseData.info.totalRecord;
    console.log('total: ' + this.total);
  }

  map = new Map<string, ValueCompare>();

  convertMapToObject(metricArguments: Map<string, ValueCompare>): Record<string, ValueCompare> {
    let newObject: Record<string, ValueCompare> = {}
    for (let [key, value] of metricArguments) {
      newObject[key] = value;
    }
    return newObject;
  }


  constructor(
    private summaryService: SummaryService,
    private generalService: GeneralHelperService,
    private formBuilder: FormBuilder) {


  }

  Search() {
    this.loading = true;
    console.log(this.searchForm.get('searchAttribute').value);
    console.log(this.searchForm.get('searchContent').value);
    if (this.searchForm.get('searchAttribute').value == 'displayName') {
      this.searchAccountRequest.searchValue = null;
      // this.searchAccountRequest.searchValue. = '';
      // this.searchAccountRequest.displayName = this.searchForm.get('searchContent').value;
    } else if (this.searchForm.get('searchAttribute').value == 'phoneNumber') {
      // this.searchAccountRequest.displayName = '';
      // this.searchAccountRequest.internalCode = '';
      // this.searchAccountRequest.phoneNumber = this.searchForm.get('searchContent').value;
    } else if (this.searchForm.get('searchAttribute').value == 'internalCode') {
      // this.searchAccountRequest.displayName = '';
      // this.searchAccountRequest.phoneNumber = '';
      // this.searchAccountRequest.internalCode = this.searchForm.get('searchContent').value;
    } else if (this.searchForm.get('searchAttribute').value == 'none') {
      // this.searchAccountRequest.displayName = '';
      // this.searchAccountRequest.phoneNumber = '';
      // this.searchAccountRequest.internalCode = '';
    }
    this.searchAccount();
    console.log("selected" + this.selectedValue);

  }

  searchAccount() {
    this.accountList = [];
    console.log(JSON.stringify(this.searchAccountRequest));

    this.summaryService.searchAccount(this.searchAccountRequest).subscribe(
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

  ngOnInit(): void {
    // localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SWQiOiJiY2FjNzgwYy04YmY0LTQ4NjMtODRkYS00M2UwZWQzNWY0M2EiLCJEaXNwbGF5TmFtZSI6ImRvbyIsIkVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJyb2xlIjoiMSIsIm5iZiI6MTYyMjI5MjA2MywiZXhwIjoxNjIyODk2ODYzLCJpYXQiOjE2MjIyOTIwNjN9.t7xEtRaYwZuIYzqK2rW6hfwqrtiVEqiSPFGXfOIJ_Hc");
    // this.summaryService.setTokenHeader();
    console.log(this.searchAccountRequest);
    // this.map.set("DisplayName", this.searchObject);
    // this.map.set("InternalCode", this.searchEmail);

    // console.log(this.convertMapToObject(this.map));
    // this.searchAccountRequest.searchValue = this.convertMapToObject(this.map);
    // console.log("request search: " + JSON.stringify( this.searchAccountRequest));
    this.loading = true;
    this.searchAccount();
    this.searchForm = this.formBuilder.group({
      searchContent: [],
      searchAttribute: []
    });


    // this.searchRecordList[0] = { 'DisplayName': this.searchObject };
    // console.log("this.searchRecordList[0]" + this.searchRecordList[0]);
    // this.searchRecordList[1] = this.SearchEmail;
    // console.log("this.searchRecordList[1]" + this.searchRecordList[1]);


    // for (var search in this.searchRecordList) {
    //   if (true) {
    //     this.searchAccountRequest.searchValue[0] = this.searchRecordList[0];
    //   }
    // }


    // this.searchAccountRequest.searchValue.
  }
}
