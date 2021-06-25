import { MedicineUnitResponse } from "../responses/medicine-unit/medicine-unit-response";
import { MedicineResponseForImport } from "../responses/medicine/medicine";
import { MedicineDetail } from "./medicine";
import { Status } from "./status";

export interface ImportMedicineForAddBatch {
    id: string;
    quantity: number;
    price: number;
    description: string;
    insertDate: string;
    expirationDate: string;
    medicineId: string;
    medicine: MedicineResponseForImport;
}

export interface ImportMedicine {
    id: string;
    quantity: number;
    price: number;
    description: string;
    statusId: number;
    insertDate: string;
    expirationDate: string;
    medicineId: string;
    importBatchId: string;
    medicine: MedicineDetail;
    medicineUnit: MedicineUnitResponse;
    status: Status;
}