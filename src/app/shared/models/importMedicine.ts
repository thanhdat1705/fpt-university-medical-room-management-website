import { MedicineForImport } from "./medicine";

export interface ImportMedicineForAddBatch {
    id: string;
    quantity: number;
    price: number;
    description: string;
    insertDate: string;
    expirationDate: string;
    medicineId: string;
    medicine: MedicineForImport;
}

export interface ImportMedicine {
    id: string;
    importBatchId: string;
    quantity: number;
    price: number;
    description: string;
    insertDate: string;
    expirationDate: string;
    medicineId: string;
    medicine: any;
    medicineInInventories: any;
    status: any;
    statusId: number;
}