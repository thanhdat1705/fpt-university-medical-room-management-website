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
  minPrice: number;
  maxPrice: number;
  importBatchList: ImportBatchResponse[] = [];

  ranges = { 'Hôm nay': [new Date(), new Date()], 'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())] };
  pageInfo: PageInfo = { isFirstPage: true, isLastPage: false, numberOfPage: 1, info: null };
  page: number;
  pageLimit: number;

  totalRecord!: number;
  pageSize = 5;
  pageIndex = 1;
  sortOrderList = 1;
  sortFieldList = "CreateDate";

  // searchRecord: Record<string, ValueCompare> = {};
  searchValueMap: Map<string, ValueCompare> = new Map;
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

  selectFields = "id, numberOfSpecificMedicine, totalPrice, createDate, periodicInventory";
  searchImportBatchRequest = new SearchRequest(this.pageSize, this.pageIndex, this.sortFieldList, this.sortOrderList, this.searchValueMap, this.selectFields)
  // searchImportBatchRequest: SearchRequest = {
  //   limit: 5,
  //   page: 1,
  //   sortField: "Createdate",
  //   sortOrder: 0,
  //   searchValue: this.searchRecord,
  //   selectFields: this.searchFields,
  // };

  constructor(
    private router: Router,
    private service: ImportBatchService,
    public generalService: GeneralHelperService,
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

    // this.searchRecord['TotalPrice|from'] = null;
    // this.searchRecord['TotalPrice|to'] = null;
    // this.searchRecord['CreateDate|from'] = null;
    // this.searchRecord['CreateDate|to'] = null;
    // this.searchRecord['NumberOfSpecificMedicine'] = null;
    // this.searchRecord['PeriodicInventory.Month'] = null;
    // this.searchRecord['PeriodicInventory.Year'] = null;
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

    this.searchImportBatchRequest.limit = pageSize;
    this.searchImportBatchRequest.page = pageIndex;
    this.searchImportBatchRequest.sortOrder = this.sortOrderList;
    this.searchImportBatchRequest.sortField = this.sortFieldList;

    this.searchImportBatches();
  }


  onDateRangeChange(result: Date[]): void {
    console.log("date range change");
    if (result.length > 0) {
      this.dateRangeSelected = true;
      console.log('Từ : ', this.generalService.getYMD(result[0].toString()), ', tới: ', this.generalService.getYMD(result[1].toString()));
      this.generalService.setValueCompare(this.generalService.getYMD(result[0].toString()) + ' ' + '00:00:00', this.searchFromDate, 'CreateDate|from', this.searchValueMap);
      this.generalService.setValueCompare(this.generalService.getYMD(result[1].toString()) + ' ' + '23:59:00', this.searchToDate, 'CreateDate|to', this.searchValueMap);
      this.searchImportBatches();
    } else {
      this.dateRangeSelected = false;
      this.generalService.setValueCompare(null, this.searchFromDate, 'CreateDate|from', this.searchValueMap);
      this.generalService.setValueCompare(null, this.searchToDate, 'CreateDate|to', this.searchValueMap);
      this.searchImportBatches();
    }
  }

  onDateChange(result: Date): void {
    console.log("date change");
    if (result != null) {
      this.dateSelected = true;
      this.generalService.setValueCompare((result.getMonth() + 1).toString(), this.searchMonth, 'PeriodicInventory.Month', this.searchValueMap);
      this.generalService.setValueCompare((result.getFullYear()).toString(), this.searchYear, 'PeriodicInventory.Year', this.searchValueMap);
      this.searchImportBatches();
    } else {
      this.dateSelected = false;
      this.generalService.setValueCompare(null, this.searchMonth, 'PeriodicInventory.Month', this.searchValueMap);
      this.generalService.setValueCompare(null, this.searchYear, 'PeriodicInventory.Year', this.searchValueMap);
      this.searchImportBatches();
    }
  }


  minPriceChange(price: string) {
    console.log("min price change", price);
    if (price == null) {
      this.priceSelected = false;
      console.log('null');
    } else if (price == '') {
      this.priceSelected = false;
      this.generalService.setValueCompare(null, this.searchMinPrice, 'TotalPrice|from', this.searchValueMap);
      this.searchImportBatches();
    } else {
      this.priceSelected = true;
      this.generalService.setValueCompare(this.generalService.removeDotInString(price), this.searchMinPrice, 'TotalPrice|from', this.searchValueMap);
      this.searchImportBatches();
    }
  }

  maxPriceChange(price: string) {
    console.log("max price change");
    if (price == null) {
      this.priceSelected = false;
      console.log('null');
    } else if (price == '') {
      this.priceSelected = false;
      this.generalService.setValueCompare(null, this.searchMaxPrice, 'TotalPrice|to', this.searchValueMap);
      this.searchImportBatches();
    } else {
      this.priceSelected = true;
      this.generalService.setValueCompare(this.generalService.removeDotInString(price), this.searchMaxPrice, 'TotalPrice|to', this.searchValueMap);
      this.searchImportBatches();
    }
  }

  quantityChange(quantity: string) {
    console.log("quantity change");
    this.quantity = quantity;
    if (quantity != '') {
      this.quantitySelected = true;
      this.generalService.setValueCompare(quantity, this.searchNumberOfSpecificMedicine, 'NumberOfSpecificMedicine', this.searchValueMap);
      this.searchImportBatches();
    } else {
      this.quantitySelected = false;
      this.generalService.setValueCompare(null, this.searchNumberOfSpecificMedicine, 'NumberOfSpecificMedicine', this.searchValueMap);
      this.searchImportBatches();
    }
  }

  resetTable() {
    this.searchImportBatchRequest.limit = 5;
    this.searchImportBatchRequest.page = 1;
    this.searchImportBatchRequest.sortOrder = 1;
    this.searchImportBatchRequest.sortField = "CreateDate";
  }

  setToDefaultFilter() {
    this.resetTable();
    this.dateRangeSelected = false;
    this.dateSelected = false;
    this.priceSelected = false;
    this.quantitySelected = false;
    this.minPrice = null;
    this.maxPrice = null;
    this.dateRange = [];
    this.date = null;
    this.quantity = null;
    this.generalService.setValueCompare(null, this.searchMinPrice, 'TotalPrice|from', this.searchValueMap);
    this.generalService.setValueCompare(null, this.searchMaxPrice, 'TotalPrice|to', this.searchValueMap);
    this.generalService.setValueCompare(null, this.searchFromDate, 'CreateDate|from', this.searchValueMap);
    this.generalService.setValueCompare(null, this.searchToDate, 'CreateDate|to', this.searchValueMap);
    this.generalService.setValueCompare(null, this.searchNumberOfSpecificMedicine, 'NumberOfSpecificMedicine', this.searchValueMap);
    this.generalService.setValueCompare(null, this.searchMonth, 'PeriodicInventory.Month', this.searchValueMap);
    this.generalService.setValueCompare(null, this.searchYear, 'PeriodicInventory.Year', this.searchValueMap);
    this.searchImportBatches();
  }

}
