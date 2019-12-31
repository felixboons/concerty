import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthService} from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  // constructor(private authService: AuthService) { }
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      // .pipe(catchError(err => {
      //   console.log(err.status);
      //   console.log(err);
      //   if ([401, 403, 409].indexOf(err.status) !== -1) {
      //     this.authService.logout();
      //   }
      //
      //   const error = err.error.message || err.statusText;
      //   return throwError(error);
      // }))
  }
}
