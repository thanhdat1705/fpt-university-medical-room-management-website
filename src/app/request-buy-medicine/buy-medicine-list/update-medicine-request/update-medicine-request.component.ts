import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { PageInfo } from 'src/app/shared/models/page-info';
import { RequestBuyMedicine, RequestBuyMedicineDisplay } from 'src/app/shared/models/request-buy-medicine';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { MedicineClassificationResponse } from 'src/app/shared/responses/medicine-classification/medicine-classification-response';
import { MedicineSubgroupResponse } from 'src/app/shared/responses/medicine-subgroup/medicine-subgroup-response';
import { MedicineUnitResponse } from 'src/app/shared/responses/medicine-unit/medicine-unit-response';
import { MedicineResponseForBuy } from 'src/app/shared/responses/medicine/medicine';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';
import { RequestBuyMedicineService } from 'src/app/shared/services/request-buy-medicine/request-buy-medicine.service';
import { AddMedicineRequestComponent } from '../create-request/add-medicine-request/add-medicine-request.component';
import { v4 as uuidv4 } from 'uuid';
import { RequestToBuyMedicine } from 'src/app/shared/requests/request-buy-medicine/request-to-buy-medicine';

@Component({
  selector: 'app-update-medicine-request',
  templateUrl: './update-medicine-request.component.html',
  styleUrls: ['./update-medicine-request.component.scss']
})
export class UpdateMedicineRequestComponent implements OnInit {

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

  requestId: string;

  pageInfo: PageInfo = { isFirstPage: true, isLastPage: false, numberOfPage: 1, info: null };
  page: number;
  pageLimit: number;

  totalRecord!: number;
  pageSize = 5;
  pageIndex = 1;
  sortOrderList = 1;
  sortFieldList = "medicine.name";

  searchMedicineName: ValueCompare = {
    value: '',
    compare: 'Contains'
  }
  searchRecord: Record<string, ValueCompare> = {};
  searchRequestBuyMedicineId: ValueCompare = {
    value: '',
    compare: 'Equals'
  }
  searchFields = "id, name";
  searchMedicineRequest: SearchRequest = {
    limit: 1,
    page: 0,
    sortField: "CreateDate",
    sortOrder: 0,
    searchValue: this.searchRecord,
    selectFields: this.searchFields,
  };
  searchFieldsRequest = "medicineId, medicine.name as medicineName, medicineUnitId, medicineUnit.name as medicineUnitName, quantity, note"
  searchMedicineDetailInRequest: SearchRequest = {
    limit: 1,
    page: 0,
    sortField: "medicine.name",
    sortOrder: 0,
    searchValue: this.searchRecord,
    selectFields: this.searchFieldsRequest,
  };

  requesToBuyMedicine: RequestToBuyMedicine = {
    requestBuyMedicineDetails: this.buyMedicineListDisplay
  };

  selectFieldDetail = "id, createDate, updateDate, numberOfSpecificMedicine";

  constructor(
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private generalService: GeneralHelperService,
    private service: RequestBuyMedicineService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    private i18n: NzI18nService,
  ) {
    this.i18n.setLocale(vi_VN);
    this.requestId = activatedRoute.snapshot.paramMap.get('id');

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

  ngOnInit(): void {
    console.log(this.requestId);
    // this.activatedRoute.fragment.subscribe(
    //   (response) => {
    //     this.medicineInRequestDetail = JSON.parse(JSON.stringify(response));
    //     if (this.medicineInRequestDetail === null) {
    //       this.getDetailBuyMedicine(this.requestId, this.selectFieldDetail);
    //     } else {
    //       this.searchRequestBuyMedicineDetail(this.medicineInRequestDetail.id);
    //     }
    //   }
    // );

    this.getAllMedicineUnit();

    if (localStorage.getItem('UpdateBuyMedicineListDisplay') == null) {
      this.searchRequestBuyMedicineDetail(this.requestId);


    } else {

      this.buyMedicineListDisplay = JSON.parse(localStorage.getItem('UpdateBuyMedicineListDisplay'));

    }
  }

  resetFormValue() {
    this.buyMedicineForm.reset();
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


  getDetailBuyMedicine(id: string, selectFields: string) {
    this.service.getDetailBuyMedicine(id, selectFields).subscribe(
      (response) => {
        this.medicineInRequestDetail = response.data;
        console.log('requestDetail after null: ', this.medicineInRequestDetail);
        this.searchRequestBuyMedicineDetail(this.medicineInRequestDetail.id);
      },
      (error) => {
        console.log('get detail error');
        this.generalService.createErrorNotification(error);
      }
    )
  }

  requestBuyDetail(data: RequestBuyMedicineDisplay) {
    console.log(data);
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

  inputChange(value: string) {
    this.inputMedicine = value;
    console.log(value);

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

  searchRequestBuyMedicineDetail(id: string) {
    this.searchRequestBuyMedicineId.value = id;
    this.searchRecord['RequestToBuyMedicineId'] = this.searchRequestBuyMedicineId;
    this.service.searchRequestBuyMedicineDetail(this.searchMedicineDetailInRequest).subscribe(
      (response) => {
        localStorage.setItem('UpdateBuyMedicineListDisplay', JSON.stringify(response.data.data));
        this.buyMedicineListDisplay = JSON.parse(localStorage.getItem('UpdateBuyMedicineListDisplay'));
      },
      (error) => {
        console.log('search detail error');
        this.generalService.createErrorNotification(error);
      }
    )
  }

  cancel() {
    this.isDetail = false;
    this.medicineList = [];
    this.buyMedicineForm.reset();
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
          localStorage.setItem('UpdateBuyMedicineListDisplay', JSON.stringify(this.buyMedicineListDisplay));
          this.addRequestLoading = false;
          this.resetFormValue();
        }, 2000)
      }
    }
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
      localStorage.setItem('UpdateBuyMedicineListDisplay', JSON.stringify(this.buyMedicineListDisplay));
      this.requestBuyDetail(newItem);
      this.generalService.messageNz('success', 'Cập nhật thành công');
      this.addRequestLoading = false;
    }, 2000);
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
      localStorage.setItem('UpdateBuyMedicineListDisplay', JSON.stringify(this.buyMedicineListDisplay));
      this.sendRequestToBuyMedicineLoading = false;
    }, 2000)
  }


  convertList(array: RequestBuyMedicineDisplay[]): any[] {
    const newArray = array.map(({ id, medicineName, medicineUnitName, ...keepAttrs }) => keepAttrs)
    return newArray;
  }

  updateRequest() {
    this.sendRequestToBuyMedicineLoading = true;
    this.requesToBuyMedicine = {
      requestBuyMedicineDetails: this.convertList(this.buyMedicineListDisplay)
    }
    // this.service.getDetailBuyMedicineToScreen('b7a7168f-c571-40e2-8cf3-ad2477b1681f', this.selectFieldDetail);
    console.log(this.requestId);
    setTimeout(() => {
      this.service.updateRequestBuyMedicine(this.requesToBuyMedicine, this.requestId, this.selectFieldDetail).subscribe(
        (response) => {
          this.sendRequestToBuyMedicineLoading = false;
          this.isSaveRequest = true;
          console.log(response);
          this.resetFormValue();
          this.router.navigate(['request-buy-medicine/buy-medicine-list/detail-request', response.data.id], {
            fragment: response.data
          });
          this.generalService.createSuccessNotification("Cập nhật yêu cầu mua dược phẩm thành công");
          localStorage.removeItem('UpdateBuyMedicineListDisplay');
          this.service.getDetailBuyMedicineToDetailScreen(response.data.id, this.selectFieldDetail);
        },
        (error) => {
          this.sendRequestToBuyMedicineLoading = false;
          console.log('update request buy medicine error');
          this.generalService.createErrorNotification(error);
        }
      )
      this.sendRequestToBuyMedicineLoading = false;
    }, 1000)
  }
}
