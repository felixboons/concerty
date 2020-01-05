import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../_services/auth.service';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.scss']
})
export class NavbarMobileComponent implements OnInit {
  isAuthenticated = false;
  isAdministrator = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.isAdministrator()
      .then(isAdmin => {
        if (isAdmin) {
          this.isAdministrator = true;
        }
        this.isAuthenticated = true;
      })
  }
}
