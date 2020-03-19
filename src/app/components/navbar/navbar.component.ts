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
    this.authService.currentUserSub
      .subscribe(user => {
        if (user) {
          this.isAuthenticated = true;
          this.isAdministrator = user.role === 'ADMIN'
        } else {
          this.isAuthenticated = false;
          this.isAdministrator = false
        }
      })
  }
}
