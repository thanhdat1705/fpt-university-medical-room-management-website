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
  UrlServerAPIGgetTreatment,


  UrlServerAPIGetDetailBuyMedicine,
  UrlServerAPIDetailRequestBuyMedicine,
  UrlServerAPISearchRequestBuyMedicine,
  UrlServerAPIUpdateRequestBuyMedicine
} from '../models/url-api';
import { SearchMedicineUnitRequest } from '../requests/medicine-unit/search-request';
import { SearchMedicineSubgroupRequest } from '../requests/medicine-subgroup/search-request';
import { SearchMedicineClassificationRequest } from '../requests/medicine-classification/search-request';

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

  public getAccountDetail(id: any): Observable<any> {

    return this.http.get<ResponseServer>(UrlServerGetAccountDetail + "/" + id, { headers: this.headers });
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

  public searchAccount(searchParam: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(
      UrlServerAPIViewAccounts, searchParam
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
  public searchMedicine(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPISearchMedicine, data);
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

  public getAllMedicineClassification(): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPIGetAllMedicineClassification);
  }
  public storeNewMedicineClassification(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPIStoreNewMedicineClassification, data);
  }
  public searchClassification(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPISearchClassification, data);
  }

  public getAllMedicineSubgroup(): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPIGetAllMedicineSubgroup);
  }
  public storeNewMedicineSubgroup(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPIStoreNewMedicineSubgroup, data);
  }

  public searchMedicineSubgroup(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPISearchMedicineSubgroup, data);
  }

  public getAllMedicineUnit(): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPIGetAllMedicineUnit);
  }

  public storeNewMedicineUnit(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPIStoreNewMedicineUnit, data);
  }
  public searchMedicineUnit(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPISearchMedicineUnit, data);
  }

  /*----------------------------------------------------------------------------------------------------- */
  /*---------------------------------------- ImportBatch ---------------------------------------- */
  public searchImportBatch(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPISearchImportBatch, data);
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
  public searchImportMedicine(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPISearchImportMedicine, data);
  }
  public getDetailImportMedicine(id: string, selectFields: string): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPIDetailImportMedicine + id + '?SelectFields=' + selectFields);
  }

  //  Medicine Elimination Management
  public eliminateMedicine(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPIEliminateMedicine, data, { headers: this.headers });

  }

  public searchEliminateMedicine(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPISearchEliminatedMedicine, data, { headers: this.headers });

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

  public searchMedicineInInventory(data: any) {
    return this.http.post<ResponseServer>(UrlServerAPISearchMedicineInInventory, data);
  }

  public getMedicineInInventoryDetails(id: any) {
    return this.http.get<ResponseServer>(UrlServerAPIGetMedicineInInventoryDetails + "/" + id);

  }
  // Medicine in inventory

  public searchMedicineInInventoryDetails(data: any) {
    return this.http.post<ResponseServer>(UrlServerAPISearchMedicineInInventoryDetails, data);

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
  public searchRequestBuyMedicine(data: any) {
    return this.http.post<ResponseServer>(UrlServerAPISearchRequestBuyMedicine, data);
  }
  
  //Request Buy Medicine Detail
  public searchRequestBuyMedicineDetail(data: any) {
    return this.http.post<ResponseServer>(UrlServerAPIDetailRequestBuyMedicine, data);
  }


  // Department

  public addDepartment(data: any) {
    return this.http.post<ResponseServer>(UrlServerAPIAddDepartment, data);
  }

  public searchDepartment(data: any) {
    return this.http.get<ResponseServer>(UrlServerAPISearchDepartment+'?'+ data);
  }

  //treatment information

  public addTreatmentInformation(data: any) {
    return this.http.post<ResponseServer>(UrlServerAPIAddTreatmentInformation, data, { headers: this.headers });
  }

  public searchTreatment(data: any) {
    return this.http.get<ResponseServer>(UrlServerAPISearchTreatment+'?'+ data);
  }

  public searchPatient(data: any) {
    return this.http.post<ResponseServer>(UrlServerAPISearchPatient, data);
  }

  public getTreatmentDetails(id: any, params: any) {
    return this.http.get<ResponseServer>(UrlServerAPIGgetTreatment + "/" + id + "?SelectFields=" + params);

  }


  public searchDeseaseStatus(data: any) {
    return this.http.post<ResponseServer>(UrlServerAPISearchDeseaseStatus, data);

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

