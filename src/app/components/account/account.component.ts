import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (AccountComponent.hasNoActiveChildComponents()) {
      this.router.navigateByUrl('/account/tickets');
    }
  }

  private static hasNoActiveChildComponents(): boolean {
    const url = window.location.href;
    const urlSlices = url.split('/');
    const currentComponentPath = urlSlices[urlSlices.length - 1];
    return currentComponentPath === 'account';
  }
}
