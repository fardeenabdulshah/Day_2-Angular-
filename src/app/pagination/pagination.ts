import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pagination" *ngIf="totalPages > 1">
      <button *ngFor="let page of pages" 
        [class.active]="page === currentPage"
        (click)="goToPage(page)">
        {{ page }}
      </button>
    </div>
  `,
  styles: [`
    .pagination {
      text-align: center;
      padding: 20px;
      position: sticky;
      bottom: 0;
      background: #f5f5f5;
    }
    .pagination button {
      margin: 5px;
      padding: 8px 12px;
      border: none;
      background-color: #ddd;
      border-radius: 5px;
      cursor: pointer;
    }
    .pagination button.active {
      background-color: #333;
      color: white;
    }
  `]
})
export class PaginationComponent {
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}