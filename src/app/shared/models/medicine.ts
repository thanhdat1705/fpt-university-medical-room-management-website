import { MedicineUnitResponse } from "../responses/medicine-unit/medicine-unit-response";

export interface Medicine {
    name: string;
    quantity: number;
    cate: string;
}

export interface MedicineDetail {
    id: string;
    name: string;
    medicineUnit: MedicineUnitResponse;
}


export interface MedicineUnit {
    id: string;
    name: string;
    acronymUnit: string;
    edit: boolean;
}