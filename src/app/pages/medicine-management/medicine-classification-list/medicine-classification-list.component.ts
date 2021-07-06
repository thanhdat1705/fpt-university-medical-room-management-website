import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PageInfo } from 'src/app/shared/models/page-info';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchMedicineClassificationRequest } from 'src/app/shared/requests/medicine-classification/search-request';
import { StoreNewMedicineClassificationRequest, UpdateMedicineClassificationRequest } from 'src/app/shared/requests/medicine-classification/store-new-request';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { MedicineClassificationResponse } from 'src/app/shared/responses/medicine-classification/medicine-classification-response';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';

@Component({
  selector: 'app-medicine-classification-list',
  templateUrl: './medicine-classification-list.component.html',
  styleUrls: ['./medicine-classification-list.component.scss']
})
export class MedicineClassificationListComponent implements OnInit {

  classList: MedicineClassificationResponse[] = [];
  updateClass: UpdateMedicineClassificationRequest;
  addNewClass: StoreNewMedicineClassificationRequest;

  pageInfo: PageInfo = { isFirstPage: true, isLastPage: false, numberOfPage: 1, info: null };
  page: number;
  pageLimit: number;
  totalRecord!: number;
  pageSize = 5;
  pageIndex = 1;
  sortOrderList = 0;
  sortFieldList = "Name";

  updateValue: string;
  classForm: FormGroup;
  tableLoading = false;
  visible = false;
  searchValue = '';

  searchName: ValueCompare = {
    value: '',
    compare: 'Contains'
  }
  searchValueMap: Map<string, ValueCompare> = new Map;
  selectFields = "id, name, description";
  searchClassRequest = new SearchRequest(this.pageSize, this.pageIndex, this.sortFieldList, this.sortOrderList, this.searchValueMap, this.selectFields)


  constructor(
    private fb: FormBuilder,
    private service: MedicineService,
    public generalService: GeneralHelperService,) { }

  ngOnInit(): void {
    this.classForm = this.fb.group({
      class: ['', [
        Validators.required,
      ]],
    })
  }

  get form() { return this.classForm.controls; }

  resetTable() {
    this.searchClassRequest.limit = 5;
    this.searchClassRequest.page = 1;
    this.searchClassRequest.sortOrder = 1;
    this.searchClassRequest.sortField = "Name";
  }

  searchClass() {
    this.tableLoading = true;
    this.service.searchClass(this.searchClassRequest).subscribe(
      (response) => {
        this.getData(response.data);
        this.tableLoading = false;
      },
      (error) => {
        this.tableLoading = false;
        console.log('get all unit error');
      }
    )
  }

  getData(responseUnit: ResponseSearch) {
    this.pageInfo.info = responseUnit.info;
    this.page = this.pageInfo.info.page;
    this.pageLimit = this.pageInfo.info.limit;
    this.totalRecord = this.pageInfo.info.totalRecord;
    this.classList = responseUnit.data;
    this.classList.forEach(unit => {
      unit.edit = false;
    })
    console.log('class ', this.classList);
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    console.log("params -- ", params);
    const { pageIndex, pageSize, sort, filter } = params;
    this.pageSize = params.pageSize;
    this.pageIndex = params.pageIndex;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    sortOrder === 'ascend' || null ? this.sortOrderList = 0 : this.sortOrderList = 1;
    sortField == null ? this.sortFieldList = 'Name' : this.sortFieldList = sortField;

    this.searchClassRequest.limit = pageSize;
    this.searchClassRequest.page = pageIndex;
    this.searchClassRequest.sortOrder = this.sortOrderList;
    this.searchClassRequest.sortField = this.sortFieldList;

    this.searchClass();

  }


  inputChange(value: any) {
    console.log('value -- ', value);
    // this.searchValue = value;
    console.log(this.pageSize);
    this.resetTable();
    this.generalService.setValueCompare(this.searchValue, this.searchName, 'Name', this.searchValueMap);
    if (value !== '') {
      this.searchClassRequest.limit = 5;
      this.searchClassRequest.page = 1;
      this.searchClass();

    } else {
      this.searchClassRequest.limit = 5;
      this.searchClassRequest.page = 1;
      this.searchClass();
    }
  }

  deleteClass(id: string) {
    console.log(id);
    this.tableLoading = true;
    this.service.deleteMedicineClassification(id).toPromise().then(
      (reponse) => {
        this.tableLoading = false;
        this.searchClass();
        this.generalService.createSuccessNotification("Xóa loại thành công");
      },
      (error) => {
        console.log('delete error');
        this.tableLoading = false;
        this.generalService.createErrorNotification(error);
      }
    )
  }

  startEdit(index: number) {
    this.updateValue = this.classList[index].name;
    this.classList[index].edit = true;
  }

  saveEdit(id: string, index: number, updateValue: string) {
    let name = updateValue;
    this.updateClass = {
      Name: name,
      Description: "",
    }
    this.tableLoading = true;
    this.service.updateMedicineClassification(id, this.updateClass).subscribe(
      (response) => {
        this.classList[index].name = response.data.name
        this.classList[index].edit = false;
        this.tableLoading = false;
        console.log(this.classList);
      },
      (error) => {
        console.log('update error');
        this.classList[index].edit = false;
        this.tableLoading = false;
        this.generalService.createErrorNotification(error);
      }
    )


  }

  cancelEdit(index: number) {
    this.updateValue = this.classList[index].name;
    this.classList[index].edit = false;
  }

  addNewClassMethod() {
    if (this.classForm.invalid) {
      for (const i in this.classForm.controls) {
        this.classForm.controls[i].markAsDirty();
        this.classForm.controls[i].updateValueAndValidity();
      }
    } else {
      let value = this.classForm.controls.class.value;
      this.addNewClass = {
        Name: value,
        Description: "",
      }
      this.tableLoading = true;
      this.service.storeNewMedicineClassification(this.addNewClass).subscribe(
        (response) => {
          this.visible = false;
          this.generalService.messageNz('success', `Loại ${value.bold()} thêm thành công`);
          this.searchClass()
        },
        (error) => {
          console.log('add class error');
          this.visible = false;
          this.generalService.createErrorNotification(error);
        }
      )
      console.log(value);
    }


  }

  popoverChange(value: any) {
    this.classForm.reset();
  }

}
