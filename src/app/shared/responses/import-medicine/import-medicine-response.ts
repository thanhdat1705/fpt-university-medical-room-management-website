import { Medicine } from "../../models/medicine";

export interface ImportMedicineResponse{
    id: string;
    quantity: number;
    price: number;
    description: string;
    statusId: number;
    insertDate: Date;
    expirationDate: Date;
    importBatch?: any;
    medicine: Medicine;
    status?: any;
    medicineInInventories: any[];
}