import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { Department } from 'src/app/shared/models/department';
import { Patient } from 'src/app/shared/models/patient';
import { TreatmentInformation } from 'src/app/shared/models/treatment-information';
import { TreatmentInformationDetail } from 'src/app/shared/models/treatment-information-details';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
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
  paramMedicineInInventoryDetails = "importMedicine.expirationDate";

  afterUpdateParam = "id";
  treatment: TreatmentResponse;
  treatmentForm: FormGroup
  selectedInternalCode: string;
  reader = new FileReader();
  url: any;
  fileName: string;
  loading = false;
  sygnatureUrl?: string;
  departmentList: Department[] = [];
  patientDeseaseStatusList = []
  treatmentInformation: TreatmentInformation[] = [];
  treatmentInformationDetails: TreatmentInformationDetail[] = [];
  diseaseStatusList = [];
  deseaseStatusSearchRecord: Map<string, ValueCompare> = new Map;
  patientInternalCodeList: PatientInternalCodeResponse[];
  isExistInDetails: boolean;
  expandSet = new Set<string>();
  file: File;
  confirmModal!: NzModalRef;
  patientAllegryDescription: string;
  departmentSearchRequest = new SearchRequest(1, 0, '', 0, null, 'id, name');
  deseaseStatusSearchRequest = new SearchRequest(1, 0, '', 0, this.deseaseStatusSearchRecord, 'name');
  selectPatientDetails = "id, internalCode, name, gender, departmentId, allergyDescription";
  totalDepartment = 0;
  departmentPageIndex = 1;
  departmentPageSize = 10;

  totalDiseaseStatusName = 0;
  diseaseStatusNamePageIndex = 1;
  diseaseStatusNamePageSize = 10;
  isEditing = true;

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
    private treatmentService: TreatmentInformationService,
    private modal: NzModalService,
    private router: Router
  ) {
    this.treatmentService.treatmentDetailsComponent.subscribe(res => {
      this.getTreatmentInformation();
      this.getTreatmentInformationDetails();
    })
  }

  departmentnSearchRequest = new SearchRequest(this.departmentPageSize, this.departmentPageIndex, '', 0, null, 'id,name');

  diseaseStatusSearchRequest = new SearchRequest(this.diseaseStatusNamePageSize, this.diseaseStatusNamePageIndex, '', 0, null, 'id,name');


  getTreatmentInformationDetails() {
    this.treatmentInformationDetails = this.treatmentService.getTreatmentInformationDetails();
    console.log('****treatmentInformationDetails ', this.treatmentInformationDetails);
  }

  getTreatmentInformation() {
    this.treatmentInformation = this.treatmentService.getTreatmentInformation();
    console.log('****TreatmentInformation ', this.treatmentInformation);
  }

  searchRecord: Map<string, ValueCompare> = new Map;

  patientSearchRequest = new SearchRequest(1, 0, '', 0, this.searchRecord, '');
  patient: Patient;


  ngOnInit(): void {
    this.treatmentService.currentComponentServeName = 'treatmentDetailsComponent';

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
      ]], isDelivered: [
        false

      ]
    });
    this.getAllDepartment();
    this.searchDeseaseStatus();
    this.activatedroute.fragment.subscribe(
      (response) => {
        console.log(response)
        this.treatment = JSON.parse(JSON.stringify(response));

        if (this.treatment === null) {
          this.getTreatmentInformationFromServer(this.id, this.params);
        } else {
          this.setTreatmentServiceData();
        }
      }
    );
    this.disableUpdate();
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

  getMedicineInInventoryDetails(id: string) {

  }

  getGender(acronym: any) {
    if (acronym == "M") {
      return "Nam";
    } else {
      return "Nữ";
    }
  }

  showMedicineModal(): void {
    this.modalService.create({
      nzTitle: 'Danh sách thuốc',
      nzContent: TreatmentInformationDetailsComponent
    });
  }



  //createTreatmentDetails(item.id, inputValue.value, data.medicineInInventory.medicineId,
  //  data.medicineInInventory.name, data.medicineInInventory.medicineUnit.name, 
  // generalService.getDate(item.expirationDate ))

  async setTreatmentServiceData() {
    if(this.treatment.isDelivered){
      this.treatmentForm.get('isDelivered').setValue(true);

    }
    if (this.treatment.confirmSignature != null) {
      this.url = this.treatment.confirmSignature;
    }
    console.log(this.url);
    this.treatmentInformation = this.treatment.treatmentInformations;
    if (this.treatment.patient.allergyDescription == null) {
      this.patientAllegryDescription = ''
    } else {
      this.patientAllegryDescription = this.treatment.patient.allergyDescription;
    }
    for (let i = 0; i < this.treatment.diseaseStatusInTreatments.length; i++) {
      this.patientDeseaseStatusList.push(this.treatment.diseaseStatusInTreatments[i].diseaseStatus.name);
    }
    this.treatmentService.setTreatmentInformation(this.treatmentInformation);
    console.log('this.treatmentInformation) from serer', this.treatmentInformation);

    for (let i = 0; i < this.treatmentInformation.length; i++) {
      for (let j = 0; j < this.treatmentInformation[i].treatmentInformationDetails.length; j++) {
        // treatmentDetailsObj.
        var treatmentDetailsObj = new TreatmentInformationDetail;

        treatmentDetailsObj.medicineId = this.treatmentInformation[i].medicineId;
        treatmentDetailsObj.medicineName = this.treatmentInformation[i].medicine.name;
        treatmentDetailsObj.unitName = this.treatmentInformation[i].medicine.medicineUnit.name
        treatmentDetailsObj.medicineInInventoryDetailId = this.treatmentInformation[i].treatmentInformationDetails[j].medicineInInventoryDetailId;
        treatmentDetailsObj.quantity = this.treatmentInformation[i].treatmentInformationDetails[j].quantity;
        this.getExpirationDate(treatmentDetailsObj.medicineInInventoryDetailId, treatmentDetailsObj.expiredDate);
        // this.getExpirationDate(this.treatmentInformation[i].treatmentInformationDetails[j].medicineInInventoryDetailId, treatmentDetailsObj.expiredDate);
        const response = await this.summaryService.getMedicineInInventoryDetails(this.treatmentInformation[i].treatmentInformationDetails[j].medicineInInventoryDetailId, this.paramMedicineInInventoryDetails).toPromise();
        console.log(response.data);
        treatmentDetailsObj.expiredDate = this.generalService.getDate(response.data.expirationDate)
        this.treatmentInformationDetails.push(treatmentDetailsObj);
        this.treatmentService.setTreatmentInformation(this.treatmentInformation);

      }
    }
    console.log(this.treatmentInformationDetails);
    this.treatmentService.setTreatmentDetails(this.treatmentInformationDetails);
    console.log('code', this.treatment.patient.internalCode);
    this.selectedInternalCode = this.treatment.patient.internalCode
    this.treatmentForm.setValue({
      internalCode: this.treatment.patient.internalCode,
      name: this.treatment.patient.name,
      gender: this.treatment.patient.gender,
      departmentId: this.treatment.department.id,
      allergyDescription: this.patientAllegryDescription,
      diseaseStatusNames: [],
      isDelivered: this.treatmentForm.get('isDelivered').value

    });
    this.sygnatureUrl = this.treatment.confirmSignature
    this.treatmentService.returnTreatmentDataComponent();
  }

  async getExpirationDate(medicineInInventoryDetailId: string, expirationDate: string) {

  }

  getTreatmentInformationFromServer(id: any, param: any) {
    this.summaryService.getTreatmentDetails(id, param).subscribe(
      (response) => {
        this.treatment = response.data;
        console.log(this.treatment);
        this.setTreatmentServiceData();

        this.disableUpdate();
      }, (error) => {
        console.log(error);
        this.generalService.createErrorNotification(error);

      }
    )
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
        this.generalService.messageNz('success', 'Phòng ban đã được cập nhật');


        console.log(response);
      }, (error) => {
        console.log(error);
        this.generalService.createErrorNotification(error);

      }
    );
  }

  displayTipTreatmentInformationDetails(id: any) {
    return this.treatmentService.getTipTreatmentInformationDetails(id);
  }

  getPatientDetails(value: any) {
    console.log(this.selectedInternalCode);
    this.patientSearchRequest.selectFields = this.selectPatientDetails;
    this.generalService.setValueCompare(this.selectedInternalCode, this.patientInternalCodeSearchValueCompare, 'internalCode', this.searchRecord);

    this.summaryService.searchPatient(this.patientSearchRequest).subscribe(
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
            diseaseStatusNames: this.diseaseStatusList,
            isDelivered: this.treatmentForm.get('isDelivered').value

          });
        } else {
          this.treatmentForm.setValue({
            internalCode: value,
            name: '',
            gender: '',
            departmentId: '',
            allergyDescription: '',
            diseaseStatusNames: this.diseaseStatusList,
            isDelivered: this.treatmentForm.get('isDelivered').value

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


  enableUpdate() {
    this.isEditing = true;
    for (var control in this.treatmentForm.controls) {
      this.treatmentForm.controls[control].enable();
    }
    // this.treatmentForm.controls['internalCode'].enable();
    // this.treatmentForm.controls['name'].enable();
    // this.treatmentForm.controls['departmentId'].enable();
    // this.treatmentForm.controls['allergyDescription'].enable();
    // this.treatmentForm.controls['diseaseStatusNames'].enable();
  }

  disableUpdate() {
    // this.patientDeseaseStatusList = [];
    // this.treatmentInformation = [];
    // this.treatmentInformationDetails = []
    // this.treatmentService.setTreatmentInformation([]);
    // this.treatmentService.setTreatmentDetails([]);
    this.isEditing = false;
    for (var control in this.treatmentForm.controls) {
      this.treatmentForm.controls[control].disable();
    }
    // this.treatmentForm.controls['internalCode'].disable();
    // this.treatmentForm.controls['name'].disable();
    // this.treatmentForm.controls['departmentId'].disable();
    // this.treatmentForm.controls['allergyDescription'].disable();
    // this.treatmentForm.controls['diseaseStatusNames'].disable();

  }

  deleteTreatmentPopUp() {

    this.confirmModal = this.modal.confirm({
      nzTitle: '<i>Bạn có chắc muốn xóa đơn thuốc này?</i>',
      nzContent: '',
      nzCancelText: 'Không',
      nzOkText: 'Có',
      nzOnOk: () => new Promise((resolve, reject) => {
        this.summaryService.deleteTreatment(this.id).subscribe(
          (response) => {
            this.modal.closeAll();
            this.generalService.messageNz('success', 'Xóa đơn thuốc thành công');
            this.router.navigate(['/treatment-information-management/treatment-information-list']);
          },
          (error) => {
            this.modal.closeAll();
            console.log('delete import medicine error');
            this.generalService.createErrorNotification(error);
          }
        )
      }
      ).catch(() => console.log('Oops errors!')),
    })
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

  deleteTreatment() {
    // this.summaryService.deleteTreatment(this.id).subscribe(
    //   (response) => {
    //     this.modal.closeAll();
    //     this.generalService.messageNz('success', 'Xóa dược phẩm thành công');
    //   }, (error) => {
    //     console.log(error);

    //   }
    // );

    console.log("Chạy rồi");

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
      this.treatmentForm.get('isDelivered').setValue(true);

    }
  }

  updateTreatment(data: any) {
    const treatmentInformationForm = new FormData();
    treatmentInformationForm.append('Patient.InternalCode', data.internalCode);
    treatmentInformationForm.append('Patient.Name', data.name);
    treatmentInformationForm.append('Patient.Gender', data.gender);
    treatmentInformationForm.append('Patient.DepartmentId', data.departmentId);
    treatmentInformationForm.append('Patient.AllergyDescription', data.allergyDescription);

    for (let i = 0; i < this.patientDeseaseStatusList.length; i++) {
      treatmentInformationForm.append('DiseaseStatusNames[' + i + ']', this.patientDeseaseStatusList[i]);
    }

    for (let i = 0; i < this.treatmentInformation.length; i++) {
      treatmentInformationForm.append('TreatmentInformations[' + i + '].medicineId', this.treatmentInformation[i].medicineId);
      treatmentInformationForm.append('TreatmentInformations[' + i + '].quantity', this.treatmentInformation[i].quantity.toString());
      treatmentInformationForm.append('TreatmentInformations[' + i + '].indicationToDrink', this.treatmentInformation[i].indicationToDrink);

    }

    for (let i = 0; i < this.treatmentInformationDetails.length; i++) {
      treatmentInformationForm.append('TreatmentInformationDetails[' + i + '].medicineInInventoryDetailId', this.treatmentInformationDetails[i].medicineInInventoryDetailId);
      treatmentInformationForm.append('TreatmentInformationDetails[' + i + '].quantity', this.treatmentInformationDetails[i].quantity.toString());

    }
    treatmentInformationForm.append('IsDelivered', this.treatmentForm.get('isDelivered').value);

    treatmentInformationForm.append('ConfirmSignatureImg', this.file);
    console.log('patientDeseaseStatusList: ', this.patientDeseaseStatusList);


    this.summaryService.updateTreatment(this.id, this.afterUpdateParam, treatmentInformationForm).subscribe(
      (response) => {
        console.log(response);
        this.generalService.messageNz('success', 'Đơn thuốc đã được cập nhật');
        this.disableUpdate();
        this.getTreatmentInformationFromServer(response.data.id, this.params);
      }, (error) => {
        this.generalService.createErrorNotification(error);

        console.log(error);
      }
    )
  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  searchDeseaseStatus() {
    this.summaryService.searchDeseaseStatus(this.diseaseStatusSearchRequest).subscribe(
      (response) => {
        this.totalDiseaseStatusName = response.data.info.totalRecord
        response.data.data.forEach(diseaseStatusName => {
          this.diseaseStatusList = [...this.diseaseStatusList, diseaseStatusName];
        });
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

  loadMoreDiseaseStatusName() {
    if (this.diseaseStatusList.length >= this.totalDiseaseStatusName) {
      return;
    } else {
      this.diseaseStatusNamePageIndex += 1;
      this.diseaseStatusSearchRequest.page = this.diseaseStatusNamePageIndex
      this.searchDeseaseStatus();
    }
  }

  loadMoreDepartment() {
    if (this.departmentList.length == this.totalDepartment) {
      return;
    } else {
      this.departmentPageIndex += 1;
      this.departmentnSearchRequest.page = this.departmentPageIndex
      this.searchDepartment();
    }
  }

  searchDepartment() {
    this.summaryService.searchDepartment(this.departmentnSearchRequest).subscribe(
      (response) => {
        this.totalDepartment = response.data.info.totalRecord
        response.data.data.forEach(department => {
          this.departmentList = [...this.departmentList, department];
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
