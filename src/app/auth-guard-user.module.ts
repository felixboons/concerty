import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from './_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardUser implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(): boolean {
    const authenticated = this.authService.isAuthenticated();

    if (authenticated) {
      return true;
    } else {
      this.authService.logout();
      return false;
    }
  }
}
