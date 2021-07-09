// import { BeginInventory, ExportMedicineInventory, ImportBatchInventory, Medicine, MedicineInInventory } from "../../models/inventory";

import { Medicine } from "../../models/inventory";
import { ExportImportInventoryMedicine } from "../../models/periodic-inventory";
import { Subgroup } from "../../models/subgroup";




//==================================================================================================================================
// export interface PeriodicInventoryResponse {
//     id: string;
//     fromDate: string;
//     toDate: string;
//     month: number;
//     year: number;
//     createDate: string;
//     beginInventories: BeginInventory[];
//     exportMedicines: ExportMedicineInventory[];
//     importBatches: ImportBatchInventory[];
//     medicineInInventories: MedicineInInventory[];
// }

export interface PeriodicInventoryResponse {
    medicineSubgroup: Subgroup;
    exportImportInventoryMedicines: ExportImportInventoryMedicine[];
}