// export interface RequestBuyMedicine {
//     medicineId: string,
//     medicineUnitId: string,
//     quantity: number,
//     note: string
// }

export interface RequestBuyMedicineDisplay {
    id: string,
    medicineId: string,
    medicineName: string,
    medicineUnitId: string,
    medicineUnitName: string,
    quantity: number,
    note: string
}

export interface RequestBuyMedicineToExcel {
    medicineName: string,
    medicineUnitName: string,
    quantity: number,
    note: string
}

export interface RequestBuyMedicine {
    id: string,
    createDate: string,
    updateDate: string,
    numberOfSpecificMedicine: string
}