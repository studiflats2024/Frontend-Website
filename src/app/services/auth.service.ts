import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private userName = new BehaviorSubject<string>(this.getUserNameFromStorage());

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
    this.loggedIn.next(true);
    this.userName.next(userName);
  }

  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userToken');
    this.loggedIn.next(false);
    this.userName.next('');
  }
}
