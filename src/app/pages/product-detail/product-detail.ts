import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product';

@Component({
  templateUrl: './product-detail.html'
})
export class ProductDetail implements OnInit {

  product: any;

  constructor(
    private route: ActivatedRoute,
    private service: ProductService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.service.fetchProductById(id)
      .subscribe((data) => this.product = data);
  }
}