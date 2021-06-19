import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router, NavigationStart, NavigationError, Event } from '@angular/router';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { MedicineResponse } from 'src/app/shared/responses/medicine/medicine';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { vi } from 'date-fns/locale';
import { formatDate } from '@angular/common';
import { ImportMedicine } from 'src/app/shared/models/importMedicine';
import { v4 as uuidv4 } from 'uuid';
import { GeneralStorage } from 'src/app/shared/services/storages/storages';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

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
  addItemLoading = false;
  tableLoading = false;
  isLoading = false;

  today = new Date();
  timeDefaultValue = setHours(new Date(), 0);

  importMedicineList: ImportMedicine[] = [];
  medicineList: MedicineResponse[] = [];
  importMedicine: ImportMedicine;
  batchMedicineList: any;
  unit: string;
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
    sortField: "CreatedDate",
    sortOrder: 0,
    searchValue: this.searchRecord,
    selectFields: this.searchFields,
  };

  constructor(
    private fb: FormBuilder,
    private pb: FormBuilder,
    private medicineService: MedicineService,
    private generalService: GeneralHelperService,
    private router: Router,
    private currency: CurrencyPipe,
    private i18n: NzI18nService,
    private modal: NzModalService,
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

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('router 1');
        if (localStorage.getItem('ImportMedicineList') != null) {
          if (JSON.parse(localStorage.getItem('ImportMedicineList')).length >= 0) {
            localStorage.removeItem('ImportMedicineList');
            // console.log(event.);
          }
        }

      }

      if (event instanceof NavigationEnd) {
        console.log('router 2');
        console.log(event.toString());
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        console.log('router 3');
        // Present error to user
        console.log(event.error);
      }
    });

  }

  ngOnInit(): void {
    this.importMedicineForm.valueChanges.subscribe(form => {
      if (form.price) {
        this.importMedicineForm.patchValue({
          price: this.currency.transform(form.price.replace(/\D/g, '').replace(/^0+/, ''), '', '', '1.0-0', 'vi')
        }, { emitEvent: false });
        // this.batchForm.get( 'controlName' ).updateValueAndValidity();
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
      // localStorage.removeItem('ImportMedicineList');
    }
  }

  // deleteImportMedicineBatch() {
  //   this.confirmModal = this.modal.confirm({
  //     nzTitle: 'Bạn có muốn xóa dược phẩm này khỏi hệ thống không?',
  //     nzContent: this.medicineForm.controls['name'].value,
  //     nzWidth: '35%',
  //     nzMaskClosable: false,
  //     nzClosable: false,
  //     nzCancelText: 'Không',
  //     nzOkText: 'Xác nhận xóa',
  //     nzOnOk: () =>
  //       new Promise((resolve, reject) =>
  //         this.service.deleteMedicine(this.medicineId).subscribe(
  //           (response) => {
  //             this.modal.closeAll()
  //             this.router.navigate(['medicine-management/medicine-list']);
  //             this.generalService.messageNz('success', `Xóa thành công`);
  //           }, (error) => {
  //             console.log('delete error');
  //             this.modal.closeAll();
  //             this.generalService.createErrorNotification(error);
  //           }
  //         )
  //       ).catch(() => console.log('Oops errors!'))
  //   });

  // }

  periodic() {

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
      this.importMedicine = {
        id: uuidv4(),
        quantity: data.quantity,
        price: Number(this.generalService.removeDotInString(data.price.toString())),
        priceWithDot: data.price,
        description: data.description,
        insertDate: data.insertDate,
        expirationDate: data.expirationDate,
        medicineId: data.medicine.id,
        name: data.medicine.name
      }
      console.log(this.importMedicine);
      this.importMedicineList = [...this.importMedicineList, this.importMedicine]
      localStorage.setItem('ImportMedicineList', JSON.stringify(this.importMedicineList));
      this.getTotalQuantityAndPrice();
      this.importMedicineForm.reset();
      this.importMedicineForm.controls.insertDate.setValue(this.today);
    }

  }


  addImportBatch() {
    if (this.timeBatchForm.invalid) {
      for (const i in this.timeBatchForm.controls) {
        this.timeBatchForm.controls[i].markAsDirty();
        this.timeBatchForm.controls[i].updateValueAndValidity();
      }
    }

  }

  detail(id: string) {
    console.log(id);
  }

}
