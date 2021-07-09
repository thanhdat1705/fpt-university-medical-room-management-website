import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PageInfo } from 'src/app/shared/models/page-info';
import { RequestBuyMedicine, RequestBuyMedicineDisplay, RequestBuyMedicineToExcel } from 'src/app/shared/models/request-buy-medicine';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchRequest, ValueCompare } from 'src/app/shared/requests/search-request';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';
import { RequestBuyMedicineService } from 'src/app/shared/services/request-buy-medicine/request-buy-medicine.service';
import * as XLSX from 'xlsx';
import { Column, Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { Header, HeaderExcel } from 'src/app/shared/models/header-exxcel';

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
    public generalService: GeneralHelperService,
    public service: RequestBuyMedicineService,
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
    this.searchMedicineDetailInRequest = new SearchRequest(this.pageSize, this.pageIndex, this.sortFieldList, this.sortOrderList, this.searchValueMap, this.selectFields)
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
    this.service.searchRequestBuyMedicineDetail(this.searchMedicineDetailInRequest).subscribe(
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
    this.service.loading = true;
    this.service.getDetailBuyMedicineToUpdateScreen(this.requestId, this.selectFieldsRequest);

  }

  exportToExcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }

  headers: Partial<Column>[] = [
    { header: 'Stt', key: 'stt', width: 3 },
    { header: 'Tên thuốc', key: 'name', width: 9 },
    { header: 'Đơn vị tính', key: 'unit', width: 11 },
    { header: 'Số lượng', key: 'quantity', width: 8 },
    { header: 'Ghi chú', key: 'note', width: 7 },
  ]

  colLenght = [];
  buyMedicineListToExcel: RequestBuyMedicineToExcel[] = [];

  convertList(): RequestBuyMedicineToExcel[] {
    const newArray = this.buyMedicineListDisplay.map(({ medicineId, medicineUnitId, ...keepAttrs }) => keepAttrs)
    return newArray;
  }

  exportExcel() {
    this.buyMedicineListToExcel = this.convertList();
    let sheet = this.generalService.getLocalMonthYear(this.requestDetail.updateDate);
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(sheet);

    worksheet.columns = this.headers;

    var headerRow = worksheet.getRow(1);
    headerRow.height = 65;
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'C5D9F1' },
        bgColor: { argb: 'C5D9F1' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thick' }, right: { style: 'thin' } }
      cell.font = { name: 'Times New Roman', size: 13, bold: true }
      cell.alignment = { horizontal: 'center', vertical: 'middle', readingOrder: 'ltr' }
    });


    this.buyMedicineListDisplay.forEach((b, index) => {
      let row = worksheet.addRow({ stt: index + 1, name: b.medicineName, unit: b.medicineUnitName, quantity: b.quantity, note: b.note });
      let stt = row.getCell('stt');
      let unit = row.getCell('unit');
      let quantity = row.getCell('quantity');
      let note = row.getCell('note');
      stt.alignment = { horizontal: 'center', readingOrder: 'ltr' };
      unit.alignment = { horizontal: 'center', readingOrder: 'ltr' };
      quantity.alignment = { horizontal: 'center', readingOrder: 'ltr' };
      note.alignment = { wrapText: true };
      row.font = {
        color: {
          argb: '00000000',
        },
        name: 'Times New Roman', size: 13,
        bold: false
      }
      row.eachCell(cell => {
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      })
      row.height = 38;
    })

    worksheet.columns.forEach((col, index) => {
      let strLength = this.getLength(index);
      col.width = strLength;
    })

    worksheet.getColumn('note').width = 40;

    worksheet.getRow(worksheet.rowCount).eachCell(cell => {
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'double' }, right: { style: 'thin' } }
    })

    for (let i = 1; i <= worksheet.rowCount; i++) {
      worksheet.getCell('F' + i).border = { left: { style: 'double' } }
    }

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ĐỀ-XUẤT-MUA-THUỐC.xlsx');
    })

  }

  getColLength(data: RequestBuyMedicineToExcel[], index: number): number {
    let length = 0;
    data.forEach((d) => {
      let tmp = 0;
      if (index == 1) {
        tmp = d.medicineName.toString().length;
        console.log(tmp);
      }
      if (index == 2) {
        tmp = d.medicineUnitName.toString().length;
      }
      if (index == 3) {
        tmp = d.quantity.toString().length;
      }
      if (index == 4) {
        tmp = d.note.toString().length + 5;
      }
      if (tmp > length) {
        length = tmp;
      }
    });
    return length;
  }

  getLength(index: number): number {
    let length = 0;
    let lengthHeader = this.headers[index].header.toString().length;
    let lengthData = this.getColLength(this.buyMedicineListToExcel, index);
    console.log(lengthHeader);
    console.log(lengthData);
    if (lengthData > lengthHeader) {
      length = lengthData;
    } else {
      length = lengthHeader;
    }

    return length + 6;
  }




}
