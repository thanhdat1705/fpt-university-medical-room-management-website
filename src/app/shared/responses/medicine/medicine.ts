import { MedicineClassificationResponse } from "../medicine-classification/medicine-classification-response";
import { MedicineSubgroupResponse } from "../medicine-subgroup/medicine-subgroup-response";
import { MedicineUnitResponse } from "../medicine-unit/medicine-unit-response";

export interface MedicineResponse {
    id: string;
    name: string;
    unitId: string;
    description: string;
    medicineSubgroupId: string;
    medicineClassificationId: string;
    createdDate: string;
    updatedDate: String;
    medicineClassification: MedicineClassificationResponse;
    medicineSubgroup: MedicineSubgroupResponse;
    medicineUnit: MedicineUnitResponse;
    batchMedicineInInventories: any
    beginInventories: any
    eliminateMedicines: any
    exportBatchMedicines: any
    importBatchMedicines: any
    treatmentInformationDetails: any
}