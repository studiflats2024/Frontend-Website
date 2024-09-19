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

  requestPermission() {
    return Notification.requestPermission()
      .then((permission) => {
        if (permission === 'granted') {
          // Get FCM token with the VAPID key
          return this.messaging.getToken({ vapidKey: environment.firebase.vapidKey });
        } else {
          throw new Error('Permission not granted for Notifications');
        }
      })
      .then((token: string) => {
        console.log('FCM Token:', token);
        // this.deviceToken=token;
        return token;
      })
      .catch((error) => {
        console.error('Error getting permission or token:', error);
        throw error;
      });
  }

  receiveMessage() {
    this.messaging.onMessage((payload: any) => {
      console.log('Message received. ', payload);
      // Handle the message or notification
    });
  }
}
