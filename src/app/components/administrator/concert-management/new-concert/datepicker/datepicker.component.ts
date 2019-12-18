import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  today: Date = new Date();

  constructor() { }

  ngOnInit() {
    this.insertFontAwesomeIcon();
  }

  private insertFontAwesomeIcon(): void {
    const iconElement = "<i class=\"fad fa-calendar-day fa-lg uk-margin-small-right\" (click)=\"datepicker.open()\"></i>";

    // Handler when all assets (including images) are loaded
    $(window).on("load", () => $('.mat-datepicker-toggle').append(iconElement));
  }

}
