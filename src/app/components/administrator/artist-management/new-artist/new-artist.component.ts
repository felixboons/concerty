import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Genre} from '../../../../_enums/genre.enum';
import {ArtistService} from '../../../../_services/artist.service';
import {Artist} from '../../../../_models/artist.model';

@Component({
  selector: 'app-new-artist',
  templateUrl: './new-artist.component.html',
  styleUrls: ['./new-artist.component.scss']
})
export class NewArtistComponent implements OnInit {
  form: FormGroup;
  Genre = Genre;
  genres = Genre.keys();

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.initializeForm();
  }

  createArtist(): void {
    const input = this.form.value;
    const artist: Artist = new Artist(input.name, input.genre, input.biography);
    this.artistService.createArtist(artist);
    this.initializeForm();
  }

  cancel() {
    this.initializeForm();
  }

  formInteractedWithAndInvalid(): boolean {
    for (const c in this.form.controls) {
      const control = this.form.get(c);

      // For <select><option>
      if (c === 'genre' && control.touched && control.value === null) {
        return true;
      }

      // For all other controls (Only inputs, in this case. IDK if other form elements work.
      if (control.dirty && !control.pristine && control.invalid) {
        return true;
      }
    }
    return false;
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
