import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { Department } from 'src/app/shared/models/department';
import { Patient } from 'src/app/shared/models/patient';
import { TreatmentInformation } from 'src/app/shared/models/treatment-information';
import { TreatmentInformationDetail } from 'src/app/shared/models/treatment-information-details';
import { SearchRequest, SearchRequest1, ValueCompare } from 'src/app/shared/requests/search-request';
import { PatientInternalCodeResponse } from 'src/app/shared/responses/patient/patient';
import { TreatmentResponse } from 'src/app/shared/responses/treatment/treatment-details-response';
import { TreatmentSearchResponse } from 'src/app/shared/responses/treatment/treatment-search-response';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { SummaryService } from 'src/app/shared/services/summary.service';
import { TreatmentInformationService } from 'src/app/shared/services/treatment-information/treatment-information.service';
import { TreatmentInformationDetailsComponent } from '../../add-treatment-information/treatment-information-details/treatment-information-details.component';

@Component({
  selector: 'app-view-treatment-information',
  templateUrl: './view-treatment-information.component.html',
  styleUrls: ['./view-treatment-information.component.scss']
})
export class ViewTreatmentInformationComponent implements OnInit {

  id: string;
  params = "patient,patient.department, confirmSignature, accountCreateBy, periodicInventory.month, periodicInventory.year,TreatmentInformations,DiseaseStatusInTreatments,isDelivered,createAt";
  treatment: TreatmentResponse;
  treatmentForm: FormGroup
  selectedInternalCode: string;
  reader = new FileReader();
  url: any;
  fileName: string;
  loading = false;
  avatarUrl?: string;
  departmentList: Department[] = [];
  patientDeseaseStatusList = []
  treatmentInformation: TreatmentInformation[] = [];
  treatmentInformationDetails: TreatmentInformationDetail[] = [];
  diseaseStatusList = [];
  deseaseStatusSearchRecord: Map<string, ValueCompare> = new Map;
  patientInternalCodeList: PatientInternalCodeResponse[];
  isExistInDetails: boolean;
  setOfCheckedId = new Set<string>();

  departmentSearchRequest = new SearchRequest1(1, 0, '', 0, null, 'id, name');
  deseaseStatusSearchRequest = new SearchRequest1(1, 0, '', 0, this.deseaseStatusSearchRecord, 'id,name');
  selectPatientDetails = "id, internalCode, name, gender, departmentId, allergyDescription";

  isEditing = false;
  patientInternalCodeSearchValueCompare: ValueCompare = {
    value: '',
    compare: 'Contains'
  }


  deseaseStatusValueCompare: ValueCompare = {
    value: '',
    compare: 'Contains'
  }

  insertDepartmentRequest: Department = {
    name: '',
    description: '',
  };
  patientIdValueCompare: ValueCompare = {
    value: '',
    compare: 'Equals'
  }

  selectPatientInternalCode = "id, internalCode";

  constructor(
    private summaryService: SummaryService,
    private generalService: GeneralHelperService,
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private msg: NzMessageService,
    private modalService: NzModalService,
    private treatmentService: TreatmentInformationService
  ) {
    this.treatmentService.treatmentInformationComponent.subscribe(res => {
      this.getTreatmentInformation();
      this.getTreatmentInformationDetails();
    })
  }

  getTreatmentInformationDetails() {
    this.treatmentInformationDetails = this.treatmentService.getTreatmentInformationDetails();
    console.log('treatmentInformationDetails ', this.treatmentInformationDetails);
  }

  getTreatmentInformation() {
    this.treatmentInformation = this.treatmentService.getTreatmentInformation();
    console.log('TreatmentInformation ', this.treatmentInformation);
  }

  searchRecord: Map<string, ValueCompare> = new Map;

  patientSearchRequest = new SearchRequest1(1, 0, '', 0, this.searchRecord, '');
  patient: Patient;


  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    this.treatmentForm = this.formBuilder.group({
      internalCode: ['',
        [
          Validators.required,
        ]],
      name: ['',
        [
          Validators.required,
        ]],
      gender: ['',
        [
          Validators.required,
        ]],
      departmentId: ['',
        [
          Validators.required,
        ]],
      allergyDescription: ['',
        [

        ]],
      diseaseStatusNames: [[],
      [
        Validators.required,
      ]]
    });
    this.getAllDepartment();
    this.searchDeseaseStatus();
    this.activatedroute.fragment.subscribe(
      (response) => {
        console.log(response)
        this.treatment = JSON.parse(JSON.stringify(response));
        
        if (this.treatment === null) {
          this.getTreatmentInformationFromServer(this.id, this.params);
        }else{
          this.setTreatmentServiceData();
        }
      }
    );
   
  }

  gender = [
    {
      id: "M",
      name: "Nam"
    }, {
      id: "F",
      name: "Nữ"
    }
  ]



  getGender(acronym: any) {
    if (acronym == "M") {
      return "Nam";
    } else {
      return "Nữ";
    }
  }

  showMedicineModal(): void {
    this.modalService.create({
      nzTitle: 'Modal Title',
      nzContent: TreatmentInformationDetailsComponent
    });
  }

  searchDeseaseStatus() {
    this.summaryService.searchDeseaseStatus(this.deseaseStatusSearchRequest.getParamsString()).subscribe(
      (response) => {
        this.diseaseStatusList = response.data.data;
        console.log('diseaseStatusList', this.diseaseStatusList);
      }, (error) => {
        console.log(error);
      }
    )
  }

  //createTreatmentDetails(item.id, inputValue.value, data.medicineInInventory.medicineId,
  //  data.medicineInInventory.name, data.medicineInInventory.medicineUnit.name, 
  // generalService.getDate(item.expirationDate ))

  setTreatmentServiceData(){
    this.treatmentInformation = this.treatment.treatmentInformations;

    for (let i = 0; i < this.treatment.diseaseStatusInTreatments.length; i++) {
      this.patientDeseaseStatusList.push(this.treatment.diseaseStatusInTreatments[i].diseaseStatus.name);
    }
    this.treatmentService.setTreatmentInformation(this.treatmentInformation);

    for (let i = 0; i < this.treatmentInformation.length; i++) {


      for (let j = 0; j < this.treatmentInformation[i].treatmentInformationDetails.length; j++) {
        // treatmentDetailsObj.
        var treatmentDetailsObj = new TreatmentInformationDetail;

        treatmentDetailsObj.medicineId = this.treatmentInformation[i].medicineId;
        treatmentDetailsObj.medicineName = this.treatmentInformation[i].medicine.name;
        treatmentDetailsObj.unitName = this.treatmentInformation[i].medicine.medicineUnit.name
        treatmentDetailsObj.medicineInInventoryDetailId = this.treatmentInformation[i].id;
        treatmentDetailsObj.quantity = this.treatmentInformation[i].treatmentInformationDetails[j].quantity;
        // treatmentDetailsObj.expiredDate = this.treatmentInformation[i].treatmentInformationDetails[j].quantity;
        treatmentDetailsObj.medicineInInventoryDetailId = this.treatmentInformation[i].treatmentInformationDetails[j].medicineInInventoryDetailId
        this.treatmentInformationDetails.push(treatmentDetailsObj);
      }
    }
    console.log(this.treatmentInformationDetails);
    this.treatmentService.setTreatmentDetails(this.treatmentInformationDetails);
    this.treatmentForm.setValue({
      internalCode: this.treatment.patient.internalCode,
      name: this.treatment.patient.name,
      gender: this.treatment.patient.gender,
      departmentId: this.treatment.department.id,
      allergyDescription: this.treatment.patient.allergyDescription,
      diseaseStatusNames: []
    });
    this.avatarUrl = this.treatment.confirmSignature
  }

  getTreatmentInformationFromServer(id: any, param: any) {
    this.summaryService.getTreatmentDetails(id, param).subscribe(
      (response) => {
        this.treatment = response.data;
        console.log(this.treatment);
        this.setTreatmentServiceData();

      }, (error) => {
        console.log(error);
      }
    )
  }
  onSearchDeseaseStatus(value: any) {
    console.log(value);
    this.generalService.setValueCompare(value, this.deseaseStatusValueCompare, 'name', this.deseaseStatusSearchRecord);
    this.searchDeseaseStatus();

  }


  sendRequest(): void {
    // const requestData = this.medicineInInventoryDetails.filter(data => this.setOfCheckedId.has(data.id));
    // this.arrayTreatmentDetails = requestData;
    // this.treatmentDetailsList = this.arrayTreatmentDetails.concat();
    this.treatmentService.setTreatmentDetails(this.treatmentInformationDetails);
  }

  getAllDepartment() {
    this.summaryService.searchDepartment(this.departmentSearchRequest).subscribe(
      (response) => {
        this.departmentList = response.data.data;
        console.log(this.departmentList);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addDepartment(data: HTMLInputElement) {
    this.insertDepartmentRequest.name = data.value;
    this.summaryService.addDepartment(this.insertDepartmentRequest).subscribe(
      (response) => {
        this.getAllDepartment();
        console.log(response);
      }, (error) => {
        console.log(error);
      }
    );
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  displayTipTreatmentInformationDetails(id: any) {
    return this.treatmentService.getTipTreatmentInformationDetails(id);
  }

  getPatientDetails(value: any) {
    console.log(this.selectedInternalCode);
    this.patientSearchRequest.selectFields = this.selectPatientDetails;
    this.generalService.setValueCompare(this.selectedInternalCode, this.patientInternalCodeSearchValueCompare, 'internalCode', this.searchRecord);

    this.summaryService.searchPatient(this.patientSearchRequest.getParamsString()).subscribe(
      (response) => {
        this.patient = response.data.data[0];
        console.log('patient', this.patient);

        if (this.patient != null) {
          // this.patient = this.patientList[0];
          console.log(this.patient);
          this.treatmentForm.setValue({
            internalCode: this.patient.internalCode,
            name: this.patient.name,
            gender: this.patient.gender,
            departmentId: this.patient.departmentId,
            allergyDescription: this.patient.allergyDescription,
            diseaseStatusNames: this.diseaseStatusList
          });
        } else {
          this.treatmentForm.setValue({
            internalCode: value,
            name: '',
            gender: '',
            departmentId: '',
            allergyDescription: '',
            diseaseStatusNames: this.diseaseStatusList
          });
          this.generalService.createErrorNotification('Mã số không có sẵn trông hệ thống');
        }
      },
      (error) => {
        console.log(error);
      }
    );


  }

  patientIntetrnalCodeInputChange(value: string) {
    console.log('value: ' + value)
    if (value !== '') {
      this.generalService.setValueCompare(null, this.patientIdValueCompare, 'id', this.searchRecord);

      this.generalService.setValueCompare(value, this.patientInternalCodeSearchValueCompare, 'internalCode', this.searchRecord);
      this.searchPatientInternalCode();
    }
  }

  searchPatientInternalCode() {
    this.patientSearchRequest.selectFields = this.selectPatientInternalCode;

    this.summaryService.searchPatient(this.patientSearchRequest.getParamsString()).subscribe(
      (response) => {
        console.log(response);
        this.patientInternalCodeList = response.data.data;
      },
      (error) => {
        console.log(error);
      }
    )
  }


  enableUpdate() {
    this.isEditing = true;
  }

  disableUpdate() {
    this.isEditing = false;
  }

  deleteTreatment() {

  }
}
