import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  getItems() {
    return JSON.parse(localStorage.getItem('fav') || '{}');
  }

  saveItems(data: any) {
    localStorage.setItem('fav', JSON.stringify(data));
  }

  add(id: number) {
    const items = this.getItems();
    items[id] = (items[id] || 0) + 1;
    this.saveItems(items);
  }

  decrease(id: number) {
    const items = this.getItems();
    if (items[id]) {
      items[id]--;
      if (items[id] <= 0) delete items[id];
      this.saveItems(items);
    }
  }

  getQty(id: number) {
    const items = this.getItems();
    return items[id] || 0;
  }

  getAllIds() {
    return Object.keys(this.getItems());
  }
}