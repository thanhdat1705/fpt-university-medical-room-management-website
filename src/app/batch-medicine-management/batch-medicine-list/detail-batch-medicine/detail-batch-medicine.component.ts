import { Component, OnInit } from '@angular/core';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { vi } from 'date-fns/locale';
import { ActivatedRoute, Router } from '@angular/router';
import { ImportBatch } from 'src/app/shared/models/import-batch';
import { ImportBatchService } from 'src/app/shared/services/import-batch/import-batch.service';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { ImportMedicine } from 'src/app/shared/models/importMedicine';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddImportMedicineComponent } from './add-import-medicine/add-import-medicine.component';
import { PageInfo } from 'src/app/shared/models/page-info';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { DetailImportMedicineComponent } from './detail-import-medicine/detail-import-medicine.component';

@Component({
  selector: 'app-detail-batch-medicine',
  templateUrl: './detail-batch-medicine.component.html',
  styleUrls: ['./detail-batch-medicine.component.scss']
})
export class DetailBatchMedicineComponent implements OnInit {

  pageInfo: PageInfo = { isFirstPage: true, isLastPage: false, numberOfPage: 1, info: null };
  page: number;
  pageLimit: number;

  totalRecord!: number;
  pageSize = 5;
  pageIndex = 1;
  sortOrderList = 1;
  sortFieldList = "InsertDate";

  importMedicineLoading = false;
  checked = false;
  updateDetail = false;

  importBatchId: string;
  importBatchDetail: ImportBatch;
  importMedicineList: ImportMedicine[]

  searchRecord: Record<string, ValueCompare> = {};
  searchFields = "id, quantity, price, description, statusId, insertDate, expirationDate, medicineId, importBatchId, medicine, medicine.MedicineUnit as medicineUnit, importMedicineStatus";
  searchImportMedicineRequest: SearchRequest = {
    limit: 10,
    page: 0,
    sortField: "InsertDate",
    sortOrder: 0,
    searchValue: this.searchRecord,
    selectFields: this.searchFields,
  };
  searchValueImportBarchId: ValueCompare = {
    value: '',
    compare: 'Equals'
  }
  constructor(
    private i18n: NzI18nService,
    private activatedRoute: ActivatedRoute,
    private service: ImportBatchService,
    private router: Router,
    private generalService: GeneralHelperService,
    private modal: NzModalService,) {

    this.i18n.setLocale(vi_VN);
    this.i18n.setDateLocale(vi);

    this.importBatchId = this.activatedRoute.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.searchValueImportBarchId.value = this.importBatchId;
    this.searchRecord['ImportBatchId'] = this.searchValueImportBarchId;

    this.getDetailImportBatch();

  }

  getCreateDate(time: string) {
    return this.generalService.getDate(time);
  }

  getData(responseMedicineData: ResponseSearch) {
    this.pageInfo.info = responseMedicineData.info;
    this.page = this.pageInfo.info.page;
    this.pageLimit = this.pageInfo.info.limit;
    this.totalRecord = this.pageInfo.info.totalRecord;
    this.importMedicineList = responseMedicineData.data;
    console.log(this.importMedicineList);
  }

  searchImportMedicine() {
    this.importMedicineLoading = true;
    this.service.searchImportMedicine(this.searchImportMedicineRequest).subscribe(
      (response) => {
        this.importMedicineLoading = false;
        this.getData(response.data);
      },
      (error) => {
        console.log('search error');
        this.importMedicineLoading = false;
        this.generalService.createErrorNotification(error);
      }
    )
  }

  getDetailImportBatch() {
    this.service.getDetailImportBatch(this.importBatchId).subscribe(
      (response) => {
        console.log(response.data);
        this.importBatchDetail = response.data;
      },
      (error) => {
        console.log('get detail error');
        this.router.navigate(['batch-medicine-management/batch-medicine-list']);
        this.generalService.createErrorNotification(error);
      }
    )
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
    sortField == null ? this.sortFieldList = 'InsertDate' : this.sortFieldList = sortField;
    this.searchImportMedicineRequest = {
      limit: pageSize,
      page: pageIndex,
      sortField: this.sortFieldList,
      sortOrder: this.sortOrderList,
      searchValue: this.searchRecord,
      selectFields: this.searchFields
    }

    this.searchImportMedicine();
  }

  addImportMedicine(id: string) {
    this.checked = true;
    this.modal.create({
      nzTitle: "Thêm Dược Phẩm Mới",
      nzContent: AddImportMedicineComponent,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: "370px",
      nzFooter: null,
      nzOnCancel: () => this.confirmAdd(),
      nzComponentParams: {
        importBatchId: id
      }
    });
    this.modal.afterAllClose.subscribe(() => {
      if (this.checked == true) {
        this.getDetailImportBatch();
        this.searchImportMedicine();
      } else {
        console.log('cc');
      }

    })
  }

  detailImportMedicine(id: string, importMedicine: ImportMedicine) {
    this.updateDetail = true;
    this.modal.create({
      nzTitle: "Chi Tiết Dược Phẩm Nhập",
      nzContent: DetailImportMedicineComponent,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: "450px",
      nzFooter: null,
      // nzOnCancel: () => this.confirmAdd(),
      nzComponentParams: {
        importBatchId: id,
        importMedicine: importMedicine
      }
    });
    // this.modal.afterAllClose.subscribe(() => {
    //   if (this.updateDetail == true) {
    //     this.getDetailImportBatch();
    //     this.searchImportMedicine();
    //   } else {
    //     console.log('cc');
    //   }

    // })
  }


  confirmAdd() {
    this.checked = false;
  }
}
