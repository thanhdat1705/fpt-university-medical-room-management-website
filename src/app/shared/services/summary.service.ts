import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ResponseServer } from '../models/response-server';
import { Observable } from 'rxjs';
import { UrlServerAPIChangePassword, UrlServerAPIGetProfile, UrlServerAPIInsertAccount, UrlServerAPISocialAuthentication, UrlServerAPIUpdateProfile, UrlServerAPIUsernameAuthentication, UrlServerAPIViewAccounts } from '../models/url-api';

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
    return this.http.post<any>(UrlServerAPIInsertAccount, data, { headers: this.headers });
  }

  public usernameAuthenticate(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(UrlServerAPIUsernameAuthentication, data, { headers: this.headers });
  }

  public changePassword(data: any): Observable<any> {
    if (this.headers.get("Authorization") == null) {
      this.router.navigate(['']);
    }
    console.log(data);
    return this.http.post<ResponseServer>(UrlServerAPIChangePassword, data, { headers: this.headers });
  }

  public getProfile(): Observable<ResponseServer> {
    if (this.headers.get("Authorization") == null) {
      this.router.navigate(['']);
    }
    return this.http.get<ResponseServer>(UrlServerAPIGetProfile, { headers: this.headers });

  }

  public updateProfile(data: FormData): Observable<ResponseServer> {
    if (this.headers.get("Authorization") == null) {
      this.router.navigate(['']);
    }
    //this.headers['content-type'] = 'multipart/form-data';
    // this.headers = new HttpHeaders({
    //   'accept': '*/*',
    //   'content-type': 'multipart/form-data'
    // });
    //let httpHeaders = new HttpHeaders().set("Content-Type", "multipart/form-data")
    console.log(this.headers);
    return this.http.put<any>(
      UrlServerAPIUpdateProfile, data, { headers: this.headers }
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
