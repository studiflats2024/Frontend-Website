import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare const gapi: any; // Declare gapi as a global variable

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  private googleAuth: any;
  private userSubject = new BehaviorSubject<any>(null);

  constructor() {
    this.initializeGoogleAuth();
  }

  private initializeGoogleAuth() {
    // Wait for the gapi to load
    gapi.load('auth2', () => {
      this.googleAuth = gapi.auth2.init({
        client_id: '727951335686-psv9svhulcsrpv2sc1aqjs7oc87ggg61.apps.googleusercontent.com',
        scope: 'profile email',
      });
    });
  }

  signIn(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.googleAuth.signIn().then(
        (user: any) => {
          const profile = user.getBasicProfile();
          const userData = {
            SC_ID: profile.getId(),
            FullName: profile.getName(),
            Email: profile.getEmail(),
            Provider: 'Google',
            img: profile.getImageUrl(),
          };
          this.userSubject.next(userData);
          resolve(userData);
        },
        (error: any) => reject(error)
      );
    });
  }

  getUser() {
    return this.userSubject.asObservable();
  }
}
