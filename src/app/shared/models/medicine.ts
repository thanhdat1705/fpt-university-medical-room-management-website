import { MedicineUnitResponse } from "../responses/medicine-unit/medicine-unit-response";

export interface Medicine {
    name: string;
    quantity: number;
    cate: string;
}

export interface MedicineDetail {
    id: string;
    name: string;
    medicineUnitId: string;
    medicineSubgroupId: string;
    medicineClassificationId: string;
    medicineUnit: MedicineUnitResponse;
}