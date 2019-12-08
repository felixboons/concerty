import { Injectable } from '@angular/core';
import {Artist} from '../models/artist.model';
import {Concert} from '../models/concert.mode';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly lsKeyToken = 'token';
  private readonly lsKeyArtists = 'artists';
  private readonly lsKeyConcerts = 'concerts';

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(this.lsKeyToken, token);
  }

  getToken(): string {
    return localStorage.getItem(this.lsKeyToken);
  }

  removeToken(): void {
    localStorage.removeItem(this.lsKeyToken);
  }

  setArtists(artists: Artist[]): void {
    const value = JSON.stringify(artists);
    localStorage.setItem(this.lsKeyArtists, value);
  }

  getArtists(): Artist[] {
    const artists = localStorage.getItem(this.lsKeyArtists);
    return JSON.parse(artists);
  }

  removeArtists(): void {
    localStorage.removeItem(this.lsKeyArtists);
  }

  setConcerts(concerts: Concert[]): void {
    const value = JSON.stringify(concerts);
    localStorage.setItem(this.lsKeyConcerts, value);
  }

  getConcerts(): Concert[] {
    const concerts = localStorage.getItem(this.lsKeyConcerts);
    return JSON.parse(concerts);
  }

  removeConcerts(): void {
    localStorage.removeItem(this.lsKeyConcerts);
  }
}
