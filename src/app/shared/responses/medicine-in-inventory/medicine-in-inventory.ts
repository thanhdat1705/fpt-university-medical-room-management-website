import { PeriodicInventory } from "../../models/periodic-inventory";
import { ImportMedicineResponse } from "../import-medicine/import-medicine-response";
import { MedicineClassificationResponse } from "../medicine-classification/medicine-classification-response";
import { MedicineSubgroupResponse } from "../medicine-subgroup/medicine-subgroup-response";
import { MedicineUnitResponse } from "../medicine-unit/medicine-unit-response";
import { MedicineResponse } from "../medicine/medicine";

export interface MedicineInInventoryResponse {
    id: string;
    quantity: number;
    createdDate: Date;
    importMedicine: ImportMedicineResponse;
    medicine: MedicineResponse;
    medicineUnit: MedicineUnitResponse;
    medicineClassification: MedicineClassificationResponse;
    medicineSubgroup: MedicineSubgroupResponse;
    periodicInventory: PeriodicInventory;   
}