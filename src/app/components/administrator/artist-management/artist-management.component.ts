import { Component, OnInit } from '@angular/core';
import {Artist} from '../../../_models/artist.model';

@Component({
  selector: 'app-artist-management',
  templateUrl: './artist-management.component.html',
  styleUrls: ['./artist-management.component.scss']
})
export class ArtistManagementComponent implements OnInit {
  artists: Artist[] = [null, null, null, null, null];

  constructor() { }

  ngOnInit() {
  }

}
