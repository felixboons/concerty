import { Injectable } from '@angular/core';
import {Artist} from '../_models/artist.model';
import {Concert} from '../_models/concert.model';
import {User} from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly lsKeyToken = 'token';
  private readonly lsKeyUser = 'user';
  private readonly lsKeyArtists = 'artists';
  private readonly lsKeyConcerts = 'concerts';
  private readonly lsEmailAutofill = 'emailAutofill';

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

  setUser(user: User) {
    const value = JSON.stringify(user);
    localStorage.setItem(this.lsKeyUser, value);
  }

  getUser(): User {
    const user = localStorage.getItem(this.lsKeyUser);
    return JSON.parse(user);
  }

  removeUser(): void {
    localStorage.removeItem(this.lsKeyUser);
  }

  setEmailAutofill(email: string): void {
    localStorage.setItem(this.lsEmailAutofill, email);
  }

  getEmailAutofill(): string {
    return localStorage.getItem(this.lsEmailAutofill);
  }

  removeEmailAutofill(): void {
    localStorage.removeItem(this.lsEmailAutofill);
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
