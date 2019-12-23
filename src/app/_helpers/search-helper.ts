import {Artist} from '../_models/artist.model';
import {Genre} from '../_enums/genre.enum';
import {Concert} from '../_models/concert.model';
import {Venue} from '../_enums/venue.enum';

export class SearchHelper {

  public static searchArtists(input: string, arrayToSearch: Artist[]): Artist[] {
    input = input.toLowerCase();

    if (!input) {
      return arrayToSearch;
    } else {
      return arrayToSearch
        .filter(artist => {
          return SearchHelper.stringIsMatch(input, artist._id) ||
            SearchHelper.stringIsMatch(input, artist.name) ||
            SearchHelper.genreIsMatch(input, artist.genre);
      });
    }
  }

  public static searchConcerts(input: string, arrayToSearch: Concert[]): Concert[] {
    input = input.toLowerCase();

    if (!input) {
      return arrayToSearch;
    } else {
      return arrayToSearch
        .filter(concert => {
          return SearchHelper.stringIsMatch(input, concert._id) ||
            SearchHelper.stringIsMatch(input, concert.title) ||
            SearchHelper.venueIsMatch(input, concert.venue);
      });
    }
  }

  private static stringIsMatch(input: string, value: string): boolean {
    value = value.toLowerCase();
    return value.indexOf(input) > -1;
  }

  private static genreIsMatch(input: string, genre: Genre): boolean {
    const genreString = Genre[genre].toLowerCase();
    return genreString.indexOf(input) > -1;
  }

  private static venueIsMatch(input: string, venue: Venue): boolean {
    const genreString = Venue[venue].toLowerCase();
    return genreString.indexOf(input) > -1;
  }
}
