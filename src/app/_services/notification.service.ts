import { Injectable } from '@angular/core';
import * as UIkit from 'UIkit';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private timeout = 1000000;

  constructor() { }

  showSuccessNotification(message: string, _id?: string): void {
    // Navigation only works with href, not routerLink. That means... the page has to reload. DANG IT.
    const navigationalButtonMarkup = `
      <a href=\"/account/tickets/${_id}\"
         class="uk-button uk-button-primary uk-display-block uk-margin-small-top">GO TO TICKET</a>`;

    const elementMarkup = `
        <div class="uk-padding-small">
          <p class="uk-margin-remove-bottom">
            <i class="fad fa-check-circle fa-lg uk-margin-small-right"></i>
            <span class="uk-text-large">${message}</span>
            ${navigationalButtonMarkup}
          </p>
        </div>`;

    this.showNotification(elementMarkup);
  }

  private showNotification(elementMarkup: string): void {
    const options = {
      pos: 'bottom-left',
      timeout: this.timeout
    };
    UIkit.notification(elementMarkup, options);
  }
}
