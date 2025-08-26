// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
// } from '@angular/common/http';
// import { Observable, from } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
// import { MessagingService } from './messaging.service';

// @Injectable()
// export class AuthInterceptorService implements HttpInterceptor {
//   constructor(private messagingService: MessagingService) {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
 
//     return from(this.messagingService.requestPermission()).pipe(
//       switchMap((deviceToken: string) => {
//         console.log('Adding Device Token to request:', deviceToken);

        
//         const modifiedRequest = request.clone({
//           setHeaders: {
//             'Guest_Token': `${deviceToken}`,
//           },
//         });

        
//         return next.handle(modifiedRequest);
//       })
//     );
//   }
// }




import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap, catchError  } from 'rxjs/operators';
import { MessagingService } from './messaging.service';
import { isExternalUrl } from './interceptor-helper';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private messagingService: MessagingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const excludedUrls = ['https://www.primefaces.org/cdn/api/upload.php'];

     
    //////////////////////////////////////////////////////////
      if (request.url.startsWith('https://restcountries.com')) {
    return next.handle(request); // ما تضيفيش هيدرز/تعديلات
  }
    //////////////////////////////////////////////////////////////////
    // if (excludedUrls.some(url => request.url.includes(url))) {
    //   return next.handle(request);  
    // }

     // Detect platform
     const userAgent = window.navigator.userAgent || '';
     const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);
 
     // Skip interceptor for excluded URLs or mobile platforms
     if (isMobile || excludedUrls.some(url => request.url.includes(url))) {
       console.log('Interceptor skipped for mobile platform or excluded URL');
       return next.handle(request);
     }

    
  //   return from(this.messagingService.requestPermission()).pipe(
  //     switchMap((deviceToken: string) => {
  //       console.log('Adding Device Token to request:', deviceToken);

  //       const modifiedRequest = request.clone({
  //         setHeaders: {
  //           'Guest_Token': `${deviceToken}`,
  //         },
  //       });

  //       return next.handle(modifiedRequest);
  //     })
  //   );
  // }
      // Handle notifications with fallback
      return from(this.messagingService.requestPermission()).pipe(
        switchMap((deviceToken) => {
          console.log('Adding Device Token to request:', deviceToken);
  
          const modifiedRequest = request.clone({
            setHeaders: {
              'Guest_Token': `${deviceToken}`,
            },
          });
  
          return next.handle(modifiedRequest);
        }),
        catchError((error) => {
          console.log('Notification permission denied or failed:', error);
  
          // Fallback: Send the request without the token
          return next.handle(request);
        })
      );
    }
}

