import { TreatmentInformation } from "../../models/treatment-information";
import { diseaseStatus } from "./DiseaseStatusResponse";

export interface DiseaseStatusInTreatment{
    diseaseStatus: diseaseStatus,
    diseaseStatusId: string,
    treatmentId: string,

}