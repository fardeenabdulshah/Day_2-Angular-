import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-detail-container" *ngIf="product">
      <div class="product-detail">
        <img [src]="product.thumbnail" width="300" [alt]="product.title">
        <h2>{{ product.title }}</h2>
        <p><b>Price:</b> {{ product.price }}</p>
        <p><b>Category:</b> {{ product.category }}</p>
        <p><b>Rating:</b> ⭐ {{ product.rating }}</p>
        <p>{{ product.description }}</p>
      </div>
    </div>
  `,
  styles: [`
    .product-detail-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
    }
    .product-detail {
      text-align: center;
    }
    .product-detail img {
      width: 300px;
      margin-bottom: 20px;
      border-radius: 10px;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.apiService.fetchProductById(parseInt(id)).subscribe(product => {
        this.product = product;
      });
    }
  }
}