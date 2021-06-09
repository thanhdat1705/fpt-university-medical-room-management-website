import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  UrlServerAPISearchClassification
} from '../models/url-api';
import { SearchMedicineUnitRequest } from '../requests/medicine-unit/search-request';
import { SearchMedicineSubgroupRequest } from '../requests/medicine-subgroup/search-request';
import { SearchMedicineClassificationRequest } from '../requests/medicine-classification/search-request';
import { SearchImportBatchMedicine } from '../requests/ImportBatchMedicine/search-import-batch-medicine';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private http: HttpClient, private router: Router) { }

  private headers: HttpHeaders = new HttpHeaders({
    'Accept': '*/*',
    'Content-Type': 'application/json'
  });

  private headersFormData: HttpHeaders = new HttpHeaders({
    'Accept': '*/*',
    'Content-Type': 'multipart/form-data'
  });

  /*----------------------------------------------------------------------------------------------------- */
  /*---------------------------------------------- Account ---------------------------------------------- */
  public loginSocial(data: any): Observable<ResponseServer> {
    console.log(data);
    return this.http.post<ResponseServer>(UrlServerAPISocialAuthentication, data);
  }

  public insertAccount(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(UrlServerAPIInsertAccount, data, { headers: this.headers });
  }

  public changePassword(data: any): Observable<any> {
    if (this.headers.get("Authorization") == null) {
      this.router.navigate(['']);
    }
    console.log(data);
    return this.http.post<any>(UrlServerAPIChangePassword, data, { headers: this.headers });
  }

  public getProfile(): Observable<ResponseServer> {
    // if (this.headers.get("Authorization") == null) {
    //   this.router.navigate(['']);
    // }
    // console.log('ahihi -- ', this.headers);
    return this.http.get<ResponseServer>(UrlServerAPIGetProfile);

  }

  public updateProfile(data: any): Observable<ResponseServer> {
    if (this.headers.get("Authorization") == null) {
      this.router.navigate(['']);
    }
    return this.http.put<any>(
      UrlServerAPIGetProfile, data, { headers: this.headersFormData }
    );
  }

  public viewProfiles(data: any): Observable<ResponseServer> {
    return this.http.put<any>(
      UrlServerAPIGetProfile, data, { headers: this.headers }
    );
  }

  public searchAccount(searchParam: any): Observable<ResponseServer> {
    return this.http.get<any>(
      UrlServerAPIViewAccounts, { headers: this.headers, params: searchParam }
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
    return this.http.put<ResponseServer>(UrlServerAPIUpdateMedicine + "/?id=" + id, data);
  }

  public storeNewMedicine(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPIStoreNewMedicine, data);
  }

  public deleteMedicine(id: string): Observable<ResponseServer> {
    return this.http.delete<ResponseServer>(UrlServerAPIDeleteMedicine + "/?id=" + id);
  }

  public getAllMedicineClassification(): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPIGetAllMedicineClassification);
  }

  public searchClassification(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPISearchClassification, data);
  }

  public getAllMedicineSubgroup(): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPIGetAllMedicineSubgroup);
  }

  public getAllMedicineUnit(): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPIGetAllMedicineUnit);
  }

  public storeNewMedicineUnit(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPIStoreNewMedicineUnit, data);
  }

  public storeNewMedicineSubgroup(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPIStoreNewMedicineSubgroup, data);
  }

  public searchMedicineSubgroup(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPISearchMedicineSubgroup, data);
  }
  public searchMedicineUnit(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPISearchMedicineUnit, data);
  }

  /*----------------------------------------------------------------------------------------------------- */
  /*---------------------------------------- ImportBatchMedicine ---------------------------------------- */
  public searchImportBatchMedicine(request: SearchImportBatchMedicine): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(
      UrlServerAPISearchMedicineUnit +
      "?Page=" +
      request.Page
    );
  }


  /*===========================================================================================================*/
  public setTokenHeaderFormData() {
    this.headersFormData = this.headersFormData.set('Authorization', 'Bearer ' + localStorage.getItem("token"));
    console.log(localStorage.getItem("token"));
  }

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
