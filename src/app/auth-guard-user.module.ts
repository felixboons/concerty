import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from './_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardUser implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate(): Promise<boolean> {
    return this.authService.isAuthenticated();
  }
}
