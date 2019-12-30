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
        this.isAuthenticated = this.authService.isAuthenticated();
        this.isAdministrator = this.authService.isAdministrator();
      });
  }
}
