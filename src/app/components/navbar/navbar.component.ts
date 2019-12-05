import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedIn = false;

  constructor(private auth: AuthService) {
    this.auth.loginStatus.subscribe(status => this.loggedIn = status);
  }

  ngOnInit() {
  }

}
