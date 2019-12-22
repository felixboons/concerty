import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ArtistService} from '../../../_services/artist.service';
import {ConcertService} from '../../../_services/concert.service';

// @ts-ignore
import paginate from 'jw-paginate';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Output() changePage = new EventEmitter<any>(true);
  @Input() items: Array<any> = [];
  @Input() initialPage = 1;
  @Input() pageSize = 6;
  @Input() maxPages;
  pager: any = {};

  constructor(private artistService: ArtistService,
              private concertService: ConcertService) {
  }

  ngOnInit() {
    this.artistService.artistsSubject
      .subscribe(_ => this.initializePages());
    this.concertService.concertsSubject
      .subscribe(_ => this.initializePages());
  }

  initializePages(): void {
    if (this.items && this.items.length) {
      this.setPage(this.pager.currentPage);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.items) {

      if (!this.maxPages) {
        this.maxPages = Math.ceil(this.items.length / this.pageSize);
      }

      if (changes.items.currentValue !== changes.items.previousValue) {
        this.initializePages();
      }
    }
  }

  setPage(page: number) {
    // get new pager object for specified page
    this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);

    // get new page of items from items array
    const pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);

    this.changePage.emit(pageOfItems);
  }
}
