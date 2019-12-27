import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {User} from '../../_models/user.model';
import {Router} from '@angular/router';
import {CacheService} from '../../_services/cache.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  failedToRegister = false;

  constructor(private userService: UserService,
              private router: Router,
              private cache: CacheService) { }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, Validators.required),
      passwordConfirm: new FormControl(null, Validators.required),
    })
  }

  register(): void {
    this.failedToRegister = false;
    this.showLoader();
    const input = this.form.value;
    const user: User = new User(input.firstName, input.lastName, input.email, input.password);

    this.userService.createUser(user)
      .then(_ => {
        this.cache.setEmailAutofill(user.email);
        this.router.navigateByUrl('/login');
      })
      .catch(_ => this.failedToRegister = true)
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
