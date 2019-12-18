import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../../../../_services/artist.service';

@Component({
  selector: 'app-find-artist',
  templateUrl: './find-artist.component.html',
  styleUrls: ['./find-artist.component.scss']
})
export class FindArtistComponent implements OnInit {

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
  }

  removeArtist(index: number): void {
    this.artistService.deleteArtist(index);
  }
}
