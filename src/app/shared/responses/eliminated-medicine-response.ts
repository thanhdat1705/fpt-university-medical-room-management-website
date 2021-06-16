import { Medicine } from "../models/medicine";

export interface EliminatedMedicineResponse {
    id: string;
    batchMedicineId: string;
    medicineId: string;
    quantity: number;
    createDate: Date;
    reason: string;
    periodicInventoryId: string;
    exportBatchMedicineId: string;
    batchMedicineInInventory: any;
    exportBatchMedicine: any;
    medicine: Medicine;
}