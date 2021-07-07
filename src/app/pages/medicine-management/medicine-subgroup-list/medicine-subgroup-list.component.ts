import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PageInfo } from 'src/app/shared/models/page-info';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchMedicineSubgroupRequest } from 'src/app/shared/requests/medicine-subgroup/search-request';
import { StoreNewMedicineSubgroupRequest, UpdateMedicineSubgroupRequest } from 'src/app/shared/requests/medicine-subgroup/store-new-request';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { MedicineSubgroupResponse } from 'src/app/shared/responses/medicine-subgroup/medicine-subgroup-response';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';

@Component({
  selector: 'app-medicine-subgroup-list',
  templateUrl: './medicine-subgroup-list.component.html',
  styleUrls: ['./medicine-subgroup-list.component.scss']
})
export class MedicineSubgroupListComponent implements OnInit {

  subgroupList: MedicineSubgroupResponse[] = [];
  updateSubgroup: UpdateMedicineSubgroupRequest;
  addNewSubgroup: StoreNewMedicineSubgroupRequest;
  pageInfo: PageInfo = { isFirstPage: true, isLastPage: false, numberOfPage: 1, info: null };
  page: number;
  pageLimit: number;
  totalRecord!: number;
  pageSize = 5;
  pageIndex = 1;
  sortOrderList = 0;
  sortFieldList = "Name";

  updateValue: string;
  subgroupForm: FormGroup;
  tableLoading = false;
  visible = false;
  searchValue = '';

  searchName: ValueCompare = {
    value: '',
    compare: 'Contains'
  }
  searchValueMap: Map<string, ValueCompare> = new Map;
  selectFields = "id, name";
  searchSubgroupRequest = new SearchRequest(this.pageSize, this.pageIndex, this.sortFieldList, this.sortOrderList, this.searchValueMap, this.selectFields)


  constructor(
    private fb: FormBuilder,
    private service: MedicineService,
    public generalService: GeneralHelperService,) { }

  ngOnInit(): void {
    this.subgroupForm = this.fb.group({
      subgroup: ['', [
        Validators.required,
      ]],
    })
  }

  get form() { return this.subgroupForm.controls; }

  resetTable() {
    this.searchSubgroupRequest.limit = 5;
    this.searchSubgroupRequest.page = 1;
    this.searchSubgroupRequest.sortOrder = 1;
    this.searchSubgroupRequest.sortField = "Name";
  }

  searchSubgroup() {
    this.tableLoading = true;
    this.service.searchMedicineSubgroup(this.searchSubgroupRequest).subscribe(
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
    this.subgroupList = responseUnit.data;
    this.subgroupList.forEach(subgroup => {
      subgroup.edit = false;
    })
    console.log('subgroup ', this.subgroupList);
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

    this.searchSubgroupRequest.limit = pageSize;
    this.searchSubgroupRequest.page = pageIndex;
    this.searchSubgroupRequest.sortOrder = this.sortOrderList;
    this.searchSubgroupRequest.sortField = this.sortFieldList;

    this.searchSubgroup();

  }


  inputChange(value: any) {
    console.log('value -- ', value);
    this.resetTable();
    this.generalService.setValueCompare(this.searchValue, this.searchName, 'Name', this.searchValueMap);
    if (value !== '') {
      this.searchSubgroupRequest.limit = 5;
      this.searchSubgroupRequest.page = 1;
      this.searchSubgroup();

    } else {
      this.searchSubgroupRequest.limit = 5;
      this.searchSubgroupRequest.page = 1;
      this.pageSize = 5;
      this.searchSubgroup();
    }
  }

  deleteSubgroup(id: string) {
    this.tableLoading = true;
    this.service.deleteMedicineSubgroup(id).toPromise().then(
      (reponse) => {
        this.tableLoading = false;
        this.searchSubgroup();
        this.generalService.createSuccessNotification("Xóa nhóm thành công");
      },
      (error) => {
        console.log('delete error');
        this.tableLoading = false;
        this.generalService.createErrorNotification(error);
      }
    )
  }
  addNewSubgroupMethod() {
    if (this.subgroupForm.invalid) {
      for (const i in this.subgroupForm.controls) {
        this.subgroupForm.controls[i].markAsDirty();
        this.subgroupForm.controls[i].updateValueAndValidity();
      }
    } else {
      let value = this.subgroupForm.controls.subgroup.value;
      this.addNewSubgroup = {
        Name: value,
      }
      this.service.storeNewMedicineSubgroup(this.addNewSubgroup).subscribe(
        (response) => {
          this.visible = false;
          this.generalService.messageNz('success', `Nhóm ${value.bold()} thêm thành công`);
          this.searchSubgroup()
        },
        (error) => {
          console.log('add subgroup error');
          this.visible = false;
          this.generalService.createErrorNotification(error);
        }
      )
      console.log(value);
    }
  }

  startEdit(index: number) {
    this.updateValue = this.subgroupList[index].name;
    this.subgroupList[index].edit = true;
  }

  saveEdit(id: string, index: number, inputValue: string) {
    let name = inputValue;
    this.updateSubgroup = {
      Name: name,
    }
    this.tableLoading = true;
    this.service.updateMedicineSubgroup(id, this.updateSubgroup).subscribe(
      (response) => {
        this.subgroupList[index].name = response.data.name
        this.subgroupList[index].edit = false;
        this.tableLoading = false;
        console.log(this.subgroupList);
      },
      (error) => {
        console.log('update error');
        this.subgroupList[index].edit = false;
        this.tableLoading = false;
        this.generalService.createErrorNotification(error);
      }
    )


  }

  cancelEdit(index: number) {
    this.updateValue = this.subgroupList[index].name;
    this.subgroupList[index].edit = false;
  }

  popoverChange(value: any) {
    this.subgroupForm.reset();
  }

}
