import { Patient } from "../../models/patient";
import { TreatmentInformation } from "../../models/treatment-information";
import { TreatmentInformationDetail } from "../../models/treatment-information-details";

export interface TreatmentSearchResponse{
    id: string,
    createAt: string,
    confirmSignature: string,
    isDelivered: boolean,
    displayName: string,
    patient: Patient
}

export interface TreatmentReportSearchResponse{
    id: string,
    createAt: string,
    confirmSignature: string,
    isDelivered: boolean,
    displayName: string,
    patient: Patient,
    
    treatmentInformation: TreatmentInformation,
    treatmentInformationDetails: TreatmentInformationDetail
}
