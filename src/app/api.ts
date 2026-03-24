import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Product, ProductsResponse } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  fetchProducts(page: number, limit: number = 8): Observable<ProductsResponse> {
    const skip = (page - 1) * limit;
    return this.http.get<ProductsResponse>(`${this.BASE_URL}?limit=${limit}&skip=${skip}`);
  }

  fetchProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_URL}/${id}`);
  }

  fetchCategories(): Observable<Category[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/categories`);
  }

  searchProducts(query: string, page: number, limit: number): Observable<ProductsResponse> {
    const skip = (page - 1) * limit;
    return this.http.get<ProductsResponse>(`${this.BASE_URL}/search?q=${query}&limit=${limit}&skip=${skip}`);
  }

  fetchProductsByCategory(category: string): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${this.BASE_URL}/category/${category}`);
  }
}