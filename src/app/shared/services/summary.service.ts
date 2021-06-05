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
  UrlServerAPIDeleteMedicine
} from '../models/url-api';
import { SearchMedicineUnitRequest } from '../requests/medicine-unit/search-request';
import { SearchMedicineRequest } from '../requests/medicine/search';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private http: HttpClient, private router: Router) { }


  public searchMedicine(request: SearchMedicineRequest): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(
      UrlServerAPISearchMedicine +
      "/?Name=" +
      request.Name +
      "&UnitId=" +
      request.UnitId+
      "&MedicineSubgroupId=" +
      request.MedicineSubgroupId +
      "&MedicineClassificationId=" +
      request.MedicineClassificationId +
      "&Limit=" +
      request.Limit +
      "&Page=" +
      request.Page +
      "&SortField=" +
      request.SortField +
      "&SortOrder=" +
      request.SortOrder
    );
  }

  public storeNewMedicine(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(UrlServerAPIStoreNewMedicine, data);
  }UrlServerAPIDeleteMedicine

  public deleteMedicine(id: string): Observable<ResponseServer> {
    return this.http.delete<ResponseServer>(UrlServerAPIDeleteMedicine + "/?id=" + id);
  }

  public getAllMedicineClassification(): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(UrlServerAPIGetAllMedicineClassification);
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

  public searchMedicineUnit(request: SearchMedicineUnitRequest): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(
      UrlServerAPISearchMedicineUnit +
      "/?MedicineUnitName=" +
      request.MedicineUnitName.toString() +
      "&Limit=" +
      request.Limit +
      "&Page=" +
      request.Page +
      "&SortField=" +
      request.SortField.toString() +
      "&SortOrder=" +
      request.SortOrder
    );
  }

  public loginSocial(data: any): Observable<ResponseServer> {
    console.log(data);
    return this.http.post<ResponseServer>(UrlServerAPISocialAuthentication, data);
  }

  public insertAccount(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(UrlServerAPIInsertAccount, data, { headers: this.headers });
  }

  public getProfile(): Observable<ResponseServer> {
    if (this.headers.get("Authorization") == null) {
      this.router.navigate(['']);
    }
    return this.http.get<ResponseServer>(UrlServerAPIGetProfile, { headers: this.headers });
  }

  public updateProfile(data: any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(
      UrlServerAPIGetProfile, data, { headers: this.headers }
    );
  }

  /*============================================================================================*/

  private headers: HttpHeaders = new HttpHeaders({
    'Accept': '*/*',
    'Content-Type': 'application/json'
  });

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
