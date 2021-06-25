import { Account } from "../../models/account";
import { Patient } from "../../models/patient";
import { TreatmentInformation } from "../../models/treatment-information";
import { TreatmentInformationDetail } from "../../models/treatment-information-details";

export interface InsertTreatmentInformationRequest{
    patient: Patient;
    treatmentInformations: TreatmentInformation[],
    treatmentInformationDetails: TreatmentInformationDetail[];
    diseaseStatusNames: string[],

    confirmSignatureImg: string;
}