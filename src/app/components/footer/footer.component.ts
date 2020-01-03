import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isAuthenticated = false;
  isAdministrator = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.currentUserSub
      .subscribe(user => {
        // if (user) {
          this.isAuthenticated = this.authService.isAuthenticated();
          this.isAdministrator = this.authService.isAdministrator();
        // }
      });
  }

  getCurrentYear(): string {
    return moment().year().toString();
  }
}
