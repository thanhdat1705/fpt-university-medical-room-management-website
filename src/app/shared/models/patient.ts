import { Department } from "./department";

export interface Patient{
    id: string,
    internalCode: string,
    name: string;
    gender: string;
    department?: Department;
    createAt?: Date;
    departmentId: string;
    allergyDescription: string;
    recentTimeGetTreatment?: Date
}