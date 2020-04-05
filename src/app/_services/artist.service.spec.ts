import {fakeAsync, getTestBed, TestBed, tick} from '@angular/core/testing';
import {ArtistService} from './artist.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Artist} from '../_models/artist.model';
import {Genre} from '../_enums/genre.enum';

describe('ArtistService', () => {
  let injector: TestBed;
  let service: ArtistService;
  let httpMock: HttpTestingController;

  const artistsDummy = [
    new Artist('Smino', Genre.HIP_HOP, 'This is Smino.', 'A1'),
    new Artist('Year Of The Ox', Genre.HIP_HOP, 'Rick and JL form YOX.', 'A2'),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtistService]
    });

    injector = getTestBed();
    service = injector.get(ArtistService);
    httpMock = injector.get(HttpTestingController);
  });

  it('requests artists on initialization', fakeAsync(() => {
    const request = httpMock.expectOne('https://concerty-server.herokuapp.com/api/artists');
    request.flush(artistsDummy);
    tick();
    expect(request.request.method).toBe('GET');

    const artists = service.artistsSub.getValue();
    expect(artistsDummy).toEqual(artists);
  }));

  it('can get all artists', () => {
    service.getArtists().then((artists) => {
      expect(artists).toEqual(artistsDummy); // TODO: Succeeds anyhow; this test doesn't really run. Fix this!
    });

    const requests = httpMock.match('https://concerty-server.herokuapp.com/api/artists');
    for (let request of requests) {
      expect(request.request.method).toBe('GET');
    }

    expect(requests.length).toBe(2);
  });

  afterEach(() => {
    httpMock.verify();
  })
});
