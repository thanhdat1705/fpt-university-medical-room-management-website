import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { RequestBuyMedicineDisplay } from 'src/app/shared/models/request-buy-medicine';
import { StoreNewMedicineUnitRequest } from 'src/app/shared/requests/medicine-unit/store-new-request';
import { RequestToBuyMedicine } from 'src/app/shared/requests/request-buy-medicine/request-to-buy-medicine';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { MedicineClassificationResponse } from 'src/app/shared/responses/medicine-classification/medicine-classification-response';
import { MedicineSubgroupResponse } from 'src/app/shared/responses/medicine-subgroup/medicine-subgroup-response';
import { MedicineUnitResponse } from 'src/app/shared/responses/medicine-unit/medicine-unit-response';
import { MedicineResponseForBuy } from 'src/app/shared/responses/medicine/medicine';
import { BuyMedicineService } from 'src/app/shared/services/batch-medicine/buy-medicine.service';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';
import { RequestBuyMedicineService } from 'src/app/shared/services/request-buy-medicine/request-buy-medicine.service';
import { v4 as uuidv4 } from 'uuid';
import { AddMedicineRequestComponent } from './add-medicine-request/add-medicine-request.component';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {

  noteMinL = 1;
  noteMaxL = 500;

  buyMedicineForm: FormGroup;
  isLoading = false;
  addItemLoading = false;
  sendRequestToBuyMedicineLoading = false;
  addRequestLoading = false;
  isDisable = false;
  isVisible = false;
  isConfirmLoading = false;
  isDetail = false;
  isSaveRequest = false;
  selectedUser: string;

  inputMedicine: string = '';
  buyMedicineListDisplay: RequestBuyMedicineDisplay[] = [];
  medicineInRequestDetail: RequestBuyMedicineDisplay;
  found: RequestBuyMedicineDisplay;
  updateItem: RequestBuyMedicineDisplay;
  medicineList: MedicineResponseForBuy[] = [];
  medicine: MedicineResponseForBuy;
  unitList: MedicineUnitResponse[] = [];
  unit: MedicineUnitResponse;
  classList: MedicineClassificationResponse[] = [];
  subgroupList: MedicineSubgroupResponse[] = [];

  totalRecord!: number;
  pageSize = 1;
  pageIndex = 0;
  sortOrderList = 1;
  sortFieldList = "CreateDate";
  selectFieldDetail = "id, createDate, updateDate, numberOfSpecificMedicine";

  searchValueMap: Map<string, ValueCompare> = new Map;
  searchMedicineName: ValueCompare = {
    value: '',
    compare: 'Contains'
  }
  selectFields = "id, name";
  searchMedicineRequest;

  storeNewMedicineUnitRequest: StoreNewMedicineUnitRequest = {
    Name: "",
    AcronymUnit: "",
  }
  requesToBuyMedicine: RequestToBuyMedicine = {
    requestBuyMedicineDetails: this.buyMedicineListDisplay
  };



  constructor(
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private generalService: GeneralHelperService,
    private service: RequestBuyMedicineService,
    private router: Router,
    private modal: NzModalService,
    private i18n: NzI18nService,
  ) {
    this.i18n.setLocale(vi_VN);

    this.buyMedicineForm = this.fb.group({
      medicine: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      note: ['', [
        Validators.minLength(this.noteMinL),
        Validators.maxLength(this.noteMaxL)
      ]],
    })

  }
  // medicine = { id: "cbc73215-cdc0-40b2-a547-55deae1d0eab", name: "Alphchoi" }
  ngOnInit(): void {
    this.getAllMedicineUnit();
    this.searchMedicineRequest = new SearchRequest(this.pageSize, this.pageIndex, this.sortFieldList, this.sortOrderList, this.searchValueMap, this.selectFields)
    if (localStorage.getItem('BuyMedicineListDisplay') == null) {
      localStorage.setItem('BuyMedicineListDisplay', JSON.stringify(this.buyMedicineListDisplay));
      this.buyMedicineListDisplay = JSON.parse(localStorage.getItem('BuyMedicineListDisplay'));

    } else {

      this.buyMedicineListDisplay = JSON.parse(localStorage.getItem('BuyMedicineListDisplay'));

    }
  }

  get form() { return this.buyMedicineForm.controls; }
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

  resetFormValue() {
    // this.disable(false);
    this.buyMedicineForm.reset();
  }

  disable(bool: boolean) {
    if (bool) {
      for (var control in this.buyMedicineForm.controls) {
        this.buyMedicineForm.controls[control].disable();
      }
      this.isDisable = true;
    }
    if (!bool) {
      for (var control in this.buyMedicineForm.controls) {
        this.buyMedicineForm.controls[control].enable();
      }
      this.isDisable = false;
    }
  }

  addUnit(value: string) {
    console.log('value', value);
    this.storeNewMedicineUnitRequest.Name = value;
    this.storeNewMedicineUnitRequest.AcronymUnit = value.substring(0, 1);

    if ((this.unitList.filter(item => item.name.toLocaleLowerCase() === value.toLocaleLowerCase())).length < 1) {
      this.addItemLoading = true;
      this.medicineService.storeNewMedicineUnit(this.storeNewMedicineUnitRequest).subscribe(
        (response) => {
          this.unit = response.data;
          this.unitList = [...this.unitList, this.unit];
          this.addItemLoading = false;
          this.buyMedicineForm.controls.unit.setValue(this.unit.id);
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

  inputChange(value: string) {
    this.inputMedicine = value;
    console.log(value);

    if (value !== '') {
      this.isLoading = true;
      this.generalService.setValueCompare(value, this.searchMedicineName, 'Name', this.searchValueMap);
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


  addMedicineToRquestList(data: any) {
    console.log(data);
    // console.log(this.selectedUser);
    if (this.buyMedicineForm.invalid) {
      for (const i in this.buyMedicineForm.controls) {
        this.buyMedicineForm.controls[i].markAsDirty();
        this.buyMedicineForm.controls[i].updateValueAndValidity();
      }
    } else {
      this.found = this.buyMedicineListDisplay.find(item =>
        item.medicineId == data.medicine.id &&
        item.medicineUnitId == data.unit)
      if (this.found != undefined) {
        let index = this.buyMedicineListDisplay.findIndex(item => item.id == this.found.id);
        console.log(index);
        const confirmModal: NzModalRef = this.modal.confirm({
          nzTitle: '<i>Thông báo</i>',
          nzContent: 'Dược phẩm này đang hiện có trong danh sách yêu cầu bạn muốn cộng dồn không?',
          nzCancelText: 'Không',
          nzOkText: 'Có',
          nzOnOk: () => {
            confirmModal.destroy();
            this.updateRequestToArray(this.found, data.quantity, index, false);
          }
        })
      } else {
        this.addRequestLoading = true;
        setTimeout(() => {
          this.medicineInRequestDetail = {
            id: uuidv4(),
            medicineId: data.medicine.id,
            medicineName: data.medicine.name,
            medicineUnitId: data.unit,
            medicineUnitName: this.unitList.find(item => item.id == data.unit).name,
            quantity: data.quantity,
            note: data.note
          }
          console.log(this.medicineInRequestDetail);
          this.buyMedicineListDisplay = [...this.buyMedicineListDisplay, this.medicineInRequestDetail];
          localStorage.setItem('BuyMedicineListDisplay', JSON.stringify(this.buyMedicineListDisplay));
          this.addRequestLoading = false;
          this.resetFormValue();
        }, 2000)
      }
    }
  }

  updateRequestToArray(newItem: RequestBuyMedicineDisplay, quantity: number, index: number, isRemove: boolean) {
    this.addRequestLoading = true;
    setTimeout(() => {
      newItem.quantity = newItem.quantity + quantity;
      this.buyMedicineListDisplay[index] = newItem;
      if (isRemove) {
        this.buyMedicineListDisplay.forEach((items, index) => {
          if (items.id == this.found.id) {
            console.log(index);
            this.buyMedicineListDisplay.splice(index, 1);
          }
        })
      }
      localStorage.setItem('BuyMedicineListDisplay', JSON.stringify(this.buyMedicineListDisplay));
      this.requestBuyDetail(newItem);
      this.generalService.messageNz('success', 'Cập nhật thành công');
      this.addRequestLoading = false;
    }, 2000);
  }

  updateRequestDetail(data: any) {
    this.updateItem = {
      id: this.medicineInRequestDetail.id,
      medicineId: data.medicine.id,
      medicineName: data.medicine.name,
      medicineUnitId: data.unit,
      medicineUnitName: this.unitList.find(item => item.id == data.unit).name,
      quantity: data.quantity,
      note: data.note
    }
    if (this.buyMedicineForm.invalid) {
      for (const i in this.buyMedicineForm.controls) {
        this.buyMedicineForm.controls[i].markAsDirty();
        this.buyMedicineForm.controls[i].updateValueAndValidity();
      }
    } else {
      this.found = this.buyMedicineListDisplay.find(item =>
        item.medicineId == data.medicine.id &&
        item.medicineUnitId == data.unit &&
        item.id != this.updateItem.id)
      let index = this.buyMedicineListDisplay.findIndex(item => item.id == this.updateItem.id);
      if (this.found != undefined) {

        const confirmModal: NzModalRef = this.modal.confirm({
          nzTitle: '<i>Thông báo</i>',
          nzContent: 'Dược phẩm này đang hiện có trong danh sách yêu cầu bạn muốn cộng dồn không?',
          nzCancelText: 'Không',
          nzOkText: 'Có',
          nzOnOk: () => {
            confirmModal.destroy();
            this.updateRequestToArray(this.updateItem, this.found.quantity, index, true);
          }

        })
      } else {
        this.updateRequestToArray(this.updateItem, 0, index, false);
      }
      // setTimeout(() => {

      //   let index = this.buyMedicineListDisplay.findIndex(item => item.id == this.updateItem.id);
      //   console.log(index);
      //   if (index > -1) {
      //     this.medicine = {
      //       id: data.medicine.id,
      //       name: data.medicine.name
      //     }
      //     this.medicineList = [];
      //     this.medicineList = [...this.medicineList, this.medicine];
      //     this.buyMedicineListDisplay[index] = this.updateItem;
      //     this.generalService.messageNz('success', 'Cập nhật thành công');
      //   } else {
      //     this.generalService.messageNz('error', 'Dược phẩm không tồn tại');
      //   }

      //   localStorage.setItem('BuyMedicineListDisplay', JSON.stringify(this.buyMedicineListDisplay));
      //   this.addRequestLoading = false;
      //   // this.resetFormValue();
      // }, 2000)
    }
  }

  requestBuyDetail(data: RequestBuyMedicineDisplay) {
    this.medicineInRequestDetail = data;
    this.isDetail = true;
    this.medicine = {
      id: data.medicineId,
      name: data.medicineName
    }
    this.medicineList = [];
    this.medicineList = [...this.medicineList, this.medicine];
    this.buyMedicineForm.setValue({
      medicine: this.medicine,
      unit: data.medicineUnitId,
      quantity: data.quantity,
      note: data.note
    })
  }

  cancel() {
    this.isDetail = false;
    this.medicineList = [];
    this.buyMedicineForm.reset();
  }

  deleteRquest(id: string) {
    this.sendRequestToBuyMedicineLoading = true;
    setTimeout(() => {
      let index = this.buyMedicineListDisplay.findIndex(item => item.id == id);
      console.log(index);
      if (index > -1) {
        this.buyMedicineListDisplay.splice(index, 1);
        this.generalService.messageNz('success', 'Xóa thành công');
      }
      else {
        this.generalService.messageNz('error', 'Dược phẩm này k tồn tại thành công');
      }
      localStorage.setItem('BuyMedicineListDisplay', JSON.stringify(this.buyMedicineListDisplay));
      this.sendRequestToBuyMedicineLoading = false;
    }, 2000)
  }


  addNewMedicineModal() {
    console.log(this.inputMedicine);
    const modal = this.modal.create({
      nzTitle: 'Thêm dược phẩm',
      nzContent: AddMedicineRequestComponent,
      nzMaskClosable: false,
      // nzClosable: false,
      nzFooter: null,
      nzComponentParams: {
        inputMedicineName: this.inputMedicine
      },
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    modal.afterClose.subscribe(result => {
      if (result != undefined) {
        this.medicine = {
          id: result.id,
          name: result.name
        }
        this.medicineList = [...this.medicineList, this.medicine];
        this.buyMedicineForm.controls.medicine.setValue(this.medicine);
      }
      console.log('[afterClose] The result is:', result)
    });
  }


  convertList(array: RequestBuyMedicineDisplay[]): any[] {
    const newArray = array.map(({ id, medicineName, medicineUnitName, ...keepAttrs }) => keepAttrs)
    return newArray;
  }

  makeRequest() {
    this.sendRequestToBuyMedicineLoading = true;
    this.requesToBuyMedicine = {
      requestBuyMedicineDetails: this.convertList(this.buyMedicineListDisplay)
    }
    // this.service.getDetailBuyMedicineToScreen('b7a7168f-c571-40e2-8cf3-ad2477b1681f', this.selectFieldDetail);
    setTimeout(() => {
      this.service.addRequestBuyMedicine(this.requesToBuyMedicine).subscribe(
        (response) => {
          this.sendRequestToBuyMedicineLoading = false;
          this.isSaveRequest = true;
          console.log(response);
          this.resetFormValue();
          this.generalService.createSuccessNotification("Lưu yêu cầu mua dược phẩm thành công");
          localStorage.removeItem('BuyMedicineListDisplay');
          this.service.getDetailBuyMedicineToDetailScreen(response.data.id, this.selectFieldDetail);
        },
        (error) => {
          this.sendRequestToBuyMedicineLoading = false;
          console.log('add request buy medicine error');
          this.generalService.createErrorNotification(error);
        }
      )
      this.sendRequestToBuyMedicineLoading = false;
    }, 1000)
  }

}
