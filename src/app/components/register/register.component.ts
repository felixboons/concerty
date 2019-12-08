import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private userService: UserService) { }

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
      'password-confirm': new FormControl(null, Validators.required),
    })
  }

  register(): void {
    const input = this.form.value;

    this.userService.createUser(input.firstName, input.lastName, input.email, input.password)
      .then(_ => {
        console.log('ACCOUNT CREATED');
      })
      .catch(_ => {
        console.log('FAILED TO CREATE ACCOUNT');
      })
  }
}
