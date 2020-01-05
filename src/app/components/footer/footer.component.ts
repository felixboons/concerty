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
    this.authService.isAdministrator()
      .then(isAdmin => {
        if (isAdmin) {
          this.isAdministrator = true;
        }
        this.isAuthenticated = true;
      })
  }

  getCurrentYear(): string {
    return moment().year().toString();
  }
}
