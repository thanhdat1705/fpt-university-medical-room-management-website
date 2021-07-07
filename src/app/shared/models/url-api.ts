export const UrlServer = "https://fhcs-backend.online";
// export const UrlServer = "http://10.1.64.81:9000";
// export const UrlServer = "http://192.168.64.61:9000";
// export const UrlServer = "http://10.1.64.71:9000";

// export const UrlServer = "https://fptuhcm-clinic-support-backend.azurewebsites.net";
// export const UrlServer = "http://14.161.47.36:9000";
//  export const UrlServer = "https://fptuhcm-clinic-support-backend.azurewebsites.net";
// export const UrlServer = "http://localhost:9000";

export const Proxy = "https://cors-anywhere.herokuapp.com/";
export const UrlGetAllCity = Proxy + "https://thongtindoanhnghiep.co/api/city";
export const UrlGetAllDistrictInCity = Proxy + "https://thongtindoanhnghiep.co/api/city";
export const UrlGetAllWardInDistrict = Proxy + "https://thongtindoanhnghiep.co/api/district";


export const UrlServerAPISocialAuthentication = UrlServer + '/api/v1.0/Accounts/SocialAuthentication';
export const UrlServerAPIUsernameAuthentication = UrlServer + '/api/v1.0/Accounts/UsernameAuthentication';
export const UrlServerAPIInsertAccount = UrlServer + '/api/v1.0/Accounts/Admin/StoringNewAccount';
export const UrlServerLinkToSocialAccount = UrlServer + '/api/v1.0/Accounts/LinkingToSocialAccount'
export const UrlServerAPIChangePassword = UrlServer + '/api/v1.0/Accounts/ResetingPasswordAccountUsername'
export const UrlServerAPIUpdateProfile = UrlServer + '/api/v1.0/Accounts/UpdatingProfile'
export const UrlServerAPIViewAccounts = UrlServer + '/api/v1.0/Accounts/Searching'
export const UrlServerGetAccountDetail = UrlServer + '/api/v1.0/Accounts/Admin​/GettingAccountDetails';
export const UrlServerSendingCodeForgotPassword = UrlServer + '/api/v1.0/Accounts/SendingCodeForgotPassword';
export const UrlServerUpdateAccount = UrlServer + '/api/v1.0/Accounts/Admin/UpdatingAccount'
export const UrlServerAPIGetProfile = UrlServer + '/api/v1.0/Accounts/Profile'
export const UrlServerAPIVerifyingCodeForgotPassword = UrlServer + '/api/v1.0/Accounts/VerifyingCodeForgotPassword';
export const UrlServerAPIChangingNewPasswordForgot = UrlServer + '/api/v1.0/Accounts/ChangingNewPasswordForgot';
export const UrlServerAPIEliminateMedicine = UrlServer + '/api/v1.0/EliminateMedicines';
export const UrlServerAPISearchEliminatedMedicine = UrlServer + '/api/v1.0/EliminateMedicines/Searching';
export const UrlServerAPIGetEliminatedMedicineDetails = UrlServer +"/api/v1.0/EliminateMedicines";
export const UrlServerAPIUpdateEliminatedMedicineDetails = UrlServer +"/api/v1.0/EliminateMedicines";
export const UrlServerAPIDeleteEliminatedMedicineDetails = UrlServer +"/api/v1.0/EliminateMedicines";

export const UrlServerAPIAddDepartment = UrlServer +"/api/v1.0/Departments";
export const UrlServerAPISearchDepartment = UrlServer +"/api/v1.0/Departments/Searching";


export const UrlServerAPISearchMedicineUnit = UrlServer + '/api/v1.0/MedicineUnits/Searching';
export const UrlServerAPIStoreNewMedicineUnit = UrlServer + '/api/v1.0/MedicineUnits';
export const UrlServerAPIGetAllMedicineUnit = UrlServer + '/api/v1.0/MedicineUnits';

export const UrlServerAPIGetAllMedicineSubgroup = UrlServer + '/api/v1.0/MedicineSubgroups';
export const UrlServerAPIStoreNewMedicineSubgroup = UrlServer + '/api/v1.0/MedicineSubgroups';
export const UrlServerAPISearchMedicineSubgroup = UrlServer + '/api/v1.0/MedicineSubgroups/Searching';

export const UrlServerAPIGetAllMedicineClassification = UrlServer + '/api/v1.0/MedicineClassifications';
export const UrlServerAPISearchClassification = UrlServer + '/api/v1.0/MedicineClassifications/Searching';
export const UrlServerAPIStoreNewMedicineClassification = UrlServer + '/api/v1.0/MedicineClassifications';

export const UrlServerAPIStoreNewMedicine = UrlServer + '/api/v1.0/Medicines';
export const UrlServerAPISearchMedicine = UrlServer + '/api/v1.0/Medicines/Searching';
export const UrlServerAPIDeleteMedicine = UrlServer + '/api/v1.0/Medicines';
export const UrlServerAPIGetMedicine = UrlServer + '/api/v1.0/Medicines/';
export const UrlServerAPIUpdateMedicine = UrlServer + '/api/v1.0/Medicines';

export const UrlServerAPISearchMedicineInInventoryDetails = UrlServer + '/api/v1.0/MedicineInInventoryDetails/Searching';

export const UrlServerAPIAddTreatmentInformation = UrlServer + '/api/v1.0/Treatments';
export const UrlServerAPISearchTreatment = UrlServer + '/api/v1.0/Treatments/Searching';
export const UrlServerAPIGetTreatment = UrlServer + '/api/v1.0/Treatments';
export const UrlServerApiDeleteTreatment = UrlServer + "/api/v{version}/Treatments"
export const UrlServerApiUpdateTreatment = UrlServer + "/api/v{version}/Treatments"


export const UrlServerAPIImportBatchMedicine = UrlServer + '/api/v1.0/ImportBatchMedicine/Searching';

export const UrlServerAPISearchMedicineInInventory = UrlServer + '/api/v1.0/MedicineInInventoryDetails/Searching';
export const UrlServerAPIGetMedicineInInventoryDetails = UrlServer + '/api/v1.0/MedicineInInventoryDetails';
//Import Batch
export const UrlServerAPISearchImportBatch = UrlServer + '/api/v1.0/ImportBatches/Searching';
export const UrlServerAPIAddImportBatch = UrlServer + '/api/v1.0/ImportBatches';
export const UrlServerAPIGetDetailImportBatch = UrlServer + '/api/v1.0/ImportBatches/';
export const UrlServerAPIDeleteImportBatch = UrlServer + '/api/v1.0/ImportBatches/';
//Import Medicine
export const UrlServerAPIAddImportMedicine = UrlServer + '/api/v1.0/ImportMedicines/';
export const UrlServerAPIUpdateImportMedicine = UrlServer + '/api/v1.0/ImportMedicines/';
export const UrlServerAPIDeleteImportMedicine = UrlServer + '/api/v1.0/ImportMedicines/';
export const UrlServerAPISearchImportMedicine = UrlServer + '/api/v1.0/ImportMedicines/Searching';
export const UrlServerAPIDetailImportMedicine = UrlServer + '/api/v1.0/ImportMedicines/';

//Request To Buy Medicine
export const UrlServerAPIAddRequestBuyMedicine = UrlServer + '/api/v1.0/RequestBuyMedicines';

export const UrlServerAPISearchPatient = UrlServer + '/api/v1.0/Patients/Searching';


export const UrlServerAPISearchDeseaseStatus = UrlServer + '/api/v1.0/DiseaseStatuses/Searching';
export const UrlServerAPIUpdateRequestBuyMedicine = UrlServer + '/api/v1.0/RequestBuyMedicines/';
export const UrlServerAPIGetDetailBuyMedicine = UrlServer + '/api/v1.0/RequestBuyMedicines/';
export const UrlServerAPISearchRequestBuyMedicine = UrlServer + '/api/v1.0/RequestBuyMedicines/Searching';

//Request To Buy Medicine Detail
export const UrlServerAPIDetailRequestBuyMedicine = UrlServer + '/api/v1.0/RequestBuyMedicineDetails/Searching';


//ExportImportInventoryPeriodic
export const UrlServerAPIExportImportInventoryPeriodic = UrlServer + '/api/v1.0/PeriodicInventories';