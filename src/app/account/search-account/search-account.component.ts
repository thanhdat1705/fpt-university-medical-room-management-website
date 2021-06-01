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
    { value: 'none', viewValue: 'None' },
    { value: 'displayName', viewValue: 'Name' },
    { value: 'phoneNumber', viewValue: 'Phone number' },
    // { value: 'roleId', viewValue: 'Role' }

  ]

  selectedValue: string;
  accountList: Account[];
  loading = true;
  pageSize = 2;
  pageIndex = 1;
  total = 0;

  searchForm: FormGroup;

  searchAccountRequest: SearchAccountRequest = {
    displayName: '',
    email: '',
    phoneNumbebr: '',
    roleID: '',
    limit: this.pageSize,
    page: this.pageIndex,
    sortField: '',
    sortOrder: 0,
  };



  listOfColumn = [
    {
      title: 'Name',
    },
    {
      title: 'Email',
    },
    {
      title: 'Phone number',
    },
    {
      title: 'Description',
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
    this.total = responseData.info.totalRecord;
    console.log('total: ' + this.total);
  }

  selectAttribute(selectedValue){

  }

  constructor(private summaryService: SummaryService, private formBuilder: FormBuilder) { }

  Search() {
    console.log(this.searchForm.get('searchAttribute').value);
    console.log(this.searchForm.get('searchContent').value);
    if (this.searchForm.get('searchAttribute').value == 'displayName') {
      this.searchAccountRequest.phoneNumbebr = '';
      this.searchAccountRequest.displayName = this.searchForm.get('searchContent').value;
    } else if (this.searchForm.get('searchAttribute').value == 'phoneNumber') {
      this.searchAccountRequest.displayName = '';
      this.searchAccountRequest.phoneNumbebr = this.searchForm.get('searchContent').value;
    } else if (this.searchForm.get('searchAttribute').value == '') {
      this.searchAccountRequest.displayName = '';
      this.searchAccountRequest.phoneNumbebr = '';
    }
    this.searchAccount();
    console.log("selected" + this.selectedValue);
    
  }

  searchAccount() {
    this.accountList = [];
    console.log(JSON.stringify(this.searchAccountRequest));

    this.summaryService.searchAccount(this.searchAccountRequest).subscribe(
      (response) => {
        this.getData(response.data)
        this.loading = false;
      },
      (error) => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SWQiOiJiY2FjNzgwYy04YmY0LTQ4NjMtODRkYS00M2UwZWQzNWY0M2EiLCJEaXNwbGF5TmFtZSI6ImRvbyIsIkVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJyb2xlIjoiMSIsIm5iZiI6MTYyMjI5MjA2MywiZXhwIjoxNjIyODk2ODYzLCJpYXQiOjE2MjIyOTIwNjN9.t7xEtRaYwZuIYzqK2rW6hfwqrtiVEqiSPFGXfOIJ_Hc");
    this.summaryService.setTokenHeader();
    this.searchAccount();
    this.searchForm = this.formBuilder.group({
      searchContent:  [],
      searchAttribute: []
    });
  }
}
