import { PeriodicInventory } from "./periodic-inventory";

export interface ImportBatch {
    id: string;
    numberOfSpecificMedicine: number;
    totalPrice: number;
    createDate: string;
    updateDate: string;
    periodicByMonth: string;
    periodicByYear: string
}