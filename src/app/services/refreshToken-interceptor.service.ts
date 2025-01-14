import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, throwError } from 'rxjs';
  import { catchError, switchMap } from 'rxjs/operators';
  import { AuthService } from './auth.service';
  import { BehaviorSubject } from 'rxjs';

  
  @Injectable()
  export class TokenInterceptor implements HttpInterceptor {
    private isRefreshing = false; // للتحكم بمنع عمليات التجديد المتكررة
    private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  
    constructor(private authService: AuthService) {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && this.authService.isLoggedIn2()) {
            // إذا كانت 401 وكان المستخدم مسجل دخوله
            console.log('401 -i am on refresh token interceptor')
            return this.handle401Error(req, next);
          }
          console.log('not 401- i am on refresh token iinterceptor')
          return throwError(() => error); // إعادة الخطأ إذا لم يكن 401
        })
      );
    }
  
    private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null); // تفريغ التوكن المؤقت أثناء عملية التجديد
  
        const refreshToken = localStorage.getItem('refreshToken');
        console.log(refreshToken)
        const Token = localStorage.getItem('token')|| '';
        const dummyT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVml2YS0yMDE1NTUzNTEzNDIiLCJqdGkiOiI3NDQ0NmExNy05ZTEwLTQyZmUtYmQ1Yy0xOTFmYTlkMTA2ZTYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijc0NDQ2YTE3LTllMTAtNDJmZS1iZDVjLTE5MWZhOWQxMDZlNiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE3NDIwNTg2MjksImlzcyI6Imh0dHBzOi8vdml2YXMtYXB0LnRlY2giLCJhdWQiOiJ2aXZhcy1hcHQudGVjaCJ9.pFPAeGlx98pau-qksEe0ONmHeGOKoDcRG53_v9H4S4Q"

        if (refreshToken&&Token!=='') {
          return this.authService.refreshToken(dummyT,refreshToken).pipe(
            switchMap((response: any) => {
              this.isRefreshing = false;
              this.refreshTokenSubject.next(response.accessToken); // تحديث التوكن
  
              // تخزين التوكن الجديد
              localStorage.setItem('token', response.accessToken);
              localStorage.setItem('refreshToken', response.refreshToken);
  
              // إعادة إرسال الطلب الأصلي
              return next.handle(this.addTokenHeader(req, response.accessToken));
            }),
            catchError((err) => {
              this.isRefreshing = false;
              this.authService.logout(); // تسجيل الخروج إذا فشل التجديد
              return throwError(() => err);
            })
          );
        }
      }
  
      return this.refreshTokenSubject.pipe(
        switchMap((token) => {
          if (token) {
            return next.handle(this.addTokenHeader(req, token));
          }
          return throwError(() => new Error('Token refresh failed'));
        })
      );
    }
  
    private addTokenHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }
  