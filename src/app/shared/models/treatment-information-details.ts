import { MedicineInInventoryResponse } from "../responses/medicine-in-inventory/medicine-in-inventory";

export class TreatmentInformationDetail {
    medicineId: string;
    medicineName: string;
    medicineInInventoryDetailId: string;
    quantity: number;

    // constructor(medicineInInventoryId: string, quantity: number, indicateToDrink: string) {
    //     this.medicineInInventoryId = medicineInInventoryId;
    //     this.quantity = quantity;
    //     this.indicateToDrink = indicateToDrink;
    // }
}