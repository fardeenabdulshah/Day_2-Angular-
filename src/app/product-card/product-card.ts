import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../models/product.model';
import { FavouriteService } from '../favourite';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl:'./product-card.html',
  styleUrl:'./product-card.css'
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