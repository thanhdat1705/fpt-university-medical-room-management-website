import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PageInfo } from 'src/app/shared/models/page-info';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { ImportBatchResponse } from 'src/app/shared/responses/ImportBatchMedicine/import-batch';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { ImportBatchService } from 'src/app/shared/services/import-batch/import-batch.service';
import { vi } from 'date-fns/locale';
import { endOfMonth, startOfMonth } from 'date-fns';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-batch-medicine-list',
  templateUrl: './batch-medicine-list.component.html',
  styleUrls: ['./batch-medicine-list.component.scss']
})
export class BatchMedicineListComponent implements OnInit {

  priceForm: FormGroup;
  importBatchLoading = false;
  dateRangeSelected = false;
  dateSelected = false;
  priceSelected = false;
  quantitySelected = false;

  quantity: string;
  dateRange: Date[];
  date: Date;
  importBatchList: ImportBatchResponse[] = [];

  ranges = { 'Hôm nay': [new Date(), new Date()], 'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())] };
  pageInfo: PageInfo = { isFirstPage: true, isLastPage: false, numberOfPage: 1, info: null };
  page: number;
  pageLimit: number;

  totalRecord!: number;
  pageSize = 10;
  pageIndex = 1;
  sortOrderList = 1;
  sortFieldList = "CreateDate";

  searchRecord: Record<string, ValueCompare> = {};
  searchMinPrice: ValueCompare = {
    value: '',
    compare: '>='
  }
  searchMaxPrice: ValueCompare = {
    value: '',
    compare: '<='
  }
  searchFromDate: ValueCompare = {
    value: '',
    compare: '>='
  }
  searchToDate: ValueCompare = {
    value: '',
    compare: '<='
  }
  searchNumberOfSpecificMedicine: ValueCompare = {
    value: '',
    compare: '=='
  }
  searchMonth: ValueCompare = {
    value: '',
    compare: '=='
  }
  searchYear: ValueCompare = {
    value: '',
    compare: '=='
  }

  searchFields = "id, numberOfSpecificMedicine, totalPrice, createDate, periodicInventory";
  searchImportBatchRequest: SearchRequest = {
    limit: 10,
    page: 1,
    sortField: "Createdate",
    sortOrder: 0,
    searchValue: this.searchRecord,
    selectFields: this.searchFields,
  };

  constructor(
    private router: Router,
    private service: ImportBatchService,
    private generalService: GeneralHelperService,
    private i18n: NzI18nService,
    private currency: CurrencyPipe,
    private elRef: ElementRef,
    private fb: FormBuilder,
  ) {
    this.i18n.setLocale(vi_VN);
    this.i18n.setDateLocale(vi);

    this.priceForm = this.fb.group({
      minPrice: '',
      maxPrice: ''
    });
  }

  ngOnInit(): void {
    this.priceForm.valueChanges.subscribe(form => {
      if (form.minPrice) {
        this.priceForm.patchValue({
          minPrice: this.currency.transform(form.minPrice.replace(/\D/g, '').replace(/^0+/, ''), '', '', '1.0-0', 'vi')
        }, { emitEvent: false });
      }
      if (form.maxPrice) {
        this.priceForm.patchValue({
          maxPrice: this.currency.transform(form.maxPrice.replace(/\D/g, '').replace(/^0+/, ''), '', '', '1.0-0', 'vi')
        }, { emitEvent: false });
      }
    })

    this.searchRecord['TotalPrice|from'] = null;
    this.searchRecord['TotalPrice|to'] = null;
    this.searchRecord['CreateDate|from'] = null;
    this.searchRecord['CreateDate|to'] = null;
    this.searchRecord['NumberOfSpecificMedicine'] = null;
    this.searchRecord['PeriodicInventory.Month'] = null;
    this.searchRecord['PeriodicInventory.Year'] = null;
  }


  getCreateTime(time: string) {
    return this.generalService.getDate(time);
  }

  getData(responseMedicineData: ResponseSearch) {
    this.pageInfo.info = responseMedicineData.info;
    this.page = this.pageInfo.info.page;
    this.pageLimit = this.pageInfo.info.limit;
    this.totalRecord = this.pageInfo.info.totalRecord;
    this.importBatchList = responseMedicineData.data;
    console.log('importBatchList ', this.importBatchList);

  }

  searchImportBatches() {
    this.importBatchLoading = true;
    this.service.searchImportBatches(this.searchImportBatchRequest).subscribe(
      (response) => {
        this.importBatchLoading = false;
        this.getData(response.data);
      },
      (error) => {
        console.log('search error');
        this.importBatchLoading = false;
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
    sortField == null ? this.sortFieldList = 'CreateDate' : this.sortFieldList = sortField;
    this.searchImportBatchRequest = {
      limit: pageSize,
      page: pageIndex,
      sortField: this.sortFieldList,
      sortOrder: this.sortOrderList,
      searchValue: this.searchRecord,
      selectFields: this.searchFields
    }

    this.searchImportBatches();
  }


  onDateRangeChange(result: Date[]): void {
    if (result.length > 0) {
      this.dateRangeSelected = true;
      console.log('Từ : ', this.generalService.getYMD(result[0].toString()), ', tới: ', this.generalService.getYMD(result[1].toString()));
      this.searchFromDate.value = this.generalService.getYMD(result[0].toString()) + ' ' + '00:00:00';
      this.searchToDate.value = this.generalService.getYMD(result[1].toString()) + ' ' + '23:59:00';
      this.searchRecord['CreateDate|from'] = this.searchFromDate;
      this.searchRecord['CreateDate|to'] = this.searchToDate;
      this.searchImportBatches();
    } else {
      this.dateRangeSelected = false;
      this.searchRecord['CreateDate|from'] = null;
      this.searchRecord['CreateDate|to'] = null;
      this.searchImportBatches();
    }
  }

  onDateChange(result: Date): void {
    if (result != null) {
      this.dateSelected = true;
      this.searchMonth.value = (result.getMonth() + 1).toString();
      this.searchYear.value = (result.getFullYear()).toString();
      this.searchRecord['PeriodicInventory.Month'] = this.searchMonth;
      this.searchRecord['PeriodicInventory.Year'] = this.searchYear;
      this.searchImportBatches();
    } else {
      this.dateSelected = false;
      this.searchRecord['PeriodicInventory.Month'] = null;
      this.searchRecord['PeriodicInventory.Year'] = null;
      this.searchImportBatches();
    }
  }


  minPriceChange(price: string) {
    if (price == null) {
      this.priceSelected = false;
      console.log('null');
    } else if (price == '') {
      this.priceSelected = false;
      this.searchRecord['TotalPrice|from'] = null;
      this.searchImportBatches();
    } else {
      this.priceSelected = true;
      this.searchMinPrice.value = this.generalService.removeDotInString(price);
      this.searchRecord['TotalPrice|from'] = this.searchMinPrice;
      this.searchImportBatches();
    }
  }

  maxPriceChange(price: string) {
    if (price == null) {
      this.priceSelected = false;
      console.log('null');
    } else if (price == '') {
      this.priceSelected = false;
      this.searchRecord['TotalPrice|to'] = null;
      this.searchImportBatches();
    } else {
      this.priceSelected = true;
      this.searchMaxPrice.value = this.generalService.removeDotInString(price);
      this.searchRecord['TotalPrice|to'] = this.searchMaxPrice;
      this.searchImportBatches();
    }
  }

  quantityChange(quantity: string) {
    this.quantity = quantity;
    if (quantity != '') {
      this.quantitySelected = true;
      this.searchNumberOfSpecificMedicine.value = quantity;
      this.searchRecord['NumberOfSpecificMedicine'] = this.searchNumberOfSpecificMedicine;
      this.searchImportBatches();
    } else {
      this.quantitySelected = false;
      this.searchRecord['NumberOfSpecificMedicine'] = null;
      this.searchImportBatches();
    }
  }


  setToDefaultFilter() {
    this.dateRangeSelected = false;
    this.dateSelected = false;
    this.priceSelected = false;
    this.quantitySelected = false;
    this.priceForm.setValue({
      minPrice: '',
      maxPrice: ''
    })
    this.dateRange = [];
    this.date = null;
    this.quantity = null;
    this.searchRecord['TotalPrice|from'] = null;
    this.searchRecord['TotalPrice|to'] = null;
    this.searchRecord['CreateDate|from'] = null;
    this.searchRecord['CreateDate|to'] = null;
    this.searchRecord['NumberOfSpecificMedicine'] = null;
    this.searchRecord['PeriodicInventory.Month'] = null;
    this.searchRecord['PeriodicInventory.Year'] = null;
    this.searchImportBatches();
  }

}
