export interface Medicine {
    name: string;
    quantity: number;
    cate: string;
}

export interface MedicineForImport {
    id: string;
    name: string;
    medicineUnit: string;
}