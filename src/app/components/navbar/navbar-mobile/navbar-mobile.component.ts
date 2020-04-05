import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../_services/auth.service';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.scss']
})
export class NavbarMobileComponent implements OnInit {
  @Input() isAuthenticated = false;
  @Input() isAdministrator = false;

  constructor() {
  }

  ngOnInit() {
  }
}
