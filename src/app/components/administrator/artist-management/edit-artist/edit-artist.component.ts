import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ArtistService} from '../../../../_services/artist.service';
import {Artist} from '../../../../_models/artist.model';
import {Genre} from '../../../../_enums/genre.enum';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.scss']
})
export class EditArtistComponent implements OnInit, OnChanges {
  @Input() artist: Artist = null;
  @Input() index: number;
  @Output() formCanceled = new EventEmitter();
  Genre = Genre;
  genres = Genre.keys();
  form: FormGroup;

  constructor(private artistService: ArtistService) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges() {
    this.initializeForm();
  }

  editArtist(): void {
    const input = this.form.value;
    const artist: Artist = new Artist(
      input.name,
      input.genre,
      input.biography,
      this.artist._id
    );
    this.artistService.editArtist(artist, this.index);
    this.formCanceled.emit();
  }

  cancel() {
    this.formCanceled.emit();
  }

  formInteractedWithAndInvalid(): boolean {
    // tslint:disable-next-line:forin
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
    const artist = this.artist;

    this.form = new FormGroup({
      name: new FormControl(artist.name, Validators.required),
      genre: new FormControl(artist.genre, Validators.required),
      biography: new FormControl(artist.biography, [
        Validators.required,
        Validators.maxLength(500)
      ])
    });
  }
}
