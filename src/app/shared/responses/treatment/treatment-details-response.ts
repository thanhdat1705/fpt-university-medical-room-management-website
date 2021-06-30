import { Account } from "../../models/account";
import { Department } from "../../models/department";
import { Patient } from "../../models/patient";
import { PeriodicInventory } from "../../models/periodic-inventory";
import { TreatmentInformation } from "../../models/treatment-information";
import { TreatmentInformationDetail } from "../../models/treatment-information-details";

export interface TreatmentResponse{
    id: string,
    createAt: string,
    confirmSignature: string,
    isDelivered: boolean,
    displayName: string,
    patient: Patient,
    department: Department,
    accountCreateBy: Account,
    periodicInventory: PeriodicInventory,
    treatmentInformations: TreatmentInformation,
    diseaseStatusInTreatmentInformations: string[],
    treatmentInformationDetails: TreatmentInformationDetail
}
