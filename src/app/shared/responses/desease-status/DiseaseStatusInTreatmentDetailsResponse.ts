import { TreatmentInformation } from "../../models/treatment-information";
import { diseaseStatus } from "./DiseaseStatusResponse";

export interface DiseaseStatusInTreatmentDetails{
    diseaseStatus: diseaseStatus,
    diseaseStatusId: string,
    treatmentId: string,

}