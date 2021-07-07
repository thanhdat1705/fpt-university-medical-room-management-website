import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PageInfo } from 'src/app/shared/models/page-info';
import { RequestBuyMedicine } from 'src/app/shared/models/request-buy-medicine';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';
import { RequestBuyMedicineService } from 'src/app/shared/services/request-buy-medicine/request-buy-medicine.service';
import { endOfMonth, startOfMonth } from 'date-fns';
import { vi } from 'date-fns/locale';

@Component({
  selector: 'app-buy-medicine-list',
  templateUrl: './buy-medicine-list.component.html',
  styleUrls: ['./buy-medicine-list.component.scss']
})
export class BuyMedicineListComponent implements OnInit {

  requestListLoading = false;
  dateRangeSelected = false;

  requestList: RequestBuyMedicine[] = [];

  pageInfo: PageInfo = { isFirstPage: true, isLastPage: false, numberOfPage: 1, info: null };
  page: number;
  pageLimit: number;

  totalRecord!: number;
  pageSize = 10;
  pageIndex = 0;
  sortOrderList = 1;
  sortFieldList = "CreateDate";
  selectFields = "id, createDate, updateDate, numberOfSpecificMedicine"
  searchBuyMedicine;
  searchValueMap: Map<string, ValueCompare> = new Map;

  searchFromDate: ValueCompare = {
    value: '',
    compare: '>='
  }
  searchToDate: ValueCompare = {
    value: '',
    compare: '<='
  }

  dateRange: Date[];
  ranges = { 'Hôm nay': [new Date(), new Date()], 'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())] };
  constructor(
    private medicineService: MedicineService,
    public generalService: GeneralHelperService,
    private service: RequestBuyMedicineService,
    private router: Router,
    private i18n: NzI18nService,
  ) {
    this.i18n.setLocale(vi_VN);
    this.i18n.setDateLocale(vi);
  }

  ngOnInit(): void {
    this.searchBuyMedicine = new SearchRequest(this.pageSize, this.pageIndex, this.sortFieldList, this.sortOrderList, this.searchValueMap, this.selectFields)
    // this.searchRecord['CreateDate|from'] = null;
    // this.searchRecord['CreateDate|to'] = null;

  }

  getCreateTime(time: string) {
    return this.generalService.getDate(time);
  }

  resetTable() {
    this.pageSize = 10;
    this.pageIndex = 1;
    this.sortOrderList = 1;
    this.sortFieldList = "CreateDate";
  }

  getData(responseData: ResponseSearch) {
    this.pageInfo.info = responseData.info;
    this.page = this.pageInfo.info.page;
    this.pageLimit = this.pageInfo.info.limit;
    this.totalRecord = this.pageInfo.info.totalRecord;
    this.requestList = responseData.data;
    console.log(this.requestList);
  }

  searchRequestBuyMedicine() {
    this.requestListLoading = true;
    console.log(JSON.stringify(this.searchBuyMedicine));
    setTimeout(() => {
      this.service.searchRequestBuyMedicine(this.searchBuyMedicine).subscribe(
        (response) => {
          this.requestListLoading = false;
          this.getData(response.data);
        },
        (error) => {
          this.requestListLoading = false;
          console.log('search error');
          this.generalService.createErrorNotification(error);
        }
      )
    }, 250)

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
    
    this.searchBuyMedicine.limit = pageSize;
    this.searchBuyMedicine.page = pageIndex;
    this.searchBuyMedicine.sortOrder = this.sortOrderList;
    this.searchBuyMedicine.sortField = this.sortFieldList;

    this.searchRequestBuyMedicine();
  }

  goToDetailScreen(id: string) {
    this.service.getDetailBuyMedicineToDetailScreen(id, this.selectFields);

  }

  goToUpdateScreen(id: string) {
    this.service.getDetailBuyMedicineToUpdateScreen(id, this.selectFields);

  }

  onDateRangeChange(result: Date[]): void {
    console.log(result);
    if (result.length > 0) {
      this.dateRangeSelected = true;
      console.log('Từ : ', this.generalService.getYMD(result[0].toString()), ', tới: ', this.generalService.getYMD(result[1].toString()));
      // this.searchFromDate.value = this.generalService.getYMD(result[0].toString()) + ' ' + '00:00:00';
      // this.searchToDate.value = this.generalService.getYMD(result[1].toString()) + ' ' + '23:59:00';
      // this.searchRecord['CreateDate|from'] = this.searchFromDate;
      // this.searchRecord['CreateDate|to'] = this.searchToDate;
      this.generalService.setValueCompare(this.generalService.getYMD(result[0].toString()) + ' ' + '00:00:00', this.searchFromDate, 'CreateDate|from', this.searchValueMap);
      this.generalService.setValueCompare(this.generalService.getYMD(result[1].toString()) + ' ' + '23:59:00', this.searchToDate, 'CreateDate|to', this.searchValueMap);
      this.searchRequestBuyMedicine();
    } else {
      this.dateRangeSelected = false;
      // this.searchRecord['CreateDate|from'] = null;
      // this.searchRecord['CreateDate|to'] = null;
      this.generalService.setValueCompare(null, this.searchFromDate, 'CreateDate|from', this.searchValueMap);
      this.generalService.setValueCompare(null, this.searchToDate, 'CreateDate|to', this.searchValueMap);
      this.searchRequestBuyMedicine();
    }
  }

  

}
