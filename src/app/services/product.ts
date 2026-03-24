import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  BASE_URL = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  fetchProducts(page: number, limit: number = 8): Observable<any> {
    const skip = (page - 1) * limit;
    return this.http.get(`${this.BASE_URL}?limit=${limit}&skip=${skip}`);
  }

  fetchProductById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }

  searchProducts(query: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    return this.http.get(
      `${this.BASE_URL}/search?q=${query}&limit=${limit}&skip=${skip}`
    );
  }

  getCategories() {
    return this.http.get(`https://dummyjson.com/products/categories`);
  }

  getCategoryProducts(category: string) {
    return this.http.get(
      `https://dummyjson.com/products/category/${category}`
    );
  }
}