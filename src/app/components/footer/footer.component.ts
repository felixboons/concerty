import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import {AuthService} from '../../_services/auth.service';
import {Role} from '../../_enums/role.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  Role = Role;
  isAuthenticated = false;
  isAdministrator = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.authService.isAuthenticatedSubject.subscribe(user => {
      if (!!user) {
        this.isAdministrator = Role[user.role] === Role.ADMIN;
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
        this.isAdministrator = false;
      }
    });
  }

  getCurrentYear(): string {
    return moment().year().toString()
  }

}
