import { MedicineResponse } from "../medicine/medicine";

export interface BatchMedicine {
    id: string;
    quantity: number;
    price: number;
    description: string;
    status: string;
    insertDate: string;
    expirationDate: string;
    medicineId: string;
    periodicInventoryId: string;
    medicine: MedicineResponse;
}