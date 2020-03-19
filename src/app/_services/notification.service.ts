import { Injectable } from '@angular/core';
import {Notification} from 'UIkit';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private timeout = 7000;

  constructor() { }

  showSuccessNotification(message: string, _id?: string): void {
    let navigationalButtonMarkup;

    // if (_id) {
    if (false) {
      // Navigation only works with href, not routerLink. That means... the page has to reload. DANG IT.
      navigationalButtonMarkup = `
        <a href=\"/account/tickets/${_id}\"
           class="uk-button uk-button-primary uk-display-block notification-button">GO TO TICKET</a>
      `;
    }

    const notificationMarkup = `
      <table class="uk-table uk-table-middle uk-margin-remove-bottom">
        <tr>
          <td class="uk-table-shrink"><i class="fad fa-check-circle  fa-lg"></i></td>
          <td class="uk-padding-remove-left">${message}</td>
        </tr>
      </table>
      ${navigationalButtonMarkup ? navigationalButtonMarkup : ''}
    `;

    this.showNotification('primary', notificationMarkup);
  }

  showWarningNotification(message: string): void {
    const notificationMarkup = `
      <table class="uk-table uk-table-middle uk-margin-remove-bottom">
        <tr>
          <td class="uk-table-shrink"><i class="fad fa-exclamation-circle fa-lg"></i></td>
          <td class="uk-padding-remove-left">${message}</td>
        </tr>
      </table>
    `;

    this.showNotification('warning', notificationMarkup);
  }

  showErrorNotification(message: string): void {
    const notificationMarkup = `
      <table class="uk-table uk-table-middle uk-margin-remove-bottom">
        <tr>
          <td class="uk-table-shrink"><i class="fad fa-times-circle  fa-lg"></i></td>
          <td class="uk-padding-remove-left">${message}</td>
        </tr>
      </table>
    `;

    this.showNotification('danger', notificationMarkup);
  }

  private showNotification(status: string, notificationMarkup: string): void {
    const options = {
      status: status,
      pos: 'bottom-left',
      timeout: this.timeout
    };
    Notification(notificationMarkup, options);
  }
}
