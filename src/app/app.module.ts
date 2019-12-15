import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { ArtistDetailsComponent } from './components/artists/artist-details/artist-details.component';
import { ConcertsComponent } from './components/concerts/concerts.component';
import { ConcertDetailsComponent } from './components/concerts/concert-details/concert-details.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import {HttpClientModule} from '@angular/common/http';
import { NavbarMobileComponent } from './components/navbar/navbar-mobile/navbar-mobile.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountComponent} from './components/account/account.component';
import {TicketsComponent} from './components/account/tickets/tickets.component';
import {ProfileComponent} from './components/account/profile/profile.component';
import {AdministratorComponent} from './components/administrator/administrator.component';
import {ArtistManagementComponent} from './components/administrator/artist-management/artist-management.component';
import {ConcertManagementComponent} from './components/administrator/concert-management/concert-management.component';
import {NewArtistComponent} from './components/administrator/artist-management/new-artist/new-artist.component';
import {NewConcertComponent} from './components/administrator/concert-management/new-concert/new-concert.component';
import {AngularMyDatePickerModule} from 'angular-mydatepicker';
import {EditProfileComponent} from './components/account/profile/edit-profile/edit-profile.component';
import {ChangePasswordComponent} from './components/account/profile/change-password/change-password.component';
import {FindArtistComponent} from './components/administrator/artist-management/find-artist/find-artist.component';
import {FindConcertComponent} from './components/administrator/concert-management/find-concert/find-concert.component';

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
    FindConcertComponent
  ],
    imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      ReactiveFormsModule,
      FormsModule,
      AngularMyDatePickerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
