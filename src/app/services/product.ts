import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Product {
  constructor(){
    console.log("product services");
  }
  getproduct(){
    return[
      {name:"laptop",price:20000},
      {name:"phone",price:10000}
    ]
  }
}
