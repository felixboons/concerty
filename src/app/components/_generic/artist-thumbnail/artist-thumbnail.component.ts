import {Component, Input, OnInit} from '@angular/core';
import {Artist} from '../../../_models/artist.model';

@Component({
  selector: 'app-artist-thumbnail',
  templateUrl: './artist-thumbnail.component.html',
  styleUrls: ['./artist-thumbnail.component.scss']
})
export class ArtistThumbnailComponent implements OnInit {
  @Input() artist: Artist;
  @Input() hoverToOverlay: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

}
