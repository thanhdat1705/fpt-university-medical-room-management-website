import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { treatmentSearchTable } from 'src/app/pages/treatment-information-management/view-treatment-information-list/view-treatment-information-list.component';
import { Department } from 'src/app/shared/models/department';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchRequest, SearchRequestWithGroupByAndInclude, ValueCompare } from 'src/app/shared/requests/search-request';
import { TreatmentSearchResponse } from 'src/app/shared/responses/treatment/treatment-search-response';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { SummaryService } from 'src/app/shared/services/summary.service';
import { TreatmentInformationService } from 'src/app/shared/services/treatment-information/treatment-information.service';
import { endOfMonth, startOfMonth } from 'date-fns';
import { ActivatedRoute } from '@angular/router';
import { TreatmentResponse } from 'src/app/shared/responses/treatment/treatment-details-response';

@Component({
  selector: 'app-view-patient-treatment-history',
  templateUrl: './view-patient-treatment-history.component.html',
  styleUrls: ['./view-patient-treatment-history.component.scss']
})
export class ViewPatientTreatmentHistoryComponent implements OnInit {

  id: string
  treatmentList: TreatmentResponse[];
  params = "id, patient,patient.department, confirmSignature, accountCreateBy, periodicInventory.month, periodicInventory.year,TreatmentInformations,DiseaseStatusInTreatments,isDelivered,createAt";
  includes = ['DiseaseStatusInTreatments.DiseaseStatus']
  pageSize = 10;
  pageIndex = 1;
  sortField = "createAt";
  sortOrder = 0;
  treatmentTableData: treatmentSearchTable[] = [];
  paramsGetDetails = "patient,patient.department, confirmSignature, accountCreateBy, periodicInventory.month, periodicInventory.year,TreatmentInformations,DiseaseStatusInTreatments,isDelivered,createAt";

  patientValueCompare: ValueCompare = {
    compare: "Equals",
    value: ""
  }

  constructor(
    private summaryService: SummaryService,
    private generalService: GeneralHelperService,
    private activatedroute: ActivatedRoute,
    private treatmentInformationService: TreatmentInformationService
  ) { }

  searchRecord: Map<string, ValueCompare> = new Map;
  treatmentSearchRequest = new SearchRequestWithGroupByAndInclude(this.pageSize, this.pageIndex, this.sortField, this.sortOrder, this.searchRecord, this.params, this.includes, null);
  total: number

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    if(this.id == null){
      this.id = localStorage.getItem("accountId");
    }
    // this.getAllDepartment();
    this.activatedroute.fragment.subscribe(
      (response) => {
        console.log(response)
        this.treatmentList = JSON.parse(JSON.stringify(response));

        if (this.treatmentList === null) {
          this.searchPatientTreatment();
        } else {
        }
      }
    );
    this.treatmentSearchRequest.searchValue = this.searchRecord;
    this.searchPatientTreatment();

    console.log('map: ', this.treatmentSearchRequest.getParamsString());
  }

  searchPatientTreatment() {
    console.log('searchMap', this.searchRecord);
    this.generalService.setValueCompare(this.id, this.patientValueCompare, "patient.id", this.searchRecord);

    this.treatmentSearchRequest.searchValue = this.searchRecord
    this.summaryService.searchTreatment(this.treatmentSearchRequest).subscribe(
      (response) => {
        this.getData(response.data);
        this.combinedCreateDate();
      },
      (error) => {

        this.generalService.createErrorNotification(error);
      }
    );
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const currentSort = params.sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    sortOrder === 'ascend' || null ? this.sortOrder = 0 : this.sortOrder = 1;
    sortField == null ? this.sortField = '' : this.sortField = sortField;
    if (sortOrder == "ascend") {
      this.sortOrder = 1;
    } else if (sortOrder == "descend") {
      this.sortOrder = 0;
    }
    this.pageSize = params.pageSize;
    this.treatmentSearchRequest.limit = params.pageSize;

    this.treatmentSearchRequest.page = params.pageIndex;
    this.pageIndex = this.treatmentSearchRequest.page;
    this.searchPatientTreatment();
  }

  getData(response: ResponseSearch) {
    if (response.info.page > 1 && response.data.length == 0) {
      this.treatmentSearchRequest.page = this.treatmentSearchRequest.page - 1;
      console.log("back 1 page");
      this.searchPatientTreatment();
      return;
    }
    this.treatmentList = response.data;
    this.total = response.info.totalRecord;
    // this.combinedCreateDate();
    // this.treatmentTableData.treatmentInfor = this.treatmentList;
    console.log(this.treatmentList);
  }

  combinedCreateDate() {
    this.treatmentTableData = [];

    for (var i = 0; i < this.treatmentList.length; i++) {
      var treatment: TreatmentSearchResponse[] = [];
      treatment.push(JSON.parse(JSON.stringify(this.treatmentList[i])));
      treatment[i].diseaseStatusName = "";
      for (let j = 0; j < this.treatmentList[i].diseaseStatusInTreatments.length; j++) {

        if (j == this.treatmentList[i].diseaseStatusInTreatments.length - 1) {
          treatment[i].diseaseStatusName += this.treatmentList[i].diseaseStatusInTreatments[j].diseaseStatus.name
        } else {
          treatment[i].diseaseStatusName += this.treatmentList[i].diseaseStatusInTreatments[j].diseaseStatus.name + ", ";
        }
      }

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

  getTreatment(id: any) {
    console.log(id)
    this.treatmentInformationService.getTreatment(id, this.paramsGetDetails);
  }
  getPatientTreatmentDetails(id: any) {
    console.log(id)
    this.treatmentInformationService.getPatientTreatmentDetails(id, this.paramsGetDetails);

  }
  }
