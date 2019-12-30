import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from './_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdministrator implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(): boolean {
    const authorized = this.authService.isAdministrator();

    if (authorized) {
      return true;
    } else {
      this.router.navigateByUrl('account');
      return false;
    }
  }
}
