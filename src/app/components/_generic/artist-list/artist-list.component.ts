import {Component, Input, OnInit} from '@angular/core';
import {Artist} from '../../../_models/artist.model';
import {Genre} from '../../../_enums/genre.enum';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {
  @Input() userSelect = true;
  @Input() artists: Artist[] = [];
  Genre = Genre;

  constructor() {
  }

  ngOnInit() {
  }

  removeArtist(index: number): void {
    this.artists.splice(index, 1);
  }
}
