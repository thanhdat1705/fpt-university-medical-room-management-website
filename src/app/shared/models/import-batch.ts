import { ImportMedicine } from "./importMedicine";
import { PeriodicInventory } from "./periodic-inventory";

export interface ImportBatch {
    id: string;
    numberOfSpecificMedicine: number;
    totalPrice: number;
    periodicInventoryId: string;
    createDate: string;
    updateDate: string;
    periodicInventory: PeriodicInventory;
    importMedicines: ImportMedicine[];
}