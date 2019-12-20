import { Component, OnInit } from '@angular/core';
import {ConcertService} from '../../../_services/concert.service';
import {Concert} from '../../../_models/concert.model';
import {ActivatedRoute} from '@angular/router';
import {DateHelper} from '../../../_helpers/date-helper';

@Component({
  selector: 'app-concert-details',
  templateUrl: './concert-details.component.html',
  styleUrls: ['./concert-details.component.scss']
})
export class ConcertDetailsComponent implements OnInit {
  concert: Concert;

  constructor(private concertService: ConcertService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
      const _id = params.key;
      this.concert = this.concertService.getConcert(_id);
    });
  }

  getPrettyDate(date: Date): string {
    return new DateHelper().getPrettyDate(date);
  }

}
