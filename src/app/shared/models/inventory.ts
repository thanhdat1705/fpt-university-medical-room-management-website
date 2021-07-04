import { Subgroup } from "./subgroup";
import { Unit } from "./unit";

export interface ImportMedicineInventory {
    id: string,
    quantity: number;
    price: number;
    importBatchId: string;

}
export interface Medicine {
    id: string,
    name: string;
    medicineSubgroup: Subgroup;
    medicineUnit: Unit;

}
export interface MedicineInInventoryDetail {
    id: string,
    importMedicineId: string;
    quantity: number;
    medicineId: string;
    periodicInventoryId: string;

}


//=========================================
export interface BeginInventory {
    id: string,
    medicineInInventoryDetailId: string,
    quantity: number,
    periodicInventoryId: string;
    medicineId: string;
}

export interface ExportMedicineInventory {
    id: string,
    medicineInInventoryDetailId: string,
    periodicInventoryId: string;
    medicineId: string;
    quantity: number,

}

export interface ImportBatchInventory {
    id: string,
    periodicInventoryId: string;
    medicineId: string;
    importMedicines: ImportMedicineInventory[];
}

export interface MedicineInInventory {
    medicineId: string,
    periodicInventoryId: string;
    quantity: string;
    medicine: Medicine;
    medicineInInventoryDetails: MedicineInInventoryDetail[];

}