import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../models/product.model';
import { FavouriteService } from '../favourite';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="product-card" (click)="onCardClick()">
      <img [src]="product.thumbnail" class="product-image" [alt]="product.title">
      <h3>{{ product.title }}</h3>
      <p>{{product.price }}</p>
      <p>⭐ {{ product.rating }}</p>

      <div class="cart-controls">
        <button class="minus" (click)="onDecrease($event)">-</button>
        <span class="qty">{{ qty }}</span>
        <button class="plus" (click)="onIncrease($event)">+</button>
      </div>
    </div>
  `,
  styles: [`
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
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() updateCart = new EventEmitter<void>();

  qty: number = 0;

  constructor(private favouriteService: FavouriteService) {
    this.favouriteService.getFavourites().subscribe(() => {
      this.qty = this.favouriteService.getQty(this.product?.id);
    });
  }

  ngOnChanges() {
    if (this.product) {
      this.qty = this.favouriteService.getQty(this.product.id);
    }
  }

  onIncrease(event: Event): void {
    event.stopPropagation();
    this.favouriteService.addFavourite(this.product.id);
    this.qty = this.favouriteService.getQty(this.product.id);
    this.updateCart.emit();
  }

  onDecrease(event: Event): void {
    event.stopPropagation();
    this.favouriteService.decreaseFavourite(this.product.id);
    this.qty = this.favouriteService.getQty(this.product.id);
    this.updateCart.emit();
  }

  onCardClick(): void {
    window.location.href = `/product/${this.product.id}`;
  }
}