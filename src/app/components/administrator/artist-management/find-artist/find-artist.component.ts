import {Component, Input, OnInit} from '@angular/core';
import {ArtistService} from '../../../../_services/artist.service';
import {Artist} from '../../../../_models/artist.model';
import {Genre} from '../../../../_enums/genre.enum';

@Component({
  selector: 'app-find-artist',
  templateUrl: './find-artist.component.html',
  styleUrls: ['./find-artist.component.scss']
})
export class FindArtistComponent implements OnInit {
  @Input() artists: Artist[] = [];
  Genre = Genre;

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
  }

  removeArtist(index: number): void {
    this.artistService.deleteArtist(index);
  }

  getLastDigitsOfId(id: string, digits = 5): string {
    return id.substring(id.length - digits, id.length);
  }
}
