
import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable,BehaviorSubject,Subject } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { MessagingService } from '../services/messaging.service';

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

  private sharedData = new BehaviorSubject<string>('');

  // Observable to allow subscription
  uuid = this.sharedData.asObservable();

  private modalVisibility = new Subject<boolean>(); // A subject to emit changes to modal visibility

  // Observable for other components to listen for modal open/close events
  modalVisibility$ = this.modalVisibility.asObservable();

  // Method to open the modal
  openModal() {
    this.modalVisibility.next(true); // Emit true when the modal should open
  }

  // Method to close the modal
  closeModal() {
    this.modalVisibility.next(false); // Emit false when the modal should close
  }

  // private apiUrl = `${environment.apiUrl}/Users`;

  constructor(private http: HttpClient, private ngZone: NgZone,private messagingService: MessagingService) { }

  createUser(userAccount: UserAccount): Observable<any> {
    const url = `${environment.apiUrl}/Users/Create_Account`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Specify the content type

    });
    return this.http.post<any>(url, userAccount, { headers });
  }

  checkOtp(otp: string, uuid: string): Observable<any> {
    const url = `${environment.apiUrl}/Users/Check_Otp`;
    const params = new HttpParams()
      .set('Otp', otp)
      .set('UUID', uuid);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json', // Specify the content type

      });

    // return this.http.put<any>(url, {}, { params: params });
    return this.http.put<any>(url, {}, { params, headers });

  }

  refreshOtp(uuid: string): Observable<any> {
    // Create HTTP params to include the UUID in the request
    const url = `${environment.apiUrl}/Users/Refresh_Otp`;
    let params = new HttpParams().set('UUID', uuid);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Specify the content type

    });
    // Send a GET request with the UUID as a query parameter
    return this.http.get(url, { params,headers });
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

      const headers = new HttpHeaders({
        'Content-Type': 'application/json', // Specify the content type

      });

    return this.http.put<any>(url, {},  { params, headers });
  }


  loginUser(mobile: string, password: string): Observable<any> {
    const url = `${environment.apiUrl}/Users/Login`;

    const loginData = {
      mobile: mobile,
      password: password,

    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Specify the content type

    });

    return this.http.post<any>(url, loginData,{ headers });
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Specify the content type

    });

    // return this.http.get<any>(url, { params });
    return this.http.get<any>(url, { params, headers });
  }

  resetPassword(password: string, confirmPassword: string, uuid: string, token: string): Observable<any> {
    const url = `${environment.apiUrl}/Users/ResetPassword`;

    const params = new HttpParams()
      .set('Password', password)
      .set('Confirm_Password', confirmPassword)
      .set('UUID', uuid)
      .set('Token', token);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json', // Specify the content type

      });

    return this.http.put<any>(url, {}, { params, headers });
  }


  /////////////////////////social sign/////////////////
  // private clientId: string = '727951335686-psv9svhulcsrpv2sc1aqjs7oc87ggg61.apps.googleusercontent.com';
  private clientId: string = '727951335686-psv9svhulcsrpv2sc1aqjs7oc87ggg61.apps.googleusercontent.com';  // Replace with your actual Google Client ID


  deviceToken:any;
  // initGoogleAuth(): void {
  //   this.messagingService.requestPermission()
  //   .then((token:any) => {
  //     console.log('Device token:', token);
  //     this.deviceToken=token;

  //   })
  //   .catch((error:any) => {
  //     console.error('Error getting token:', error);
  //   });


  //   window?.google?.accounts?.id.initialize({

  //     client_id: this.clientId,

  //     callback: (response) => this.handleCredentialResponse(response),

  //   });
  //   console.log('initGoogle',this.clientId);
  // }

  initGoogleAuth(): void {
    // Check notification permissions before requesting them
    if (Notification.permission === 'granted') {
      this.messagingService.requestPermission()
        .then((token: any) => {
          console.log('Device token:', token);
          this.deviceToken = token;
        })
        .catch((error: any) => {
          console.error('Error getting token:', error);
        });
    } else if (Notification.permission === 'denied') {
      console.error('Notification permission was denied. Unable to get device token.');
    } else {
      // Request permission from the user
      this.messagingService.requestPermission()
        .then((token: any) => {
          console.log('Device token:', token);
          this.deviceToken = token;
        })
        .catch((error: any) => {
          console.error('Error getting token:', error);
        });
    }

    // Initialize Google Auth
    window?.google?.accounts?.id.initialize({
      client_id: this.clientId,
      callback: (response) => this.handleCredentialResponse(response),
    });

    console.log('initGoogle', this.clientId);
  }


  signInWithGoogle(): void {
    this. initGoogleAuth();
    // this.initGoogleAuth();
    window.google.accounts.id.prompt(); // This will show the Google Sign-In prompt
    console.log('sign in');
    console.log('initGoogle',this.clientId);
  }

  private handleCredentialResponse(response: any): void {
    this.ngZone.run(() => {
      const credential = response.credential;
      localStorage.setItem('google_token', credential);
      const user = this.decodeJwtResponse(credential);

      const sc_id = user.sub;
      const fullName = user.name;
      const email = user.email;
      const provider = 'Google';
      const img = user.picture;
      const deviceToken = this.deviceToken; // Add logic to retrieve device token if necessary

      this.socialSignIn(sc_id, fullName, email, provider, img, deviceToken);
    });

  }

  signOutFromGoogle(): void {
    const token = localStorage.getItem('google_token'); // Assume you have stored the token

    if (token) {
      // Revoke the token by making a request to the Google OAuth2 API
      const revokeUrl = `https://accounts.google.com/o/oauth2/revoke?token=${token}`;

      this.http.post(revokeUrl, {}).subscribe({
        next: () => {
          console.log('User signed out from Google successfully');
          localStorage.removeItem('google_token'); // Remove token from local storage
        },
        error: (err) => {
          console.error('Error revoking token: ', err);
        }
      });
    } else {
      console.error('No Google token found to revoke.');
    }
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
    const url = 'https://api.studiflats.com/api/Users/SocialSign_WS';
    const params = new HttpParams()
      .set('SC_ID', sc_id)
      .set('FullName', fullName)
      .set('Email', email)
      .set('Provider', provider)
      .set('img', img)
      .set('deviceToken', deviceToken);

    this.http.post<any>(url, {}, { params }).subscribe(
      response => {
        if(response.token){
          localStorage.setItem('token', response.token);
        }
        this.sharedData.next(response.uuid);

        console.log('Sign in successful:', response);
        // Handle successful sign-in
        this.signOutFromGoogle()

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


  uploadProfileImage(file: File): Observable<any> {
    const url = `${environment.apiUrl}/Users/UpdateProfileImg`;
    const formData = new FormData();
    formData.append('Image_File', file);  // 'Image_File' should match the API parameter name

    // Optionally add headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`  // Add token if necessary
    });

    return this.http.put(url, formData, { headers });
  }


  updateEmail(currentEmail: string, password: string, newMail: string): Observable<any> {
    const url = `${environment.apiUrl}/Users/UpdateMail`;
    let params = new HttpParams()
      .set('CurrentEmail', currentEmail)
      .set('Password', password)
      .set('NewMail', newMail);
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

    // Send the PUT request with the parameters
    return this.http.put<any>(url, {}, { params,headers });
  }

  updatePhone(currentPhone: string, password: string, newPhone: string): Observable<any> {
    const url = `${environment.apiUrl}/Users/UpdateMobile`;
    let params = new HttpParams()
      .set('CurrentPhone', currentPhone)
      .set('Password', password)
      .set('NewPhone', newPhone);
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

    // Send the PUT request with the parameters
    return this.http.put<any>(url, {}, {params ,headers});
  }

  updateFullProfile(fullName: string, gender: string, country: string, birthDate: string): Observable<any> {
    const url = `${environment.apiUrl}/Users/Update_FullProfile`;

    const body = {
      fullName: fullName,
      gender: gender,
      country: country,
      birthDate: birthDate
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Add Authorization token if required
    });

    return this.http.put<any>(url, body, { headers });
  }




  getInvoiceList(pageNumber: number, pageSize: number, status: string): Observable<any> {
    const url = `${environment.apiUrl}/Accounting/GetInoviceList`;
    const params = new HttpParams()
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString())
      .set('status', status);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get<any>(url, { params, headers });
  }

  getInvoiceDetails(inv_ID: string): Observable<any> {
    const url = `${environment.apiUrl}/Accounting/GetINVDetails`;
    const params = new HttpParams().set('Inv_ID', inv_ID);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in local storage
    });

    return this.http.get<any>(url, { headers, params });
  }

  getStripeCheckout(isCash: boolean, invoiceCodes: string[]): Observable<any> {
    const url = `${environment.apiUrl}/ApartmentV2/GetStripeCheckout`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in local storage
    });

    // Add query parameters if needed
    const params = { Is_Cash: isCash.toString() };
    const body = invoiceCodes;

    return this.http.post(url, body, { headers, params,responseType: 'text' });
  }
}

