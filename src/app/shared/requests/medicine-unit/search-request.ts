export interface SearchMedicineUnitRequest {
    MedicineUnitName: string;
    Limit: number;
    Page: number;
    SortField: string;
    SortOrder: number;
}