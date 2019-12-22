import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ArtistsComponent} from './components/artists/artists.component';
import {ArtistDetailsComponent} from './components/artists/artist-details/artist-details.component';
import {ConcertsComponent} from './components/concerts/concerts.component';
import {ConcertDetailsComponent} from './components/concerts/concert-details/concert-details.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NavbarMobileComponent} from './components/navbar/navbar-mobile/navbar-mobile.component';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountComponent} from './components/account/account.component';
import {TicketsComponent} from './components/account/tickets/tickets.component';
import {ProfileComponent} from './components/account/profile/profile.component';
import {AdministratorComponent} from './components/administrator/administrator.component';
import {ArtistManagementComponent} from './components/administrator/artist-management/artist-management.component';
import {ConcertManagementComponent} from './components/administrator/concert-management/concert-management.component';
import {NewArtistComponent} from './components/administrator/artist-management/new-artist/new-artist.component';
import {NewConcertComponent} from './components/administrator/concert-management/new-concert/new-concert.component';
import {EditProfileComponent} from './components/account/profile/edit-profile/edit-profile.component';
import {ChangePasswordComponent} from './components/account/profile/change-password/change-password.component';
import {FindArtistComponent} from './components/administrator/artist-management/find-artist/find-artist.component';
import {FindConcertComponent} from './components/administrator/concert-management/find-concert/find-concert.component';
import {FooterComponent} from './components/footer/footer.component';
import {CommonModule} from '@angular/common';
import {TokenInterceptor} from './_interceptors/token.interceptor';
import {MatDatepickerModule, MatInputModule, MatNativeDateModule} from '@angular/material';
import {DatepickerComponent} from './components/_generic/datepicker/datepicker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AllArtistsComponent} from './components/administrator/artist-management/all-artists/all-artists.component';
import {PaginationComponent} from './components/_generic/pagination/pagination.component';
import {AllConcertsComponent} from './components/administrator/concert-management/all-concerts/all-concerts.component';
import {ConcertThumbnailComponent} from './components/_generic/concert-thumbnail/concert-thumbnail.component';
import {ArtistThumbnailComponent} from './components/_generic/artist-thumbnail/artist-thumbnail.component';
import {BuyTicketsComponent} from './components/concerts/concert-details/buy-tickets/buy-tickets.component';
import {EditConcertComponent} from './components/administrator/concert-management/edit-concert/edit-concert.component';
import {EditArtistComponent} from './components/administrator/artist-management/edit-artist/edit-artist.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ArtistsComponent,
    ArtistDetailsComponent,
    ConcertsComponent,
    ConcertDetailsComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent,
    NavbarMobileComponent,
    RegisterComponent,
    AccountComponent,
    ProfileComponent,
    TicketsComponent,
    AdministratorComponent,
    ArtistManagementComponent,
    ConcertManagementComponent,
    NewArtistComponent,
    NewConcertComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    FindArtistComponent,
    FindConcertComponent,
    FooterComponent,
    DatepickerComponent,
    AllArtistsComponent,
    PaginationComponent,
    AllConcertsComponent,
    ConcertThumbnailComponent,
    ArtistThumbnailComponent,
    BuyTicketsComponent,
    EditConcertComponent,
    EditArtistComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    // { provide: LOCALE_ID, useValue: 'NL-nl' }
    { provide: LOCALE_ID, useValue: 'EN-en' }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
