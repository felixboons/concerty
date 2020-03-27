import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ArtistService} from '../../../_services/artist.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Artist} from '../../../_models/artist.model';
import {Genre} from '../../../_enums/genre.enum';
import {By} from '@angular/platform-browser';
import {ArtistManagementComponent} from './artist-management.component';

describe('ArtistManagementComponent', () => {
  let fixture: ComponentFixture<ArtistManagementComponent>;
  let component: ArtistManagementComponent;

  const dummyArtists = [
    new Artist('John Doe', Genre.HIP_HOP, 'This is John.'),
    new Artist('Jane Doe', Genre.R_B, 'This is Jane.')
  ];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ArtistManagementComponent],
      providers: [ArtistService],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(ArtistManagementComponent);
    component = fixture.componentInstance;

    component.artists = dummyArtists;
    fixture.detectChanges();
  });

  it('should show edit artist information when no artist is selected', () => {
    const editArtistInfoElement = fixture.debugElement.query(By.css('.edit-artist-info'));
    expect(editArtistInfoElement).toBeTruthy();
  });

  it('should show edit artist component when an artist is selected', () => {
    component.selectedArtist = dummyArtists[0];
    fixture.detectChanges();

    const editArtistComponent = fixture.debugElement.query(By.css('.edit-artist-component'));
    expect(editArtistComponent).toBeTruthy();
  });
});
