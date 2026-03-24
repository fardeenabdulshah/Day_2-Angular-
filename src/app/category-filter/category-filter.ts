import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="category-section">
      <select id="category" (change)="onCategoryChange($event)">
        <option value="">All Categories</option>
        <option *ngFor="let cat of categories" [value]="cat.slug">
          {{ cat.name }}
        </option>
      </select>
    </section>
  `,
  styles: [`
    .category-section {
      padding: 20px;
      text-align: center;
    }
    .category-section select {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 14px;
    }
  `]
})
export class CategoryFilterComponent implements OnInit {
  categories: any[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.fetchCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onCategoryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.categorySelected.emit(select.value);
  }
}