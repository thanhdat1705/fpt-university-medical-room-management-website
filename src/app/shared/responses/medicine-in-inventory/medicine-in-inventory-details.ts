import { PeriodicInventory } from "../../models/periodic-inventory";
import { ImportMedicineResponse } from "../import-medicine/import-medicine-response";

export interface MedicineInInventoryResponse {
    id: string;
    importMedicineId: string;
    quantity: number;
    medicineId: string;
    createdDate: Date;
    periodicInventoryId: string;
    importMedicine: ImportMedicineResponse;
    medicine: any;
    periodicInventory: PeriodicInventory;
    beginInventories?: any;
    eliminateMedicines?: any;
    exportMedicines?: any;
    treatmentInformationDetails?: any;

}