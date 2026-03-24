import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.html'
})
export class Pagination {

  @Input() total = 0;
  @Input() current = 1;

  @Output() pageChange = new EventEmitter<number>();

  change(page: number) {
    this.pageChange.emit(page);
  }
}