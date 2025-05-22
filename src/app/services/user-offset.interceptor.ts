// user-offset.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserOffsetInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userOffset = new Date().getTimezoneOffset(); // in minutes

    const modifiedReq = req.clone({
      setHeaders: {
        'User-Offset': userOffset.toString()
      }
    });

    return next.handle(modifiedReq);
  }
}
