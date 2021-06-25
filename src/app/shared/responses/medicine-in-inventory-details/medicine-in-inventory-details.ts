import { StringMappingType } from "typescript";

export interface MedicineInInventoryDetailsResponse {
    id: string;
    name: string;
    medicineId: string;
    quantity: number;
    createdDate: Date;
    expirationDate: Date

}