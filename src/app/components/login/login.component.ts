import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../_services/auth.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {CacheService} from '../../_services/cache.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  failedToLogin = false;
  emailAutofill: string;

  constructor(private authService: AuthService,
              private router: Router,
              private cache: CacheService) {
  }

  ngOnInit() {
    this.initializeForm();


    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('account');
    }
  }

  private initializeForm(): void {
    this.emailAutofill = this.cache.getEmailAutofill();

    this.form = new FormGroup({
      email: new FormControl(this.emailAutofill, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, Validators.required)
    });

    this.cache.removeEmailAutofill();
  }

  login(): void {
    this.failedToLogin = false;
    this.showLoader();
    const input = this.form.value;

    this.authService.login(input.email, input.password)
      .then(() => this.router.navigateByUrl('account'))
      .catch(() => this.failedToLogin = true)
      .finally(() => this.hideLoader());
  }

  hideLoader(): void {
    const loadElement = $('#loader');
    const hideWhileLoadingElement = $('.hide-while-loading');
    loadElement.hide();
    hideWhileLoadingElement.show();
  }

  showLoader(): void {
    const loadElement = $('#loader');
    const hideWhileLoadingElement = $('.hide-while-loading');
    loadElement.height(hideWhileLoadingElement.height());
    loadElement.show();
    hideWhileLoadingElement.hide();
  }
}
