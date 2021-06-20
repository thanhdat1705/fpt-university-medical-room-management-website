import { ImportMedicineForAddBatch } from "../../models/importMedicine";


export interface SearchImportBatchMedicine {
    QuantityHigher: number;
    QuantityLower: number;
    PriceHigher: number;
    PriceLower: number;
    Description: string;
    InsertDateFromDate: string;
    InsertDateToDate: string;
    ExpirationFromDate: string;
    ExpirationToDate: string;
    MedicineName: string;
    PeriodicInventoryMonth: number;
    PeriodicInventoryYear: number;
    Limit: number;
    Page: number;
    SortField: string;
    SortOrder: number;
}

export interface AddImportBatchRequest {
    storeImportBatchMedicineRequest: ImportMedicineForAddBatch[],
    totalPrice: number,
    periodicInventoryMonth: number,
    periodicInventoryYear: number
}
