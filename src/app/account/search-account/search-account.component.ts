import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/shared/models/account';
import { SummaryService } from 'src/app/shared/services/summary.service';
import { SearchAccountRequest, SearchRequest } from 'src/app/shared/requests/search-request';
import { HttpParams } from '@angular/common/http';
import { PageInfo } from 'src/app/shared/models/page-info';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { MatSelectChange } from '@angular/material/select';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';

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
    { value: 'none', viewValue: '-Trống-' },
    { value: 'internalCode', viewValue: 'Mã số' },
    { value: 'displayName', viewValue: 'Tên' },
    { value: 'phoneNumber', viewValue: 'Số điện thoại' },
    // { value: 'roleId', viewValue: 'Role' }

  ]

  selectedValue: string;
  accountList: Account[];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  total = 0;

  searchForm: FormGroup;

  searchAccountRequest: SearchAccountRequest = {
    internalCode: '',
    displayName: '',
    email: '',
    phoneNumber: '',
    roleID: '',
    limit: this.pageSize,
    page: this.pageIndex,
    sortField: '',
    sortOrder: 0,
  };



  listOfColumn = [
    {
      title: 'Mã số'
    },
    {
      title: 'Tên',
    },
    {
      title: 'Email',
    },
    {
      title: 'Số điện thoại',
    },
    {
      title: 'Mô tả',
    }
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

  constructor(private summaryService: SummaryService, private generalService: GeneralHelperService, private formBuilder: FormBuilder) { }

  Search() {
    this.loading = true;
    console.log(this.searchForm.get('searchAttribute').value);
    console.log(this.searchForm.get('searchContent').value);
    if (this.searchForm.get('searchAttribute').value == 'displayName') {
      this.searchAccountRequest.phoneNumber = '';
      this.searchAccountRequest.internalCode = '';
      this.searchAccountRequest.displayName = this.searchForm.get('searchContent').value;
    } else if (this.searchForm.get('searchAttribute').value == 'phoneNumber') {
      this.searchAccountRequest.displayName = '';
      this.searchAccountRequest.internalCode = '';
      this.searchAccountRequest.phoneNumber = this.searchForm.get('searchContent').value;
    } else if (this.searchForm.get('searchAttribute').value == 'internalCode') {
      this.searchAccountRequest.displayName = '';
      this.searchAccountRequest.phoneNumber = '';
      this.searchAccountRequest.internalCode = this.searchForm.get('searchContent').value;
    }else if (this.searchForm.get('searchAttribute').value == 'none') {
      this.searchAccountRequest.displayName = '';
      this.searchAccountRequest.phoneNumber = '';
      this.searchAccountRequest.internalCode = '';
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
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SWQiOiJiY2FjNzgwYy04YmY0LTQ4NjMtODRkYS00M2UwZWQzNWY0M2EiLCJEaXNwbGF5TmFtZSI6ImRvbyIsIkVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJyb2xlIjoiMSIsIm5iZiI6MTYyMjI5MjA2MywiZXhwIjoxNjIyODk2ODYzLCJpYXQiOjE2MjIyOTIwNjN9.t7xEtRaYwZuIYzqK2rW6hfwqrtiVEqiSPFGXfOIJ_Hc");
    this.summaryService.setTokenHeader();
    this.loading = true;
    this.searchAccount();
    this.searchForm = this.formBuilder.group({
      searchContent:  [],
      searchAttribute: []
    });
  }
}
