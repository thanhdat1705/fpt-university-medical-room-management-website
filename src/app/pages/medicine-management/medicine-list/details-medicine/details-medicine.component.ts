import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { StoreNewMedicineClassificationRequest } from 'src/app/shared/requests/medicine-classification/store-new-request';
import { StoreNewMedicineSubgroupRequest } from 'src/app/shared/requests/medicine-subgroup/store-new-request';
import { StoreNewMedicineUnitRequest } from 'src/app/shared/requests/medicine-unit/store-new-request';
import { StoreNewMedicineRequest } from 'src/app/shared/requests/medicine/store-new';
import { MedicineSubgroupResponse } from 'src/app/shared/responses/medicine-subgroup/medicine-subgroup-response';
import { MedicineUnitResponse } from 'src/app/shared/responses/medicine-unit/medicine-unit-response';
import { MedicineResponse } from 'src/app/shared/responses/medicine/medicine';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';

@Component({
  selector: 'app-details-medicine',
  templateUrl: './details-medicine.component.html',
  styleUrls: ['./details-medicine.component.scss']
})
export class DetailsMedicineComponent implements OnInit {

  confirmModal!: NzModalRef;
  medicineId: string;
  updateMedicineLoading = false;
  addItemLoading = false;
  deleteLoading = false;
  isUpdating = false;
  medicineForm!: FormGroup;

  medicineNameMinL = 3;
  medicineNameMaxL = 50;
  descriptionMinL = 1;
  descriptionMaxL = 500;
  patternMedicineName = "^[a-zA-Z0-9\\s]+$";
  patternUnit = "^[0-9]{1,5}$";

  unitList: MedicineUnitResponse[] = [];
  classList: MedicineUnitResponse[] = [];
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

  isDisable = true;
  medicineDetail: MedicineResponse;

  constructor(private fb: FormBuilder,
    private service: MedicineService,
    private generalService: GeneralHelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,) {
    this.medicineId = activatedRoute.snapshot.paramMap.get('id');

    this.medicineForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(this.medicineNameMinL),
        Validators.maxLength(this.medicineNameMaxL),
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

    console.log('check contructor');
  }

  ngOnInit(): void {
    console.log('id: --- ', this.medicineId);
    // this.activatedRoute.fragment.subscribe(
    //   (response) => {
    //     console.log('fragment: ', response);
    //     if (response === null) {
    //       console.log('check');
    //       this.service.getMedicine(this.medicineId);
    //       console.log(this.medicineDetail);
    //     }
    //   }
    // );


    console.log(this.medicineDetail);

    this.getAllMedicineClassification();
    this.getAllMedicineSubgroup();
    this.getAllMedicineUnit();

    this.getDetailMedicine();
  }
  get f() { return this.medicineForm.controls; }

  getDetailMedicine() {
    if (this.medicineId != null) {
      // this.medicineForm.controls['name'].disable();
      // this.medicineForm.controls['description'].disable();
      this.isDiable(true);
      this.service.getMedicine(this.medicineId).subscribe(
        (response) => {
          this.medicineDetail = response.data;
          console.log('details ', response.data);
          this.medicineForm.setValue({
            name: this.medicineDetail.name,
            medicineUnitId: this.medicineDetail.medicineUnitId,
            description: this.medicineDetail.description,
            medicineSubgroupId: this.medicineDetail.medicineSubgroupId,
            medicineClassificationId: this.medicineDetail.medicineClassificationId,
          })
        },
        (error) => {
          console.log('get detail error');
          this.router.navigate(['medicine-management/medicine-list']);
          this.generalService.createErrorNotification(error);
        }
      )
    }
  }

  //--------------------------------------------------------- Get All ---------------------------------------------------------
  getAllMedicineUnit() {
    this.service.getAllMedicineUnit().subscribe(
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
    this.service.getAllMedicineSubgroup().subscribe(
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
    this.service.getAllMedicineClassification().subscribe(
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

  addSubgroup(value: any) {
    let data;
    console.log('value', value);
    this.storeNewMedicineSubgroupRequest.Name = value;

    if ((this.subgroupList.filter(item => item.name.toLocaleLowerCase() === value.toLocaleLowerCase())).length < 1) {
      this.addItemLoading = true;
      this.service.storeNewMedicineSubgroup(this.storeNewMedicineSubgroupRequest).subscribe(
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

    console.log(this.unitList);
  }

  addUnit(value: any): void {
    let data;
    console.log('value', value);
    this.storeNewMedicineUnitRequest.Name = value;
    this.storeNewMedicineUnitRequest.AcronymUnit = value.substring(0, 1);

    if ((this.unitList.filter(item => item.name.toLocaleLowerCase() === value.toLocaleLowerCase())).length < 1) {
      this.addItemLoading = true;
      this.service.storeNewMedicineUnit(this.storeNewMedicineUnitRequest).subscribe(
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
      this.service.storeNewMedicineClassification(this.storeNewMedicineClassificationRequest).subscribe(
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



  isDiable(bool: boolean) {
    if (bool) {
      for (var control in this.medicineForm.controls) {
        this.medicineForm.controls[control].disable();
      }
      this.isUpdating = false;
      this.isDisable = true;
    }
    if (!bool) {
      for (var control in this.medicineForm.controls) {
        this.medicineForm.controls[control].enable();
      }

      this.isUpdating = true;
      this.isDisable = false;
    }

  }



  updateMedicine(data: StoreNewMedicineRequest) {
    if (this.medicineForm.invalid) {
      for (const i in this.medicineForm.controls) {
        this.medicineForm.controls[i].markAsDirty();
        this.medicineForm.controls[i].updateValueAndValidity();
      }
    } else {
      console.log(data);
      this.updateMedicineLoading = true;
      this.service.updateMedicine(data, this.medicineId).subscribe(
        (response) => {
          console.log(response);
          this.updateMedicineLoading = false;
          this.generalService.messageNz('success', `Dược phẩm ${data.name.bold()} cập nhật thành công`);
          // this.medicineForm.reset();
          // setTimeout(() => {
          //   this.router.navigate(['medicine-management/medicine-list']);
          // }, 1000);
          this.isDiable(true);
        },
        (error) => {
          console.log('update medicine error');
          this.updateMedicineLoading = false;
          this.generalService.createErrorNotification(error);
        }
      )
    }
  }

  cancel() {
    this.isDiable(true);
    this.medicineForm.setValue({
      name: this.medicineDetail.name,
      medicineUnitId: this.medicineDetail.medicineUnitId,
      description: this.medicineDetail.description,
      medicineSubgroupId: this.medicineDetail.medicineSubgroupId,
      medicineClassificationId: this.medicineDetail.medicineClassificationId,
    })
  }

  delete() {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Bạn có muốn xóa dược phẩm này khỏi hệ thống không?',
      nzContent: this.medicineForm.controls['name'].value,
      nzWidth: '35%',
      nzMaskClosable: false,
      nzClosable: false,
      nzCancelText: 'Không',
      nzOkText: 'Xác nhận xóa',
      nzOnOk: () =>
        new Promise((resolve, reject) =>
          this.service.deleteMedicine(this.medicineId).subscribe(
            (response) => {
              this.modal.closeAll()
              this.router.navigate(['medicine-management/medicine-list']);
              this.generalService.messageNz('success', `Xóa thành công`);
            }, (error) => {
              console.log('delete error');
              this.modal.closeAll();
              this.generalService.createErrorNotification(error);
            }
          )
        ).catch(() => console.log('Oops errors!'))
    });

  }

}
