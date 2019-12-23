import {Component, Input, OnInit} from '@angular/core';
import {Artist} from '../../../_models/artist.model';
import {ArtistService} from '../../../_services/artist.service';
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

  constructor(private artistService: ArtistService) {
  }

  ngOnInit() { }

  removeArtist(_id: string): void {
    // this.artistService.deleteArtist(_id);
  }
}
