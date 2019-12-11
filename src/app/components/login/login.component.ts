import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../_services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.initializeForm();

    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('account');
    }
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, Validators.required)
    });
  }

  login(): void {
    const input = this.form.value;

    this.authService.login(input.email, input.password)
      .then(_ => {

      })
      .catch(_ => {
      });
  }
}
