import { Patient } from "../../models/patient";

export interface treatmentSearchResponse{
    id: string,
    createAt: string,
    confirmSignature: string,
    isDelivered: boolean,
    displayName: string,
    patient: Patient
}
