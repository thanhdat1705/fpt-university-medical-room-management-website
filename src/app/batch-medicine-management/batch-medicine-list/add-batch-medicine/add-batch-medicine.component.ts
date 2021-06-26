import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router, NavigationStart, NavigationError, Event } from '@angular/router';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { MedicineResponse, MedicineResponseForImport } from 'src/app/shared/responses/medicine/medicine';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { vi } from 'date-fns/locale';
import { formatDate } from '@angular/common';
import { ImportMedicineForAddBatch } from 'src/app/shared/models/importMedicine';
import { v4 as uuidv4 } from 'uuid';
import { GeneralStorage } from 'src/app/shared/services/storages/storages';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { ImportBatchService } from 'src/app/shared/services/import-batch/import-batch.service';
import { AddImportBatchRequest } from 'src/app/shared/requests/ImportBatchMedicine/import-batch-medicine';

@Component({
  selector: 'app-add-batch-medicine',
  templateUrl: './add-batch-medicine.component.html',
  styleUrls: ['./add-batch-medicine.component.scss']
})
export class AddBatchMedicineComponent implements OnInit {
  @Input() batchId: string;
  importMedicineForm: FormGroup;
  timeBatchForm: FormGroup;
  confirmModal!: NzModalRef;

  totalMedicine = 0;
  totalPrice = "0";
  addImportMedicineLoading = false;
  addImportBatchLoading = false;
  isLoading = false;
  isDestroy = true;
  isDisable = true;
  isDetails = false;
  isFound = false;

  today = new Date();
  timeDefaultValue = setHours(new Date(), 0);

  importMedicineList: ImportMedicineForAddBatch[] = [];
  medicineList: MedicineResponseForImport[] = [];
  importMedicine: ImportMedicineForAddBatch;
  batchMedicineList: any;
  unit: string;
  importMedicineId: string;
  medicineNameMinL = 3;
  medicineNameMaxL = 50;
  descriptionMinL = 1;
  descriptionMaxL = 500;
  patternMedicineName = "^[a-zA-Z0-9\\s]+$";
  patternUnit = "^[0-9]{1,5}$";


  searchRecord: Record<string, ValueCompare> = {};
  searchMedicineName: ValueCompare = {
    value: '',
    compare: 'Contains'
  }
  searchFields = "id, name, medicineUnit.name as medicineUnit";
  searchMedicineRequest: SearchRequest = {
    limit: 1,
    page: 0,
    sortField: "CreateDate",
    sortOrder: 0,
    searchValue: this.searchRecord,
    selectFields: this.searchFields,
  };

  addImportBatchRequest: AddImportBatchRequest = {
    storeImportMedicines: this.importMedicineList,
    totalPrice: 0,
    periodicInventoryMonth: 0,
    periodicInventoryYear: 0
  }

  constructor(
    private fb: FormBuilder,
    private pb: FormBuilder,
    private medicineService: MedicineService,
    private generalService: GeneralHelperService,
    private router: Router,
    private currency: CurrencyPipe,
    private i18n: NzI18nService,
    private modal: NzModalService,
    private service: ImportBatchService
  ) {
    this.i18n.setLocale(vi_VN);
    this.i18n.setDateLocale(vi);

    this.importMedicineForm = this.fb.group({
      medicine: ['', [
        Validators.required,
      ]],
      quantity: ['', [
        Validators.required
      ]],
      price: ['', [
        Validators.required
      ]],
      insertDate: [this.today, [
        Validators.required
      ]],
      expirationDate: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.minLength(this.descriptionMinL),
        Validators.maxLength(this.descriptionMaxL)
      ]],
    });

    this.timeBatchForm = this.pb.group({
      monthBatch: [this.today, [Validators.required]],
      yearBatch: [this.today, [Validators.required]]
    })
  }

  
  ngOnInit(): void {
    this.importMedicineForm.valueChanges.subscribe(form => {
      if (form.price) {
        this.importMedicineForm.patchValue({
          price: this.currency.transform(form.price.replace(/\D/g, '').replace(/^0+/, ''), '', '', '1.0-0', 'vi')
        }, { emitEvent: false });
      }
    })

    this.searchRecord['Name'] = null;

    if (localStorage.getItem('ImportMedicineList') == null) {
      localStorage.setItem('ImportMedicineList', JSON.stringify(this.importMedicineList));
      this.importMedicineList = JSON.parse(localStorage.getItem('ImportMedicineList'));
      console.log('ImportMedicineList ', this.importMedicineList)
    } else {
      console.log(JSON.parse(localStorage.getItem('ImportMedicineList')));
      this.importMedicineList = JSON.parse(localStorage.getItem('ImportMedicineList'));
      this.getTotalQuantityAndPrice();
    }

  }



  defaultFormValue() {
    this.isDetails = false;
    this.disable(false);
    this.importMedicineForm.reset();
    this.importMedicineForm.controls.insertDate.setValue(this.today);
  }

  disable(bool: boolean) {
    if (bool) {
      for (var control in this.importMedicineForm.controls) {
        this.importMedicineForm.controls[control].disable();
      }
      this.isDisable = true;
    }
    if (!bool) {
      for (var control in this.importMedicineForm.controls) {
        this.importMedicineForm.controls[control].enable();
      }
      this.isDisable = false;
    }
  }

  disabledInsertDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) > 0;
  };

  disabledExpiryDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) < 0;
  };

  get f() { return this.importMedicineForm.controls; }
  get timef() { return this.timeBatchForm.controls; }

  medicineChange(value: any) {
    if (value != null) {
      this.unit = value.medicineUnit;
    }
    else {
      this.unit = '';
    }
  }

  inputChange(value: string) {

    if (value !== '') {
      this.isLoading = true;
      this.searchMedicineName.value = value;
      this.searchRecord['Name'] = this.searchMedicineName;
      this.medicineService.searchMedicine(this.searchMedicineRequest).subscribe(
        (response) => {
          this.medicineList = response.data.data;
          console.log(response.data.data);
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          console.log('search medicine error');
          this.generalService.createErrorNotification(error);

        });

    } else {

      this.isLoading = false;
      this.medicineList = [];
    }

  }

  getTotalQuantityAndPrice() {
    let total = 0;
    this.totalMedicine = this.importMedicineList.length;
    this.importMedicineList.forEach(item => {
      let tmp = item.price * item.quantity;
      total = total + tmp;
    });
    this.totalPrice = total.toLocaleString('vi');
  }

  addImportMedicine(data: any) {
    if (this.importMedicineForm.invalid) {
      for (const i in this.importMedicineForm.controls) {
        this.importMedicineForm.controls[i].markAsDirty();
        this.importMedicineForm.controls[i].updateValueAndValidity();
      }
    } else {

      this.addImportMedicineLoading = true;
      setTimeout(() => {
        this.importMedicine = {
          id: uuidv4(),
          quantity: data.quantity,
          price: Number(this.generalService.removeDotInString(data.price.toString())),
          description: data.description,
          insertDate: data.insertDate,
          expirationDate: data.expirationDate,
          medicineId: data.medicine.id,
          medicine: data.medicine
        }
        this.importMedicineList = [...this.importMedicineList, this.importMedicine]
        localStorage.setItem('ImportMedicineList', JSON.stringify(this.importMedicineList));
        this.getTotalQuantityAndPrice();

        this.defaultFormValue();
        this.addImportMedicineLoading = false;
        this.generalService.messageNz('success', 'Thêm thành công');
        console.log(this.importMedicine);
      }, 2000);
    }



  }

  convertList(): any[] {
    const newArray = this.importMedicineList.map(({ description, id, medicine, ...keepAttrs }) => keepAttrs)
    return newArray;
  }

  addImportBatch() {
    if (this.timeBatchForm.invalid) {
      for (const i in this.timeBatchForm.controls) {
        this.timeBatchForm.controls[i].markAsDirty();
        this.timeBatchForm.controls[i].updateValueAndValidity();
      }
    } else {
      this.addImportBatchLoading = true;
      this.addImportBatchRequest = {
        storeImportMedicines: this.convertList(),
        totalPrice: Number(this.generalService.removeDotInString(this.totalPrice)),
        periodicInventoryMonth: this.timeBatchForm.controls.monthBatch.value.getMonth() + 1,
        periodicInventoryYear: this.timeBatchForm.controls.yearBatch.value.getFullYear()
      }
      console.log(this.addImportBatchRequest);
      this.service.addImportBatch(this.addImportBatchRequest).subscribe(
        (response) => {
          console.log(response);
          this.addImportBatchLoading = false;
          localStorage.removeItem('ImportMedicineList');
          this.generalService.messageNz('success', `Lô thuốc mới được thêm thành công`);
          this.router.navigate(['batch-medicine-management/batch-medicine-list']);
        },
        (error) => {
          console.log('add import batch error');
          this.addImportBatchLoading = false;
          this.generalService.createErrorNotification(error);
        }
      )
    }

  }

  detailImportMedicine(data: any) {
    this.importMedicineId = data.id;
    this.importMedicine = data;
    this.isDetails = true;

    console.log(data);
    this.medicineList = [];
    this.medicineList = [...this.medicineList, data.medicine];

    this.importMedicineForm.setValue({
      medicine: data.medicine.name,
      quantity: data.quantity,
      price: data.price.toLocaleString('vi'),
      insertDate: data.insertDate,
      expirationDate: data.expirationDate,
      description: data.description,
    })
    this.medicineChange(data.medicine);
    this.disable(true);

    console.log(this.medicineList);

  }

  cancel() {
    this.detailImportMedicine(this.importMedicine);
  }

  edit() {
    this.importMedicineForm.controls['medicine'].setValue(this.importMedicine.medicine);
    this.disable(false);
  }

  updateImportMedicine(data: any) {
    console.log(data);
    if (this.importMedicineForm.invalid) {
      for (const i in this.importMedicineForm.controls) {
        this.importMedicineForm.controls[i].markAsDirty();
        this.importMedicineForm.controls[i].updateValueAndValidity();
      }
    } else {
      this.addImportMedicineLoading = true;
      setTimeout(() => {
        this.importMedicineList.forEach(item => {
          if (item.id == this.importMedicineId) {
            item.id = this.importMedicineId,
              item.quantity = data.quantity,
              item.price = Number(this.generalService.removeDotInString(data.price.toString())),
              item.description = data.description,
              item.insertDate = data.insertDate,
              item.expirationDate = data.expirationDate,
              item.medicineId = data.medicine.id,
              item.medicine = data.medicine
          }
        })
        this.importMedicineList = this.importMedicineList;
        localStorage.setItem('ImportMedicineList', JSON.stringify(this.importMedicineList));
        this.disable(true);
        this.getTotalQuantityAndPrice();
        // this.defaultFormValue();
        this.addImportMedicineLoading = false;
        this.generalService.messageNz('success', 'Cập nhật thành công');
        console.log(this.importMedicine);
      }, 2000);
    }
  }

  deleteImportMedicine() {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Bạn có muốn xóa dược phẩm này khỏi danh sách không?',
      nzContent: this.importMedicineForm.controls.medicine.value,
      nzWidth: '35%',
      nzMaskClosable: false,
      nzClosable: false,
      nzCancelText: 'Không',
      nzOkText: 'Xác nhận xóa',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            this.importMedicineList.forEach((item, index) => {
              if (item.id === this.importMedicineId) {
                this.isFound = true;
                this.importMedicineList.splice(index, 1);
                this.modal.closeAll()
                this.generalService.messageNz('success', 'Xóa thành công');
                this.importMedicineList = this.importMedicineList;
                localStorage.setItem('ImportMedicineList', JSON.stringify(this.importMedicineList));
                this.getTotalQuantityAndPrice();
                this.defaultFormValue();
                return;
              } else {
                this.isFound = false;
                return;
              }
            });
          }, 2000)
        }
        ).catch(() => console.log('Oops errors!')),
      nzOnCancel: () => {
        this.isFound = true;
      }
    });

    this.confirmModal.afterClose.subscribe(() => {
      if (!this.isFound) {
        this.generalService.messageNz('error', 'Dược phẩm không tồn tại');
      }
    })

  }

}
