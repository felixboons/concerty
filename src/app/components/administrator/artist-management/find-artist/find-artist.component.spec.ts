import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA, SimpleChange} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FindArtistComponent} from './find-artist.component';
import {Artist} from '../../../../_models/artist.model';
import {Genre} from '../../../../_enums/genre.enum';
import {PrettyIdPipe} from '../../../../_pipes/pretty-id.pipe';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('FindArtistComponent', () => {
  let component: FindArtistComponent;
  let fixture: ComponentFixture<FindArtistComponent>;

  const dummyArtists = [
    new Artist('John Doe', Genre.HIP_HOP, 'This is John.'),
    new Artist('Jane Doe', Genre.REGGAE, 'This is Jane.'),
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FindArtistComponent, PrettyIdPipe],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindArtistComponent);
    component = fixture.componentInstance;
    component.uniqueModalId = 'someModalId';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
