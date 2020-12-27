import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      throw new Error('Method not implemented.');
   }

}