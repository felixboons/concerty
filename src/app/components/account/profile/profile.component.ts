import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../_services/auth.service';
import {User} from '../../../_models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {

    this.authService.isAuthenticatedObs
      .subscribe(user => {
        console.log(user);
        this.currentUser = user;
      });

  }

  logout(): void {
    this.authService.logout();
  }
}
