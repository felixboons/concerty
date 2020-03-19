import {getTestBed, TestBed} from '@angular/core/testing';
import {ArtistService} from './artist.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Artist} from '../_models/artist.model';
import {Genre} from '../_enums/genre.enum';

xdescribe('ArtistService', () => {
  let injector: TestBed;
  let service: ArtistService;
  let httpMock: HttpTestingController;

  const artistsMock = [
    new Artist('Smino', Genre.HIP_HOP, 'This is Smino.'),
    new Artist('Year Of The Ox', Genre.HIP_HOP, 'Rick and JL form YOX.'),
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

  it('can return artists data', () => {
    service.getArtists().then((artists) => {
      expect(artists).toEqual(artistsMock);
    });

    // TODO: Network panel in fact shows one request. Test is not configured correctly!
    const request = httpMock.expectOne('https://concerty-server.herokuapp.com/api/artists');
    expect(request.request.method).toBe('GET');
    request.flush(artistsMock);
  });

  afterEach(() => {
    httpMock.verify();
  })
});
