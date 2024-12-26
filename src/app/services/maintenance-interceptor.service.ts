// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { MessageService } from 'primeng/api';

// @Injectable()
// export class MaintenanceInterceptor implements HttpInterceptor {
//   constructor(private messageService: MessageService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log('interceptor maintenance')

 
//     console.log('MaintenanceInterceptor: Intercepting request:', req.url);
//     return next.handle(req).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 503) {
          
//           this.messageService.add({
//             severity: 'error',
//             summary: 'Maintenance Alert',
//             detail: 'The website is currently under maintenance. Please try again later.',
//             life: 6000  
//           });
//           console.log('interceptor maintenance')
//         }
//         return throwError(() => error);
//       })
//     );
//   }
// }

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class MaintenanceInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('HTTP Status:', error.status); // Debugging log

        // Check if status is 503
        if (error.status === 503|| error.status === 0) {
          this.messageService.add({
            severity: 'error',
            summary: 'Service Unavailable',
            detail: 'The website is currently under maintenance. Please try again later.',
            life: 60000, // Show message for 1 minate
          });
        }

        // Re-throw the error
        return throwError(() => error);
      })
    );
  }
}
