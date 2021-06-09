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