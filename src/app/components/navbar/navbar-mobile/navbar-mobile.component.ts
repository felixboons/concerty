import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.scss']
})
export class NavbarMobileComponent implements OnInit {
  loggedIn = false;

  constructor(private auth: AuthService) {
    this.auth.loginStatus.subscribe(status => this.loggedIn = status);
  }

  ngOnInit() {
  }
}
