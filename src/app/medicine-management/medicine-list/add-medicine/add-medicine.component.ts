import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MyErrorStateMatcher } from 'src/app/shared/my-error-state-matcher';
import { SearchMedicineUnitRequest } from 'src/app/shared/requests/medicine-unit/search-request';
import { StoreNewMedicineUnitRequest } from 'src/app/shared/requests/medicine-unit/store-new-request';
import { MedicineUnitResponse } from 'src/app/shared/responses/medicine-unit/medicine-unit-response';
import { MedicineSubgroupResponse } from 'src/app/shared/responses/medicine-subgroup/medicine-subgroup-response';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';
import { SummaryService } from 'src/app/shared/services/summary.service';
import { StoreNewMedicineSubgroupRequest } from 'src/app/shared/requests/medicine-subgroup/store-new-request';
import { StoreNewMedicineRequest } from 'src/app/shared/requests/medicine/store-new';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineResponse } from 'src/app/shared/responses/medicine/medicine';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.scss']
})
export class AddMedicineComponent implements OnInit {

  medicineId: string;

  addMedicineLoading = false;
  addItemLoading = false;

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
  /*-----------------------------------------------------------------------------------------------------------*/

  /*----------REQUEST------------------------------------------------------------------------------------------*/
  searchUnitRequest: SearchMedicineUnitRequest = {
    MedicineUnitName: "",
    Limit: 0,
    Page: 0,
    SortField: "",
    SortOrder: 0,
  }
  storeNewMedicineUnitRequest: StoreNewMedicineUnitRequest = {
    Name: "",
    AcronymUnit: "",
  }

  storeNewMedicineSubgroupRequest: StoreNewMedicineSubgroupRequest = {
    Name: ""
  }

  // medicineId: string;
  isDisable = true;
  medicineDetail: MedicineResponse;
  /*-----------------------------------------------------------------------------------------------------------*/


  constructor(private fb: FormBuilder,
    private service: MedicineService,
    private generalService: GeneralHelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.medicineId = activatedRoute.snapshot.queryParamMap.get('id');
  }

  ngOnInit(): void {
    this.medicineForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(this.medicineNameMinL),
        Validators.maxLength(this.medicineNameMaxL),
        Validators.pattern(this.patternMedicineName)
      ]],
      unitId: ['', [
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

    this.getAllMedicineClassification();
    this.getAllMedicineSubgroup();
    this.getAllMedicineUnit();

    console.log('test id: -----------s', this.medicineId);
    this.getDetailMedicine();

  }
 
  edit() {
    this.medicineForm.controls['name'].enable();
    this.medicineForm.controls['description'].enable();
    this.isDisable = false;
  }
  /*----------GET ALL------------------------------------------------------------------------------------------*/

  getDetailMedicine() {
    if (this.medicineId != null) {
      this.medicineForm.controls['name'].disable();
      this.medicineForm.controls['description'].disable();
      this.isDisable = true;
      this.service.getMedicine(this.medicineId).subscribe(
        (response) => {
          this.medicineDetail = response.data;
          console.log(response.data);
          this.medicineForm.setValue({
            name: this.medicineDetail.name,
            unitId: this.medicineDetail.unitId,
            description: this.medicineDetail.description,
            medicineSubgroupId: this.medicineDetail.medicineSubgroupId,
            medicineClassificationId: this.medicineDetail.medicineClassificationId,
          })
        },
        (error) => {
          console.log('get detail error');
          this.generalService.createErrorNotification(error);
        }
      )
    }
  }

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

  /*-----------------------------------------------------------------------------------------------------------*/


  get f() { return this.medicineForm.controls; }


  /*-----------------------------------------------------------------------------------------------------------*/




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

    console.log(this.unitList);
  }

  addNewMedicine(data: StoreNewMedicineRequest) {

    if (this.medicineForm.invalid) {
      for (const i in this.medicineForm.controls) {
        this.medicineForm.controls[i].markAsDirty();
        this.medicineForm.controls[i].updateValueAndValidity();
      }
    } else {
      console.log(data);
      this.addMedicineLoading = true;
      this.service.storeNewMedicine(data).subscribe(
        (response) => {
          console.log(response);
          this.addMedicineLoading = false;
          console.log('store new', data);
          this.generalService.messageNz('success', `Dược phẩm ${data.name.bold()} thêm thành công`);
          this.medicineForm.reset();
          setTimeout(() => {
            this.router.navigate(['medicine-management/medicine-list']);
          }, 1000);
        },
        (error) => {
          this.addMedicineLoading = false;
          this.generalService.createErrorNotification(error);
        }
      )
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
      this.addMedicineLoading = true;
      this.service.updateMedicine(data, this.medicineId).subscribe(
        (response) => {
          console.log(response);
          this.addMedicineLoading = false;
          this.generalService.messageNz('success', `Dược phẩm ${data.name.bold()} cập nhật thành công`);
          this.medicineForm.reset();
          setTimeout(() => {
            this.router.navigate(['medicine-management/medicine-list']);
          }, 1000);
        },
        (error) => {
          console.log('update medicine error');
          this.addMedicineLoading = false;
          this.generalService.createErrorNotification(error);
        }
      )
    }
  }



  check() {
    console.log('ID: ---- ', this.medicineId);
  }
}
