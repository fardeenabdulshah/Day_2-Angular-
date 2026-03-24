import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { FavouriteService } from '../../services/favourite';

@Component({
  templateUrl: './favourites.html'
})
export class Favourites implements OnInit {

  products: any[] = [];

  constructor(
    private service: ProductService,
    public fav: FavouriteService
  ) {}

  ngOnInit() {
    const ids = this.fav.getAllIds();

    ids.forEach(id => {
      this.service.fetchProductById(+id)
        .subscribe((data) => this.products.push(data));
    });
  }
}