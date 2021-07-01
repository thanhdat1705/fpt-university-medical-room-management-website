import { ImportMedicineForAddBatch } from "../../models/importMedicine";
import { MedicineDetail } from "../../models/medicine";
import { Status } from "../../models/status";
import { MedicineUnitResponse } from "../../responses/medicine-unit/medicine-unit-response";


export interface AddImportBatchRequest {
    storeImportMedicines: ImportMedicineForAddBatch[],
    totalPrice: number,
    periodicInventoryMonth: number,
    periodicInventoryYear: number
}

export interface ImportMedicineRequest {
    quantity: number;
    price: number;
    insertDate: string;
    expirationDate: string;
    medicineId: string;
}

export interface ImportMedicineForAdd {
    id: string;
    quantity: number;
    price: number;
    description: string;
    insertDate: string;
    expirationDate: string;
    medicineId: string;
    importBatchId: string;
    medicine: MedicineDetail;
    medicineUnit: MedicineUnitResponse;
}

export interface SearchImportMedicine {
    id: string;
    quantity: number;
    price: number;
    description: string;
    insertDate: string;
    expirationDate: string;
    importBatchId: string;
    medicineName: string;
    medicineUnit: string;
    statusId: number;
    statusImportMedicine: string
}
