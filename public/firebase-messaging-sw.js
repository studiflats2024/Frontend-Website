
// Use importScripts to import Firebase SDKs for service workers with compatibility versions
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js');

// Initialize Firebase in the service worker with your Firebase configuration
firebase.initializeApp({
  apiKey: "AIzaSyDgIjUL-Kw0nadAqbZiy9_o0NSYPo_C3vg",
  authDomain: "vivas-apratments.firebaseapp.com",
  projectId: "vivas-apratments",
  storageBucket: "vivas-apratments.appspot.com",
  messagingSenderId: "727951335686",
  appId: "1:727951335686:web:3daea30f480efa1b2afe87",
  measurementId: "G-16FPLN8HL7"
});

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // You can add an icon path for the notification if needed
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
