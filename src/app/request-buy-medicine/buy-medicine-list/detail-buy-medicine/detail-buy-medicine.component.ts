import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PageInfo } from 'src/app/shared/models/page-info';
import { RequestBuyMedicine, RequestBuyMedicineDisplay } from 'src/app/shared/models/request-buy-medicine';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchRequest, SearchRequest1, ValueCompare } from 'src/app/shared/requests/search-request';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';
import { RequestBuyMedicineService } from 'src/app/shared/services/request-buy-medicine/request-buy-medicine.service';
import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-detail-buy-medicine',
  templateUrl: './detail-buy-medicine.component.html',
  styleUrls: ['./detail-buy-medicine.component.scss']
})
export class DetailBuyMedicineComponent implements OnInit {
  // @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  @ViewChild('TABLE') TABLE: ElementRef;
  fileName = 'ExcelSheet.xlsx';
  requestMedicineLoading = false;

  requestId: string;
  buyMedicineListDisplay: RequestBuyMedicineDisplay[] = [];
  requestDetail: RequestBuyMedicine;

  pageInfo: PageInfo = { isFirstPage: true, isLastPage: false, numberOfPage: 1, info: null };
  page: number;
  pageLimit: number;

  totalRecord!: number;
  pageSize = 5;
  pageIndex = 0;
  sortFieldList = " medicine.name";
  sortOrderList = 1;
  

  selectFieldDetail = "id, createDate, updateDate, numberOfSpecificMedicine";

  searchValueMap: Map<string, ValueCompare> = new Map;
  searchRequestBuyMedicineId: ValueCompare = {
    value: '',
    compare: 'Equals'
  }
  selectFieldsRequest = "id, createDate, updateDate, numberOfSpecificMedicine"
  selectFields = "medicineId, medicine.name as medicineName, medicineUnitId, medicineUnit.name as medicineUnitName, quantity, note"
  searchMedicineDetailInRequest;

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

  }

  ngOnInit(): void {
    console.log(this.requestId);
    this.searchMedicineDetailInRequest = new SearchRequest1(this.pageSize, this.pageIndex, this.sortFieldList, this.sortOrderList, this.searchValueMap, this.selectFields)
    this.activatedRoute.fragment.subscribe(
      (response) => {
        this.requestDetail = JSON.parse(JSON.stringify(response));
        if (this.requestDetail === null) {
          this.getDetailBuyMedicine(this.requestId, this.selectFieldDetail);
        } else {
          this.searchRequestBuyMedicineDetail(this.requestDetail.id);
        }
      }
    );


  }

  getCreateDate(time: string) {
    return this.generalService.getDate(time);
  }

  getDetailBuyMedicine(id: string, selectFields: string) {
    this.service.getDetailBuyMedicine(id, selectFields).subscribe(
      (response) => {
        this.requestDetail = response.data;
        console.log('requestDetail after null: ', this.requestDetail);
        this.searchRequestBuyMedicineDetail(this.requestDetail.id);
      },
      (error) => {
        console.log('get detail error');
        this.generalService.createErrorNotification(error);
      }
    )
  }

  getData(responseData: ResponseSearch) {
    this.pageInfo.info = responseData.info;
    this.page = this.pageInfo.info.page;
    this.pageLimit = this.pageInfo.info.limit;
    this.totalRecord = this.pageInfo.info.totalRecord;
    this.buyMedicineListDisplay = responseData.data;
    console.log(this.buyMedicineListDisplay);
  }

  searchRequestBuyMedicineDetail(id: string) {
    // this.searchRequestBuyMedicineId.value = id;
    // this.searchRecord['RequestToBuyMedicineId'] = this.searchRequestBuyMedicineId;
    this.generalService.setValueCompare(id, this.searchRequestBuyMedicineId, 'RequestToBuyMedicineId', this.searchValueMap);
    this.service.searchRequestBuyMedicineDetail(this.searchMedicineDetailInRequest.getParamsString()).subscribe(
      (response) => {
        this.getData(response.data);
      },
      (error) => {
        console.log('search detail error');
        this.generalService.createErrorNotification(error);
      }
    )
  }


  deleteRequestDetail() {

  }

  goToUpdateScreen() {
    this.service.getDetailBuyMedicineToUpdateScreen(this.requestId, this.selectFieldsRequest);

  }

  exportToExcel() {
    // let element = document.getElementById('requestTable'); 
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // XLSX.writeFile(wb, this.fileName);

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }

  exportExcel() {

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('ProductSheet');

    worksheet.columns = [
      { header: 'Stt', key: 'stt', width: 10, style: { font: { name: 'Times New Roman', size: 13 } } },
      { header: 'Tên thuốc', key: 'name', width: 32, style: { font: { name: 'Times New Roman', size: 13 } } },
      { header: 'Đơn vị tính', key: 'unit', width: 20, style: { font: { name: 'Times New Roman', size: 13 } } },
      { header: 'Số lượng', key: 'quantity', width: 10, style: { font: { name: 'Times New Roman', size: 13 } } },
      { header: 'Ghi chú', key: 'note', width: 20, style: { font: { name: 'Times New Roman', size: 13 } } },
    ];

    this.buyMedicineListDisplay.forEach((e, index) => {
      worksheet.addRow({ stt: index++, name: e.medicineName, unit: e.medicineUnitName, quantity: e.quantity, note: e.note }, "n");
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ProductData.xlsx');
    })

  }

}
