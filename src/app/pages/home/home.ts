import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../services/product';
import { FavouriteService } from '../../services/favourite';
import { Pagination } from '../../components/pagination/pagination';

@Component({
  selector: 'app-home',
  standalone: true,

  imports: [CommonModule, Pagination],

  templateUrl: './home.html'
})
export class Home implements OnInit {

  products: any[] = [];

  currentPage: number = 1;
  totalPages: number = 0;
  offset: number = 8;

  searchQuery: string = '';
  isSearchMode: boolean = false;

  categories: any[] = [];

  constructor(
    private productService: ProductService,
    public favService: FavouriteService
  ) {}

  ngOnInit(): void {
    this.loadPage(1);
    this.loadCategories();
  }

  loadPage(page: number): void {
    this.currentPage = page;

    if (this.isSearchMode) {
      this.productService
        .searchProducts(this.searchQuery, page, this.offset)
        .subscribe((data: any) => {
          this.products = data.products;
          this.totalPages = Math.ceil(data.total / this.offset);
        });
    } else {
      this.productService
        .fetchProducts(page, this.offset)
        .subscribe((data: any) => {
          this.products = data.products;
          this.totalPages = Math.ceil(data.total / this.offset);
        });
    }
  }

  search(event: any): void {
    const value = event.target.value.trim();

    if (!value) {
      this.isSearchMode = false;
      this.searchQuery = '';
      this.loadPage(1);
      return;
    }

    this.isSearchMode = true;
    this.searchQuery = value;
    this.loadPage(1);
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  // ✅ FILTER BY CATEGORY
  selectCategory(event: any): void {
    const category = event.target.value;

    if (!category) {
      this.loadPage(1);
      return;
    }

    this.productService
      .getCategoryProducts(category)
      .subscribe((data: any) => {
        this.products = data.products;

        // ❗ Important: reset pagination
        this.totalPages = 0;
      });
  }

  // ✅ FIXED PAGINATION ERROR
  changePage(page: number | any): void {
    this.loadPage(Number(page)); // 🔥 ensures it's number
  }
}