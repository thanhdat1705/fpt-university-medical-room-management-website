import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Department } from 'src/app/shared/models/department';
import { FilterTable } from 'src/app/shared/models/filterTable';
import { Patient } from 'src/app/shared/models/patient';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { PatientService } from 'src/app/shared/services/patient-service/patient.service';
import { SummaryService } from 'src/app/shared/services/summary.service';

@Component({
  selector: 'app-view-patient-list',
  templateUrl: './view-patient-list.component.html',
  styleUrls: ['./view-patient-list.component.scss']
})
export class ViewPatientListComponent implements OnInit {

  searchAccountValue: any;
  genderFilterValue: string;
  departmentFilterValue: string;
  departmentList: Department[];

  searchPatientValue: string;

  searchValueCompare: ValueCompare = {
    value: '',
    compare: 'Contains'
  }

  departmentValueCompare: ValueCompare = {
    value: '',
    compare: 'Equals'
  }


  searchValueMap: Map<string, ValueCompare> = new Map;

  gender = [
    {
      id: "M",
      name: "Nam"
    }, {
      id: "F",
      name: "Nữ"
    }
  ]
  
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

  genderValueCompare: ValueCompare = {
    value: '',
    compare: 'Equals'
  }

  sortColumn = "";
  sortOrder = 0;
  selectedSearchAttribute: string;
  patientList: Patient[];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  total = 0;
  activeStatus = null;
  role = null;
  selectField = "id, internalCode, name, gender, department";

  constructor(
    private summaryService: SummaryService,
    private generalService: GeneralHelperService,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {

    this.loading = true;
    this.searchPatient();
    this.getAllDepartment();
  }

  getPatientTreatment(patientId: string) {
    this.patientService.getPatientTreatment(patientId);
  }

  patientSearchRequest = new SearchRequest(this.pageSize, this.pageIndex, this.sortColumn, this.sortOrder, this.searchValueMap, this.selectField);
  departmentSearchRequest = new SearchRequest(1, 0, '', 0, null, 'id, name');


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
    this.pageSize = params.pageSize;
    this.patientSearchRequest.limit = params.pageSize;

    this.patientSearchRequest.page = params.pageIndex;
    this.pageIndex = this.patientSearchRequest.page;
    this.searchPatient();
  }

  getData(responseData: ResponseSearch) {
    if (responseData.data.length == 0 && responseData.info.page > 1) {
      this.patientSearchRequest.page = this.patientSearchRequest.page - 1;
      console.log("back 1 page");
      this.searchPatient();
      return;
    }
    this.patientList = responseData.data;
    console.log('patient list: ', this.patientList);
    this.total = responseData.info.totalRecord;
    console.log('total: ' + this.total);
  }

  onSearchGender() {
    this.generalService.setValueCompare(this.genderFilterValue, this.genderValueCompare, 'gender', this.searchValueMap);
    this.searchPatient();
  }
  getAllDepartment() {
    this.summaryService.searchDepartment(this.departmentSearchRequest).subscribe(
      (response) => {
        this.departmentList = response.data.data;
        console.log(this.departmentList);
      },
      (error) => {
        console.log(error);
        this.generalService.createErrorNotification(error);
      }
    );
  }
  onSearchDepartment() {
    this.generalService.setValueCompare(this.departmentFilterValue, this.departmentValueCompare, 'department.id', this.searchValueMap);
    this.searchPatient();
  }

  searchPatient() {

    this.summaryService.searchPatient(this.patientSearchRequest).subscribe(
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
    // this.accountService.getAccountDetails(id);
  }

  search() {

    if (this.selectedSearchAttribute == 'name') {
      this.generalService.setValueCompare(this.searchPatientValue, this.searchValueCompare, 'name', this.searchValueMap);
      this.generalService.setValueCompare(null, this.searchValueCompare, 'internalCode', this.searchValueMap);
      this.searchPatient();
    } else if (this.selectedSearchAttribute == 'internalCode') {
      this.generalService.setValueCompare(this.searchPatientValue, this.searchValueCompare, 'internalCode', this.searchValueMap);
      this.generalService.setValueCompare(null, this.searchValueCompare, 'name', this.searchValueMap);
      this.searchPatient();
    } else {
      this.generalService.createErrorNotification("Hãy chọn đầy đủ mục tìm kiếm")
    }
  }

}
