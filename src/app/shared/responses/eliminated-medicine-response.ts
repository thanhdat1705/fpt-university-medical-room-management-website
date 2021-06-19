import { Medicine } from "../models/medicine";
import { MedicineClassificationResponse } from "./medicine-classification/medicine-classification-response";
import { MedicineInInventoryResponse } from "./medicine-in-inventory/medicine-in-inventory";
import { MedicineSubgroupResponse } from "./medicine-subgroup/medicine-subgroup-response";
import { MedicineUnitResponse } from "./medicine-unit/medicine-unit-response";

export interface EliminatedMedicineResponse {
    id: string;
    batchMedicineId: string;
    medicineId: string;
    quantity: number;
    createDate: Date;
    reason: string;
    medicineUnit: MedicineUnitResponse;
    medicineInInventory: MedicineInInventoryResponse;
    medicineSubgroup: MedicineSubgroupResponse;
    medicineClassification: MedicineClassificationResponse;
    medicine: Medicine;
}