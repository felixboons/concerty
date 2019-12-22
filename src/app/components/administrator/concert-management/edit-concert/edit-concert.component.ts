import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Venue} from '../../../../_enums/venue.enum';
import {ConcertService} from '../../../../_services/concert.service';
import {Concert} from '../../../../_models/concert.model';

@Component({
  selector: 'app-edit-concert',
  templateUrl: './edit-concert.component.html',
  styleUrls: ['./edit-concert.component.scss']
})
export class EditConcertComponent implements OnInit, OnChanges {
  @Input() concert: Concert = null;
  @Output() formCanceled = new EventEmitter();
  Venue = Venue;
  venues = Venue.keys();
  form: FormGroup;

  constructor(private concertService: ConcertService) { }

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges() {
    this.initializeForm();
  }

  editConcert(): void {
    const input = this.form.value;
    const concert: Concert = new Concert(
      input.title,
      input.venue,
      input.date,
      input.price,
      input.tickets,
      input.description);
    this.concertService.createConcert(concert);
    this.initializeForm();
  }

  cancel() {
    this.formCanceled.emit();
  }

  markDatepickerAsTouched(): void {
    this.form.controls['date'].markAsTouched();
  }

  setDateValue(date: Date): void {
    this.form.get('date').setValue(date);
  }

  formInteractedWithAndInvalid(): boolean {
    for (const c in this.form.controls) {
      const control = this.form.get(c);

      // For all controls, except <select><option>
      if (control.dirty && !control.pristine && control.invalid) {
        return true;
      }

      // For <select><option>
      if (c === 'venue' && control.touched && control.value === null) {
        return true;
      }

      // For <mat-datepicker>
      if (c === 'date' && control.touched && control.invalid) {
        return true;
      }
    }

    return false;
  }

  private initializeForm(): void {
    const concert = this.concert;

    this.form = new FormGroup({
      title: new FormControl(concert ? concert.title : null, Validators.required),
      venue: new FormControl(concert ? concert.venue: null, Validators.required),
      tickets: new FormControl(concert ? concert.ticketsTotal : null, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000000),
      ]),
      date: new FormControl(concert ? concert.date : null, Validators.required),
      price: new FormControl(concert ? concert.price : null, [
        Validators.required,
        Validators.min(0.01),
        Validators.max(1000000),
      ]),
      description: new FormControl(concert ? concert.description : null, [
        Validators.required,
        Validators.maxLength(500)
      ])
    });
  }
}
