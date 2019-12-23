import {Component, OnInit} from '@angular/core';
import {Concert} from '../../../_models/concert.model';
import {ConcertService} from '../../../_services/concert.service';
import * as $ from 'jquery';
import * as UIkit from 'UIkit';

@Component({
  selector: 'app-concert-management',
  templateUrl: './concert-management.component.html',
  styleUrls: ['./concert-management.component.scss']
})
export class ConcertManagementComponent implements OnInit {
  concerts: Concert[] = [];
  selectedConcert: Concert = null;
  selectedConcertIndex: number = null;

  constructor(private concertService: ConcertService) {
  }

  ngOnInit() {
    this.concertService.concertsSubject
      .subscribe(concerts => this.concerts = concerts);
  }

  concertSelected(concert: Concert): void {
    this.selectedConcert = concert;
    this.selectedConcertIndex = this.concerts.indexOf(this.selectedConcert);

    // Tiny delay to smoothen accordion animation.
    if (concert) {
      setTimeout(() => this.toggleAccordionSections(), 10);
    } else {
      // Concert is not selected, but removed.
      this.editConcertCanceled();
    }
  }

  editConcertCanceled(): void {
    this.selectedConcert = null;
  }

  private toggleAccordionSections(): void {
    const accordionElement = $('.uk-accordion')[0];
    const newComponentClassName = accordionElement.children[1].className;
    const editComponentClassName = accordionElement.children[2].className;

    if (newComponentClassName === 'uk-open') {
      UIkit.accordion(accordionElement).toggle(1);
    }

    if (editComponentClassName != 'uk-open') {
      UIkit.accordion(accordionElement).toggle(2);
    }
  }
}
