import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { DateTime } from 'src/app/shared/models/date-time';
import { FilterTable } from 'src/app/shared/models/filterTable';
import { Medicine } from 'src/app/shared/models/medicine';
import { PageInfo } from 'src/app/shared/models/page-info';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchMedicineRequest } from 'src/app/shared/requests/medicine/search';
import { MedicineClassificationResponse } from 'src/app/shared/responses/medicine-classification/medicine-classification-response';
import { MedicineSubgroupResponse } from 'src/app/shared/responses/medicine-subgroup/medicine-subgroup-response';
import { MedicineUnitResponse } from 'src/app/shared/responses/medicine-unit/medicine-unit-response';
import { MedicineResponse } from 'src/app/shared/responses/medicine/medicine';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss']
})
export class MedicineListComponent implements OnInit {

  detailLoading = false;
  tableLoading = false;
  checked = false;
  medicineList: MedicineResponse[] = [];
  pageInfo: PageInfo = { isFirstPage: true, isLastPage: false, numberOfPage: 1, info: null };
  page: number;
  pageLimit: number;

  totalRecord!: number;
  pageSize = 10;
  pageIndex = 1;

  sortOrderList = 0;
  sortFieldList = "createdDate";

  isLoading = false;
  noSuggest = false;
  isSearch = false;
  selectedMedicine: string;
  suggestList: MedicineResponse[] = [];

  searchForm: FormGroup;
  searchValue = '';

  /*---------------------------------------------------------------------------------------------------------------------*/
  /*---------------------------------------------------------------------------------------------------------------------*/
  searchMedicineRequest: SearchMedicineRequest = {
    Name: '',
    UnitId: '',
    MedicineSubgroupId: '',
    MedicineClassificationId: '',
    Limit: 10,
    Page: 1,
    SortField: "createdDate",
    SortOrder: 0
  };

  filterUnit: FilterTable[] = [];
  filterClass: FilterTable[] = [];
  filterSubgroup: FilterTable[] = [];
  // filterUnit: MedicineUnitResponse[] = [];
  // filterClass: MedicineClassificationResponse[] = [];
  // filterSubgroup: MedicineSubgroupResponse[] = [];


  /*---------------------------------------------------------------------------------------------------------------------*/
  /*---------------------------------------------------------------------------------------------------------------------*/

  constructor(private fb: FormBuilder,
    private service: MedicineService,
    private generalService: GeneralHelperService) { }

  ngOnInit(): void {
    // this.searchMedicine();
    this.getAllUnit();
    this.getAllSubgroup();
    this.getAllClass();


  }


  get f() { return this.searchForm.controls; }

  getCreateTime(time: string) {
    return this.generalService.getDate(time);
  }

  getAllUnit() {
    this.service.getAllMedicineUnit().subscribe(
      (response) => {
        for (let unit of response.data) {
          let tmp = { text: unit.name, value: unit.id };
          this.filterUnit = [...this.filterUnit, tmp]
        }
      },
      (error) => {
        console.log("get all error");
        this.generalService.createErrorNotification(error);
      }
    )
  }

  getAllSubgroup() {
    this.service.getAllMedicineSubgroup().subscribe(
      (response) => {
        for (let unit of response.data) {
          let tmp = { text: unit.name, value: unit.id };
          this.filterSubgroup = [...this.filterSubgroup, tmp]
        }
      },
      (error) => {
        console.log("get all error");
        this.generalService.createErrorNotification(error);
      }
    )
  }

  getAllClass() {
    this.service.getAllMedicineClassification().subscribe(
      (response) => {
        for (let unit of response.data) {
          let tmp = { text: unit.name, value: unit.id };
          this.filterClass = [...this.filterClass, tmp]
        }
      },
      (error) => {
        console.log("get all error");
        this.generalService.createErrorNotification(error);
      }
    )
  }

  inputChange(value: any) {
    this.isSearch = true;
    console.log('value -- ', value);
    // this.searchValue = value;
    console.log(this.pageSize);
    if (value !== '') {
      this.pageSize = 10;
      this.searchMedicineRequest = {
        Name: this.searchValue,
        UnitId: '',
        MedicineSubgroupId: '',
        MedicineClassificationId: '',
        Limit: 10,
        Page: 1,
        SortField: "createdDate",
        SortOrder: 0
      }
      this.searchMedicine();

    } else {
      this.searchMedicineRequest = {
        Name: '',
        UnitId: '',
        MedicineSubgroupId: '',
        MedicineClassificationId: '',
        Limit: 10,
        Page: 1,
        SortField: "createdDate",
        SortOrder: 0
      }
      this.pageSize = 10;
      this.searchMedicine();
    }
  }

  // searchSuggest() {
  //   this.isLoading = true;

  //   this.service.searchMedicine(this.searchMedicineRequest).subscribe(
  //     (response) => {
  //       this.isLoading = false;
  //       this.suggestList = response.data.data;
  //       console.log(this.suggestList);
  //       if (this.suggestList.length > 0) {
  //         this.noSuggest = false;
  //       }else {
  //         this.noSuggest = true;
  //       }
  //     },
  //     (error) => {
  //       this.isLoading = false;
  //       console.log('search error');
  //       this.generalService.createErrorNotification(error);
  //     }
  //   )
  // }

  deleteMedicine(id: string) {
    this.tableLoading = true;
    this.service.deleteMedicine(id).subscribe(
      (response) => {
        this.searchMedicine();
        this.generalService.messageNz('success', `Xóa thành công`);
      }, (error) => {
        console.log('delete error');
        this.tableLoading = false;
        this.generalService.createErrorNotification(error);
      }
    )
  }

  searchMedicine() {
    this.tableLoading = true;
    this.searchMedicineRequest.Name = this.searchValue;
    this.service.searchMedicine(this.searchMedicineRequest).subscribe(
      (response) => {
        this.tableLoading = false;
        this.getData(response.data);
      },
      (error) => {
        console.log('search error');
        this.tableLoading = false;
        this.generalService.createErrorNotification(error);
      }
    )
  }

  getData(responseMedicineData: ResponseSearch) {
    this.pageInfo.info = responseMedicineData.info;
    this.page = this.pageInfo.info.page;
    this.pageLimit = this.pageInfo.info.limit;
    this.totalRecord = this.pageInfo.info.totalRecord;
    this.medicineList = responseMedicineData.data;
    console.log('medicineList ', this.medicineList);

  }


  onQueryParamsChange(params: NzTableQueryParams) {
    console.log("params -- ", params);
    const { pageIndex, pageSize, sort, filter } = params;
    this.pageSize = params.pageSize;
    this.pageIndex = params.pageIndex;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    console.log("sortField -- " + sortField);
    console.log("pageIndex -- " + pageIndex);
    sortOrder === 'ascend' || null ? this.sortOrderList = 0 : this.sortOrderList = 1;
    sortField == null ? this.sortFieldList = 'createdDate' : this.sortFieldList = sortField;
    this.searchMedicineRequest = {
      Name: this.searchValue,
      UnitId: params.filter[0].value,
      MedicineSubgroupId: params.filter[2].value,
      MedicineClassificationId: params.filter[1].value,
      Limit: pageSize,
      Page: pageIndex,
      SortField: this.sortFieldList,
      SortOrder: this.sortOrderList
    }

    this.searchMedicine();
    this.isSearch = false;

  }

  confirmAdd() {
    this.checked = false;
  }


}
