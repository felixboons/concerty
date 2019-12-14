import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-artist',
  templateUrl: './new-artist.component.html',
  styleUrls: ['./new-artist.component.scss']
})
export class NewArtistComponent implements OnInit {
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      biography: new FormControl(null, [
        Validators.required,
        Validators.maxLength(500)
      ]),
      genre: new FormControl(null, Validators.required)
    })
  }
}
