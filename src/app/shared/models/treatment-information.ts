import { MedicineInInventoryResponse } from "../responses/medicine-in-inventory/medicine-in-inventory";

export class TreatmentInformation {
    medicineId: string;
    quantity: number;
    IndicationToDrink: string;
    // constructor(medicineInInventoryId: string, quantity: number, indicateToDrink: string) {
    //     this.medicineInInventoryId = medicineInInventoryId;
    //     this.quantity = quantity;
    //     this.indicateToDrink = indicateToDrink;
    // }
}