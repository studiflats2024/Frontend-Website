
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';


export interface UserAccount {
  mobile: string;
  fullName: string;
  password: string;
  confirm_Password: string;
}



@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private apiUrl = `${environment.apiUrl}/Users`;

  constructor(private http: HttpClient) { }

  createUser(userAccount: UserAccount): Observable<any> {
    const url = `${environment.apiUrl}/Users/Create_Account`;
    return this.http.post<any>(url, userAccount);
  }

  checkOtp(otp: string, uuid: string): Observable<any> {
    const url = `${environment.apiUrl}/Users/Check_Otp`;
    const params = new HttpParams()
      .set('Otp', otp)
      .set('UUID', uuid);

    return this.http.put<any>(url, {}, { params: params });
  }

  sendUserData(
    email: string,
    gender: string,
    nationality: string,
    dob: string,
    uuid: string,
    mobile: string,
    provider: string,
  ): Observable<any> {
    const url = `${environment.apiUrl}/Users/Finish_Profile`;

    const params = new HttpParams()
      .set('Email', email)
      .set('Gender', gender)
      .set('Nationality', nationality)
      .set('DOB', dob)
      .set('UUID', uuid)
      .set('Mobile', mobile)
      .set('Provider', provider);

    return this.http.put<any>(url, {}, { params: params });
  }


  loginUser(mobile: string, password: string): Observable<any> {
    const url = `${environment.apiUrl}/Users/Login`;

    const loginData = {
      mobile: mobile,
      password: password,

    };

    return this.http.post<any>(url, loginData);
  }

  getProfile(): Observable<any> {
    const url = `${environment.apiUrl}/Users/GetProfile`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(url, { headers });
  }

  sendForgotPasswordOtp(mobile: any): Observable<any> {
    const url = `${environment.apiUrl}/Users/Forget_Password`;
    const params = new HttpParams().set('Mobile', mobile);

    return this.http.get<any>(url, { params });
  }

  resetPassword(password: string, confirmPassword: string, uuid: string, token: string): Observable<any> {
    const url = `${environment.apiUrl}/Users/ResetPassword`;

    const params = new HttpParams()
      .set('Password', password)
      .set('Confirm_Password', confirmPassword)
      .set('UUID', uuid)
      .set('Token', token);

    return this.http.put<any>(url, {}, { params });
  }


}

