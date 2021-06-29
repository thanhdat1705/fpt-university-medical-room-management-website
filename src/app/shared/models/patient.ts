import { Department } from "./department";

export interface Patient{
    id: string,
    internalCode: string,
    name: string;
    gender: string;
    department?: Department;
    departmentId: string;
    allergyDescription: string;
}