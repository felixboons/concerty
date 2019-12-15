import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.form = new FormGroup({
      currentPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32)
      ]),
      passwordConfirm: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32)
      ]),
    })
  }
}
