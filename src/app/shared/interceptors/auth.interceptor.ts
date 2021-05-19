import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private excludedUrlsRegex: RegExp[];
  private excludedUrls = [".svg"];
  constructor() {
    this.excludedUrlsRegex =
      this.excludedUrls.map(urlPattern => new RegExp(urlPattern, 'i')) || [];
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userLogin = localStorage.getItem('token');
    let accessToken = '';
    const passThrough: boolean =
      !!this.excludedUrlsRegex.find(regex => regex.test(request.url));
    if (userLogin) {
      console.log('aaaa');
      accessToken = userLogin;
    }
    if (passThrough) {
      return next.handle(request);
    }
    const req = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${accessToken}`,
      )
    });
    console.log(req);
    return next.handle(req);
  }
}
