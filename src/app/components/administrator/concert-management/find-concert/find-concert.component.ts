import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Concert} from '../../../../_models/concert.mode';

@Component({
  selector: 'app-find-concert',
  templateUrl: './find-concert.component.html',
  styleUrls: ['./find-concert.component.scss']
})
export class FindConcertComponent implements OnInit {
  @Input() concerts: Concert[] = [];
  @Output() concertRemoved = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  getLastDigitsOfId(id: string, digits = 5): string {
    return id.substring(id.length - digits, id.length);
  }

  removeConcert(index: number): void {
    this.concertRemoved.emit(index);
  }
}
