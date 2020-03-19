import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatDatepicker} from '@angular/material';
import * as $ from 'jquery';
import * as moment from 'moment';

// @ts-ignore
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit, OnChanges {
  @Input() date: Date;
  @Output() dateValueChanged = new EventEmitter<Date>();
  @Output() datepickerTouched = new EventEmitter();
  @ViewChild('datepicker', null) datepicker: MatDatepicker<Date>;
  today: Date = new Date();

  constructor() {
  }

  ngOnInit() {
    this.insertFontAwesomeIcon();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let date = changes.date.currentValue;
    date = moment(date).toDate();

    // Set selected date in calendar.
    this.datepicker.select(date);

    // Update date, which is bound to the datepicker input.
    this.date = date;
  }

  setDateValue(data: any): void {
    const date = data.target.value;
    this.dateValueChanged.emit(date);
  }

  // TODO: Only works when page is reloaded. Find alternative for on('load)'.
  private insertFontAwesomeIcon(): void {
    const iconElement = '<i class="fad fa-calendar-day fa-lg uk-margin-small-right" (click)="datepicker.open()"></i>';

    // Handler when all assets (including images) are loaded
    $(window).on('load', () => $('.mat-datepicker-toggle').append(iconElement));
  }

  markDatepickerAsTouched(): void {
    this.datepickerTouched.emit();
  }
}
