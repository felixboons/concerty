import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';
import {CacheService} from './cache.service';


// TODO: TEST

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private cache: CacheService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cache.getToken();
    console.log(`Token is given with headers of request'`);

    const isValidApiUrl = request.url.startsWith(environment.serverUrlPrefix);
    if (token && isValidApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: token }
      });
    }

    console.log(request);

    return next.handle(request);
  }
}
