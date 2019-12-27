import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {User} from '../../../../_models/user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @Input() user: User;
  form: FormGroup;
  minYear = 1900;
  maxYear = moment().year();

  constructor() { }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(500)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      day: new FormControl(null, [
        Validators.min(1),
        Validators.max(31),
      ]),
      month: new FormControl(null,[
        Validators.min(1),
        Validators.max(12),
      ]),
      year: new FormControl(null,[
        Validators.min(this.minYear),
        Validators.max(this.maxYear),
      ]),
    })
  }

  getDays(): number[] {
    let days: number[] = [];
    const value = 31;
    for (let i = 1; i <= value; i++) {
      days.push(i);
    }
    return days;
  }

  getMonths(): number[] {
    let months: number[] = [];
    const value = 12;
    for (let i = 1; i <= value; i++) {
      months.push(i);
    }
    return months;
  }

  getYears(): number[] {
    let years: number[] = [];
    for (let i = this.maxYear; i >= this.minYear; i--) {
      years.push(i);
    }
    return years;
  }
}
