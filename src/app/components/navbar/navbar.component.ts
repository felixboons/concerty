import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  isAdministrator = true; // Initialize as false. TRUE is for dev purposes.

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.authService.isAuthenticatedObs.subscribe(status => {
      this.isAuthenticated = status;
    });
  }
}
