import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { vi } from 'date-fns/locale';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { ImportBatchService } from 'src/app/shared/services/import-batch/import-batch.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';
import { ImportMedicine } from 'src/app/shared/models/importMedicine';
import { differenceInCalendarDays } from 'date-fns';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { MedicineResponseForImport } from 'src/app/shared/responses/medicine/medicine';
import { ImportMedicineRequest } from 'src/app/shared/requests/ImportBatchMedicine/import-batch-medicine';
@Component({
  selector: 'app-detail-import-medicine',
  templateUrl: './detail-import-medicine.component.html',
  styleUrls: ['./detail-import-medicine.component.scss']
})
export class DetailImportMedicineComponent implements OnInit {
  @Input() importBatchId: string;
  @Input() importMedicine: ImportMedicine;

  importMedicineForm: FormGroup;
  confirmModal!: NzModalRef;

  today = new Date();
  unit: string;
  medicineList: MedicineResponseForImport[] = [];
  medicineDisplay: MedicineResponseForImport;
  updateImportMedicineLoading = false;
  isLoading = false;
  isDisable = true;

  searchRecord: Record<string, ValueCompare> = {};
  searchFields = "id, name, medicineUnit.name as medicineUnit";
  searchMedicineRequest: SearchRequest = {
    limit: 1,
    page: 0,
    sortField: "CreateDate",
    sortOrder: 0,
    searchValue: this.searchRecord,
    selectFields: this.searchFields,
  };
  searchMedicineName: ValueCompare = {
    value: '',
    compare: 'Contains'
  }


  updateImportMedicineRequest: ImportMedicineRequest = {
    quantity: 0,
    price: 0,
    insertDate: "",
    expirationDate: "",
    medicineId: ""
  }


  searchImportMedicineRecord: Record<string, ValueCompare> = {};
  searchImportMedicinFields = "id, quantity, price, insertDate, expirationDate, medicineId, ImportBatchId";
  searchImportMedicineRequest: SearchRequest = {
    limit: 1,
    page: 0,
    sortField: "",
    sortOrder: 0,
    searchValue: this.searchImportMedicineRecord,
    selectFields: this.searchImportMedicinFields,
  };

  searchValueImportBatchId: ValueCompare = {
    value: '',
    compare: 'Equals'
  }
  searchValuePrice: ValueCompare = {
    value: '',
    compare: '=='
  }
  searchValueInsertDate: ValueCompare = {
    value: '',
    compare: '=='
  }
  searchValueExpirationDate: ValueCompare = {
    value: '',
    compare: '=='
  }
  searchValueMedicineId: ValueCompare = {
    value: '',
    compare: 'Equals'
  }
  isCurrentImportMedicine: ValueCompare = {
    value: '',
    compare: 'Not Equals'
  }
  constructor(private fb: FormBuilder,
    private pb: FormBuilder,
    private medicineService: MedicineService,
    private generalService: GeneralHelperService,
    private router: Router,
    private currency: CurrencyPipe,
    private i18n: NzI18nService,
    private modal: NzModalService,
    private service: ImportBatchService) {
    this.i18n.setLocale(vi_VN);
    this.i18n.setDateLocale(vi);

  }

  ngOnInit(): void {
    console.log(this.importMedicine);
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
      description: [''],
    });
    this.importMedicineForm.valueChanges.subscribe(form => {
      if (form.price) {
        this.importMedicineForm.patchValue({
          price: this.currency.transform(form.price.replace(/\D/g, '').replace(/^0+/, ''), '', '', '1.0-0', 'vi')
        }, { emitEvent: false });
      }
    })
    // this.medicineList = [...this.medicineList, data.medicine];
    this.searchImportMedicineRecord['ImportBatchId'] = null;
    this.searchImportMedicineRecord['Price'] = null;
    this.searchImportMedicineRecord['InsertDate'] = null;
    this.searchImportMedicineRecord['ExpirationDate'] = null;
    this.searchImportMedicineRecord['MedicineId'] = null;
    this.searchImportMedicineRecord['Id'] = null;
    this.defaultDetailValue();
  }

  get form() { return this.importMedicineForm.controls; }
  getCreateDate(time: string) {
    return this.generalService.getDate(time);
  }

  defaultDetailValue() {
    this.searchMedicine(this.importMedicine.medicine.name, false);
    this.medicineDisplay = {
      id: this.importMedicine.medicine.id,
      name: this.importMedicine.medicine.name,
      medicineUnit: this.importMedicine.medicineUnit.name
    }
    this.importMedicineForm.setValue({
      medicine: this.medicineDisplay.name,
      quantity: this.importMedicine.quantity,
      price: this.importMedicine.price.toLocaleString('vi'),
      insertDate: this.importMedicine.insertDate,
      expirationDate: this.importMedicine.expirationDate,
      description: this.importMedicine.description,
    })
    // this.unit = this.importMedicine.medicineUnit.name;

    console.log(this.importMedicineForm.controls['medicine'].value);
    this.medicineChange(this.medicineDisplay);
    this.disable(true);
  }

  // detailImportMedicine(data: ImportMedicine) {
  //   this.importMedicineId = data.id;
  //   this.importMedicine = data;
  //   this.isDetails = true;

  //   console.log(data);
  //   this.medicineList = [];
  //   this.medicineList = [...this.medicineList, data.medicine];

  //   this.importMedicineForm.setValue({
  //     medicine: data.medicine,
  //     quantity: data.quantity,
  //     price: data.price.toLocaleString('vi'),
  //     insertDate: data.insertDate,
  //     expirationDate: data.expirationDate,
  //     description: data.description,
  //   })
  //   this.medicineChange(data.medicine);
  //   this.disable(true);

  // }

  disable(bool: boolean) {
    if (bool) {
      for (var control in this.importMedicineForm.controls) {
        this.importMedicineForm.controls[control].disable();
      }
      this.isDisable = true;
    }
    if (!bool) {
      for (var control in this.importMedicineForm.controls) {
        if (control != 'description') {
          this.importMedicineForm.controls[control].enable();
        }
      }
      this.isDisable = false;
    }
  }

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
      this.searchMedicine(value, false);

    } else {
      this.isLoading = false;
      this.medicineList = [];
    }

  }

  searchMedicine(value: string, loading: boolean) {
    this.searchMedicineName.value = value;
    this.searchRecord['Name'] = this.searchMedicineName;
    this.medicineService.searchMedicine(this.searchMedicineRequest).subscribe(
      (response) => {
        this.medicineList = response.data.data;
        this.isLoading = loading;
      },
      (error) => {
        this.isLoading = loading;
        console.log('search medicine error');
        this.generalService.createErrorNotification(error);
      });
  }

  disabledInsertDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) > 0;
  };

  disabledExpiryDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) < 0;
  };

  edit() {
    this.importMedicineForm.controls['medicine'].setValue(this.medicineDisplay);
    // this.defaultDetailValue();
    // console.log(this.importMedicine.medicine)
    this.disable(false);
  }

  cancel() {
    this.defaultDetailValue();
  }


  deleteImportMedicine() {
    this.confirmModal = this.modal.confirm({
      nzTitle: '<i>Bạn có chắc muốn xóa dược phẩm này khỏi lô nhập này không?</i>',
      nzContent: this.importMedicine.medicine.name,
      nzCancelText: 'Không',
      nzOkText: 'Có',
      nzOnOk: () => new Promise((resolve, reject) => {
        this.service.deleteImportMedicine(this.importMedicine.id).subscribe(
          (response) => {
            this.modal.closeAll();
            this.generalService.messageNz('success', 'Xóa dược phẩm thành công');
          },
          (error) => {
            this.modal.closeAll();
            console.log('update import medicine error');
            this.generalService.createErrorNotification(error);
          }
        )
      }
      ).catch(() => console.log('Oops errors!')),
    })
  }


  parseInsertDate: string;
  parseExpirationDate: string;
  price: number;
  found: ImportMedicine[];
  updateImportMedicine(data: ImportMedicine) {
    this.parseInsertDate = this.generalService.getYMD(data.insertDate);
    this.parseExpirationDate = this.generalService.getYMD(data.expirationDate);
    this.price = Number(this.generalService.removeDotInString(data.price.toString()));
    if (this.importMedicineForm.invalid) {
      for (const i in this.importMedicineForm.controls) {
        this.importMedicineForm.controls[i].markAsDirty();
        this.importMedicineForm.controls[i].updateValueAndValidity();
      }
    } else {
      this.updateImportMedicineLoading = true;
      this.searchValueImportBatchId.value = this.importBatchId;
      this.searchValuePrice.value = this.price.toString();
      this.searchValueInsertDate.value = this.parseInsertDate;
      this.searchValueExpirationDate.value = this.parseExpirationDate;
      this.searchValueMedicineId.value = data.medicine.id;
      this.isCurrentImportMedicine.value = this.importMedicine.id;
      this.searchImportMedicineRecord['ImportBatchId'] = this.searchValueImportBatchId;
      this.searchImportMedicineRecord['Price'] = this.searchValuePrice;
      this.searchImportMedicineRecord['InsertDate'] = this.searchValueInsertDate;
      this.searchImportMedicineRecord['ExpirationDate'] = this.searchValueExpirationDate;
      this.searchImportMedicineRecord['MedicineId'] = this.searchValueMedicineId;
      this.searchImportMedicineRecord['Id'] = this.isCurrentImportMedicine;
      this.service.searchImportMedicine(this.searchImportMedicineRequest).subscribe(
        (response) => {
          this.updateImportMedicineLoading = false;
          this.found = response.data.data;
          console.log(this.found);
          if (this.found.length > 0) {
            console.log('is duplicate');
            this.confirmModal = this.modal.confirm({
              nzTitle: '<i>Thông báo</i>',
              nzContent: 'Dược phẩm này đang hiện có trong lô bạn muốn cộng dồn không?',
              nzCancelText: 'Không',
              nzOkText: 'Có',
              nzOnOk: () => {
                data.quantity = data.quantity + this.found[0].quantity;
                this.updateImportMedicineMethod(data);
              }

            })
          } else {
            this.updateImportMedicineMethod(data);
          }
        },
        (error) => {
          this.updateImportMedicineLoading = false;
          this.generalService.createErrorNotification(error);
        }
      )

    }
  }

  updateImportMedicineMethod(data: ImportMedicine) {
    this.updateImportMedicineLoading = true;
    this.updateImportMedicineRequest = {
      quantity: data.quantity,
      price: this.price,
      insertDate: this.parseInsertDate,
      expirationDate: this.parseExpirationDate,
      medicineId: data.medicine.id
    }
    this.service.updateImportMedicine(this.updateImportMedicineRequest, data.id).subscribe(
      (response) => {
        this.updateImportMedicineLoading = false;
        this.modal.closeAll();
        this.generalService.messageNz('success', 'Cập nhật thành công');
      },
      (error) => {
        this.updateImportMedicineLoading = false;
        this.modal.closeAll();
        console.log('update import medicine error');
        this.generalService.createErrorNotification(error);
      }
    )
  }
}
