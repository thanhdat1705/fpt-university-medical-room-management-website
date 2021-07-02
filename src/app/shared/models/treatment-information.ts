import { MedicineInInventoryResponse } from "../responses/medicine-in-inventory/medicine-in-inventory";
import { Medicine, MedicineDetail } from "./medicine";
import { TreatmentInformationDetail } from "./treatment-information-details";

export class TreatmentInformation {
    id: string
    medicineId: string;
    medicineName: string
    unitName: string;
    expiredDate: string
    quantity: number;
    indicationToDrink: string;
    treatmentInformationDetails: TreatmentInformationDetail[];
    medicine?: MedicineDetail;
    // constructor(medicineInInventoryId: string, quantity: number, indicateToDrink: string) {
    //     this.medicineInInventoryId = medicineInInventoryId;
    //     this.quantity = quantity;
    //     this.indicateToDrink = indicateToDrink;
    // }
}