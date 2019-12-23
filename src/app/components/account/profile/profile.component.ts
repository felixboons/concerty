import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {

  }

  logout(): void {
    this.authService.logout();
  }
}
