import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { PeriodicInventoryService } from 'src/app/shared/services/periodic-inventory/periodic-inventory.service';
import { vi } from 'date-fns/locale';
import { Subgroup } from 'src/app/shared/models/subgroup';
import { PeriodicInventoryExport, PeriodicInventoryExportShow } from 'src/app/shared/models/periodic-inventory';
import { GetExportImportDateRequest } from 'src/app/shared/requests/periodic-inventory/periodic-inventory-request';
import { PeriodicInventoryResponse } from 'src/app/shared/responses/periodic-inventory/periodic-inventory-response';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';
import { MedicineUnitResponse } from 'src/app/shared/responses/medicine-unit/medicine-unit-response';

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
  periodicInventoryResponse: PeriodicInventoryResponse;
  //dateExprotRquest: GetExportImportDateRequest

  unitList: MedicineUnitResponse[] = [];
  constructor(
    private generalService: GeneralHelperService,
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
    // this.getAllMedicineUnit();
  }

  getAllMedicineUnit() {
    this.medicineService.getAllMedicineUnit().subscribe(
      (response) => {
        console.log(response.data);
        this.unitList = response.data;
      },
      (error) => {
        console.log("get all error");
        this.generalService.createErrorNotification(error);
      }
    )
  }

  getCreateTime(time: string) {
    return this.generalService.getDate(time);
  }

  onDateChange(result: Date): void {

    console.log(result);
    if (result != null) {
      this.dateSelected = true;
      this.exportLoading = true;
      this.exportImportPeriodicInventoryShows = [];
      this.service.getExportImport(result).subscribe(
        (response) => {
          this.exportLoading = false;
          this.periodicInventoryResponse = response.data;
          this.data = ["1"];
          if (this.periodicInventoryResponse.beginInventories.length < 1 &&
            this.periodicInventoryResponse.exportMedicines.length < 1 &&
            this.periodicInventoryResponse.importBatches.length < 1 &&
            this.periodicInventoryResponse.medicineInInventories.length < 1) {
            this.data = [];
          }

          //EndInventory
          this.periodicInventoryResponse.medicineInInventories.forEach(medicineInInventory => {
            if (this.exportImportPeriodicInventoryShows.findIndex(e => e.subGroup.id == medicineInInventory.medicine.medicineSubgroup.id) == -1) {
              var periodicInventoryExportShow: PeriodicInventoryExportShow = { subGroup: medicineInInventory.medicine.medicineSubgroup, periodicInventoryExports: [] };
              if (medicineInInventory.medicineInInventoryDetails.length <= 0) {
                periodicInventoryExportShow.periodicInventoryExports.push(new PeriodicInventoryExport(
                  null, null, null,
                  medicineInInventory.medicine.name, medicineInInventory.medicine.medicineUnit.name, null, null, null, null, null
                ));
              } else {
                medicineInInventory.medicineInInventoryDetails.forEach(medicineInInventoryDetail => {
                  periodicInventoryExportShow.periodicInventoryExports.push(new PeriodicInventoryExport(
                    medicineInInventoryDetail.id, medicineInInventoryDetail.importMedicineId, medicineInInventoryDetail.medicineId,
                    medicineInInventory.medicine.name, medicineInInventory.medicine.medicineUnit.name, null, null, null, null, medicineInInventoryDetail.quantity
                  ));
                });
              }

              this.exportImportPeriodicInventoryShows.push(periodicInventoryExportShow);
            } else {
              var index = this.exportImportPeriodicInventoryShows.findIndex(e => e.subGroup.id == medicineInInventory.medicine.medicineSubgroup.id);
              medicineInInventory.medicineInInventoryDetails.forEach(medicineInInventoryDetail => {
                this.exportImportPeriodicInventoryShows[index].periodicInventoryExports.push(new PeriodicInventoryExport(
                  medicineInInventoryDetail.id, medicineInInventoryDetail.importMedicineId, medicineInInventoryDetail.medicineId,
                  medicineInInventory.medicine.name, medicineInInventory.medicine.medicineUnit.name, null, null, null, null, medicineInInventoryDetail.quantity
                ));
              });
            }

          });
          console.log(this.exportImportPeriodicInventoryShows);

          //ExportPeriodic, ImportPeriodic, BeginInventory
          this.exportImportPeriodicInventoryShows.forEach(exportImportPeriodicInventoryShow => {
            exportImportPeriodicInventoryShow.periodicInventoryExports.forEach(periodicInventoryExport => {
              //ExportPeriodic
              let intdexExport = this.periodicInventoryResponse.exportMedicines
                .findIndex(e => e.medicineInInventoryDetailId == periodicInventoryExport.medicineInInventoryDetailId);
              if (intdexExport != -1) {
                periodicInventoryExport.numberExportInPeriodic =
                  this.periodicInventoryResponse.exportMedicines[intdexExport].quantity;
              }
              //ImportPeriodic
              this.periodicInventoryResponse.importBatches.forEach((importBatch) => {
                let importMedicineIndex = importBatch.importMedicines.findIndex(i => i.id == periodicInventoryExport.importMedicineId);
                if (importMedicineIndex != -1) {
                  periodicInventoryExport.numberImportInPeriodic = importBatch.importMedicines[importMedicineIndex].quantity;
                  periodicInventoryExport.importPrice = importBatch.importMedicines[importMedicineIndex].price;
                  periodicInventoryExport.expirationnDate = this.getCreateTime(importBatch.importMedicines[importMedicineIndex].expirationDate);
                }
              });


              let beginInventoryIndex = this.periodicInventoryResponse.beginInventories
                .findIndex(i => i.medicineInInventoryDetailId == periodicInventoryExport.medicineInInventoryDetailId);
              console.log(beginInventoryIndex);
              if (beginInventoryIndex != -1) {
                periodicInventoryExport.numberAtBeginPeriodic = this.periodicInventoryResponse.beginInventories[beginInventoryIndex].quantity;
                periodicInventoryExport.importPrice = this.periodicInventoryResponse.beginInventories[beginInventoryIndex].lastMedicineInInventoryDetail.importMedicine.price;
                periodicInventoryExport.expirationnDate = this.getCreateTime(this.periodicInventoryResponse.beginInventories[beginInventoryIndex].lastMedicineInInventoryDetail.importMedicine.expirationDate);
              }

            });
          });



        },
        (error) => {
          this.data = [];
          this.exportLoading = false;
          console.log('search error');
          this.generalService.createErrorNotification(error);
        }
      );
    } else {
      this.exportImportPeriodicInventoryShows = [];
      this.data = [];
      this.dateSelected = false;
    }
  }

}
