import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare var firebase: any;

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private messaging: any;
  deviceToken:any;

  constructor() {
    // Initialize Firebase app
    firebase.initializeApp(environment.firebase);
    this.messaging = firebase.messaging();
  }

  // requestPermission() {
  //   return Notification.requestPermission()
  //     .then((permission) => {
  //       if (permission === 'granted') {
        
  //         return this.messaging.getToken({ vapidKey: environment.firebase.vapidKey });
  //       } else {
  //         throw new Error('Permission not granted for Notifications');
  //       }
  //     })
  //     .then((token: string) => {
  //       console.log('FCM Token:', token);
        
  //       return token;
  //     })
  //     .catch((error) => {
  //       console.error('Error getting permission or token:', error);
  //       throw error;
  //     });
  // }

  requestPermission() {
    const userAgent = window.navigator.userAgent || '';
    const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);
  
    if (isMobile) {
      console.log('Notifications are skipped on mobile devices.');
      return Promise.resolve(null); // Skip notifications on mobile
    }
  
    return Notification.requestPermission()
      .then((permission) => {
        if (permission === 'granted') {
          // Get FCM token with the VAPID key
          return this.messaging.getToken({ vapidKey: environment.firebase.vapidKey });
        } else {
          console.warn('Permission not granted for Notifications.');
          return null; // Return null if permission is not granted
        }
      })
      .then((token: string | null) => {
        if (token) {
          console.log('FCM Token:', token);
        } else {
          console.log('No token generated (either denied or on mobile).');
        }
        return token;
      })
      .catch((error) => {
        console.error('Error getting permission or token:', error);
        return null; // Handle the error gracefully without throwing it
      });
  }
  

  // receiveMessage() {
  //   this.messaging.onMessage((payload: any) => {
  //     console.log('Message received. ', payload);
      
  //   });
  // }


  receiveMessage() {
    const userAgent = window.navigator.userAgent || '';
    const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);
  
    if (isMobile) {
      console.log('Skipping message handling on mobile devices.');
      return; // Skip message handling on mobile
    }
  
    this.messaging.onMessage((payload: any) => {
      console.log('Message received: ', payload);
      // Handle the message or notification
    });
  }
  
}
