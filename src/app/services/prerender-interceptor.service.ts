import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PrerenderInterceptor implements HttpInterceptor {
  private excludedUrls = ['https://www.primefaces.org/cdn/api/upload.php'];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     if (request.url.startsWith('https://restcountries.com')) {
    return next.handle(request); // ما تضيفيش هيدرز/تعديلات
  }

       // Check if the request URL matches any excluded URL
       if (this.excludedUrls.some(url => request.url.includes(url))) {
        console.log('PrerenderInterceptor: Skipping excluded URL:', request.url);
        return next.handle(request); // Skip modification for excluded URLs
      }

      
    const modifiedRequest = request.clone({
      setHeaders: {
        'X-Prerender-Token': '2ufpmnclH0O2xg9SqH83'
      }
    });
    return next.handle(modifiedRequest);
  }
}
