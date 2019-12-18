import {Component, Input, OnInit} from '@angular/core';
import {ArtistService} from '../../../../_services/artist.service';
import {Artist} from '../../../../_models/artist.model';

@Component({
  selector: 'app-find-artist',
  templateUrl: './find-artist.component.html',
  styleUrls: ['./find-artist.component.scss']
})
export class FindArtistComponent implements OnInit {
  @Input() artists: Artist[] = [];

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
  }

  removeArtist(index: number): void {
    this.artistService.deleteArtist(index);
  }
}
