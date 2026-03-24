import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavouriteService } from '../favourite';
import { ApiService } from '../api';
import { Product, FavouriteItem } from '../models/product.model';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="favourites-container">
      <div *ngIf="favouriteProducts.length === 0" class="no-favourites">
        <h2>No favourites yet</h2>
      </div>
      
      <div class="product-grid" *ngIf="favouriteProducts.length > 0">
        <div *ngFor="let item of favouriteProducts" class="product-card" (click)="goToProduct(item.product.id)">
          <img [src]="item.product.thumbnail" class="product-image" [alt]="item.product.title">
          <h3>{{ item.product.title }}</h3>
          <p>{{ item.product.price }}</p>
          <p>⭐ {{ item.product.rating }}</p>

          <div class="cart-controls">
            <button class="minus" (click)="onDecrease($event, item.product.id)">-</button>
            <span class="qty">{{ item.qty }}</span>
            <button class="plus" (click)="onIncrease($event, item.product.id)">+</button>
          </div>

          <button class="remove-fav-btn" (click)="onRemove($event, item.product.id)">Remove</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .favourites-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .no-favourites {
      text-align: center;
      padding: 50px;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      padding: 20px;
    }
    .product-card {
      background: white;
      border-radius: 10px;
      padding: 15px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: transform 0.2s;
    }
    .product-card:hover {
      transform: translateY(-5px);
    }
    .product-image {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 5px;
    }
    .product-card h3 {
      margin-top: 10px;
      font-size: 18px;
    }
    .product-card p {
      margin-top: 5px;
    }
    .cart-controls {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 10px;
      justify-content: center;
    }
    .cart-controls button {
      padding: 5px 10px;
      cursor: pointer;
    }
    .qty {
      font-weight: bold;
    }
    .remove-fav-btn {
      margin-top: 10px;
      padding: 8px 12px;
      border: none;
      background-color: #ff4757;
      color: white;
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
    }
    .remove-fav-btn:hover {
      background-color: #ff3838;
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
  `]
})
export class FavouritesComponent implements OnInit {
  favouriteProducts: { product: Product; qty: number }[] = [];

  constructor(
    private favouriteService: FavouriteService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadFavourites();
  }

  async loadFavourites(): Promise<void> {
    this.favouriteService.getFavourites().subscribe(async (favourites) => {
      this.favouriteProducts = [];
      for (const fav of favourites) {
        const product = await this.apiService.fetchProductById(fav.id).toPromise();
        if (product) {
          this.favouriteProducts.push({ product, qty: fav.qty });
        }
      }
    });
  }

  onIncrease(event: Event, id: number): void {
    event.stopPropagation();
    this.favouriteService.addFavourite(id);
    this.loadFavourites();
  }

  onDecrease(event: Event, id: number): void {
    event.stopPropagation();
    this.favouriteService.decreaseFavourite(id);
    this.loadFavourites();
  }

  onRemove(event: Event, id: number): void {
    event.stopPropagation();
    this.favouriteService.removeFavourite(id);
    this.loadFavourites();
  }

  goToProduct(id: number): void {
    window.location.href = `/product/${id}`;
  }
}