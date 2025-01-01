import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';









platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));



  window.onload = function() {
    var forms = document.getElementsByTagName('form');
    var inputs = document.getElementsByTagName('input');


    for (var i = 0; i < forms.length; i++) {
      forms[i].setAttribute('autocomplete', 'off');
    }


    for (var j = 0; j < inputs.length; j++) {
      inputs[j].setAttribute('autocomplete', 'off');
    }
  };



  // window.onload = function() {

  //   const inputs = document.querySelectorAll('input');

  //   inputs.forEach(input => {

  //     const newInput = input.cloneNode(true);
  //     input.parentNode!.replaceChild(newInput, input);
  //   });
  // };
////////////////////////////////////////////////////////////////////////////////

  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('/firebase-messaging-sw.js')
  //     .then((registration) => {
  //       console.log('Service Worker registered with scope:', registration.scope);
  //     })
  //     .catch((error) => {
  //       console.error('Service Worker registration failed:', error);
  //     });
  // }
