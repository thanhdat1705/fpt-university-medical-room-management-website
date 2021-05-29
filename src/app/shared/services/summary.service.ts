import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ResponseServer } from '../models/response-server';
import { Observable } from 'rxjs';
import { UrlServerAPISocialAuthentication } from '../models/url-api';

@Injectable({
    providedIn: 'root'
})
export class SummaryService {

    constructor(private http: HttpClient, private router: Router) { }

    public loginSocial(data: any): Observable<ResponseServer> {
        console.log(data);
        return this.http.post<ResponseServer>(UrlServerAPISocialAuthentication, data);
    }




    public setTokenHeader() {
        this.headers = this.headers.set('Authorization', 'Bearer ' + localStorage.getItem("token"));
        console.log(localStorage.getItem("token"));
    }

    private headers: HttpHeaders = new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json'
    });

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
