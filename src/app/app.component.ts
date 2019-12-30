import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {ConcertService} from './_services/concert.service';
import {ArtistService} from './_services/artist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private currentUrl: string;

  constructor(private concertService: ConcertService,
              private artistService: ArtistService,
              private router: Router) {
    this.initializeToTopScrolling();
  }

  private initializeToTopScrolling(): void {
    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          const url = event.url;

          if (this.currentUrl !== url) {
            AppComponent.scrollToTop();
            this.currentUrl = url;
          }
        }
      });
  }

  private static scrollToTop(): void {
    window.scroll(0, 0);
  }
}
