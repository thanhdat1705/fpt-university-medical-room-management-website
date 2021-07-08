import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { TreatmentInformation } from 'src/app/shared/models/treatment-information';
import { TreatmentInformationDetail } from 'src/app/shared/models/treatment-information-details';
import { SearchRequest, SearchRequestWithGroupByAndInclude, ValueCompare } from 'src/app/shared/requests/search-request';
import { MedicineClassificationResponse } from 'src/app/shared/responses/medicine-classification/medicine-classification-response';
import { MedicineInInventoryDetailsResponse } from 'src/app/shared/responses/medicine-in-inventory-details/medicine-in-inventory-details';
import { MedicineInInventoryResponse } from 'src/app/shared/responses/medicine-in-inventory/medicine-in-inventory';
import { MedicineSubgroupResponse } from 'src/app/shared/responses/medicine-subgroup/medicine-subgroup-response';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { SummaryService } from 'src/app/shared/services/summary.service';
import { TreatmentInformationService } from 'src/app/shared/services/treatment-information/treatment-information.service';

export class TreatmentDetailRowData {
  medicineInInventory: MedicineInInventoryResponse;
  medicineInInventoryDetails: MedicineInInventoryDetailsResponse[];
}



@Component({
  selector: 'app-treatment-information-details',
  templateUrl: './treatment-information-details.component.html',
  styleUrls: ['./treatment-information-details.component.scss']
})
export class TreatmentInformationDetailsComponent implements OnInit {

  pageSize = 5;
  pageIndex = 1;
  total = 0;
  setOfCheckedId = new Set<string>();
  expandSet = new Set<string>();
  tempUnCheckedId = new Set<string>();
  value: any;
  listOfCurrentPageData: ReadonlyArray<Data> = [];
  checked = false;
  indeterminate = false;
  selectFields = "id, quantity, medicine.medicineUnit, importMedicine.expirationDate";
  sortField = "";
  sortOrder = 0;
  MedicineInInventorySearchValueMap: Map<string, ValueCompare> = new Map;
  MedicineInInventoryDetailsSearchValueMap: Map<string, ValueCompare> = new Map;

  medicineInInventoryDetails: MedicineInInventoryDetailsResponse[];
  arrayTreatmentDetails: ReadonlyArray<MedicineInInventoryDetailsResponse> = [];
  treatmentDetaisList: TreatmentInformationDetail[] = [];
  isExistInDetails: boolean;
  medicineInInventoryList: MedicineInInventoryResponse[];
  treatmentDetailsTableData: TreatmentDetailRowData[] = []
  treatmentDetailsForm: FormGroup;
  numberPattern = '[0-9]*'
  searchNameValue: string;
  filterSubgroupValue: string;
  filterClassificationValue: string;
  medicineClassificationList: MedicineClassificationResponse[];
  medicineSubGroupList: MedicineSubgroupResponse[] = [];
  treatmentInformation: TreatmentInformation[] = [];
  dateObj = new Date();

  componentName: string;

  // medicineInInventoryRequest: SearchRequest = {
  //   limit: this.pageSize,
  //   page: this.pageIndex,
  //   searchValue: this.MedicineInInventorySearchRecord,
  //   selectFields: "medicineId,medicine.Name,quantity, medicine.medicineUnit ",
  //   sortField: "",
  //   sortOrder: 0
  // }
  medicineInInventoryGroupBys = ['Medicine', 'PeriodicInventory'];
  medicineInInventoryIncludes = ['Medicine.MedicineUnit', 'PeriodicInventory'];


  medicineInInventorySearchRequest = new SearchRequestWithGroupByAndInclude(this.pageSize, this.pageIndex, "", 0, this.MedicineInInventorySearchValueMap, 'Medicine,PeriodicInventory,Sum(Quantity) as Quantity', this.medicineInInventoryIncludes, this.medicineInInventoryGroupBys);
  medicineInInventoryDetailsSearchRequest = new SearchRequestWithGroupByAndInclude(1, 0, "importMedicine.ExpirationDate", 0, this.MedicineInInventoryDetailsSearchValueMap, 'id, medicineId,medicine.Name,quantity,importMedicine.ExpirationDate', null, null);


  // medicineInInventoryDetailsSearchRequest: SearchRequest = {
  //   limit: 100,
  //   page: 0,
  //   searchValue: this.MedicineInInventoryDetailsSearchRecord,
  //   selectFields: "id, medicineId,medicine.Name,quantity,importMedicine.ExpirationDate",
  //   sortField: "importMedicine.ExpirationDate",
  //   sortOrder: 0
  // }



  medicineIdValueCompare: ValueCompare = {
    value: '',
    compare: 'Equals'
  }

  periodicMonthMedicineInInventoryValueCompare: ValueCompare = {
    value: '',
    compare: '='
  }

  periodicYearMedicineInInventoryValueCompare: ValueCompare = {
    value: '',
    compare: '='
  }

  periodicMonthMedicineInInventoryDetatilsValueCompare: ValueCompare = {
    value: '',
    compare: '='
  }

  periodicYearMedicineInInventoryDetatilsValueCompare: ValueCompare = {
    value: '',
    compare: '='
  }

  medicineNnameValueCompare: ValueCompare = {
    value: '',
    compare: 'Contains'
  }

  subgroupValueCompare: ValueCompare = {
    value: '',
    compare: 'Equals'
  }
  classificationValueCompare: ValueCompare = {
    value: '',
    compare: 'Equals'
  }
  medicineInInventoryQuantityCompare: ValueCompare = {
    value: '0',
    compare: '>'
  }

  @ViewChild('inputValue', { static: false }) inputValue?: ElementRef;

  chkTreatmentDetail: TreatmentInformationDetail[] = [];



  constructor(
    private modal: NzModalRef,
    private summaryService: SummaryService,
    private treatmentService: TreatmentInformationService,
    private generalService: GeneralHelperService,
    private formBuilder: FormBuilder,
  ) { }

  NameValueCompare: ValueCompare = {
    value: '',
    compare: 'Contains'
  }

  autoCheckMedicine() {
    this.chkTreatmentDetail = this.treatmentService.getTreatmentInformationDetails();
    if (this.chkTreatmentDetail != null) {
      this.treatmentDetaisList = this.chkTreatmentDetail;
      for (let i = 0; i < this.chkTreatmentDetail.length; i++) {
        this.setOfCheckedId.add(this.chkTreatmentDetail[i].medicineInInventoryDetailId);
      }
    } else {
      for (let i = 0; i < this.treatmentDetaisList.length; i++) {
        this.setOfCheckedId.add(this.treatmentDetaisList[i].medicineInInventoryDetailId);
        this.autoExpandSelectedMedicineInInventory()
      }
    }
  }

  ngOnInit(): void {

    this.treatmentDetailsForm = this.formBuilder.group({
      quantity: ['',
        [
          Validators.required,
          Validators.pattern(this.numberPattern)
        ]],
    });

    // this.treatmentDetailsForm.valueChanges.subscribe(form => {
    //   if (form.quantity) {
    //     this.treatmentDetailsForm.patchValue({
    //       quantity: form.quantity.replace(/\D/g, ''),
    //     }, { emitEvent: false });
    //   }
    // })
    this.treatmentService.getTreatmentInformationDetails();
    this.treatmentService.getTreatmentInformation();
    this.getAllMedicineClassification();
    this.getAllMedicineSubgroup();
    this.autoCheckMedicine();

    console.log('data luc init', this.chkTreatmentDetail);
    this.searchMedicineInInventory();
    this.autoExpandSelectedMedicineInInventory();
  }

  autoExpandSelectedMedicineInInventory() {

    this.treatmentInformation = this.treatmentService.getTreatmentInformation();
    if (this.treatmentInformation == null) {
      return;
    } else {
      for (let i = 0; i < this.treatmentInformation.length; i++) {
        this.onExpandChange(this.treatmentInformation[i].medicineId, true);
      }

    }
  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
      this.searchMedicineInInventoryDetails(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  clearExpandSetAndCheckSet() {
    this.expandSet.clear();
    this.setOfCheckedId.clear();

  }

  searchMedicineInInventoryDetails(id: string) {
    // this.generalService.openWaitingPopupNz()
    var month = this.dateObj.getUTCMonth() + 1; //months from 1-12
    var year = this.dateObj.getFullYear();
    this.generalService.setValueCompare(id, this.medicineIdValueCompare, 'medicineId', this.MedicineInInventoryDetailsSearchValueMap);
    this.generalService.setValueCompare(month, this.periodicMonthMedicineInInventoryDetatilsValueCompare, 'periodicInventory.month', this.MedicineInInventoryDetailsSearchValueMap);
    this.generalService.setValueCompare(year, this.periodicYearMedicineInInventoryDetatilsValueCompare, 'periodicInventory.year', this.MedicineInInventoryDetailsSearchValueMap);

    this.summaryService.searchMedicineInInventoryDetails(this.medicineInInventoryDetailsSearchRequest).subscribe(
      (response) => {
        this.medicineInInventoryDetails = response.data.data;
        console.log('treatmentdetails', this.medicineInInventoryDetails)
        for (let i = 0; i < this.treatmentDetailsTableData.length; i++) {
          if (this.treatmentDetailsTableData[i].medicineInInventory.medicine.id == id) {
            console.log("trùng");
            this.treatmentDetailsTableData[i].medicineInInventoryDetails = this.medicineInInventoryDetails;
        console.log(this.treatmentDetailsTableData[i].medicineInInventoryDetails);

            break;
          }
        }
        console.log(this.treatmentDetailsTableData);
        // this.generalService.closeWaitingPopupNz();
      }, (error) => {
        console.log(error);
        // this.generalService.closeWaitingPopupNz();

      }
    );
  }

  getAllMedicineSubgroup() {
    this.summaryService.getAllMedicineSubgroup().subscribe(
      (response) => {
        this.medicineSubGroupList = response.data;
      }, (error) => {
        this.generalService.createErrorNotification(error);
      }
    );
  }



  getAllMedicineClassification() {
    this.summaryService.getAllMedicineClassification().subscribe(
      (response) => {
        this.medicineClassificationList = response.data;
      }, (error) => {
        this.generalService.createErrorNotification(error);
      }
    );
  }

  searchMedicineName() {
    this.generalService.setValueCompare(this.searchNameValue, this.medicineNnameValueCompare, 'medicine.Name', this.MedicineInInventorySearchValueMap);
    this.searchMedicineInInventory();

  }

  onSearchClassification() {
    this.generalService.setValueCompare(this.filterClassificationValue, this.classificationValueCompare, 'Medicine.MedicineClassification.Id', this.MedicineInInventorySearchValueMap);
    this.searchMedicineInInventory();
  }

  onSearchSubGroup() {
    this.generalService.setValueCompare(this.filterSubgroupValue, this.subgroupValueCompare, 'Medicine.MedicineSubgroup.Id', this.MedicineInInventorySearchValueMap);
    this.searchMedicineInInventory();
  }

  searchMedicineInInventory() {
    // this.generalService.openWaitingPopupNz();
    var month = this.dateObj.getUTCMonth() + 1; //months from 1-12
    var year = this.dateObj.getFullYear();
    this.generalService.setValueCompare(0, this.medicineInInventoryQuantityCompare, 'quantity', this.MedicineInInventorySearchValueMap);
    this.generalService.setValueCompare(month, this.periodicMonthMedicineInInventoryValueCompare, 'periodicInventory.month', this.MedicineInInventorySearchValueMap);
    this.generalService.setValueCompare(year, this.periodicYearMedicineInInventoryValueCompare, 'periodicInventory.year', this.MedicineInInventorySearchValueMap);

    this.summaryService.searchMedicineInInventoryGroupBy(this.medicineInInventorySearchRequest).subscribe(
      (response) => {
        console.log(response.data);
        this.getData(response.data);
        // this.generalService.closeWaitingPopupNz();
        this.clearExpandSetAndCheckSet();
        this.autoExpandSelectedMedicineInInventory()

        this.autoCheckMedicine();

      }, (error) => {
        console.log(error);
        // this.generalService.closeWaitingPopupNz();
      }
    );
  }

  createTreatmentDetails(id: string, quantity: number, medicineId: string, medicineName: string, unitName: string, expiredDate: string, maxValue: number) {

    if (this.inputValue.nativeElement.value > maxValue) {
      this.value = maxValue;
    } else if (this.inputValue.nativeElement.value <= 0) {
      this.value = 1;
    } else {

      this.isExistInDetails = false;
      if (this.setOfCheckedId.has(id)) {
        if (this.treatmentDetaisList.length == 0) {

          let treatmentDetailsObj = new TreatmentInformationDetail();
          treatmentDetailsObj.quantity = quantity;
          treatmentDetailsObj.medicineInInventoryDetailId = id;
          treatmentDetailsObj.medicineId = medicineId;
          treatmentDetailsObj.medicineName = medicineName;
          treatmentDetailsObj.unitName = unitName;
          treatmentDetailsObj.expiredDate = expiredDate;
          console.log(treatmentDetailsObj.medicineId);
          this.treatmentDetaisList.push(treatmentDetailsObj);
          this.isExistInDetails = true;
        } else {

          for (let i = 0; i < this.treatmentDetaisList.length; i++) {
            if (this.treatmentDetaisList[i].medicineInInventoryDetailId == id) {
              this.treatmentDetaisList[i].quantity = quantity;

              this.isExistInDetails = true;
              break;
            } else {
              // sai
              this.isExistInDetails = false;
            }
          }
        } if (!this.isExistInDetails) {
          let treatmentObj = new TreatmentInformationDetail();
          treatmentObj.medicineId = medicineId;
          treatmentObj.medicineName = medicineName;
          treatmentObj.quantity = quantity;
          treatmentObj.medicineInInventoryDetailId = id;
          treatmentObj.unitName = unitName;
          treatmentObj.expiredDate = expiredDate;

          this.treatmentDetaisList.push(treatmentObj);
        }
        this.treatmentService.setTreatmentDetails(this.treatmentDetaisList);

      }
      this.isExistInDetails = false;
      console.log(this.treatmentDetaisList.length);

      console.log(this.treatmentDetaisList);

    }
  }

  destroyModal(): void {
    if (this.treatmentDetaisList.length == 0) {
      return;
    } else {
      for (var id of Array.from(this.tempUnCheckedId.values())) {
        this.setOfCheckedId.add(id);
      }
      this.treatmentService.setTreatmentDetails(this.treatmentDetaisList);
    }
    this.modal.destroy();
  }

  sendRequest(): void {
    // const requestData = this.medicineInInventoryDetails.filter(data => this.setOfCheckedId.has(data.id));
    // this.arrayTreatmentDetails = requestData;
    // this.treatmentDetailsList = this.arrayTreatmentDetails.concat();
    this.treatmentService.returnTreatmentDataComponent();
    for (var id of Array.from(this.tempUnCheckedId.values())) {

      for (let i = 0; i < this.treatmentDetaisList.length; i++) {
        if (this.treatmentDetaisList[i].medicineInInventoryDetailId == id) {
          this.treatmentDetaisList.splice(i, 1);
          console.log(this.treatmentDetaisList[i]);
          console.log(this.treatmentDetaisList)
          break;
        }
      }

    }
    this.tempUnCheckedId.clear();
    this.destroyModal();
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    this.medicineInInventorySearchRequest.page = params.pageIndex;
    console.log(params.pageIndex);
    this.searchMedicineInInventory();

  }

  getTreatmentDetailsQuantity(id: string) {
    if (this.chkTreatmentDetail == null) {
      return '';
    }
    // if (this.setOfCheckedId.has(id)) {
    //   console.log(this.setOfCheckedId.has(id));
    //   return 0;
    // }
    else {
      let treatmentDetails = this.chkTreatmentDetail.filter(treatmentDetails => treatmentDetails.medicineInInventoryDetailId == id);
      if (treatmentDetails.length == 0) {
        return '';
      } else {
        return treatmentDetails[0].quantity;
      }
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<TreatmentInformationDetail>) {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }



  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.tempUnCheckedId.add(id);
      this.setOfCheckedId.delete(id);

      // if (this.treatmentDetaisList.length == 0) {
      //   return;
      // } else {
      //   for (let i = 0; i < this.treatmentDetaisList.length; i++) {
      //     if (this.treatmentDetaisList[i].medicineInInventoryDetailId == id) {
      //       this.treatmentDetaisList.splice(i, 1);
      //       console.log(this.treatmentDetaisList[i]);
      //       console.log(this.treatmentDetaisList)
      //       break;
      //     }
      //   }
      //   this.treatmentService.setTreatmentDetails(this.treatmentDetaisList);
      // }
    }
  }


  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    // this.refreshCheckedStatus();
  }

  getData(response: ResponseSearch) {
    if (response.info.page > 1 && response.data.length == 0) {
      this.medicineInInventorySearchRequest.page = this.medicineInInventorySearchRequest.page - 1;
      console.log("back 1 page");
      this.searchMedicineInInventory();
      return;
    }
    this.medicineInInventoryList = response.data;
    console.log(this.medicineInInventoryList);
    this.total = response.info.totalRecord;
    console.log(this.total);
    let treatmentDetailsRowData;
    this.treatmentDetailsTableData = [];
    for (let i = 0; i < this.medicineInInventoryList.length; i++) {
      treatmentDetailsRowData = new TreatmentDetailRowData()
      treatmentDetailsRowData.medicineInInventory = this.medicineInInventoryList[i];
      treatmentDetailsRowData.medicineInInventoryDetails = [];
      this.treatmentDetailsTableData.push(treatmentDetailsRowData);
    }

    this.autoExpandSelectedMedicineInInventory();
    console.log(this.treatmentDetailsTableData);
  }

  // refreshCheckedStatus(): void {
  //   const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
  //   this.checked = listOfEnabledData.every(({ indicateToDrink }) => this.setOfCheckedId.has(indicateToDrink));
  //   this.indeterminate = listOfEnabledData.some(({ indicateToDrink }) => this.setOfCheckedId.has(indicateToDrink)) && !this.checked;
  // }

}
