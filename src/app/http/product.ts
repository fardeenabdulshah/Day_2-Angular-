import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Product {
 http = inject(HttpClient);
 
  // constructor(private http:HttpClient){}

  getProductList(){
    const url="https://dummyjson.com/products";
    return this.http.get<any>(url);
  }
}
