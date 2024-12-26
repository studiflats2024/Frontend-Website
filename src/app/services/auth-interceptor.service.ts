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
import { switchMap } from 'rxjs/operators';
import { MessagingService } from './messaging.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private messagingService: MessagingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const excludedUrls = ['https://www.primefaces.org/cdn/api/upload.php'];

    // Check if the URL is in the excluded list
    if (excludedUrls.some(url => request.url.includes(url))) {
      return next.handle(request); // Skip modification for excluded URLs
    }

    // Add Guest_Token for all other requests
    return from(this.messagingService.requestPermission()).pipe(
      switchMap((deviceToken: string) => {
        console.log('Adding Device Token to request:', deviceToken);

        const modifiedRequest = request.clone({
          setHeaders: {
            'Guest_Token': `${deviceToken}`,
          },
        });

        return next.handle(modifiedRequest);
      })
    );
  }
}

