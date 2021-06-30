import { Component, OnInit } from '@angular/core';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { TreatmentSearchResponse } from 'src/app/shared/responses/treatment/treatment-search-response';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { SummaryService } from 'src/app/shared/services/summary.service';
import { endOfMonth, startOfMonth } from 'date-fns';
import { Department } from 'src/app/shared/models/department';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

export interface treatmentSearchTable {
  date: string;
  treatmentInfor: TreatmentSearchResponse[];
}


@Component({
  selector: 'app-view-treatment-information-list',
  templateUrl: './view-treatment-information-list.component.html',
  styleUrls: ['./view-treatment-information-list.component.scss']
})
export class ViewTreatmentInformationListComponent implements OnInit {

  treatmentList: TreatmentSearchResponse[];
  treatmentTableData: treatmentSearchTable[] = [];
  pageSize = 10;
  pageIndex = 1;
  searchRecord: Record<string, ValueCompare> = {};
  searchRecordDepartment: Record<string, ValueCompare> = {};
  total = 0;
  loading = true;
  ranges = { 'Hôm nay': [new Date(), new Date()], 'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())] };
  dateRange: Date[];
  genderFilterValue: string;
  departmentFilterValue: string;
  departmentList: Department[];
  selectedSearchAttribute = '';
  searchTreatmentValue;
  selectedSearchRole = '';

  searchAttributelist = [
    {
      id: 'name',
      name: 'Tên'
    },
    {
      id: 'internalCode',
      name: 'Mã số'
    }
  ]

  searchRoleList = [
    {
      id: 'doctor',
      name: 'Bác sĩ',
    },
    {
      id: 'patient',
      name: 'Người bệnh'
    }
  ]

  searchByAttributeList = [
    {
      id: 'patient.name',
      name: 'Tên người bệnh'
    },
    {
      id: 'accountCreateBy.name',
      name: 'Tên bác sỹ'
    },
    {
      id: 'patient.name',
      name: 'Tên người bệnh'
    },
  ]

  gender = [
    {
      id: "M",
      name: "Nam"
    }, {
      id: "F",
      name: "Nữ"
    }
  ]

  searchDepartmentRequest: SearchRequest = {
    limit: 100,
    page: 0,
    searchValue: null,
    selectFields: "id, name",
    sortField: "",
    sortOrder: 0
  }

  treatmentSearchRequest: SearchRequest = {
    limit: this.pageSize,
    page: this.pageIndex,
    searchValue: this.searchRecord,
    selectFields: "id, confirmSignature,createAt,accountCreateBy, isDelivered, patient, patient.department",
    sortField: "createAt",
    sortOrder: 0
  }
  dateRangeSelected = false;

  constructor(
    private summaryService: SummaryService,
    private generalService: GeneralHelperService
  ) { }

  searchFromDateValueCompare: ValueCompare = {
    value: '',
    compare: '>='
  }
  searchToDateValueCompare: ValueCompare = {
    value: '',
    compare: '<='
  }

  genderValueCompare: ValueCompare = {
    value: '',
    compare: 'Equals'
  }

  departmentValueCompare: ValueCompare = {
    value: '',
    compare: 'Equals'
  }

  searchValueCompare: ValueCompare = {
    value: '',
    compare: 'Contains'
  }

  ngOnInit(): void {
    this.getAllDepartment();
    this.searchTreatment();
  }

  onSearchTreatment() {

  }

  searchTreatment() {
    this.summaryService.searchTreatment(this.treatmentSearchRequest).subscribe(
      (response) => {
        this.getData(response.data);
        this.loading = false;

      }, (error) => {
        console.log(error);
        this.loading = false;

      }
    );
  }

  getAllDepartment() {
    this.summaryService.searchDepartment(this.searchDepartmentRequest).subscribe(
      (response) => {
        this.departmentList = response.data.data;
        console.log(this.departmentList);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getData(response: ResponseSearch) {
    if (response.info.page > 1 && response.data.length == 0) {
      this.treatmentSearchRequest.page = this.treatmentSearchRequest.page - 1;
      console.log("back 1 page");
      this.searchTreatment();
      return;
    }
    this.treatmentList = response.data;
    this.total = response.info.totalRecord;
    this.combinedCreateDate();
    // this.treatmentTableData.treatmentInfor = this.treatmentList;
    console.log(this.treatmentList);
  }

  getGender(acronyms: any) {
    if (acronyms == 'F') {
      return 'Nữ'
    } else {
      return 'Nam'
    }
  }

  onDateRangeChange(result: Date[]): void {
    if (result.length > 0) {
      this.dateRangeSelected = true;
      console.log('Từ : ', this.generalService.getYMD(result[0].toString()), ', tới: ', this.generalService.getYMD(result[1].toString()));
      this.generalService.getValueCompare(this.generalService.getYMD(result[0].toString()) + ' ' + '00:00:00', this.searchFromDateValueCompare, 'createAt|from', this.searchRecord);
      this.generalService.getValueCompare(this.generalService.getYMD(result[1].toString()) + ' ' + '23:59:00', this.searchToDateValueCompare, 'createAt|to', this.searchRecord);

      this.searchTreatment();
    }


    // else {
    //   this.dateRangeSelected = false;
    //   this.searchRecord['CreateDate|from'] = null;
    //   this.searchRecord['CreateDate|to'] = null;
    //   this.searchTreatment();
    // }
  }

  onSearchGender() {
    this.generalService.getValueCompare(this.genderFilterValue, this.genderValueCompare, 'patient.gender', this.searchRecord);
    this.searchTreatment();
  }

  onSearchDepartment() {
    this.generalService.getValueCompare(this.departmentFilterValue, this.departmentValueCompare, 'patient.department.id', this.searchRecord);
    this.searchTreatment();
  }

  combinedCreateDate() {
    this.treatmentTableData = [];

    for (var i = 0; i < this.treatmentList.length; i++) {
      var treatment: TreatmentSearchResponse[] = [];
      treatment.push(JSON.parse(JSON.stringify(this.treatmentList[i])));

      var date;

      date = this.generalService.getDate(this.treatmentList[i].createAt);
      var found = false;
      for (var j = 0; j < this.treatmentTableData.length; j++) {
        if (this.treatmentTableData[j].date === date) {
          this.treatmentTableData[j].treatmentInfor.push(this.treatmentList[i]);
          found = true;
        }
      }
      if (!found) {
        this.treatmentTableData.push({
          date: date,
          treatmentInfor: treatment,
        });
      }
    }
    console.log('grouped:', this.treatmentTableData);
  }

  search() {
    console.log("search:", this.searchTreatmentValue)
    if (this.selectedSearchAttribute == 'name' && this.selectedSearchRole == 'doctor') {
      this.generalService.getValueCompare(this.searchTreatmentValue, this.searchValueCompare, 'accountCreateBy.displayName', this.searchRecord);
      this.generalService.getValueCompare(null, this.searchValueCompare, 'patient.name', this.searchRecord);
      this.generalService.getValueCompare(null, this.searchValueCompare, 'accountCreateBy.internalCode', this.searchRecord);
      this.generalService.getValueCompare(null, this.searchValueCompare, 'patient.internalCode', this.searchRecord);

      this.searchTreatment();
    } else if (this.selectedSearchAttribute == 'name' && this.selectedSearchRole == 'patient') {
      this.generalService.getValueCompare(this.searchTreatmentValue, this.searchValueCompare, 'patient.name', this.searchRecord);
      this.generalService.getValueCompare(null, this.searchValueCompare, 'accountCreateBy.name', this.searchRecord);
      this.generalService.getValueCompare(null, this.searchValueCompare, 'accountCreateBy.internalCode', this.searchRecord);
      this.generalService.getValueCompare(null, this.searchValueCompare, 'patient.internalCode', this.searchRecord);

      this.searchTreatment();
    } else if (this.selectedSearchAttribute == 'internalCode' && this.selectedSearchRole == 'doctor') {
      this.generalService.getValueCompare(this.searchTreatmentValue, this.searchValueCompare, 'accountCreateBy.internalCode', this.searchRecord);
      this.generalService.getValueCompare(null, this.searchValueCompare, 'patient.name', this.searchRecord);
      this.generalService.getValueCompare(null, this.searchValueCompare, 'accountCreateBy.name', this.searchRecord);
      this.generalService.getValueCompare(null, this.searchValueCompare, 'patient.internalCode', this.searchRecord);


      this.searchTreatment();
    } else if (this.selectedSearchAttribute == 'internalCode' && this.selectedSearchRole == 'patient') {
      this.generalService.getValueCompare(this.searchTreatmentValue, this.searchValueCompare, 'patient.internalCode', this.searchRecord);
      this.generalService.getValueCompare(null, this.searchValueCompare, 'patient.name', this.searchRecord);
      this.generalService.getValueCompare(null, this.searchValueCompare, 'accountCreateBy.name', this.searchRecord);
      this.generalService.getValueCompare(null, this.searchValueCompare, 'accountCreateBy.internalCode', this.searchRecord);



      this.searchTreatment();
    } else {
      this.generalService.createErrorNotification("Hãy chọn đầy đủ mục tìm kiếm")
    }
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    this.treatmentSearchRequest.page = params.pageIndex;
    console.log(params.pageIndex);
    this.searchTreatment();
  }

  getDetails(id: any) {

  }

}
