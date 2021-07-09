// import { Subgroup } from "./subgroup";
// import { Unit } from "./unit";

import { Unit } from "./unit";

// export interface ImportMedicine {
//     id: string;
//     quantity: number;
//     price: number;
//     importBatchId: string;
//     expirationDate: string;
// }
// export interface Medicine {
//     id: string;
//     name: string;
//     medicineSubgroup: Subgroup;
//     medicineUnit: Unit;

// }
// export interface MedicineInInventoryDetail {
//     id: string;
//     importMedicineId: string;
//     quantity: number;
//     medicineId: string;
//     periodicInventoryId: string;

// }

// export interface LastMedicineInInventoryDetail {
//     importMedicineId: string;
//     quantity: number;
//     medicineId: string;
//     periodicInventoryId: string;
//     importMedicine: ImportMedicine;
// }


// //=========================================
// export interface BeginInventory {
//     id: string;
//     medicineInInventoryDetailId: string;
//     lastMedicineInInventoryDetailId: string;
//     quantity: number;
//     periodicInventoryId: string;
//     medicineId: string;
//     lastMedicineInInventoryDetail: LastMedicineInInventoryDetail;
// }

// export interface ExportMedicineInventory {
//     id: string;
//     medicineInInventoryDetailId: string;
//     periodicInventoryId: string;
//     medicineId: string;
//     quantity: number;

// }

// export interface ImportBatchInventory {
//     id: string;
//     periodicInventoryId: string;
//     medicineId: string;
//     importMedicines: ImportMedicine[];
// }

// export interface MedicineInInventory {
//     medicineId: string;
//     periodicInventoryId: string;
//     quantity: string;
//     medicine: Medicine;
//     medicineInInventoryDetails: MedicineInInventoryDetail[];

// }
export interface ExportMedicine {
    id: string;
    medicineInInventoryDetailId: string;
    medicineId: string;
    quantity: number;
}

export interface BeginInventory {
    id: string;
    medicineInInventoryDetailId: string;
    lastMedicineInInventoryDetailId: string;
    quantity: number;
    periodicInventoryId: string;
    medicineId: string;
}

export interface ImportMedicine {
    id: string;
    quantity: number;
    price: number;
    expirationDate: string;
    medicineId: string;
    importBatchId: string;

}

export interface MedicineInInventoryDetail {
    id: string;
    importMedicineId: string;
    quantity: number;
    medicineId: string;
    importMedicine: ImportMedicine;
    beginInventories: BeginInventory[];
    exportMedicines: ExportMedicine[];

}

export interface Medicine {
    id: string;
    name: string;
    medicineUnit: Unit;
    medicineInInventoryDetails: MedicineInInventoryDetail[];
}

