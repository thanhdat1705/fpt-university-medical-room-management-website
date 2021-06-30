import { Patient } from "../../models/patient";

export interface TreatmentSearchResponse{
    id: string,
    createAt: string,
    confirmSignature: string,
    isDelivered: boolean,
    displayName: string,
    patient: Patient
}
