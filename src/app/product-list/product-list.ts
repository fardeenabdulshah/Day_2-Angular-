import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ApiService } from '../api';
import { FavouriteService } from '../favourite';
import { ProductCardComponent } from '../product-card/product-card';
import { CategoryFilterComponent } from '../category-filter/category-filter';
import { ItemsPerPageComponent } from '../items-per-page/items-per-page';
import { PaginationComponent } from '../pagination/pagination';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductCardComponent,
    CategoryFilterComponent,
    ItemsPerPageComponent,
    PaginationComponent
  ],
  template: `
    <div class="product-list-container">
      <section class="search-section">
        <input 
          type="text"
          [(ngModel)]="searchQuery"
          (ngModelChange)="onSearchChange()"
          placeholder="Search product by title..."
          class="search-input"
        />
      </section>

      <app-category-filter (categorySelected)="onCategorySelected($event)"></app-category-filter>
      <app-items-per-page [itemsPerPage]="offset" (itemsPerPageChange)="onItemsPerPageChange($event)"></app-items-per-page>

      <div class="product-grid">
        <app-product-card 
          *ngFor="let product of products"
          [product]="product"
          (updateCart)="refreshCart()">
        </app-product-card>
      </div>

      <app-pagination 
        [totalPages]="totalPages"
        [currentPage]="currentPage"
        (pageChange)="goToPage($event)">
      </app-pagination>

      <div id="scrollTrigger"></div>
    </div>
  `,
  styles: [`
    .product-list-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .search-section {
      padding: 20px;
      text-align: center;
    }
    .search-input {
      width: 300px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      padding: 20px;
    }
    @media screen and (max-width: 900px) {
      .product-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media screen and (max-width: 500px) {
      .product-grid {
        grid-template-columns: 1fr;
      }
    }
    #scrollTrigger {
      height: 20px;
    }
  `]
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  currentPage = 1;
  totalPages = 0;
  offset = 8;
  isSearchMode = false;
  searchQuery = '';
  isCategoryMode = false;
  selectedCategory = '';
  private pageCache: { [key: string]: Product[] } = {};
  private searchSubject = new Subject<string>();
  private scrollTrigger: IntersectionObserver | null = null;

  constructor(
    private apiService: ApiService,
    private favouriteService: FavouriteService
  ) {
    const savedOffset = localStorage.getItem('itemsPerPage');
    if (savedOffset) {
      this.offset = parseInt(savedOffset);
    }
  }

  ngOnInit(): void {
    this.loadPage(1);
    this.setupSearchDebounce();
    this.setupInfiniteScroll();
  }

  ngOnDestroy(): void {
    if (this.scrollTrigger) {
      this.scrollTrigger.disconnect();
    }
  }

  private setupSearchDebounce(): void {
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(query => {
        if (!query) {
          this.isSearchMode = false;
          return this.apiService.fetchProducts(1, this.offset);
        }
        this.isSearchMode = true;
        return this.apiService.searchProducts(query, 1, this.offset);
      })
    ).subscribe(data => {
      this.products = data.products;
      this.totalPages = Math.ceil(data.total / this.offset);
      this.currentPage = 1;
    });
  }

  private setupInfiniteScroll(): void {
    this.scrollTrigger = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !this.isSearchMode && !this.isCategoryMode) {
        const nextPage = this.currentPage + 1;
        if (nextPage <= this.totalPages) {
          this.loadPage(nextPage, true);
        }
      }
    }, { rootMargin: '200px' });

    const trigger = document.getElementById('scrollTrigger');
    if (trigger) {
      this.scrollTrigger.observe(trigger);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const cards = document.querySelectorAll('.product-card');
    if (!cards.length) return;
    
    const cardHeight = (cards[0] as HTMLElement).offsetHeight;
    const scrollTop = window.scrollY;
    const pageHeight = cardHeight * this.offset;
    const visiblePage = Math.floor(scrollTop / pageHeight) + 1;
    
    if (visiblePage !== this.currentPage && visiblePage <= this.totalPages) {
      this.currentPage = visiblePage;
    }
  }

  loadPage(page: number, append: boolean = false): void {
    this.currentPage = page;

    if (!append && !this.isSearchMode && !this.isCategoryMode) {
      const cacheKey = `${page}_${this.offset}`;
      if (this.pageCache[cacheKey]) {
        this.products = this.pageCache[cacheKey];
        return;
      }
    }

    let request;
    if (this.isSearchMode) {
      request = this.apiService.searchProducts(this.searchQuery, page, this.offset);
    } else if (this.isCategoryMode && this.selectedCategory) {
      request = this.apiService.fetchProductsByCategory(this.selectedCategory);
    } else {
      request = this.apiService.fetchProducts(page, this.offset);
    }

    request.subscribe(data => {
      if (!this.isSearchMode && !this.isCategoryMode) {
        const cacheKey = `${page}_${this.offset}`;
        this.pageCache[cacheKey] = data.products;
      }

      if (this.isCategoryMode) {
        this.products = data.products;
        this.totalPages = 1;
      } else {
        this.totalPages = Math.ceil(data.total / this.offset);
        if (append) {
          this.products = [...this.products, ...data.products];
        } else {
          this.products = data.products;
        }
      }
    });
  }

  goToPage(page: number): void {
    window.scrollTo(0, 0);
    this.loadPage(page, false);
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchQuery);
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
    this.isCategoryMode = !!category;
    
    if (!category) {
      this.isSearchMode = false;
      this.loadPage(1, false);
      return;
    }
    
    this.apiService.fetchProductsByCategory(category).subscribe(data => {
      this.products = data.products;
      this.totalPages = 1;
      this.currentPage = 1;
    });
  }

  onItemsPerPageChange(newOffset: number): void {
    this.offset = newOffset;
    localStorage.setItem('itemsPerPage', this.offset.toString());
    this.pageCache = {};
    this.currentPage = 1;
    this.totalPages = 0;
    this.loadPage(1, false);
  }

  refreshCart(): void {
    // Trigger change detection if needed
  }
}