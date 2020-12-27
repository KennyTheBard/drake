import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request.clone({
         url: this.addApiUrl(request.url)
      }));
   }

   addApiUrl(url: string): string {
      if (url.includes('http://') || url.includes('https://')) {
         return url;
      } else {
         return `${environment.apiUrl}/${url}`;
      }
   }

}