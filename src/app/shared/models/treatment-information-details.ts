import { MedicineInInventoryResponse } from "../responses/medicine-in-inventory/medicine-in-inventory";
import { Medicine, MedicineDetail } from "./medicine";

export class TreatmentInformationDetail {
    id: string
    medicineId: string;
    medicineName: string;
    medicineInInventoryDetailId: string;
    quantity: number;
    unitName: string;
    expiredDate: string;
    medicine?: MedicineDetail
    // constructor(medicineInInventoryId: string, quantity: number, indicateToDrink: string) {
    //     this.medicineInInventoryId = medicineInInventoryId;
    //     this.quantity = quantity;
    //     this.indicateToDrink = indicateToDrink;
    // }
}