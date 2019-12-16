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

  formInteractedWithAndInvalid(): boolean {
    for (const c in this.form.controls) {
      const control = this.form.get(c);

      if (control.dirty && !control.pristine && control.invalid) {
        return true;
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
        Validators.max(1_000_000),
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.min(0.01),
        Validators.max(1_000_000),
      ]),
      // date: new FormControl(null, Validators.required),
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(500),
      ])
    })
  }
}
