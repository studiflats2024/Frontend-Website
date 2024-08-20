
import { Injectable, NgZone } from '@angular/core';
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

  constructor(private http: HttpClient, private ngZone: NgZone) { }

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


  /////////////////////////social sign/////////////////
  private clientId: string = '727951335686-psv9svhulcsrpv2sc1aqjs7oc87ggg61.apps.googleusercontent.com';  // Replace with your actual Google Client ID



  initGoogleAuth(): void {
    window.google.accounts.id.initialize({
      client_id: this.clientId,
      callback: (response) => this.handleCredentialResponse(response)
    });
  }

  signInWithGoogle(): void {
    window.google.accounts.id.prompt(); // This will show the Google Sign-In prompt
  }

  private handleCredentialResponse(response: any): void {
    this.ngZone.run(() => {
      const credential = response.credential;
      const user = this.decodeJwtResponse(credential);

      const sc_id = user.sub;
      const fullName = user.name;
      const email = user.email;
      const provider = 'Google';
      const img = user.picture;
      const deviceToken = ''; // Add logic to retrieve device token if necessary

      this.socialSignIn(sc_id, fullName, email, provider, img, deviceToken);
    });
  }

  private decodeJwtResponse(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  private socialSignIn(sc_id: string, fullName: string, email: string, provider: string, img: string, deviceToken: string): void {
    const url = 'https://devapi.studiflats.com/api/Users/SocialSign';
    const params = new HttpParams()
      .set('SC_ID', sc_id)
      .set('FullName', fullName)
      .set('Email', email)
      .set('Provider', provider)
      .set('img', img)
      .set('deviceToken', deviceToken);

    this.http.post<any>(url, {}, { params }).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        console.log('Sign in successful:', response);
        // Handle successful sign-in
      },
      error => {
        console.error('Sign in failed:', error);
        // Handle sign-in error
      }
    );
  }


  logout( ): Observable<any> {

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found, redirecting to login');

    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${environment.apiUrl}/Users/Logout`,{ headers } );
  }

}

