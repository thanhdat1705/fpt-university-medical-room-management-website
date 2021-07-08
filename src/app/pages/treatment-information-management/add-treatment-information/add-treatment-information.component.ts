import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Department } from 'src/app/shared/models/department';
import { TreatmentInformationDetail } from 'src/app/shared/models/treatment-information-details'
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { InsertTreatmentInformationRequest } from 'src/app/shared/requests/treatment-information/insert-treatment-informationn-request';
import { SummaryService } from 'src/app/shared/services/summary.service';
import { TreatmentInformationService } from 'src/app/shared/services/treatment-information/treatment-information.service';
import { TreatmentInformationDetailsComponent } from './treatment-information-details/treatment-information-details.component';
import { Patient } from 'src/app/shared/models/patient';
import { TreatmentInformation } from 'src/app/shared/models/treatment-information';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { Account } from 'src/app/shared/models/account';
import { PatientInternalCodeResponse } from 'src/app/shared/responses/patient/patient';


@Component({
  selector: 'app-add-treatment-information',
  templateUrl: './add-treatment-information.component.html',
  styleUrls: ['./add-treatment-information.component.scss']
})

export class AddTreatmentInformationComponent implements OnInit {

  insertTreatmentInformationForm: FormGroup;
  departmentList: Department[] = [];
  diseaseStatusList = [];
  patientDeseaseStatusList = [];
  file: File;
  expandSet = new Set<string>();
  profile: Account
  searchRecord: Map<string, ValueCompare> = new Map;
  deseaseStatusSearchRecord: Map<string, ValueCompare> = new Map;
  patientInternalCodeList: PatientInternalCodeResponse[];
  patient: Patient;
  medicalStaff: Account = JSON.parse(localStorage.getItem("user"));
  selectedInternalCode: string;
  curDate = new Date();
  isDeliver = true;

  insertDepartmentRequest: Department = {
    name: '',
    description: '',
  };
  paramsGetDetails = "patient,patient.department, confirmSignature, accountCreateBy, periodicInventory.month, periodicInventory.year,TreatmentInformations,DiseaseStatusInTreatments,isDelivered,createAt";

  getPatientButtonStatus = true;

  selectPatientInternalCode = "id, internalCode";
  selectPatientDetails = "id, internalCode, name, gender, departmentId, allergyDescription";
  patientSearchRequest = new SearchRequest(1, 0, '', 0, this.searchRecord, '');

  patientInternalCodeSearchValueCompare: ValueCompare = {
    value: '',
    compare: 'Contains'
  }

  patientIdValueCompare: ValueCompare = {
    value: '',
    compare: 'Equals'
  }

  patientDetailsValueCompare: ValueCompare = {
    value: '',
    compare: 'Equals'
  }

  deseaseStatusValueCompare: ValueCompare = {
    value: '',
    compare: 'Contains'
  }

  reader = new FileReader();
  url: any;
  fileName: string;

  treatmentInformation: TreatmentInformation[] = [];
  treatmentInformationDetails: TreatmentInformationDetail[];

  getTreatmentInformationDetails() {
    this.treatmentInformationDetails = this.treatmentService.getTreatmentInformationDetails();
    console.log('treatmentInformationDetails ', this.treatmentInformationDetails);
  }

  getTreatmentInformation() {
    this.treatmentInformation = this.treatmentService.getTreatmentInformation();
    console.log('TreatmentInformation ', this.treatmentInformation);
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

  departmentnSearchRequest = new SearchRequest(1, 0, '', 0, this.searchRecord, 'id,name');

  deseaseStatusSearchRequest = new SearchRequest(1, 0, '', 0, this.deseaseStatusSearchRecord, 'id,name');

  // searchDeseaseStatusRequest: SearchRequest = {

  //   limit: 10,
  //   page: 0,
  //   searchValue: this.DeseaseStatusSearchRecord,
  //   selectFields: "id, name",
  //   sortField: "",
  //   sortOrder: 0

  // }

  constructor(
    private formBuilder: FormBuilder,
    private summaryService: SummaryService,
    private modalService: NzModalService,
    public treatmentService: TreatmentInformationService,
    private generalService: GeneralHelperService,
    private msg: NzMessageService
  ) {
    this.treatmentService.treatmentInformationComponent.subscribe(res => {
      this.getTreatmentInformation();
      this.getTreatmentInformationDetails();
    })
  }

  ngOnInit(): void {
    this.isDeliver = true;

    this.treatmentService.currentComponentServeName = 'addTreatmentComponent';
    this.getAllDepartment();
    this.treatmentService.setTreatmentDetails([]);
    this.treatmentService.setTreatmentInformation([]);
    this.getTreatmentInformationDetails();
    this.getAccountProfile();
    this.insertTreatmentInformationForm = this.formBuilder.group({
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
      ],
      diseaseStatusNames: [[],
      [
      ]]
    });
    console.log(this.treatmentInformation);

  }

  getPatientDetails(value: any) {
    console.log(this.selectedInternalCode);
    if (this.selectedInternalCode == null || this.selectedInternalCode == '') {
      return;
    }
    this.patientSearchRequest.selectFields = this.selectPatientDetails;
    this.generalService.setValueCompare(this.selectedInternalCode, this.patientInternalCodeSearchValueCompare, 'internalCode', this.searchRecord);

    this.summaryService.searchPatient(this.patientSearchRequest).subscribe(
      (response) => {
        this.patient = response.data.data[0];
        console.log('patient', this.patient);

        if (this.patient != null) {
          // this.patient = this.patientList[0];
          console.log(this.patient);
          this.insertTreatmentInformationForm.setValue({
            internalCode: this.patient.internalCode,
            name: this.patient.name,
            gender: this.patient.gender,
            departmentId: this.patient.departmentId,
            allergyDescription: this.patient.allergyDescription,
            diseaseStatusNames: this.diseaseStatusList
          });
        } else {
          this.insertTreatmentInformationForm.setValue({
            internalCode: value,
            name: '',
            gender: '',
            departmentId: '',
            allergyDescription: '',
            diseaseStatusNames: this.diseaseStatusList
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );


  }

  searchPatientInternalCode() {
    this.patientSearchRequest.selectFields = this.selectPatientInternalCode;

    this.summaryService.searchPatient(this.patientSearchRequest).subscribe(
      (response) => {
        console.log(response);
        this.patientInternalCodeList = response.data.data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  searchDeseaseStatus() {
    this.summaryService.searchDeseaseStatus(this.deseaseStatusSearchRequest).subscribe(
      (response) => {
        this.diseaseStatusList = response.data.data;
        console.log('diseaseStatusList', this.diseaseStatusList);
        console.log('patient desease: ' + this.patientDeseaseStatusList)
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

  patientIntetrnalCodeInputChange(value: string) {
    console.log('value: ' + value)
    if (value !== '') {
      this.generalService.setValueCompare(null, this.patientIdValueCompare, 'id', this.searchRecord);

      this.generalService.setValueCompare(value, this.patientInternalCodeSearchValueCompare, 'internalCode', this.searchRecord);
      this.searchPatientInternalCode();
    }
  }


  insertIndicationToDrink(id: any, indicationToDrink: any) {
    for (let i = 0; i < this.treatmentInformation.length; i++) {
      if (this.treatmentInformation[i].medicineId == id) {
        this.treatmentInformation[i].indicationToDrink = indicationToDrink;
        break;
      }
    }
    this.treatmentService.setTreatmentInformation(this.treatmentInformation);
  }


  chk() {
    console.log(this.insertTreatmentInformationForm.get('diseaseStatusNames').value);
  }

  get f() {
    return this.insertTreatmentInformationForm.controls;
  }

  getAccountProfile() {
    this.summaryService.getProfile().subscribe(
      (response) => {

        this.profile = response.data;
        console.log(this.profile);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  addTreatmentInformation(data: any) {

    if (this.insertTreatmentInformationForm.invalid) {
      this.generalService.createErrorNotification("Xin hãy nhập chính xác các thông tin");
      return;

    }
    else {

      const treatmentInformationForm = new FormData();

      for (let i = 0; i < this.treatmentInformation.length; i++) {
        treatmentInformationForm.append('TreatmentInformations[' + i + '].medicineId', this.treatmentInformation[i].medicineId);
        treatmentInformationForm.append('TreatmentInformations[' + i + '].quantity', this.treatmentInformation[i].quantity.toString());
        treatmentInformationForm.append('TreatmentInformations[' + i + '].indicationToDrink', this.treatmentInformation[i].indicationToDrink);
        if (this.treatmentInformation[i].indicationToDrink == null || this.treatmentInformation[i].indicationToDrink.length == 0) {
          this.generalService.createErrorNotification("Xin hãy nhập chính xác các thông tin");
          return;
        }
      }
      treatmentInformationForm.append('Patient.InternalCode', data.internalCode);
      treatmentInformationForm.append('Patient.Name', data.name);
      treatmentInformationForm.append('Patient.Gender', data.gender);
      treatmentInformationForm.append('Patient.DepartmentId', data.departmentId);
      treatmentInformationForm.append('Patient.AllergyDescription', data.allergyDescription);


      // treatmentInformationForm.append('DiseaseStatusNames', JSON.stringify(this.listDiseaseStatus));
      // this.listDiseaseStatus.forEach(s => {
      //   treatmentInformationForm.append('DiseaseStatusNames', JSON.stringify(s));
      // });

      // this.treatmentInformationDetails.forEach(s => {
      //   treatmentInformationForm.append('TreatmentInformationDetails', JSON.stringify(s));
      // });

      // this.treatmentInformation.forEach(s => {
      //   treatmentInformationForm.append('TreatmentInformations', JSON.stringify(s));
      // });

      for (let i = 0; i < this.patientDeseaseStatusList.length; i++) {
        treatmentInformationForm.append('DiseaseStatusNames[' + i + ']', this.patientDeseaseStatusList[i]);
      }



      for (let i = 0; i < this.treatmentInformationDetails.length; i++) {
        treatmentInformationForm.append('TreatmentInformationDetails[' + i + '].medicineInInventoryDetailId', this.treatmentInformationDetails[i].medicineInInventoryDetailId);
        treatmentInformationForm.append('TreatmentInformationDetails[' + i + '].quantity', this.treatmentInformationDetails[i].quantity.toString());

      }

      // treatmentInformationForm.append('TreatmentInformations', JSON.stringify(this.treatmentInformation));
      treatmentInformationForm.append('ConfirmSignatureImg', this.file);
      console.log("code" + treatmentInformationForm.get('Patient.InternalCode'));
      console.log("department" + treatmentInformationForm.get('Patient.DepartmentId'));

      // console.log("TreatmentInformationDetails" + treatmentInformationForm.get('TreatmentInformationDetails'));
      // console.log("TreatmentInformations" + treatmentInformationForm.get('TreatmentInformations'));



      // console.log(treatmentInformationForm.getAll('TreatmentInformationDetails'));
      // console.log(treatmentInformationForm.getAll('DiseaseStatusNames'));

      // this.TreatmentInformationAddRequest.patient.Name = data.name;
      // this.TreatmentInformationAddRequest.patient.DepartmentId = data.departmentId;
      // this.TreatmentInformationAddRequest.patient.AllergyDescription = data.allergyDescription;
      // this.TreatmentInformationAddRequest.patient.Gender = data.gender;
      // this.TreatmentInformationAddRequest.patient.InternalCode = data.internalCode;
      // this.TreatmentInformationAddRequest.treatmentInformationDetails = this.treatmentInformationDetails;
      // this.TreatmentInformationAddRequest.treatmentInformations = this.treatmentInformation;
      // this.TreatmentInformationAddRequest.diseaseStatusNames = this.listDiseaseStatus;

      this.summaryService.addTreatmentInformation(treatmentInformationForm).subscribe(
        (response) => {
          console.log(response);
          // this.generalService.closeWaitingPopupNz();
          this.generalService.messageNz('success', `Đơn điều trị đã được tạo`);
          this.insertTreatmentInformationForm.reset();
          this.treatmentInformation = [];
          this.patientDeseaseStatusList = [];
          // this.treatmentService.getTreatment(response.data.id, this.paramsGetDetails)
        }, (error) => {
          console.log(error);
          this.generalService.closeWaitingPopupNz();

        }
      );
    }

  }



  getAllDepartment() {
    this.summaryService.searchDepartment(this.departmentnSearchRequest).subscribe(
      (response) => {
        this.departmentList = response.data.data;
        console.log(this.departmentList);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showMedicineModal(): void {
    this.modalService.create({
      nzTitle: 'Danh sách thuốc',
      nzContent: TreatmentInformationDetailsComponent,
      nzStyle:{  top: '20px' },
      nzWidth: 650
    });
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

  //Upload image
  loading = false;
  avatarUrl?: string;



  onFileSelected(event) {
    this.file = event.target.files[0];
    console.log('Got file' + this.file);
    if (this.file) {
      this.reader.readAsDataURL(this.file);
      this.reader.onload = (_event) => {
        this.url = this.reader.result;
      }
      this.fileName = this.file.name;
    }
  }

  displayTipTreatmentInformationDetails(id: any) {
    return this.treatmentService.getTipTreatmentInformationDetails(id);
  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

}
