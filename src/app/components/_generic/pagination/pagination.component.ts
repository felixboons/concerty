import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';

// @ts-ignore
import paginate from 'jw-paginate';
import {ArtistService} from '../../../_services/artist.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() items: Array<any> = [];
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 4;
  @Input() maxPages;

  pager: any = {};
  layoutThreshold = 5;

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.artistService.artistsSubject.subscribe(_ => {
      this.initializePages();
    })
  }

  initializePages(): void {
    if (this.items && this.items.length) {
      this.setPage(this.initialPage);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.items) {

      if (!this.maxPages) {
        this.maxPages = Math.ceil(this.items.length / this.pageSize);
      }

      if (changes.items.currentValue !== changes.items.previousValue) {
        this.setPage(this.initialPage);
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
