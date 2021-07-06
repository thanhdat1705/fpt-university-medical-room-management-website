import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { ResponseServer } from '../models/response-server';
import { Observable } from 'rxjs';
import {
  UrlServerAPIGetProfile,
  UrlServerAPIInsertAccount,
  UrlServerAPISocialAuthentication,
  UrlServerAPISearchMedicineUnit,
  UrlServerAPIStoreNewMedicineUnit,
  UrlServerAPIGetAllMedicineUnit,
  UrlServerAPIGetAllMedicineSubgroup,
  UrlServerAPIStoreNewMedicineSubgroup,
  UrlServerAPIGetAllMedicineClassification,
  UrlServerAPIStoreNewMedicine,
  UrlServerAPISearchMedicine,
  UrlServerAPIDeleteMedicine,
  UrlServerAPIChangePassword,
  UrlServerAPIViewAccounts,
  UrlServerAPIGetMedicine,
  UrlServerAPIUpdateMedicine,
  UrlServerAPISearchMedicineSubgroup,
  UrlServerAPISearchClassification,
  UrlServerLinkToSocialAccount,
  UrlServerAPIUsernameAuthentication,
  UrlServerAPIUpdateProfile,
  UrlServerUpdateAccount,
  UrlServerGetAccountDetail,
  UrlServerSendingCodeForgotPassword,
  UrlServerAPIVerifyingCodeForgotPassword,
  UrlServerAPIChangingNewPasswordForgot,
  UrlServerAPIEliminateMedicine,
  UrlServerAPISearchEliminatedMedicine,
  UrlServerAPIGetEliminatedMedicineDetails,
  UrlServerAPIUpdateEliminatedMedicineDetails,
  UrlServerAPIDeleteEliminatedMedicineDetails,
  UrlServerAPISearchMedicineInInventory,
  UrlServerAPIGetMedicineInInventoryDetails,
  UrlServerAPIAddDepartment,
  UrlServerAPISearchDepartment,
  UrlServerAPISearchMedicineInInventoryDetails,
  UrlServerAPIAddTreatmentInformation,
  UrlServerAPISearchImportMedicine,
  UrlServerAPIDeleteImportMedicine,
  UrlServerAPIUpdateImportMedicine,
  UrlServerAPIAddImportMedicine,
  UrlServerAPIGetDetailImportBatch,
  UrlServerAPIAddImportBatch,
  UrlServerAPISearchImportBatch,
  UrlServerAPIDetailImportMedicine,
  UrlServerAPIStoreNewMedicineClassification,
  UrlServerAPIAddRequestBuyMedicine,
  UrlServerAPISearchTreatment,
  UrlServerAPISearchPatient,
  UrlServerAPISearchDeseaseStatus,
  UrlServerAPIGetTreatment,


  UrlServerAPIGetDetailBuyMedicine,
  UrlServerAPIDetailRequestBuyMedicine,
  UrlServerAPISearchRequestBuyMedicine,
  UrlServerAPIUpdateRequestBuyMedicine,
  UrlServerAPIExportImportInventoryPeriodic,
  UrlServerAPIDeleteMedicineUnit,
  UrlServerAPIUpdateMedicineUnit,
  UrlServerAPIDeleteMedicineSubgroup,
  UrlServerAPIUpdateMedicineSubgroup,
  UrlServerAPIDeleteMedicineClassification,
  UrlServerAPIUpdateMedicineClassification
} from '../models/url-api';
import { SearchMedicineUnitRequest } from '../requests/medicine-unit/search-request';
import { SearchMedicineSubgroupRequest } from '../requests/medicine-subgroup/search-request';
import { SearchMedicineClassificationRequest } from '../requests/medicine-classification/search-request';
import { SearchRequest, SearchRequestWithGroupByAndInclude } from '../requests/search-request';
import { GetExportImportDateRequest } from '../requests/periodic-inventory/periodic-inventory-request';
import { UpdateMedicineUnitRequest } from '../requests/medicine-unit/store-new-request';
import { UpdateMedicineSubgroupRequest } from '../requests/medicine-subgroup/store-new-request';
import { UpdateMedicineClassificationRequest } from '../requests/medicine-classification/store-new-request';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private http: HttpClient, private router: Router) { }

  public loginSocial(data: any): Observable<ResponseServer> {
    console.log(data);
    return this.http.post<ResponseServer>(UrlServerAPISocialAuthentication, data);
  }

  private headers: HttpHeaders = new HttpHeaders({
    'accept': '*/*',
    //   'content-type': 'application/json'
  });

  public insertAccount(data: any): Observable<any> {
    // if (this.headers.get("Authorization") == null) {
    //   this.router.navigate(['']);
    // }
    console.log(data);
    return this.http.post<ResponseServer>(UrlServerAPIInsertAccount, data, { headers: this.headers });
  }

  public sendingCodeForgotPassword(data: any): Observable<any> {
    return this.http.post<ResponseServer>(UrlServerSendingCodeForgotPassword, data, { headers: this.headers });

  }

  public changeForgotPassword(data: any): Observable<any> {
    if (this.headers.get("Authorization") == null) {
      this.router.navigate(['']);
    }
    return this.http.post<ResponseServer>(UrlServerAPIChangingNewPasswordForgot, data, { headers: this.headers });

  }

  public usernameAuthenticate(data: any): Observable<any> {
    console.log(data);
    return this.http.post<ResponseServer>(UrlServerAPIUsernameAuthentication, data, { headers: this.headers });
  }

  public changePassword(data: any): Observable<any> {
    if (this.headers.get("Authorization") == null) {
      this.router.navigate(['']);
    }
    console.log(data);
    return this.http.post<ResponseServer>(UrlServerAPIChangePassword, data, { headers: this.headers });
  }

  public getAccountDetail(id: any, param: any): Observable<any> {

    return this.http.get<ResponseServer>(UrlServerGetAccountDetail + "/" + id + "?selectFields=" + param);
  }

  public getProfile(): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPIGetProfile, { headers: this.headers });
  }

  public updateProfile(data: FormData): Observable<ResponseServer> {
    console.log(this.headers);
    return this.http.put<ResponseServer>(
      UrlServerAPIUpdateProfile, data, { headers: this.headers }
    );
  }

  public updateAccount(param: any, data: any): Observable<ResponseServer> {
    console.log(this.headers);
    return this.http.put<ResponseServer>(
      UrlServerUpdateAccount + "/" + param, data, { headers: this.headers }
    );
  }

  public viewProfiles(data: any): Observable<ResponseServer> {
    return this.http.put<ResponseServer>(
      UrlServerAPIGetProfile, data, { headers: this.headers }
    );
  }

  public searchAccount(param: SearchRequest): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(
      UrlServerAPIViewAccounts + '?' + param.getParamsString()
    );
  }

  public linkToSocialAccount(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(
      UrlServerLinkToSocialAccount, data, { headers: this.headers }
    );
  }

  public verifyingCodeForgotPassword(data: any): Observable<ResponseServer> {
    if (this.headers.get("Authorization") == null) {
      this.router.navigate(['']);
    }
    return this.http.post<ResponseServer>(
      UrlServerAPIVerifyingCodeForgotPassword, data, { headers: this.headers }
    );
  }


  /*----------------------------------------------------------------------------------------------------- */
  /*---------------------------------------------- Medicine ---------------------------------------------- */
  // public searchMedicine(request: SearchMedicineRequest): Observable<ResponseServer> {
  //   return this.http.get<ResponseServer>(
  //     UrlServerAPISearchMedicine +
  //     "/?Name=" +
  //     request.Name +
  //     "&UnitId=" +
  //     request.UnitId +
  //     "&MedicineSubgroupId=" +
  //     request.MedicineSubgroupId +
  //     "&MedicineClassificationId=" +
  //     request.MedicineClassificationId +
  //     "&Limit=" +
  //     request.Limit +
  //     "&Page=" +
  //     request.Page +
  //     "&SortField=" +
  //     request.SortField +
  //     "&SortOrder=" +
  //     request.SortOrder
  //   );
  // }
  public searchMedicine(data: SearchRequest): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPISearchMedicine + '?' + data.getParamsString());
  }

  public getMedicine(id: string): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPIGetMedicine + id);
  }

  public updateMedicine(data: any, id: string): Observable<ResponseServer> {
    return this.http.put<ResponseServer>(UrlServerAPIUpdateMedicine + "/" + id, data);
  }

  public storeNewMedicine(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPIStoreNewMedicine, data);
  }

  public deleteMedicine(id: string): Observable<ResponseServer> {
    return this.http.delete<ResponseServer>(UrlServerAPIDeleteMedicine + "/" + id);
  }

  //Classification
  public getAllMedicineClassification(): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPIGetAllMedicineClassification);
  }
  public storeNewMedicineClassification(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPIStoreNewMedicineClassification, data);
  }
  public searchClassification(data: SearchRequest): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPISearchClassification + '?' + data.getParamsString());
  }
  public deleteMedicineClassification(id: string): Observable<ResponseServer> {
    return this.http.delete<ResponseServer>(UrlServerAPIDeleteMedicineClassification + "/" + id);
  }
  public updateMedicineClassification(id: string, data: UpdateMedicineClassificationRequest): Observable<ResponseServer> {
    return this.http.put<ResponseServer>(UrlServerAPIUpdateMedicineClassification + "/" + id, data);
  }

  //Subgroup
  public getAllMedicineSubgroup(): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPIGetAllMedicineSubgroup);
  }
  public storeNewMedicineSubgroup(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPIStoreNewMedicineSubgroup, data);
  }
  public searchMedicineSubgroup(data: SearchRequest): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPISearchMedicineSubgroup + '?' + data.getParamsString());
  }
  public deleteMedicineSubgroup(id: string): Observable<ResponseServer> {
    return this.http.delete<ResponseServer>(UrlServerAPIDeleteMedicineSubgroup + "/" + id);
  }
  public updateMedicineSubgroup(id: string, data: UpdateMedicineSubgroupRequest): Observable<ResponseServer> {
    return this.http.put<ResponseServer>(UrlServerAPIUpdateMedicineSubgroup + "/" + id, data);
  }

  //Unit
  public getAllMedicineUnit(): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPIGetAllMedicineUnit);
  }
  public deleteMedicineUnit(id: string): Observable<ResponseServer> {
    return this.http.delete<ResponseServer>(UrlServerAPIDeleteMedicineUnit + "/" + id);
  }
  public updateMedicineUnit(id: string, data: UpdateMedicineUnitRequest): Observable<ResponseServer> {
    return this.http.put<ResponseServer>(UrlServerAPIUpdateMedicineUnit + "/" + id, data);
  }

  public storeNewMedicineUnit(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPIStoreNewMedicineUnit, data);
  }
  public searchMedicineUnit(data: SearchRequest): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPISearchMedicineUnit + '?' + data.getParamsString());
  }

  /*----------------------------------------------------------------------------------------------------- */
  /*---------------------------------------- ImportBatch ---------------------------------------- */
  public searchImportBatch(data: SearchRequest): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPISearchImportBatch + '?' + data.getParamsString());
  }

  public addImportBatch(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPIAddImportBatch, data);
  }

  public getDetailImportBatch(id: string, selectFields: string): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPIGetDetailImportBatch + id + '?SelectFields=' + selectFields);
  }

  //  Import Medicine

  public addImportMedicine(data: any, id: string): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPIAddImportMedicine + id, data);
  }
  public updateImportMedicine(data: any, id: string, selectFields: string): Observable<ResponseServer> {
    return this.http.put<ResponseServer>(UrlServerAPIUpdateImportMedicine + id + '?SelectFields=' + selectFields, data);
  }
  public deleteImportMedicine(id: string): Observable<ResponseServer> {
    return this.http.delete<ResponseServer>(UrlServerAPIDeleteImportMedicine + id);
  }
  public searchImportMedicine(data: SearchRequest): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPISearchImportMedicine + '?' + data.getParamsString());
  }
  public getDetailImportMedicine(id: string, selectFields: string): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPIDetailImportMedicine + id + '?SelectFields=' + selectFields);
  }

  //  Medicine Elimination Management
  public eliminateMedicine(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPIEliminateMedicine, data, { headers: this.headers });

  }

  public searchEliminateMedicine(data: SearchRequest): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPISearchEliminatedMedicine + '?' + data.getParamsString());

  }

  public getEliminatedMedicineDetails(id: any, param: any): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPIGetEliminatedMedicineDetails + "/" + id + "?SelectFields=" + param, { headers: this.headers });
  }

  public updateEliminatedMedicineDetails(id: any, data: any): Observable<ResponseServer> {
    return this.http.put<ResponseServer>(UrlServerAPIUpdateEliminatedMedicineDetails + "/" + id, data, { headers: this.headers });

  }

  public deleteEliminatedMedicineDetails(id: any): Observable<ResponseServer> {
    return this.http.delete<ResponseServer>(UrlServerAPIDeleteEliminatedMedicineDetails + "/" + id, { headers: this.headers });

  }

  // Medicine in inventory

  public searchMedicineInInventory(data: SearchRequest) {
    return this.http.get<ResponseServer>(UrlServerAPISearchMedicineInInventory + '?' + data.getParamsString());
  }

  public getMedicineInInventoryDetails(id: string, param: string) {
    return this.http.get<ResponseServer>(UrlServerAPIGetMedicineInInventoryDetails + "/" + id + "?selectFields=" + param);

  }
  // Medicine in inventory

  public searchMedicineInInventoryDetails(data: SearchRequest) {
    return this.http.get<ResponseServer>(UrlServerAPISearchMedicineInInventoryDetails + '?' + data.getParamsString());

  }


  //Request To Buy Medicine
  public addRquestBuyMedicine(data: any) {
    return this.http.post<ResponseServer>(UrlServerAPIAddRequestBuyMedicine, data);
  }
  public updateRequestBuyMedicine(data: any, id: string, selectFields: string) {
    return this.http.put<ResponseServer>(UrlServerAPIUpdateRequestBuyMedicine + id + '?SelectFields=' + selectFields, data);
  }
  public getDetailBuyMedicine(id: string, selectFields: string) {
    return this.http.get<ResponseServer>(UrlServerAPIGetDetailBuyMedicine + id + '?SelectFields=' + selectFields);
  }
  public searchRequestBuyMedicine(data: SearchRequest) {
    return this.http.get<ResponseServer>(UrlServerAPISearchRequestBuyMedicine + '?' + data.getParamsString());
  }

  //Request Buy Medicine Detail
  public searchRequestBuyMedicineDetail(data: SearchRequest) {
    return this.http.get<ResponseServer>(UrlServerAPIDetailRequestBuyMedicine + '?' + data.getParamsString());
  }


  // Department

  public addDepartment(data: any) {
    return this.http.post<ResponseServer>(UrlServerAPIAddDepartment, data);
  }

  public searchDepartment(data: SearchRequest) {
    return this.http.get<ResponseServer>(UrlServerAPISearchDepartment + '?' + data.getParamsString());
  }

  //treatment information

  public addTreatmentInformation(data: any) {
    return this.http.post<ResponseServer>(UrlServerAPIAddTreatmentInformation, data, { headers: this.headers });
  }

  public searchTreatment(data: SearchRequestWithGroupByAndInclude) {
    return this.http.get<ResponseServer>(UrlServerAPISearchTreatment + '?' + data.getParamsString());
  }

  public searchPatient(data: SearchRequest) {
    return this.http.get<ResponseServer>(UrlServerAPISearchPatient + '?' + data.getParamsString());
  }

  public getTreatmentDetails(id: any, params: any) {
    return this.http.get<ResponseServer>(UrlServerAPIGetTreatment + "/" + id + "?SelectFields=" + params);

  }

  public deleteTreatment(id: any) {
    return this.http.delete<ResponseServer>(UrlServerAPIGetTreatment + "/" + id);
  }

  public updateTreatment(id: any, param: any, data: FormData) {
    return this.http.put<ResponseServer>(UrlServerAPIGetTreatment + "/" + id + "?SelectFields=" + param, data);

  }


  public searchDeseaseStatus(data: SearchRequest) {
    return this.http.get<ResponseServer>(UrlServerAPISearchDeseaseStatus + '?' + data.getParamsString());

  }

  //ExportImportInventoryPeriodic

  public getExportImport(date: GetExportImportDateRequest) {
    return this.http.get<ResponseServer>(UrlServerAPIExportImportInventoryPeriodic + "?Month=" + date.month + "&Year=" + date.year);

  }
  /*===========================================================================================================*/

  public setTokenHeader() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + localStorage.getItem("token"));
    console.log(localStorage.getItem("token"));
  }

  httpOptions: Options = {
    headers: new HttpHeaders(
      {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
      }
    ),
    observe: 'response',
    //params: new HttpParams(),
    //reportProgress: true,
    responseType: 'json',
    //withCredentials: true
  }
}

export interface Options {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: 'events' | 'response' | 'body';
  params?: HttpParams | { [param: string]: string | string[] };
  reportProgress?: boolean;
  responseType: 'json';
  withCredentials?: boolean;
}

