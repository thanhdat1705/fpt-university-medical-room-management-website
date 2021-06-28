import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { MedicineResponseForImport } from 'src/app/shared/responses/medicine/medicine';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { ImportBatchService } from 'src/app/shared/services/import-batch/import-batch.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ImportMedicineForAdd, ImportMedicineRequest } from 'src/app/shared/requests/ImportBatchMedicine/import-batch-medicine';

@Component({
  selector: 'app-add-import-medicine',
  templateUrl: './add-import-medicine.component.html',
  styleUrls: ['./add-import-medicine.component.scss']
})
export class AddImportMedicineComponent implements OnInit {

  @Input() importBatchId: string;

  today = new Date();
  importMedicineForm: FormGroup;
  confirmModal: NzModalRef;
  unit: string;

  isLoading = false;
  addImportMedicineLoading = false;
  isAddMore = false;
  isAddNew = false;

  medicineList: MedicineResponseForImport[] = [];

  medicineNameMinL = 3;
  medicineNameMaxL = 50;
  patternMedicineName = "^[a-zA-Z0-9\\s]+$";
  patternUnit = "^[0-9]{1,5}$";

  selectFieldsUpdateImportMedicine = "Id, Quantity,Price, InsertDate, ExpirationDate, Description, MedicineId, Medicine.Name as MedicineName, Medicine.MedicineUnit.Name as MedicineUnit, ImportMedicineStatus.StatusImportMedicine";

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

  searchMedicineName: ValueCompare = {
    value: '',
    compare: 'Contains'
  }
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

  addImportMedicineRequest: ImportMedicineRequest = {
    quantity: 0,
    price: 0,
    insertDate: "",
    expirationDate: "",
    medicineId: ""
  }

  updateImportMedicineRequest: ImportMedicineRequest = {
    quantity: 0,
    price: 0,
    insertDate: "",
    expirationDate: "",
    medicineId: ""
  }
  constructor(
    private fb: FormBuilder,
    private currency: CurrencyPipe,
    private service: ImportBatchService,
    private generalService: GeneralHelperService,
    private medicineService: MedicineService,
    private modal: NzModalService) {

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
    });

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
    this.searchImportMedicineRecord['ImportBatchId'] = null;
    this.searchImportMedicineRecord['Price'] = null;
    this.searchImportMedicineRecord['InsertDate'] = null;
    this.searchImportMedicineRecord['ExpirationDate'] = null;
    this.searchImportMedicineRecord['MedicineId'] = null;
    console.log(this.importBatchId);
  }

  get form() { return this.importMedicineForm.controls; }
  getCreateDate(time: string) {
    return this.generalService.getDate(time);
  }

  inputChange(value: string) {
    if (value !== '') {
      this.isLoading = true;
      this.searchMedicineName.value = value;
      this.searchRecord['Name'] = this.searchMedicineName;
      this.medicineService.searchMedicine(this.searchMedicineRequest).subscribe(
        (response) => {
          this.medicineList = response.data.data;
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

  medicineChange(value: any) {
    if (value != null) {
      this.unit = value.medicineUnit;
    }
    else {
      this.unit = '';
    }
  }

  disabledInsertDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) > 0;
  };

  disabledExpiryDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) < 0;
  };

  parseInsertDate: string;
  parseExpirationDate: string;
  price: number;
  found: ImportMedicineForAdd[] = [];
  addImportMedicine(data: ImportMedicineForAdd) {
    console.log(data);
    this.parseInsertDate = this.generalService.getYMD(data.insertDate);
    this.parseExpirationDate = this.generalService.getYMD(data.expirationDate);
    this.price = Number(this.generalService.removeDotInString(data.price.toString()));
    if (this.importMedicineForm.invalid) {
      for (const i in this.importMedicineForm.controls) {
        this.importMedicineForm.controls[i].markAsDirty();
        this.importMedicineForm.controls[i].updateValueAndValidity();
      }
    } else {
      // const found = this.importMedicineList.find(item =>
      //   item.medicineId == data.medicine.id &&
      //   item.price == this.price &&
      //   this.generalService.getYMD(item.insertDate) == this.parseInsertDate &&
      //   this.generalService.getYMD(item.expirationDate) == this.parseExpirationDate)
      // console.log(found);
      this.addImportMedicineLoading = true;
      this.searchValueImportBatchId.value = this.importBatchId;
      this.searchValuePrice.value = this.price.toString();
      this.searchValueInsertDate.value = this.parseInsertDate;
      this.searchValueExpirationDate.value = this.parseExpirationDate;
      this.searchValueMedicineId.value = data.medicine.id;
      this.searchImportMedicineRecord['ImportBatchId'] = this.searchValueImportBatchId;
      this.searchImportMedicineRecord['Price'] = this.searchValuePrice;
      this.searchImportMedicineRecord['InsertDate'] = this.searchValueInsertDate;
      this.searchImportMedicineRecord['ExpirationDate'] = this.searchValueExpirationDate;
      this.searchImportMedicineRecord['MedicineId'] = this.searchValueMedicineId;

      console.log(this.searchImportMedicineRequest);
      this.service.searchImportMedicine(this.searchImportMedicineRequest).subscribe(
        (response) => {
          this.addImportMedicineLoading = false;
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
                this.updateImportMedicineMethod(data, this.found[0].id);
              }

            })
          } else {
            this.addImportMedicineMethod(data);
          }
        },
        (error) => {
          this.addImportMedicineLoading = false;
          this.generalService.createErrorNotification(error);
        }
      )
    }
  }

  addImportMedicineMethod(data: ImportMedicineForAdd) {
    this.addImportMedicineLoading = true;
    this.addImportMedicineRequest = {
      quantity: data.quantity,
      price: this.price,
      insertDate: this.parseInsertDate,
      expirationDate: this.parseExpirationDate,
      medicineId: data.medicine.id
    }
    this.service.addImportMedicine(this.addImportMedicineRequest, this.importBatchId).subscribe(
      (response) => {
        this.addImportMedicineLoading = false;
        this.modal.closeAll();
        this.generalService.messageNz('success', 'Thêm dược phẩm mới thành công');
      },
      (error) => {
        this.addImportMedicineLoading = false;
        this.modal.closeAll();
        console.log('add import medicine error');
        this.generalService.createErrorNotification(error);
      }
    )
  }

  updateImportMedicineMethod(data: ImportMedicineForAdd, idImportMedicine: string) {
    this.addImportMedicineLoading = true;
    this.updateImportMedicineRequest = {
      quantity: data.quantity,
      price: this.price,
      insertDate: this.parseInsertDate,
      expirationDate: this.parseExpirationDate,
      medicineId: data.medicine.id
    }
    this.service.updateImportMedicine(this.updateImportMedicineRequest, idImportMedicine, this.selectFieldsUpdateImportMedicine).subscribe(
      (response) => {
        console.log(response.data);
        this.addImportMedicineLoading = false;
        this.modal.closeAll();
        this.generalService.messageNz('success', 'Cập nhật thành công');
      },
      (error) => {
        this.addImportMedicineLoading = false;
        this.modal.closeAll();
        console.log('update import medicine error');
        this.generalService.createErrorNotification(error);
      }
    )
  }


}
