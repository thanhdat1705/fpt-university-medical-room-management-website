export interface SearchMedicineRequest {
    Name: string;
    UnitId: string;
    MedicineSubgroupId: string;
    MedicineClassificationId: string;
    Limit: number;
    Page: number;
    SortField: string;
    SortOrder: number;
}