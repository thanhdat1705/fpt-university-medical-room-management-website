// // import { SearchCostRequest } from './../sharings/requests/search-request';
// // import { SearchProductRequest } from './../sharings/requests/search-product-request';
// import { UrlServerAPIAccountLoginSocial, UrlServerAPISummaryRevenueInMonth, UrlServerAPISummaryCostInMonth, UrlServerAPISummaryProfitInMonth, UrlServerAPISummaryRevenuePerOrderInMonth, UrlServerAPISummaryNumberOrderInMonth, UrlServerAPISummaryNumberCostInMonth, UrlServerAPISummaryNumberProductInStockInMonth, UrlServerAPIGetRemainMoney, UrlServerAPISearchOrder, UrlServerAPIOrder, UrlServerAPIStatisticsRevenueCost, UrlServerAPIStatisticsRevenueByCategory, UrlServerAPIStatisticsCostType, UrlServerAPIStatisticsProfit, UrlServerAPIGetAllCategory, UrlServerAPIGetAllUnits, UrlServerAPIProduct, UrlServerAPISearchProduct, UrlServerAPIGetProductsOfCategory, UrlServerAPISearchInvest, UrlServerAPIInvest, UrlServerAPISearchCost, UrlServerAPICost, UrlServerAPICostType, UrlServerAPISearchCostType, UrlGetAllCity, UrlGetAllDistrictInCity, UrlGetAllWardInDistrict, UrlServerAPINotification, UrlServerAPISearchCategory, UrlServerAPICategory, UrlServerAPIConvertToPng, UrlServerAPIDetectedImage } from './../sharings/models/url-api';
// // import { ResponseServer } from './../sharings/models/response-server';
// import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ResponseServer } from "../models/response-server";
import { UrlServerAPIGetProfile, UrlServerAPIInsertAccount } from "../models/url-api";

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  private headers: HttpHeaders = new HttpHeaders({
    'Accept': '*/*',
    'Content-Type': 'application/json'
  });

  public setTokenHeader() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + localStorage.getItem("token"));
    console.log(localStorage.getItem("token"));
  }


  constructor(private http: HttpClient, private router: Router) { }

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

  public updateProfile(data : any): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(
      UrlServerAPIGetProfile, data, { headers: this.headers }
    );
  }



}


//   public loginSocial(data: any): Observable<ResponseServer> {
//     console.log(data);
//     return this.http.post<ResponseServer>(UrlServerAPIAccountLoginSocial, data);

//   public getSummaryRevenueInMonth(): Observable<ResponseServer> {
//     if (this.headers.get("Authorization") == null) {
//       this.router.navigate(['login']);
//     }
//     return this.http.get<ResponseServer>(UrlServerAPISummaryRevenueInMonth, { headers: this.headers });
//   }

//   public getSummaryCostInMonth(): Observable<ResponseServer> {
//     if (this.headers.get("Authorization") == null) {
//       this.router.navigate(['login']);
//     }
//     return this.http.get<ResponseServer>(UrlServerAPISummaryCostInMonth, { headers: this.headers });
//   }

//   public getSummaryProfitInMonth(): Observable<ResponseServer> {
//     if (this.headers.get("Authorization") == null) {
//       this.router.navigate(['login']);
//     }
//     return this.http.get<ResponseServer>(UrlServerAPISummaryProfitInMonth, { headers: this.headers });
//   }

//   public getSummaryRevenuePerOrderInMonth(): Observable<ResponseServer> {
//     if (this.headers.get("Authorization") == null) {
//       this.router.navigate(['login']);
//     }
//     return this.http.get<ResponseServer>(UrlServerAPISummaryRevenuePerOrderInMonth, { headers: this.headers });
//   }

//   public getSummaryNumberNewCustomerInMonth(): Observable<ResponseServer> {
//     if (this.headers.get("Authorization") == null) {
//       this.router.navigate(['login']);
//     }
//     return this.http.get<ResponseServer>(UrlServerAPISummaryNumberOrderInMonth, { headers: this.headers });
//   }

//   public getSummaryNumberOrderInMonth(): Observable<ResponseServer> {
//     if (this.headers.get("Authorization") == null) {
//       this.router.navigate(['login']);
//     }
//     return this.http.get<ResponseServer>(UrlServerAPISummaryNumberOrderInMonth, { headers: this.headers });
//   }

//   public getSummaryNumberCostInMonth(): Observable<ResponseServer> {
//     if (this.headers.get("Authorization") == null) {
//       this.router.navigate(['login']);
//     }
//     return this.http.get<ResponseServer>(UrlServerAPISummaryNumberCostInMonth, { headers: this.headers });
//   }

//   public getSummaryNumberProductInStockInMonth(): Observable<ResponseServer> {
//     if (this.headers.get("Authorization") == null) {
//       this.router.navigate(['login']);
//     }
//     return this.http.get<ResponseServer>(UrlServerAPISummaryNumberProductInStockInMonth, { headers: this.headers });
//   }

//   public getRemainMoney(): Observable<ResponseServer> {
//     return this.http.get<ResponseServer>(UrlServerAPIGetRemainMoney, { headers: this.headers });
//   }

//   public searchOrder(searchRequest: any): Observable<ResponseServer> {
//     //const headers = { 'Authorization': 'Bearer my-token' };
//     return this.http.post<ResponseServer>(UrlServerAPISearchOrder, searchRequest, { headers: this.headers });
//   }

//   public storeNewOrder(data: any): Observable<ResponseServer> {
//     //const headers = { 'Authorization': 'Bearer my-token' };
//     return this.http.post<ResponseServer>(UrlServerAPIOrder, data, { headers: this.headers });
//   }

//   public updateOrder(data: any, id: any): Observable<ResponseServer> {
//     //const headers = { 'Authorization': 'Bearer my-token' };
//     if (this.headers.get("Authorization") == null) {
//       this.router.navigate(['login']);
//     }
//     return this.http.put<ResponseServer>(UrlServerAPIOrder + '/' + id, data, { headers: this.headers });
//   }

//   public deleteOrder(id: any): Observable<ResponseServer> {
//     //const headers = { 'Authorization': 'Bearer my-token' };
//     if (this.headers.get("Authorization") == null) {
//       this.router.navigate(['login']);
//     }
//     return this.http.delete<ResponseServer>(UrlServerAPIOrder + '/' + id, { headers: this.headers });
//   }

//   public getOrderDetail(id: any): Observable<ResponseServer> {
//     //const headers = { 'Authorization': 'Bearer my-token' };
//     if (this.headers.get("Authorization") == null) {
//       this.router.navigate(['login']);
//     }
//     return this.http.get<ResponseServer>(UrlServerAPIOrder + '/' + id, { headers: this.headers });
//   }

//   public getStatisticRevenueCost(statisticBy: number): Observable<ResponseServer> {
//     //const headers = { 'Authorization': 'Bearer my-token' };
//     if (this.headers.get("Authorization") == null) {
//       this.router.navigate(['login']);
//     }
//     return this.http.get<ResponseServer>(UrlServerAPIStatisticsRevenueCost + '/' + statisticBy, { headers: this.headers });
//   }

//   public getStatisticRevenueByCategory(statisticBy: number): Observable<ResponseServer> {
//     //const headers = { 'Authorization': 'Bearer my-token' };
//     if (this.headers.get("Authorization") == null) {
//       this.router.navigate(['login']);
//     }
//     return this.http.get<ResponseServer>(UrlServerAPIStatisticsRevenueByCategory + '/' + statisticBy, { headers: this.headers });
//   }

//   public getStatisticCostType(statisticBy: number): Observable<ResponseServer> {
//     //const headers = { 'Authorization': 'Bearer my-token' };
//     if (this.headers.get("Authorization") == null) {
//       this.router.navigate(['login']);
//     }
//     return this.http.get<ResponseServer>(UrlServerAPIStatisticsCostType + '/' + statisticBy, { headers: this.headers });
//   }

//   public getStatisticProfit(statisticBy: number): Observable<ResponseServer> {
//     //const headers = { 'Authorization': 'Bearer my-token' };
//     if (this.headers.get("Authorization") == null) {
//       this.router.navigate(['login']);
//     }
//     return this.http.get<ResponseServer>(UrlServerAPIStatisticsProfit + '/' + statisticBy, { headers: this.headers });
//   }

//   public getAllCategories(): Observable<ResponseServer> {
//     //const headers = { 'Authorization': 'Bearer my-token' };
//     return this.http.get<ResponseServer>(UrlServerAPIGetAllCategory, { headers: this.headers });
//   }

//   public getAllUnits(): Observable<ResponseServer> {
//     //const headers = { 'Authorization': 'Bearer my-token' };
//     return this.http.get<ResponseServer>(UrlServerAPIGetAllUnits, { headers: this.headers });
//   }

//   public storeNewProduct(data: any): Observable<ResponseServer> {
//     //const headers = { 'Authorization': 'Bearer my-token' };
//     return this.http.post<ResponseServer>(UrlServerAPIProduct, data, { headers: this.headers });
//   }

//   public getDetailsProduct(id: string): Observable<ResponseServer> {
//     //const headers = { 'Authorization': 'Bearer my-token' };
//     return this.http.get<ResponseServer>(UrlServerAPIProduct + '/' + id, { headers: this.headers });
//   }

//   public updateProduct(data: any, id: string): Observable<ResponseServer> {
//     return this.http.put<ResponseServer>(UrlServerAPIProduct + '/' + id, data, { headers: this.headers });
//   }

//   public deleteProduct(id: string): Observable<ResponseServer> {

//     return this.http.delete<ResponseServer>(UrlServerAPIProduct + '/' + id, { headers: this.headers });
//   }

//   public searchProduct(searchRequest: SearchProductRequest): Observable<ResponseServer> {
//     // const headers = { 'Authorization': 'Bearer my-token' };
//     // if (this.headers.get("Authorization") == null) {
//     //   console.log("deo");
//     //   this.router.navigate(['login']);
//     // }
//     return this.http.post<ResponseServer>(UrlServerAPISearchProduct, searchRequest, { headers: this.headers });
//   }

//   public getListProductOfCategory(id: string): Observable<ResponseServer> {
//     const headers = { 'Authorization': 'Bearer my-token' };
//     if (this.headers.get("Authorization") == null) {
//       this.router.navigate(['login']);
//     }
//     return this.http.get<ResponseServer>(UrlServerAPIGetProductsOfCategory + '/' + id, { headers: this.headers });
//   }

//   public searchInvest(searchRequest: any): Observable<ResponseServer> {
//     const headers = { 'Authorization': 'Bearer my-token' };
//     if (this.headers.get("Authorization") == null) {


//       this.router.navigate(['login']);
//     }
//     return this.http.post<ResponseServer>(UrlServerAPISearchInvest, searchRequest, { headers: this.headers });
//   }

//   public storeNewInvest(data: any): Observable<ResponseServer> {
//     const headers = { 'Authorization': 'Bearer my-token' };
//     return this.http.post<ResponseServer>(UrlServerAPIInvest, data, { headers: this.headers });
//   }

//   public updateInvest(data: any, id: any): Observable<ResponseServer> {
//     const headers = { 'Authorization': 'Bearer my-token' };
//     return this.http.put<ResponseServer>(UrlServerAPIInvest + '/' + id, data, { headers: this.headers });
//   }

//   public deleteInvest(id: any): Observable<ResponseServer> {
//     const headers = { 'Authorization': 'Bearer my-token' };
//     return this.http.delete<ResponseServer>(UrlServerAPIInvest + '/' + id, { headers: this.headers });
//   }

//   public searchCost(searchRequest: SearchCostRequest): Observable<ResponseServer> {
//     // const headers = { 'Authorization': 'Bearer my-token' };
//     return this.http.post<ResponseServer>(UrlServerAPISearchCost, searchRequest, { headers: this.headers });
//   }

//   public storeNewCost(data: any): Observable<ResponseServer> {
//     // const headers = { 'Authorization': 'Bearer my-token' };
//     return this.http.post<ResponseServer>(UrlServerAPICost, data, { headers: this.headers });
//   }

//   public storeNewCostType(data: any): Observable<ResponseServer> {
//     return this.http.post<ResponseServer>(UrlServerAPICostType, data, { headers: this.headers });
//   }

//   public updateCost(data: any, id: string): Observable<ResponseServer> {
//     // const headers = { 'Authorization': 'Bearer my-token' };
//     return this.http.put<ResponseServer>(UrlServerAPICost + '/' + id, data, { headers: this.headers });
//   }

//   public deleteCost(id: string): Observable<ResponseServer> {
//     // const headers = { 'Authorization': 'Bearer my-token' };
//     return this.http.delete<ResponseServer>(UrlServerAPICost + '/' + id, { headers: this.headers });
//   }

//   public deleteCost2(id: string): Observable<ResponseServer> {
//     return this.http.delete<ResponseServer>(UrlServerAPICost + '/' + id, { headers: this.headers });
//   }

//   public getDetailsCost(id: string): Observable<ResponseServer> {
//     // const headers = { 'Authorization': 'Bearer my-token' };
//     return this.http.get<ResponseServer>(UrlServerAPICost + '/' + id, { headers: this.headers });
//   }

//   public getAllCostType(): Observable<ResponseServer> {
//     const headers = { 'Authorization': 'Bearer my-token' };
//     return this.http.get<ResponseServer>(UrlServerAPICostType, { headers: this.headers });
//   }

//   public searchCostType(data: any): Observable<ResponseServer> {
//     // const headers = { 'Authorization': 'Bearer my-token' };
//     return this.http.post<ResponseServer>(UrlServerAPISearchCostType, data, { headers: this.headers });
//   }

//   public searchCostTypeDetails(id: number): Observable<ResponseServer> {
//     const headers = { 'Authorization': 'Bearer my-token' };
//     return this.http.get<ResponseServer>(UrlServerAPICostType + '/' + id, { headers: this.headers });
//   }

//   public getAllCity(): Observable<any> {
//     let headers = new HttpHeaders();

//     // {
//     //   'Access-Control-Allow-Headers': 'Content-Type',
//     //   'Access-Control-Allow-Methods':'*',
//     //   'Access-Control-Allow-Origin': 'https://thongtindoanhnghiep.co',
//     //   'Access-Control-Allow-Credentials': 'true',
//     //   'Accept': '*/*',
//     //   'Authorization': 'Bearer aaa'
//     // }
//     return this.http.get<any>(UrlGetAllCity);
//   }

//   public getAllDistrictInCity(idCity: number) {
//     return this.http.get<any>(UrlGetAllDistrictInCity + '/' + idCity + '/district');
//   }

//   public getAllWardOfDistrict(idDistrict: number) {
//     return this.http.get<any>(UrlGetAllWardInDistrict + '/' + idDistrict + '/ward');
//   }

//   public getNewNotification(oldNotifyId: string): Observable<ResponseServer> {
//     return this.http.get<ResponseServer>(UrlServerAPINotification + '/' + oldNotifyId, { headers: this.headers });
//   }

//   public searchCategories(searchRequest: any): Observable<ResponseServer> {
//     return this.http.post<ResponseServer>(UrlServerAPISearchCategory, searchRequest, { headers: this.headers });
//   }

//   public getDetailsCategory(id: any): Observable<ResponseServer> {
//     return this.http.get<ResponseServer>(UrlServerAPICategory + '/' + id, { headers: this.headers });
//   }

//   public storeNewCategory(data: any): Observable<ResponseServer> {
//     return this.http.post<ResponseServer>(UrlServerAPICategory, data, { headers: this.headers });
//   }

//   public updateCategory(data: any, id: any): Observable<ResponseServer> {
//     return this.http.put<ResponseServer>(UrlServerAPICategory + '/' + id, data, { headers: this.headers });
//   }

//   public deleteCategory(id: any): Observable<ResponseServer> {
//     return this.http.delete<ResponseServer>(UrlServerAPICategory + '/' + id, { headers: this.headers });
//   }

//   public convertToPng(data: any): Observable<ResponseServer> {
//     const formData: FormData = new FormData();
//     formData.append('file', data, data.name);
//     return this.http.post<ResponseServer>(UrlServerAPIDetectedImage, formData);
//   }

//   public setTokenHeader() {
//     this.headers = this.headers.set('Authorization', 'Bearer ' + localStorage.getItem("token"));
//     console.log(localStorage.getItem("token"));
//   }

//   private headers: HttpHeaders = new HttpHeaders({
//     'Accept': '*/*',
//     'Content-Type': 'application/json'
//   });

//   httpOptions: Options = {
//     headers: new HttpHeaders(
//       {
//         'Accept': '*/*',
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer '
//       }
//     ),
//     observe: 'response',
//     //params: new HttpParams(),
//     //reportProgress: true,
//     responseType: 'json',
//     //withCredentials: true
//   }
// }

// export interface Options {
//   headers?: HttpHeaders | { [header: string]: string | string[] };
//   observe?: 'events' | 'response' | 'body';
//   params?: HttpParams | { [param: string]: string | string[] };
//   reportProgress?: boolean;
//   responseType: 'json';
//   withCredentials?: boolean;
// }


//   public storeNewOrder(data: any): Observable<ResponseServer> {
//     //const headers = { 'Authorization': 'Bearer my-token' };
//     return this.http.post<ResponseServer>(UrlServerAPIOrder, data, { headers: this.headers });
//   }