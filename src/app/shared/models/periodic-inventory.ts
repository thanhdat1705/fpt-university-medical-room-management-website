import { Subgroup } from "./subgroup";

export interface PeriodicInventory {
    id: string;
    fromDate: string;
    toDate: string;
    month: number;
    year: number;
    createDate: string;
}

export interface PeriodicInventoryExportShow {
    subGroup: Subgroup;
    periodicInventoryExports: PeriodicInventoryExport[];
}

export class PeriodicInventoryExport {
    medicineInInventoryDetailId: string;
    importMedicineId: string;
    medicineId: string;
    medicineName: string;
    medicineUnit: string;
    importPrice: number;
    numberAtBeginPeriodic: number;
    numberImportInPeriodic: number;
    numberExportInPeriodic: number;
    numberEndPeriodic: number;
    totalExportPrice: number;
    expirationnDate: string;

    constructor(
        medicineInInventoryDetailId?: string,
        importMedicineId?: string,
        medicineId?: string,
        medicineName?: string,
        medicineUnit?: string,
        importPrice: number = 0,
        numberAtBeginPeriodic: number = 0,
        numberImportInPeriodic: number = 0,
        numberExportInPeriodic: number = 0,
        numberEndPeriodic: number = 0,
        expirationnDate?: string,) {

        this.medicineInInventoryDetailId = medicineInInventoryDetailId;
        this.importMedicineId = importMedicineId;
        this.medicineId = medicineId;
        this.medicineName = medicineName;
        this.medicineUnit = medicineUnit;
        this.importPrice = importPrice;
        this.numberAtBeginPeriodic = numberAtBeginPeriodic;
        this.numberImportInPeriodic = numberImportInPeriodic;
        this.numberExportInPeriodic = numberExportInPeriodic;
        this.numberEndPeriodic = numberEndPeriodic;
        this.expirationnDate = expirationnDate;

        // this.totalExportPrice = numberExportInPeriodic * importPrice;
    }

    getTotalExportPrice() {
        let total;
        total = this.numberExportInPeriodic * this.importPrice;
        if (total != 0) {
            return total.toLocaleString('vi');
        }
        return null;
    }

}

// export class ExportImportInventoryMedicine {
//     medicineId: string;
//     medicineName: string;
//     medicineUnit: string;
//     importPrice: number;
//     numberMedicineAtBeginPeriodic: number;
//     numberMedicineImportInPeriodic: number;
//     numberMedicineExportInPeriodic: number;
//     numberMedicineAtEndPeriodic: number;
//     expirationDate: string;
//     note: string;

//     constructor(
//         medicineId: string,
//         medicineName: string,
//         medicineUnit: string,
//         importPrice: number,
//         numberMedicineAtBeginPeriodic: number,
//         numberMedicineImportInPeriodic: number,
//         numberMedicineExportInPeriodic: number,
//         numberMedicineAtEndPeriodic: number,
//         expirationDate: string,
//         note: string
//     ) {

//         this.medicineId = medicineId,
//             this.medicineName = medicineName,
//             this.medicineUnit = medicineUnit,
//             this.importPrice = importPrice,
//             this.numberMedicineAtBeginPeriodic = numberMedicineAtBeginPeriodic,
//             this.numberMedicineImportInPeriodic = numberMedicineImportInPeriodic,
//             this.numberMedicineExportInPeriodic = numberMedicineExportInPeriodic,
//             this.numberMedicineAtEndPeriodic = numberMedicineAtEndPeriodic,
//             this.expirationDate = expirationDate,
//             this.note = note
//     }

//     public getTotalExportPrice(): number {
//         console.log(this.importPrice);
//         let total;
//         total = this.numberMedicineExportInPeriodic * this.importPrice;
//         console.log(total);
//         if (total != 0) {
//             return total;
//         }
//         return null;
//     }

//     public hideZeroNumber(value: number) {
//         let number = value;
//         if (number == 0) {
//             return null;
//         }
//         return number.toLocaleString('vi');
//     }

//     public toLocaleStringImportPrice() {
//         return this.importPrice.toLocaleString('vi');
//     }

// }

export interface ExportImportInventoryMedicine {
    medicineId: string;
    medicineName: string;
    medicineUnit: string;
    importPrice: number;
    numberMedicineAtBeginPeriodic: number;
    numberMedicineImportInPeriodic: number;
    numberMedicineExportInPeriodic: number;
    numberMedicineAtEndPeriodic: number;
    expirationDate: string;
    exportNote: string;

}