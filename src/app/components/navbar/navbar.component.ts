import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
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
