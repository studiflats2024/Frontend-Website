// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// declare const gapi: any;  

// @Injectable({
//   providedIn: 'root',
// })
// export class GoogleAuthService {
//   private googleAuth: any;
//   private userSubject = new BehaviorSubject<any>(null);

//   constructor() {
//     this.initializeGoogleAuth();
//   }

//   private initializeGoogleAuth() {
  
//     gapi.load('auth2', () => {
//       this.googleAuth = gapi.auth2.init({
//         client_id: '727951335686-psv9svhulcsrpv2sc1aqjs7oc87ggg61.apps.googleusercontent.com',
//         scope: 'profile email',
//       });
//     });
//   }

//   signIn(): Promise<any> {
//     return new Promise((resolve, reject) => {
//       this.googleAuth.signIn().then(
//         (user: any) => {
//           const profile = user.getBasicProfile();
//           const userData = {
//             SC_ID: profile.getId(),
//             FullName: profile.getName(),
//             Email: profile.getEmail(),
//             Provider: 'Google',
//             img: profile.getImageUrl(),
//           };
//           this.userSubject.next(userData);
//           resolve(userData);
//         },
//         (error: any) => reject(error)
//       );
//     });
//   }

//   getUser() {
//     return this.userSubject.asObservable();
//   }

  
// }
///////////////////////////////////////////////////////////////////////////////////////////////

// import { Injectable } from '@angular/core';

 
// declare global {
//   interface Window {
//     google?: any;
//   }
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class GoogleAuthService {
//   private clientId: string = '727951335686-psv9svhulcsrpv2sc1aqjs7oc87ggg61.apps.googleusercontent.com'; // Replace with your Client ID

//   constructor() {
//     this.initializeGoogleSignIn();
//   }

//   private initializeGoogleSignIn() {
//     if (!window.google || !window.google.accounts) {
//       console.error('Google Identity Services script not loaded.');
//       return;
//     }

//     window.google.accounts.id.initialize({
//       client_id: this.clientId,
//       callback: this.handleCredentialResponse.bind(this),
//     });
//   }

  
//   private handleCredentialResponse(response: any) {
//     const jwt = response.credential; 
//     console.log('Google Sign-In Successful:', jwt);
    
//   }

  
//   renderButton(buttonId: string) {
//     if (!window.google || !window.google.accounts) {
//       console.error('Google Identity Services script not loaded.');
//       return;
//     }

//     window.google.accounts.id.renderButton(
//       document.getElementById(buttonId),
//       {
//         theme: 'outline',
//         size: 'large',
//         type: 'standard',
//       }
//     );
//   }

  
//   signOut() {
//     if (!window.google || !window.google.accounts) {
//       console.error('Google Identity Services script not loaded.');
//       return;
//     }

//     window.google.accounts.id.disableAutoSelect();
//     console.log('User signed out');
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls
import { MessagingService } from './messaging.service';
import { UserService,UserAccount } from './user.service';


// Extend the Window interface for TypeScript compatibility
declare global {
  interface Window {
    google?: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  private clientId: string = '727951335686-psv9svhulcsrpv2sc1aqjs7oc87ggg61.apps.googleusercontent.com';  
  private backendApiUrl: string = 'https://api.studiflats.com/api/Users/SocialSign_WS';  

  constructor(private http: HttpClient, private messagingService: MessagingService,private userService:UserService) {
    this.initializeGoogleSignIn();
    this.initializeMessagingService();
  }
  deviceToken:any;
  private initializeMessagingService() {
    this.messagingService.requestPermission()
      // .then((token: string) => {
      .then((token) => {

        console.log('Device token:', token);
        this.deviceToken = token;  
      })
      .catch((error: any) => {
        console.error('Error getting device token:', error);
      });

    this.messagingService.receiveMessage();
  }

  private initializeGoogleSignIn() {
    if (!window.google || !window.google.accounts) {
      console.error('Google Identity Services script not loaded.');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: this.clientId,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false, // Prevent auto-select behavior/////////////////////////////////
    });
  }

 

  private handleCredentialResponse(response: any) {
    const jwt = response.credential; // This is the JWT token
    console.log('Google Sign-In Successful:', jwt);

    // Decode the JWT to extract user information (if needed)
    const base64Url = jwt.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    const userInfo = JSON.parse(jsonPayload);

    // Prepare data to send to the backend
    const userData = {
      SC_ID: userInfo.sub, // Unique identifier
      FullName: userInfo.name,
      Email: userInfo.email,
      Provider: 'Google',
      img: userInfo.picture,
      deviceToken: this.deviceToken,  
    };

    // Send data to the backend
    this.sendDataToBackend(userData);
  }

  private sendDataToBackend(userData: any) {
    this.http.post<any>(this.backendApiUrl, userData).subscribe({
      next: (response) => {
        console.log('Data successfully sent to backend:', response);
         // Check if flags are false and trigger the modal
      if (!response.account_Confirmed || !response.profileCompleted) {
        console.warn('Account not confirmed or profile not completed');
        this.userService.openModalComplete(); // Trigger the modal
      }
        this. signOut();
      },
      error: (error) => {
        console.error('Error sending data to backend:', error);
      },
    });
  }

  renderButton(buttonId: string) {
    if (!window.google || !window.google.accounts) {
      console.error('Google Identity Services script not loaded.');
      return;
    }

    window.google.accounts.id.renderButton(document.getElementById(buttonId), {
      theme: 'outline',
      size: 'large',
      type: 'standard',
    });
  }

    // Manually prompt the Google Sign-In dialog////////////////////////////////////////////////
    promptSignIn() {
      if (!window.google || !window.google.accounts) {
        console.error('Google Identity Services script not loaded.');
        return;
      }
  
      window.google.accounts.id.prompt(); // Display the Google Sign-In dialog
    }

  signOut() {
    if (!window.google || !window.google.accounts) {
      console.error('Google Identity Services script not loaded.');
      return;
    }

    window.google.accounts.id.disableAutoSelect();
    console.log('User signed out');
  }
}
