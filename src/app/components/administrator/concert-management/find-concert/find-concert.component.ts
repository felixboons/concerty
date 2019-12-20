import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Concert} from '../../../../_models/concert.model';
import {Artist} from '../../../../_models/artist.model';
import {DateHelper} from '../../../../_helpers/date-helper';
import {ConcertService} from '../../../../_services/concert.service';
import {Venue} from '../../../../_enums/venue.enum';

@Component({
  selector: 'app-find-concert',
  templateUrl: './find-concert.component.html',
  styleUrls: ['./find-concert.component.scss']
})
export class FindConcertComponent implements OnInit {
  @Input() concerts: Concert[] = [];
  concertsCopy: Concert[] = [];
  Venue = Venue;
  input: string;

  constructor(private concertService: ConcertService) { }

  ngOnInit() { }

  getLastDigitsOfId(id: string, digits = 5): string {
    return id.substring(id.length - digits, id.length);
  }

  getPrettyDate(date: Date): string {
    return new DateHelper().getPrettyDate(date);
  }

  removeConcert(_id: string): void {
    this.concertService.deleteConcert(_id);
  }

  search(): void {
    if (this.concertsCopy.length === 0) {
      this.concertsCopy = this.concerts;
    }

    // Only when there is valid input -> search.
    if (this.input !== '') {
      const input = this.input.toLowerCase();

      this.concerts = this.concertsCopy.filter(concert => {
        return FindConcertComponent.idMatchesInput(concert._id, input) ||
          FindConcertComponent.nameMatchesInput(concert.title, input) ||
          FindConcertComponent.venueMatchesInput(concert.venue, input);
      });
    } else {

      // Show all concerts.
      this.concerts = this.concertsCopy;
    }
  }

  private static idMatchesInput(id: string, input: string): boolean {
    id = id.toLowerCase();
    return id.indexOf(input) > -1;
  }

  private static nameMatchesInput(name: string, input: string): boolean {
    name = name.toLowerCase();
    return name.indexOf(input) > -1;
  }

  private static venueMatchesInput(venue: string, input: string): boolean {
    venue = venue.toLowerCase();
    return venue.indexOf(input) > -1;
  }
}
