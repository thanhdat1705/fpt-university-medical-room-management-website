import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { Department } from 'src/app/shared/models/department';
import { TreatmentInformation } from 'src/app/shared/models/treatment-information';
import { TreatmentInformationDetail } from 'src/app/shared/models/treatment-information-details';
import { SearchRequest, SearchRequest1 } from 'src/app/shared/requests/search-request';
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
  params = "id,confirmSignature,isDelivered,createAt,periodicInventory,accountCreateBy,patient,patient.department, diseaseStatusInTreatments ,treatmentInformations";
  treatment: TreatmentResponse;
  treatmentForm: FormGroup
  selectedInternalCode: string;
  reader = new FileReader();
  url: any;
  fileName: string;
  loading = false;
  avatarUrl?: string;
  departmentList: Department[] = [];
  diseaseStatusNames = []
  treatmentInformation: TreatmentInformation[] = [];
  treatmentInformationDetails: TreatmentInformationDetail[];

  departmentSearchRequest = new SearchRequest1(1,0,'',0,null,'id, name');
  

  insertDepartmentRequest: Department = {
    name: '',
    description: '',
  };

  constructor(
    private summaryService: SummaryService,
    private generalService: GeneralHelperService,
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private msg: NzMessageService,
    private modalService: NzModalService,
    private treatmentService: TreatmentInformationService
  ) { }


  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    this.getAllDepartment();
    this.activatedroute.fragment.subscribe(
      (response) => {
        this.treatmentInformationDetails = JSON.parse(JSON.stringify(response));
        if (this.treatmentInformationDetails === null) {
          this.treatmentService.getTreatment(this.id, this.params);
        }
      }
    );
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
      diseaseStatusNames: [this.diseaseStatusNames,
      [
        Validators.required,
      ]]
    });
    this.getTreatmentInformation(this.id, this.params);
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


  getTreatmentInformation(id: any, param: any) {
    this.summaryService.getTreatmentDetails(id, param).subscribe(
      (response) => {
        this.treatment = response.data;
        console.log('treatment', this.treatment);

        this.treatmentForm.setValue({
          internalCode: this.treatment.patient.internalCode,
          name: this.treatment.patient.name,
          gender: this.treatment.patient.gender,
          departmentId: this.treatment.department.id,
          allergyDescription: this.treatment.patient.allergyDescription,
          diseaseStatusNames: []
        });
        
      }, (error) => {
        console.log(error);
      }
    )
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
}
