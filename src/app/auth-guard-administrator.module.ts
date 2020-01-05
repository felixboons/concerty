import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from './_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdministrator implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(): Promise<boolean> {
    return this.authService.isAdministrator();
  }
}
