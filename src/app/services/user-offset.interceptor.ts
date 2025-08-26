// user-offset.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isExternalUrl } from './interceptor-helper';

@Injectable()
export class UserOffsetInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      // لا تلمس الطلبات الخارجية (restcountries وغيرها)
     if (req.url.startsWith('https://restcountries.com')) {
    return next.handle(req); // ما تضيفيش هيدرز/تعديلات
  }
  /////////////////////////////////////////////////

    const userOffset = new Date().getTimezoneOffset(); // in minutes

    const modifiedReq = req.clone({
      setHeaders: {
        'User-Offset': userOffset.toString()
      }
    });

    return next.handle(modifiedReq);
  }
}
