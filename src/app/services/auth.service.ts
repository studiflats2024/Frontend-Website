import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private userName = new BehaviorSubject<string>(this.getUserNameFromStorage());
  constructor(private http: HttpClient) { }

  // التحقق من وجود توكن أو بيانات تسجيل الدخول
  private hasToken(): boolean {
    return !!localStorage.getItem('userToken');
  }

  // إرجاع اسم المستخدم من التخزين
  private getUserNameFromStorage(): string {
    return localStorage.getItem('userName') || '';
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get currentUserName() {
    return this.userName.asObservable();
  }

  login(userName: string, token: string) {
    localStorage.setItem('userName', userName);
    localStorage.setItem('userToken', token);
    localStorage.setItem('token', token);

    this.loggedIn.next(true);
    this.userName.next(userName);
  }

  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userToken');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');


    this.loggedIn.next(false);
    this.userName.next('');
    // window.location.href = '/';

  }
/////////////////////////////////////////////////////////function to refresh token//////////////////////////////
isLoggedIn2(): boolean {
  const token = localStorage.getItem('token');
  const userToken = localStorage.getItem('userToken');
  const userName = localStorage.getItem('userName');

  // التحقق من وجود جميع القيم
  return !!(token && userToken && userName);
}

  // طلب لتجديد التوكن
  refreshToken(accessToken: string, refreshToken: string): Observable<any> {
    const body = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return this.http.post(`${environment.apiUrl}/Users/refresh_token`, body);
  }

  // تسجيل الخروج
  // logout(): void {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('refreshToken');
  //   window.location.href = '/login';  
  // }

  //////////////////////////////////////notify when login/////////////////////////////
  private loginStatusSubject = new Subject<boolean>();

  loginStatus$ = this.loginStatusSubject.asObservable();

  notifyLoginStatus(status: boolean) {
    this.loginStatusSubject.next(status);
  }
}
