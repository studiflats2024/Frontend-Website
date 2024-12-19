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
    // Use the requestPermission method to fetch the device token
    return from(this.messagingService.requestPermission()).pipe(
      switchMap((deviceToken: string) => {
        console.log('Adding Device Token to request:', deviceToken);

        // Clone the request and add the Device Token in the headers
        const modifiedRequest = request.clone({
          setHeaders: {
            'Guest_Token': `${deviceToken}`,
          },
        });

        // Pass the modified request to the next handler
        return next.handle(modifiedRequest);
      })
    );
  }
}
