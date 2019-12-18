import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';

// @ts-ignore
import paginate from 'jw-paginate';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() items: Array<any> = [];
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 1;
  @Input() maxPages;

  pager: any = {};
  layoutThreshold = 5;

  constructor() { }

  ngOnInit() {
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
        console.log('onChanges');
        this.setPage(this.initialPage);
      }
    }
  }

  private setPage(page: number) {
    // get new pager object for specified page
    this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);

    // get new page of items from items array
    var pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);

    // call change page function in parent component
    this.changePage.emit(pageOfItems);
  }
}
