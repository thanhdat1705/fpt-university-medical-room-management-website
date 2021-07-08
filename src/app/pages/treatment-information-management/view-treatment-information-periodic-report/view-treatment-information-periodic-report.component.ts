import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Department } from 'src/app/shared/models/department';
import { ResponseSearch } from 'src/app/shared/models/response-search';
import { SearchRequest, SearchRequestWithGroupByAndInclude, ValueCompare } from 'src/app/shared/requests/search-request';
import { TreatmentReportExcel, TreatmentReportSearchResponse, TreatmentSearchResponse } from 'src/app/shared/responses/treatment/treatment-search-response';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { SummaryService } from 'src/app/shared/services/summary.service';
import { TreatmentInformationService } from 'src/app/shared/services/treatment-information/treatment-information.service';
import { treatmentSearchTable } from '../view-treatment-information-list/view-treatment-information-list.component';
import { endOfMonth, startOfMonth } from 'date-fns';
import { Patient } from 'src/app/shared/models/patient';
import { Column, Workbook } from 'exceljs';
import * as fs from 'file-saver';

export interface TreatmentReportTableRowData {
  date: string;
  treatmentReportInfo: TreatmentReportInfo[];
}

export interface TreatmentReportInfo {
  patientName: string,
  patientGender: string,
  departmentName: string,
  diseaseStatusName: string;
  treatmentDirection: string;
  numberOfMedicine: string;
  isConfirmed: boolean;
}

@Component({
  selector: 'app-view-treatment-information-periodic-report',
  templateUrl: './view-treatment-information-periodic-report.component.html',
  styleUrls: ['./view-treatment-information-periodic-report.component.scss']
})
export class ViewTreatmentInformationPeriodicReportComponent implements OnInit {
  curDate: Date;
  treatmentList: TreatmentReportSearchResponse[] = [];
  treatmentTableData: TreatmentReportTableRowData[];
  pageSize = 10;
  pageIndex = 1;
  searchRecordMap: Map<string, ValueCompare> = new Map;
  total = 0;
  loading = true;
  ranges = { 'Hôm nay': [new Date(), new Date()], 'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())] };
  dateRange: Date[];
  genderFilterValue: string;
  departmentFilterValue: string;
  treatmentStatusFilterValue: string;
  departmentList: Department[];
  selectedSearchAttribute = '';
  searchTreatmentValue;
  selectedSearchRole = '';
  dateSelect: Date


  sortField = "createAt";
  sortOrder = 1;
  includes = ["TreatmentInformations.TreatmentInformationDetails.Medicine.MedicineUnit", "DiseaseStatusInTreatments.DiseaseStatus"]

  selectFields = "id,confirmSignature,createAt,accountCreateBy,isDelivered,patient,patient.department, TreatmentInformations, DiseaseStatusInTreatments";


  treatmentSearchRequest = new SearchRequestWithGroupByAndInclude(this.pageSize, this.pageIndex, this.sortField, this.sortOrder, this.searchRecordMap, this.selectFields, this.includes, null);


  dateRangeSelected = false;

  periodicMonthValueCompare: ValueCompare = {
    value: '',
    compare: '='
  }

  periodicYearValueCompare: ValueCompare = {
    value: '',
    compare: '='
  }


  constructor(
    private summaryService: SummaryService,
    private generalService: GeneralHelperService,
    private treatmentInformationService: TreatmentInformationService
  ) { }


  ngOnInit(): void {
    this.dateSelect = new Date;
    console.log('this.dateSelect',this.dateSelect);
    this.treatmentSearchRequest.searchValue = this.searchRecordMap;
    this.searchTreatment();
  }



  searchTreatment() {
    console.log('searchMap', this.searchRecordMap);
    this.treatmentSearchRequest.searchValue = this.searchRecordMap
    this.summaryService.searchTreatment(this.treatmentSearchRequest).subscribe(
      (response) => {
        this.getData(response.data);
        this.loading = false;

      }, (error) => {
        console.log(error);
        this.loading = false;

      }
    );
  }

  getData(response: ResponseSearch) {
    if (response.info.page > 1 && response.data.length == 0) {
      this.treatmentSearchRequest.page = this.treatmentSearchRequest.page - 1;
      console.log("back 1 page");
      this.searchTreatment();
      return;
    }
    this.treatmentList = response.data;
    this.total = response.info.totalRecord;

    this.combinedTreatmentCreateDate();
    // this.treatmentTableData.treatmentInfor = this.treatmentList;
  }

  getGender(acronyms: any) {
    if (acronyms == 'F') {
      return 'Nữ'
    } else {
      return 'Nam'
    }
  }




  combinedTreatmentCreateDate() {
    this.treatmentTableData = [];
    console.log('treatmentList: ', this.treatmentList);

    for (var i = 0; i < this.treatmentList.length; i++) {
      var treatmentReportInfoList: TreatmentReportInfo[] = [];
      var date;
      var treatmentReportInfo: TreatmentReportInfo = {
        diseaseStatusName: '',
        departmentName: null,
        isConfirmed: null,
        numberOfMedicine: '',
        patientGender: null,
        patientName: null,
        treatmentDirection: ''
      };
      treatmentReportInfo.patientName = this.treatmentList[i].patient.name;
      treatmentReportInfo.departmentName = this.treatmentList[i].department.name;
      treatmentReportInfo.patientGender = this.treatmentList[i].patient.gender;

      for (let j = 0; j < this.treatmentList[i].diseaseStatusInTreatments.length; j++) {
        if (j == this.treatmentList[i].diseaseStatusInTreatments.length - 1) {
          treatmentReportInfo.diseaseStatusName += this.treatmentList[i].diseaseStatusInTreatments[j].diseaseStatus.name
        } else {
          treatmentReportInfo.diseaseStatusName += this.treatmentList[i].diseaseStatusInTreatments[j].diseaseStatus.name + ", ";
        }
      }


      console.log('treatmentInformation: ', this.treatmentList[i].treatmentInformations.length);

      for (let j = 0; j < this.treatmentList[i].treatmentInformations.length; j++) {


        if (j == this.treatmentList[i].treatmentInformations.length - 1) {
          treatmentReportInfo.treatmentDirection += this.treatmentList[i].treatmentInformations[j].treatmentInformationDetails[0].medicine.name + " " +
            this.treatmentList[i].treatmentInformations[j].indicationToDrink;

        } else {
          treatmentReportInfo.treatmentDirection += this.treatmentList[i].treatmentInformations[j].treatmentInformationDetails[0].medicine.name + " " +
            this.treatmentList[i].treatmentInformations[j].indicationToDrink + ", ";
        }
        if (j == this.treatmentList[i].treatmentInformations.length - 1) {
          treatmentReportInfo.numberOfMedicine += this.treatmentList[i].treatmentInformations[j].quantity + " " +
            this.treatmentList[i].treatmentInformations[j].treatmentInformationDetails[0].medicine.medicineUnit.name

        } else {
          treatmentReportInfo.numberOfMedicine += this.treatmentList[i].treatmentInformations[j].quantity + " " +
            this.treatmentList[i].treatmentInformations[j].treatmentInformationDetails[0].medicine.medicineUnit.name + ", ";
        }
        // for (let k = 0; k < this.treatmentList[i].treatmentInformations[j].treatmentInformationDetails.length; k++) {


        // }

      }

      treatmentReportInfo.isConfirmed = this.treatmentList[i].isDelivered;
      date = this.generalService.getDate(this.treatmentList[i].createAt);
      treatmentReportInfoList.push(treatmentReportInfo);
      var found = false;
      for (var j = 0; j < this.treatmentTableData.length; j++) {

        if (this.treatmentTableData[j].date === date) {
          this.treatmentTableData[j].treatmentReportInfo.push(treatmentReportInfo);
          found = true;

        }
      }
      if (!found) {
        this.treatmentTableData.push({
          date: date,
          treatmentReportInfo: treatmentReportInfoList,
        });
      }
    }
    console.log('grouped:', this.treatmentTableData);
  }


  onQueryParamsChange(params: NzTableQueryParams) {
    this.treatmentSearchRequest.page = params.pageIndex;
    console.log(this.treatmentSearchRequest.page);

    console.log(params.pageIndex);

    this.searchTreatment();
  }

  onDateChange(result: Date): void {
    console.log(this.dateSelect);
    var month = result.getUTCMonth() + 1; //months from 1-12
    var year = result.getFullYear();

    this.generalService.setValueCompare(month, this.periodicMonthValueCompare, 'periodicInventory.month', this.searchRecordMap);
    this.generalService.setValueCompare(year, this.periodicYearValueCompare, 'periodicInventory.year', this.searchRecordMap);
    this.searchTreatment();
    console.log('date', result)
  }

  headers: Partial<Column>[] = [
    { header: 'Ngày-tháng', key: 'date', width: 20 },
    { header: 'STT', key: 'stt', width: 6 },
    { header: 'Họ và tên NV', key: 'name', width: 20 },
    { header: 'Giới tính', key: 'gender', width: 8, alignment: { wrapText: true } },
    { header: 'Bộ phận', key: 'department', width: 15 },
    { header: 'Tình trạng bệnh', key: 'diseaseStatusName', width: 25 },
    { header: 'Hướng điều trị', key: 'treatmentDirection', width: 35 },
    { header: 'Số thuốc cấp', key: 'numberOfMedicine', width: 15 },
    { header: 'Kí nhận', key: 'isDeilivered', width: 15 },

  ]

  getIsDelivered(status: boolean) {
    if (status) {
      return "Đã xác nhận"
    } else {
      return "Chưa xác nhận"

    }
  }



  exportExcel() {
    console.log("EXPORTTTTTTTTTTTTTTT")
    let sheet = 'NV 07-2021';
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(sheet);
    worksheet.columns = this.headers;
    let mergeRowNumber = 2;
    let contentRow = 2;
    var headerRow = worksheet.getRow(1);
    headerRow.height = 65;
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'C5D9F1' },
        bgColor: { argb: 'C5D9F1' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'medium' }, right: { style: 'thin' } }
      cell.font = { name: 'Times New Roman', size: 13, bold: true }
      cell.alignment = { horizontal: 'center', vertical: 'middle', readingOrder: 'ltr' }
    });

    for (let i = 0; i < this.treatmentTableData.length; i++) {
      worksheet.mergeCells('A' + mergeRowNumber + ':A' + (mergeRowNumber + this.treatmentTableData[i].treatmentReportInfo.length - 1));
      worksheet.getCell('A' + contentRow).value = this.treatmentTableData[i].date;
      worksheet.getCell('A' + contentRow).alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };

      for (let j = 0; j < this.treatmentTableData[i].treatmentReportInfo.length; j++) {
        let num = j
        worksheet.getCell('B' + contentRow).value = ++num;
        worksheet.getCell('B' + contentRow).alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('C' + contentRow).value = this.treatmentTableData[i].treatmentReportInfo[j].patientName;
        worksheet.getCell('C' + contentRow).alignment = { wrapText: true, vertical: 'middle', horizontal: 'left' };
        worksheet.getCell('D' + contentRow).value = this.treatmentTableData[i].treatmentReportInfo[j].patientGender
        worksheet.getCell('D' + contentRow).alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('E' + contentRow).value = this.treatmentTableData[i].treatmentReportInfo[j].departmentName;
        worksheet.getCell('E' + contentRow).alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('F' + contentRow).value = this.treatmentTableData[i].treatmentReportInfo[j].diseaseStatusName;
        worksheet.getCell('F' + contentRow).alignment = { wrapText: true, vertical: 'middle', horizontal: 'left' };
        worksheet.getCell('G' + contentRow).value = this.treatmentTableData[i].treatmentReportInfo[j].treatmentDirection;
        worksheet.getCell('G' + contentRow).alignment = { wrapText: true, vertical: 'middle', horizontal: 'left' };
        worksheet.getCell('H' + contentRow).value = this.treatmentTableData[i].treatmentReportInfo[j].numberOfMedicine;
        worksheet.getCell('H' + contentRow).alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('I' + contentRow).value = this.getIsDelivered(this.treatmentTableData[i].treatmentReportInfo[j].isConfirmed);
        worksheet.getCell('I' + contentRow).alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };

        contentRow++;

      }
      mergeRowNumber += this.treatmentTableData[i].treatmentReportInfo.length;
    }
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Cấp phát thuốc.xlsx');

    })

  }


}
