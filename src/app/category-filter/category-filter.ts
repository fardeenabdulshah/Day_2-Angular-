import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./category-filter.html' ,
  styleUrl: './category-filter.css'
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