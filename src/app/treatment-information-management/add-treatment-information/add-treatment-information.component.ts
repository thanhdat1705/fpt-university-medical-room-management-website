import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Department } from 'src/app/shared/models/department';
import { TreatmentInformationDetail } from 'src/app/shared/models/treatment-information-details'
import { SearchRequest } from 'src/app/shared/requests/search-request';
import { InsertTreatmentInformationRequest } from 'src/app/shared/requests/treatment-information/insert-treatment-informationn-request';
import { SummaryService } from 'src/app/shared/services/summary.service';
import { TreatmentInformationService } from 'src/app/shared/services/treatment-information/treatment-information.service';
import { TreatmentInformationDetailsComponent } from './treatment-information-details/treatment-information-details.component';
import { Patient } from 'src/app/shared/models/patient';
import { TreatmentInformation } from 'src/app/shared/models/treatment-information';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';


@Component({
  selector: 'app-add-treatment-information',
  templateUrl: './add-treatment-information.component.html',
  styleUrls: ['./add-treatment-information.component.scss']
})
export class AddTreatmentInformationComponent implements OnInit {

  insertTreatmentInformationForm: FormGroup;
  departmentList: Department[] = [];
  listDiseaseStatus = ['Tim', 'Gans'];
  file: File;
  insertDepartmentRequest: Department = {
    name: '',
    description: '',
  };

  patient: Patient = {
    Id: '',
    DepartmentId: '',
    AllergyDescription: '',
    Gender: '',
    InternalCode: '',
    Name: '',

  };

  reader = new FileReader();
  url: any;
  fileName: string;

  treatmentInformation: TreatmentInformation[];

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

  TreatmentInformationAddRequest: InsertTreatmentInformationRequest = {
    patient: this.patient,
    diseaseStatusNames: [],
    treatmentInformations: null,
    confirmSignatureImg: '',
    treatmentInformationDetails: null,
  }

  searchDepartmentRequest: SearchRequest = {
    limit: 100,
    page: 0,
    searchValue: null,
    selectFields: "id, name",
    sortField: "",
    sortOrder: 0
  }

  constructor(
    private formBuilder: FormBuilder,
    private summaryService: SummaryService,
    private modalService: NzModalService,
    public treatmentService: TreatmentInformationService,
    private generalService: GeneralHelperService
  ) {
    this.treatmentService.treatmentInformationComponent.subscribe(res => {
      this.getTreatmentInformation();
      this.getTreatmentInformationDetails();
    })
  }

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

  insertIndicationToDrink(id: any, indicationToDrink: any) {
    for (let i = 0; i < this.treatmentInformation.length; i++) {
      if (this.treatmentInformation[i].medicineId == id) {
        this.treatmentInformation[i].IndicationToDrink = indicationToDrink;
        break;
      }
    }
  }

  ngOnInit(): void {
    this.showMedicineModal();
    this.getTreatmentInformationDetails();
    this.getAllDepartment();
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
        [

        ]],
      diseaseStatusNames: ['',
        [
          Validators.required,
        ]]
    });
    console.log(this.treatmentInformation);

  }

  chk() {
    console.log(this.listDiseaseStatus);
  }

  get f() {
    return this.insertTreatmentInformationForm.controls;
  }

  addTreatmentInformation(data: any) {

    // if (this.insertTreatmentInformationForm.invalid) {
    // this.generalService.createErrorNotification("Xin hãy nhập đúng thông tin");
    // this.generalService.closeWaitingPopupNz();
    // return;
    // }
    // else {
    // this.generalService.openWaitingPopupNz();

    const treatmentInformationForm = new FormData();
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

    for (let i = 0; i < this.listDiseaseStatus.length; i++) {
      treatmentInformationForm.append('DiseaseStatusNames['+i+']', this.listDiseaseStatus[i]);
    }

    for (let i = 0; i < this.treatmentInformation.length; i++) {
      treatmentInformationForm.append('TreatmentInformations['+i+'].medicineId', this.treatmentInformation[i].medicineId);
      treatmentInformationForm.append('TreatmentInformations['+i+'].quantity', this.treatmentInformation[i].quantity.toString());
      treatmentInformationForm.append('TreatmentInformations['+i+'].indicationToDrink', this.treatmentInformation[i].IndicationToDrink);

    }

    for (let i = 0; i < this.treatmentInformationDetails.length; i++) {
      treatmentInformationForm.append('TreatmentInformationDetails['+i+'].medicineInInventoryDetailId', this.treatmentInformationDetails[i].medicineInInventoryDetailId);
      treatmentInformationForm.append('TreatmentInformationDetails['+i+'].quantity', this.treatmentInformationDetails[i].quantity.toString());
      
    }

    // treatmentInformationForm.append('TreatmentInformations', JSON.stringify(this.treatmentInformation));
    treatmentInformationForm.append('ConfirmSignatureImg', this.file);
    console.log("code" + treatmentInformationForm.get('Patient.InternalCode'));
    console.log("department" + treatmentInformationForm.get('Patient.DepartmentId'));

    console.log("TreatmentInformationDetails" + treatmentInformationForm.get('TreatmentInformationDetails'));
    console.log("TreatmentInformations" + treatmentInformationForm.get('TreatmentInformations'));



    console.log(treatmentInformationForm.getAll('TreatmentInformationDetails'));
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
        this.generalService.closeWaitingPopupNz();
        this.generalService.messageNz('success', `Đơn điều trị đã được tạo`);

      }, (error) => {
        console.log(error);
        this.generalService.closeWaitingPopupNz();

      }
    );
    // }

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

  showMedicineModal(): void {
    this.modalService.create({
      nzTitle: 'Modal Title',
      nzContent: TreatmentInformationDetailsComponent
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

}
