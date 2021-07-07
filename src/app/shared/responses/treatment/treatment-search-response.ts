import { Department } from "../../models/department";
import { Patient } from "../../models/patient";
import { TreatmentInformation } from "../../models/treatment-information";
import { TreatmentInformationDetail } from "../../models/treatment-information-details";
import { DiseaseStatusInTreatment } from "../desease-status/DiseaseStatusInTreatmentDetailsResponse";

export interface TreatmentSearchResponse {
    id: string,
    createAt: string,
    confirmSignature: string,
    isDelivered: boolean,
    displayName: string,
    patient: Patient,
    diseaseStatusName?: string
}

export interface TreatmentReportSearchResponse {
    id: string,
    createAt: string,
    confirmSignature: string,
    isDelivered: boolean,
    displayName: string,
    department: Department,
    patient: Patient,
    diseaseStatusInTreatments: DiseaseStatusInTreatment[],
    treatmentInformations: TreatmentInformation[],
}

export interface TreatmentReportExcel {
    patientName: string,
    patientGender: string,
    departmentName: string,
    diseaseStatusName: string;
    treatmentDirection: string;
    numberOfMedicine: string;
    isConfirmed: boolean;
}
