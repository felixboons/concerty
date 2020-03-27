import {AllArtistsComponent} from './all-artists.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ArtistService} from '../../../../_services/artist.service';
import {NO_ERRORS_SCHEMA, Type} from '@angular/core';
import {Artist} from '../../../../_models/artist.model';
import {Genre} from '../../../../_enums/genre.enum';
import {By} from '@angular/platform-browser';

describe('AllArtistsComponent', () => {
  let fixture: ComponentFixture<AllArtistsComponent>;
  let component: AllArtistsComponent;
  let httpMock: HttpTestingController;

  const dummyArtists = [
    new Artist('John Doe', Genre.HIP_HOP, 'This is John.')
  ];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AllArtistsComponent],
      providers: [ArtistService],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(AllArtistsComponent);
    component = fixture.componentInstance;
    httpMock = fixture.debugElement.injector
      .get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);

    component.artists = dummyArtists;
    fixture.detectChanges();
  });

  it('should only show a table body when artists are available', () => {
    const tableElement = fixture.debugElement.query(By.css('.artists-list'));
    expect(tableElement).toBeTruthy();
  });
});
