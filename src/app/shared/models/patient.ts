import { Department } from "./department";

export interface Patient{
    Id: string,
    InternalCode: string,
    Name: string;
    Gender: string;
    Department?: Department;
    DepartmentId: string;
    AllergyDescription: string;
}