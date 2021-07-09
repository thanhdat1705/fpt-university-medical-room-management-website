import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { PeriodicInventoryService } from 'src/app/shared/services/periodic-inventory/periodic-inventory.service';
import { vi } from 'date-fns/locale';
import { PeriodicInventoryExportShow } from 'src/app/shared/models/periodic-inventory';
import { PeriodicInventoryResponse } from 'src/app/shared/responses/periodic-inventory/periodic-inventory-response';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';
import { MedicineUnitResponse } from 'src/app/shared/responses/medicine-unit/medicine-unit-response';
import * as XLSX from 'xlsx';
import { Column, Workbook } from 'exceljs';
import * as fs from 'file-saver';
@Component({
  selector: 'app-export-periodic-inventory',
  templateUrl: './export-periodic-inventory.component.html',
  styleUrls: ['./export-periodic-inventory.component.scss']
})
export class ExportPeriodicInventoryComponent implements OnInit {

  dateSelected = false;
  exportLoading = false;
  dateSelect: Date;
  data = [];
  exportImportPeriodicInventoryShows: PeriodicInventoryExportShow[] = [];
  periodicInventoryList: PeriodicInventoryResponse[] = [];

  constructor(
    public generalService: GeneralHelperService,
    private service: PeriodicInventoryService,
    private medicineService: MedicineService,
    private router: Router,
    private i18n: NzI18nService,
  ) {
    this.i18n.setLocale(vi_VN);
    this.i18n.setDateLocale(vi);
  }

  ngOnInit(): void {
    this.dateSelect = new Date;
    this.onDateChange(this.dateSelect);
  }

  getCreateTime(time: string) {
    return this.generalService.getDate(time);
  }

  getDateSlice(time: string) {
    return this.generalService.getDateSlice(time);
  }

  // onDateChange(result: Date): void {

  //   console.log(result);
  //   if (result != null) {
  //     this.dateSelected = true;
  //     this.exportLoading = true;
  //     this.exportImportPeriodicInventoryShows = [];
  //     this.service.getExportImport(result).subscribe(
  //       (response) => {
  //         this.exportLoading = false;
  //         this.periodicInventoryResponse = response.data;
  //         this.data = ["1"];
  //         if (this.periodicInventoryResponse.beginInventories.length < 1 &&
  //           this.periodicInventoryResponse.exportMedicines.length < 1 &&
  //           this.periodicInventoryResponse.importBatches.length < 1 &&
  //           this.periodicInventoryResponse.medicineInInventories.length < 1) {
  //           this.data = [];
  //         }

  //         //EndInventory
  //         this.periodicInventoryResponse.medicineInInventories.forEach(medicineInInventory => {
  //           if (this.exportImportPeriodicInventoryShows.findIndex(e => e.subGroup.id == medicineInInventory.medicine.medicineSubgroup.id) == -1) {
  //             var periodicInventoryExportShow: PeriodicInventoryExportShow = { subGroup: medicineInInventory.medicine.medicineSubgroup, periodicInventoryExports: [] };
  //             if (medicineInInventory.medicineInInventoryDetails.length <= 0) {
  //               periodicInventoryExportShow.periodicInventoryExports.push(new PeriodicInventoryExport(
  //                 null, null, null,
  //                 medicineInInventory.medicine.name, medicineInInventory.medicine.medicineUnit.name, null, null, null, null, null
  //               ));
  //             } else {
  //               medicineInInventory.medicineInInventoryDetails.forEach(medicineInInventoryDetail => {
  //                 periodicInventoryExportShow.periodicInventoryExports.push(new PeriodicInventoryExport(
  //                   medicineInInventoryDetail.id, medicineInInventoryDetail.importMedicineId, medicineInInventoryDetail.medicineId,
  //                   medicineInInventory.medicine.name, medicineInInventory.medicine.medicineUnit.name, null, null, null, null, medicineInInventoryDetail.quantity
  //                 ));
  //               });
  //             }

  //             this.exportImportPeriodicInventoryShows.push(periodicInventoryExportShow);
  //           } else {
  //             var index = this.exportImportPeriodicInventoryShows.findIndex(e => e.subGroup.id == medicineInInventory.medicine.medicineSubgroup.id);
  //             medicineInInventory.medicineInInventoryDetails.forEach(medicineInInventoryDetail => {
  //               this.exportImportPeriodicInventoryShows[index].periodicInventoryExports.push(new PeriodicInventoryExport(
  //                 medicineInInventoryDetail.id, medicineInInventoryDetail.importMedicineId, medicineInInventoryDetail.medicineId,
  //                 medicineInInventory.medicine.name, medicineInInventory.medicine.medicineUnit.name, null, null, null, null, medicineInInventoryDetail.quantity
  //               ));
  //             });
  //           }

  //         });
  //         console.log(this.exportImportPeriodicInventoryShows);

  //         //ExportPeriodic, ImportPeriodic, BeginInventory
  //         this.exportImportPeriodicInventoryShows.forEach(exportImportPeriodicInventoryShow => {
  //           exportImportPeriodicInventoryShow.periodicInventoryExports.forEach(periodicInventoryExport => {
  //             //ExportPeriodic
  //             let intdexExport = this.periodicInventoryResponse.exportMedicines
  //               .findIndex(e => e.medicineInInventoryDetailId == periodicInventoryExport.medicineInInventoryDetailId);
  //             if (intdexExport != -1) {
  //               periodicInventoryExport.numberExportInPeriodic =
  //                 this.periodicInventoryResponse.exportMedicines[intdexExport].quantity;
  //             }
  //             //ImportPeriodic
  //             this.periodicInventoryResponse.importBatches.forEach((importBatch) => {
  //               let importMedicineIndex = importBatch.importMedicines.findIndex(i => i.id == periodicInventoryExport.importMedicineId);
  //               if (importMedicineIndex != -1) {
  //                 periodicInventoryExport.numberImportInPeriodic = importBatch.importMedicines[importMedicineIndex].quantity;
  //                 periodicInventoryExport.importPrice = importBatch.importMedicines[importMedicineIndex].price;
  //                 periodicInventoryExport.expirationnDate = this.getCreateTime(importBatch.importMedicines[importMedicineIndex].expirationDate);
  //               }
  //             });


  //             let beginInventoryIndex = this.periodicInventoryResponse.beginInventories
  //               .findIndex(i => i.medicineInInventoryDetailId == periodicInventoryExport.medicineInInventoryDetailId);
  //             console.log(beginInventoryIndex);
  //             if (beginInventoryIndex != -1) {
  //               periodicInventoryExport.numberAtBeginPeriodic = this.periodicInventoryResponse.beginInventories[beginInventoryIndex].quantity;
  //               periodicInventoryExport.importPrice = this.periodicInventoryResponse.beginInventories[beginInventoryIndex].lastMedicineInInventoryDetail.importMedicine.price;
  //               periodicInventoryExport.expirationnDate = this.getCreateTime(this.periodicInventoryResponse.beginInventories[beginInventoryIndex].lastMedicineInInventoryDetail.importMedicine.expirationDate);
  //             }

  //           });
  //         });
  //       },
  //       (error) => {
  //         this.data = [];
  //         this.exportLoading = false;
  //         console.log('search error');
  //         this.generalService.createErrorNotification(error);
  //       }
  //     );
  //   } else {
  //     this.exportImportPeriodicInventoryShows = [];
  //     this.data = [];
  //     this.dateSelected = false;
  //   }
  // }

  getTotalExportPrice(exportPrice: number, importPrice): number {
    let total;
    total = exportPrice * importPrice;
    if (total != 0) {
      return total.toLocaleString('vi');
    }
    return 0;
  }

  hideZeroNumber(value: number) {
    let number = value;
    if (number == 0) {
      return null;
    }
    return number;
  }

  getStatusExpirationDate(exprirationDate: string): string {
    let status = "success";

    let expDate = new Date(exprirationDate);
    let currentDate = new Date;

    let expYear = expDate.getFullYear();
    let expMonth = expDate.getMonth() + 1;
    let expDay = expDate.getDate();

    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();

    let number = expMonth - currentMonth;

    if (expYear >= currentYear) {
      if (expYear > currentYear) {
        return status = "success";
      }
      if (expYear == currentYear) {
        if (number <= 3 && number > 0) {
          status = "warning";
        } else if (number == 0) {
          if (expDay > currentDay) {
            status = "warning";
          }
          if (expDay <= currentDay) {
            status = "error";
          }
        }
        else {
          status = "success";
        }
      }
    } else {
      status = "error";
    }
    return status;
  }


  onDateChange(result: Date): void {
    console.log(result);
    if (result != null) {
      this.dateSelected = true;
      this.exportLoading = true;
      this.periodicInventoryList = [];
      this.service.getExportImport(result).subscribe(
        (response) => {
          this.exportLoading = false;
          this.periodicInventoryList = response.data;
          console.log(this.periodicInventoryList);

        },
        (error) => {
          this.data = [];
          this.exportLoading = false;
          console.log('search error');
          this.generalService.createErrorNotification(error);
        }
      )

    } else {
      this.periodicInventoryList = [];
      this.data = [];
      this.dateSelected = false;
    }
  }

  headers: Partial<Column>[] = [
    { header: 'Mã thuốc/Mã dụng cụ', key: 'medicineCode', width: 25 },
    { header: 'Tên thuốc - Dụng cụ', key: 'medicine', width: 24 },
    { header: 'ĐVT', key: 'unit', width: 9 },
    { header: 'Đơn giá', key: 'singlePrice', width: 8 },
    { header: 'Tồn Đầu kỳ', key: 'beginPeriodic', width: 11 },
    { header: 'Nhập trong kỳ', key: 'importInPeriodic', width: 8 },
    { header: 'SL Xuất trong kỳ', key: 'exportInPeriodic', width: 9 },
    { header: 'Tồn cuối kỳ', key: 'endPeriodic', width: 13 },
    { header: 'Thành tiền (SL xuất x đơn giá)', key: 'totalPrice', width: 12 },
    { header: 'Số thuốc/Dụng cụ tối thiểu', key: 'numberOfMedicine', width: 12 },
    { header: 'Hạn sử dụng', key: 'expiryDate', width: 11 },
    { header: 'Số lượng cần mua thêm', key: 'quantityToBuyMore', width: 9 },
    { header: 'Giá tiền', key: 'price', width: 7 },
    { header: 'Ghi chú', key: 'note', width: 17 },

  ]

  exportExcel() {

    let year = this.dateSelect.getFullYear();
    let sheet = this.generalService.getLocalMonthYear(this.dateSelect.toString());
    let workbook = new Workbook();
    let mergeRowNumber = 2;
    let contentRow = 2;
    let worksheet = workbook.addWorksheet(sheet);

    worksheet.columns = this.headers;
    var headerRow = worksheet.getRow(1);
    headerRow.height = 77;
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffffff' },
        bgColor: { argb: 'ffffff' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thick' }, right: { style: 'thin' } }
      cell.font = { name: 'Times New Roman', size: 12, bold: true }
      cell.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle', readingOrder: 'ltr' }
    });
    // worksheet.getColumn(headerRow.getLas)
    // let endHeader = headerRow.cellCount;
    // headerRow.getCell(endHeader).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thick' }, right: { style: 'double' } }

    let totalPrice = 0;
    this.periodicInventoryList.forEach((periodic, i) => {
      let endMerge = mergeRowNumber + periodic.exportImportInventoryMedicines.length - 1;
      worksheet.mergeCells('A' + mergeRowNumber + ':A' + endMerge);
      worksheet.getCell('A' + contentRow).value = periodic.medicineSubgroup.name;
      worksheet.getCell('A' + contentRow).style = {
        font: { name: 'Times New Roman', size: 12, bold: true },
        alignment: { wrapText: true, vertical: 'middle', horizontal: 'center' },
        border: { top: { style: 'thick' }, left: { style: 'thin' }, bottom: { style: 'thick' }, right: { style: 'thin' } }
      }

      // cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

      periodic.exportImportInventoryMedicines.forEach((medicine, j) => {
        totalPrice += medicine.importPrice * medicine.numberMedicineExportInPeriodic;

        //medicineName
        worksheet.getCell('B' + contentRow).value = medicine.medicineName;
        worksheet.getCell('B' + contentRow).style = {
          alignment: { wrapText: true, vertical: 'bottom', horizontal: 'left' },
          font: { name: 'Times New Roman', size: 12, bold: false },
          border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        };

        //medicineUnit
        worksheet.getCell('C' + contentRow).value = medicine.medicineUnit;
        worksheet.getCell('C' + contentRow).style = {
          alignment: { wrapText: true, vertical: 'bottom', horizontal: 'center' },
          font: { name: 'Times New Roman', size: 12, bold: false },
          border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        };

        //importPrice
        worksheet.getCell('D' + contentRow).value = medicine.importPrice;
        worksheet.getCell('D' + contentRow).style = {
          alignment: { wrapText: true, vertical: 'bottom', horizontal: 'right' },
          font: { name: 'Times New Roman', size: 12, bold: false },
          border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } },
          numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)'
        };

        //numberMedicineAtBeginPeriodic
        worksheet.getCell('E' + contentRow).value = medicine.numberMedicineAtBeginPeriodic;
        worksheet.getCell('E' + contentRow).style = {
          alignment: { wrapText: true, vertical: 'bottom', horizontal: 'center' },
          font: { name: 'Times New Roman', size: 12, bold: false },
          border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        };

        //numberMedicineImportInPeriodic
        worksheet.getCell('F' + contentRow).value = medicine.numberMedicineImportInPeriodic;
        worksheet.getCell('F' + contentRow).style = {
          alignment: { wrapText: true, vertical: 'bottom', horizontal: 'center' },
          font: { name: 'Times New Roman', size: 12, bold: false },
          border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        };

        //numberMedicineExportInPeriodic
        worksheet.getCell('G' + contentRow).value = medicine.numberMedicineExportInPeriodic;
        worksheet.getCell('G' + contentRow).style = {
          alignment: { wrapText: true, vertical: 'bottom', horizontal: 'center' },
          font: { name: 'Times New Roman', size: 12, bold: false },
          border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        };

        //numberMedicineAtEndPeriodic
        worksheet.getCell('H' + contentRow).value = medicine.numberMedicineAtEndPeriodic;
        worksheet.getCell('H' + contentRow).style = {
          alignment: { wrapText: true, vertical: 'bottom', horizontal: 'center' },
          font: { name: 'Times New Roman', size: 12, bold: false },
          border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        };

        //totalPricePerMedicine
        worksheet.getCell('I' + contentRow).value = medicine.importPrice * medicine.numberMedicineExportInPeriodic;
        worksheet.getCell('I' + contentRow).style = {
          alignment: { wrapText: true, vertical: 'bottom', horizontal: 'right' },
          font: { name: 'Times New Roman', size: 12, bold: false },
          border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } },
          numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)'
        };

        //
        worksheet.getCell('J' + contentRow).value = "";
        worksheet.getCell('J' + contentRow).style = {
          alignment: { vertical: 'bottom', horizontal: 'center' },
          font: { name: 'Times New Roman', size: 12, bold: false },
          border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        };

        //expirationDate
        worksheet.getCell('K' + contentRow).value = this.getDateSlice(medicine.expirationDate);
        worksheet.getCell('K' + contentRow).style = {
          alignment: { vertical: 'bottom', horizontal: 'right' },
          font: { name: 'Times New Roman', size: 12, bold: false },
          border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        };
        let expirationDateStatus = this.getStatusExpirationDate(medicine.expirationDate);
        if (expirationDateStatus == "warning" || expirationDateStatus == "error") {
          worksheet.getCell('K' + contentRow).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFF00' },
            bgColor: { argb: 'FFFF00' }
          }
        }

        //
        worksheet.getCell('L' + contentRow).value = "";
        worksheet.getCell('L' + contentRow).style = {
          alignment: { vertical: 'bottom', horizontal: 'center' },
          font: { name: 'Times New Roman', size: 12, bold: false },
          border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        };

        //
        worksheet.getCell('M' + contentRow).value = "";
        worksheet.getCell('M' + contentRow).style = {
          alignment: { vertical: 'bottom', horizontal: 'right' },
          font: { name: 'Times New Roman', size: 12, bold: false },
          border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        };

        //exportNote
        worksheet.getCell('N' + contentRow).value = medicine.exportNote;
        worksheet.getCell('N' + contentRow).style = {
          alignment: { wrapText: true, vertical: 'bottom', horizontal: 'left' },
          font: { name: 'Times New Roman', size: 12, bold: false },
          border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        };

        contentRow++;
      })
      console.log('contentRow', contentRow - 1);
      let endMergeRow = worksheet.getRow(contentRow - 1);
      endMergeRow.eachCell((cell) => {
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thick' }, right: { style: 'thin' } }
      })

      mergeRowNumber += periodic.exportImportInventoryMedicines.length;
    })
    let endRow = worksheet.rowCount;
    let totalRow = worksheet.addRow({
      medicineCode: "TỔNG CỘNG",
      medicine: "",
      unit: "",
      singlePrice: "",
      beginPeriodic: "",
      importInPeriodic: "",
      exportInPeriodic: "",
      endPeriodic: "",
      totalPrice: totalPrice,
      numberOfMedicine: "",
      expiryDate: "",
      quantityToBuyMore: "",
      price: "",
      note: ""
    })
    totalRow.getCell('medicineCode').style = {
      font: { name: 'Times New Roman', size: 12, bold: true },
      alignment: { wrapText: true, vertical: 'middle', horizontal: 'center' },
      border: { top: { style: 'thick' }, left: { style: 'thin' }, bottom: { style: 'double' }, right: { style: 'thin' } }
    }
    totalRow.getCell('totalPrice').style = {
      font: { name: 'Times New Roman', size: 12 },
      alignment: { wrapText: true, vertical: 'bottom', horizontal: 'right' },
      border: { top: { style: 'thick' }, left: { style: 'thin' }, bottom: { style: 'double' }, right: { style: 'thin' } },
      numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)'
    }

    // console.log('endRow', endRow);
    // worksheet.getCell('A' + (endRow + 1)).value = "TỔNG CỘNG";
    // worksheet.getCell('A' + (endRow + 1)).style = {
    // font: { name: 'Times New Roman', size: 12, bold: true },
    // alignment: { wrapText: true, vertical: 'middle', horizontal: 'center' },
    // border: { top: { style: 'thick' }, left: { style: 'thin' }, bottom: { style: 'double' }, right: { style: 'thin' } }
    // }

    // worksheet.getCell('I' + (endRow + 1)).value = 123134;

    worksheet.getRow(worksheet.rowCount).eachCell(cell => {
      cell.border = { top: { style: 'thick' }, left: { style: 'thin' }, bottom: { style: 'double' }, right: { style: 'thin' } }
    })


    for (let i = 1; i <= worksheet.rowCount; i++) {
      worksheet.getCell('O' + i).border = { left: { style: 'double' } }
    }

    // worksheet.addRow([]);

    for (let i = 2; i <= worksheet.rowCount; i++) {
      worksheet.getRow(i).height = 24;
    }


    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'BÁO-CÁO-XUẤT-NHẬP-TỒN-' + year.toString() + '.xlsx');

    })
  }

}
