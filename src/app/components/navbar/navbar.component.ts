import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {Role} from '../../_enums/role.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  Role = Role;
  isAuthenticated = false;
  isAdministrator = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.authService.currentUserSub.subscribe(user => {
      if (!!user) {
        this.isAdministrator = Role[user.role] === Role.ADMIN;
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
        this.isAdministrator = false;
      }
    });
  }
}
