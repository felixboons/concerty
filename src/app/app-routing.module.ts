import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArtistsComponent} from './components/artists/artists.component';
import {ArtistDetailsComponent} from './components/artists/artist-details/artist-details.component';
import {ConcertsComponent} from './components/concerts/concerts.component';
import {ConcertDetailsComponent} from './components/concerts/concert-details/concert-details.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthGuard} from './auth-guard.module';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'artists', component: ArtistsComponent,
    children: [
      { path: ':key', component: ArtistDetailsComponent }
    ]
  },
  { path: 'concerts', component: ConcertsComponent,
    children: [
      { path: ':key', component: ConcertDetailsComponent }
    ]
  },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AboutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
