import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Venue} from '../../../../_enums/venue.enum';

@Component({
  selector: 'app-new-concert',
  templateUrl: './new-concert.component.html',
  styleUrls: ['./new-concert.component.scss']
})
export class NewConcertComponent implements OnInit {
  form: FormGroup;
  Venue = Venue;
  venues = Venue.keys();

  constructor() { }

  ngOnInit() {
    this.initializeForm();
  }

  createConcert(): void {

  }

  cancel() {
    this.initializeForm();
  }

  setDateValue(date: Date) {
    this.form.get('date').setValue(date);
  }

  formInteractedWithAndInvalid(): boolean {
    const keys = this.form.controls;
    console.log(keys);


    for (const key in keys) {
      const control = this.form.get(key);
      console.log(control.value);

      // For all controls, except <select><option>
      if (control.dirty && !control.pristine && control.invalid) {
        return true;
      }

      // For <select><option>
      if (key === 'venue') {
        return control.touched && control.value === null;
      }
    }

    return false;
  }

  private initializeForm() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      venue: new FormControl(null, Validators.required),
      tickets: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000000),
      ]),
      date: new FormControl(null, Validators.required),
      price: new FormControl(null, [
        Validators.required,
        Validators.min(0.01),
        Validators.max(1000000),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(500)
      ])
    })
  }
}
