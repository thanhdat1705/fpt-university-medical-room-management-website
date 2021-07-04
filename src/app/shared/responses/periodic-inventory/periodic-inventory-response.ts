import { BeginInventory, ExportMedicineInventory, ImportBatchInventory, MedicineInInventory } from "../../models/inventory";




export interface PeriodicInventoryResponse {
    id: string;
    fromDate: string;
    toDate: string;
    month: number;
    year: number;
    createDate: string;
    beginInventories: BeginInventory[];
    exportMedicines: ExportMedicineInventory[];
    importBatches: ImportBatchInventory[];
    medicineInInventories: MedicineInInventory[];
}