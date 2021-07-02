import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { StoreNewMedicineClassificationRequest } from 'src/app/shared/requests/medicine-classification/store-new-request';
import { StoreNewMedicineSubgroupRequest } from 'src/app/shared/requests/medicine-subgroup/store-new-request';
import { StoreNewMedicineUnitRequest } from 'src/app/shared/requests/medicine-unit/store-new-request';
import { StoreNewMedicineRequest } from 'src/app/shared/requests/medicine/store-new';
import { MedicineClassificationResponse } from 'src/app/shared/responses/medicine-classification/medicine-classification-response';
import { MedicineSubgroupResponse } from 'src/app/shared/responses/medicine-subgroup/medicine-subgroup-response';
import { MedicineUnitResponse } from 'src/app/shared/responses/medicine-unit/medicine-unit-response';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';

@Component({
  selector: 'app-add-medicine-request',
  templateUrl: './add-medicine-request.component.html',
  styleUrls: ['./add-medicine-request.component.scss']
})
export class AddMedicineRequestComponent implements OnInit {
  @Input() inputMedicineName?: string;
  medicineForm: FormGroup;

  isOkLoading = false;
  addItemLoading = false;
  addMedicineLoading = false;

  medicineNameMinL = 3;
  medicineNameMaxL = 50;
  descriptionMinL = 1;
  descriptionMaxL = 500;
  patternMedicineName = "^[a-zA-Z0-9\\s]+$";
  patternUnit = "^[0-9]{1,5}$";

  unitList: MedicineUnitResponse[] = [];
  classList: MedicineClassificationResponse[] = [];
  subgroupList: MedicineSubgroupResponse[] = [];

  storeNewMedicineUnitRequest: StoreNewMedicineUnitRequest = {
    Name: "",
    AcronymUnit: "",
  }

  storeNewMedicineSubgroupRequest: StoreNewMedicineSubgroupRequest = {
    Name: ""
  }

  storeNewMedicineClassificationRequest: StoreNewMedicineClassificationRequest = {
    Name: "",
    Description: "",
  }

  constructor(
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private generalService: GeneralHelperService,
    private router: Router,
    private modal: NzModalRef,
    private i18n: NzI18nService,
  ) {
    this.i18n.setLocale(vi_VN);

    this.medicineForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(this.medicineNameMinL),
        Validators.maxLength(this.medicineNameMaxL)
      ]],
      medicineUnitId: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.minLength(this.descriptionMinL),
        Validators.maxLength(this.descriptionMaxL)
      ]],
      medicineSubgroupId: ['', [
        Validators.required
      ]],
      medicineClassificationId: ['', [
        Validators.required
      ]]
    });

  }

  ngOnInit(): void {
    if (this.inputMedicineName != '') {
      this.medicineForm.controls.name.setValue(this.inputMedicineName);
    }

    this.getAllMedicineClassification();
    this.getAllMedicineSubgroup();
    this.getAllMedicineUnit();
  }

  get formModal() { return this.medicineForm.controls; }

  getAllMedicineUnit() {
    this.medicineService.getAllMedicineUnit().subscribe(
      (response) => {
        console.log(response.data);
        this.unitList = response.data;
      },
      (error) => {
        console.log("get all error");
        this.generalService.createErrorNotification(error);
      }
    )
  }

  getAllMedicineSubgroup() {
    this.medicineService.getAllMedicineSubgroup().subscribe(
      (response) => {
        console.log(response.data);
        this.subgroupList = response.data;
      },
      (error) => {
        console.log("get all error");
        this.generalService.createErrorNotification(error);
      }
    )
  }

  getAllMedicineClassification() {
    this.medicineService.getAllMedicineClassification().subscribe(
      (response) => {
        console.log(response.data);
        this.classList = response.data;
      },
      (error) => {
        console.log("get all error");
        this.generalService.createErrorNotification(error);
      }
    )
  }

  addSubgroup(value: string) {
    let data;
    console.log('value', value);
    this.storeNewMedicineSubgroupRequest.Name = value;

    if ((this.subgroupList.filter(item => item.name.toLocaleLowerCase() === value.toLocaleLowerCase())).length < 1) {
      this.addItemLoading = true;
      this.medicineService.storeNewMedicineSubgroup(this.storeNewMedicineSubgroupRequest).subscribe(
        (response) => {
          data = response.data;
          this.subgroupList = [...this.subgroupList, data];
          this.addItemLoading = false;
          this.medicineForm.controls.medicineSubgroupId.setValue(data.id);
          this.generalService.messageNz('success', `Thêm mới nhóm dược ${value.bold()} thành công`);
        },
        (error) => {
          console.log("store unit error");
          this.addItemLoading = false;
          this.generalService.createErrorNotification(error);
        }
      )
    } else {
      this.generalService.messageNz('error', `Nhóm dược ${value.bold()} đã có trong hệ thống`);
      console.log('duplicate');
    }
  }

  addUnit(value: string): void {
    let data;
    console.log('value', value);
    this.storeNewMedicineUnitRequest.Name = value;
    this.storeNewMedicineUnitRequest.AcronymUnit = value.substring(0, 1);

    if ((this.unitList.filter(item => item.name.toLocaleLowerCase() === value.toLocaleLowerCase())).length < 1) {
      this.addItemLoading = true;
      this.medicineService.storeNewMedicineUnit(this.storeNewMedicineUnitRequest).subscribe(
        (response) => {
          data = response.data;
          this.unitList = [...this.unitList, data];
          this.addItemLoading = false;
          this.medicineForm.controls.medicineUnitId.setValue(data.id);
          this.generalService.messageNz('success', `Thêm mới đơn vị ${value.bold()} thành công`);
        },
        (error) => {
          console.log("store unit error");
          this.addItemLoading = false;
          this.generalService.createErrorNotification(error);
        }
      )
    } else {
      this.generalService.messageNz('error', `Đơn vị ${value.bold()} đã có trong hệ thống`);
      console.log('duplicate');
    }
  }

  addClassification(value: string): void {
    let data;
    console.log('value', value);
    this.storeNewMedicineClassificationRequest.Name = value;
    this.storeNewMedicineClassificationRequest.Description = null;

    if ((this.classList.filter(item => item.name.toLocaleLowerCase() === value.toLocaleLowerCase())).length < 1) {
      this.addItemLoading = true;
      this.medicineService.storeNewMedicineClassification(this.storeNewMedicineClassificationRequest).subscribe(
        (response) => {
          data = response.data;
          this.classList = [...this.classList, data];
          this.addItemLoading = false;
          this.medicineForm.controls.medicineClassificationId.setValue(data.id);
          this.generalService.messageNz('success', `Thêm mới loại ${value.bold()} thành công`);
        },
        (error) => {
          console.log("store Classification error");
          this.addItemLoading = false;
          this.generalService.createErrorNotification(error);
        }
      )
    } else {
      this.generalService.messageNz('error', `Loại ${value.bold()} đã có trong hệ thống`);
      console.log('duplicate');
    }
  }



  addNewMedicine(data: StoreNewMedicineRequest) {

    if (this.medicineForm.invalid) {
      for (const i in this.medicineForm.controls) {
        this.medicineForm.controls[i].markAsDirty();
        this.medicineForm.controls[i].updateValueAndValidity();
      }
    } else {
      this.addMedicineLoading = true;
      setTimeout(() => {
        console.log(data);
        this.medicineService.storeNewMedicine(data).subscribe(
          (response) => {
            console.log(response);
            this.addMedicineLoading = false;
            this.generalService.messageNz('success', `Dược phẩm ${data.name.bold()} thêm thành công`);
            this.medicineForm.reset();
            this.modal.destroy(response.data);

          },
          (error) => {
            this.addMedicineLoading = false;
            this.modal.destroy();
            this.generalService.createErrorNotification(error);
          }
        )
      }, 1000)

    }

  }
}
