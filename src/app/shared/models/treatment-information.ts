import { MedicineInInventoryResponse } from "../responses/medicine-in-inventory/medicine-in-inventory";
import { TreatmentInformationDetail } from "./treatment-information-details";

export class TreatmentInformation {
    medicineId: string;
    quantity: number;
    IndicationToDrink: string;
    treatmentInformationDetails: TreatmentInformationDetail[];
    // constructor(medicineInInventoryId: string, quantity: number, indicateToDrink: string) {
    //     this.medicineInInventoryId = medicineInInventoryId;
    //     this.quantity = quantity;
    //     this.indicateToDrink = indicateToDrink;
    // }
}