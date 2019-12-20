import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private currentUrl: string;

  constructor(private router: Router) {
    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          const url = event.url;

          if (this.currentUrl !== url) {
            window.scroll(0, 0)
            this.currentUrl = url;
          }
        }
      });
  }
}
