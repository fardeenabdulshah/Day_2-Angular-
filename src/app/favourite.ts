import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FavouriteItem } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private FAV_KEY = 'favouriteProducts';
  private favouritesSubject = new BehaviorSubject<FavouriteItem[]>([]);

  constructor() {
    this.loadFavourites();
  }

  private loadFavourites(): void {
    const fav = localStorage.getItem(this.FAV_KEY);
    const favourites = fav ? JSON.parse(fav) : [];
    this.favouritesSubject.next(favourites);
  }

  getFavourites(): Observable<FavouriteItem[]> {
    return this.favouritesSubject.asObservable();
  }

  private saveFavourites(list: FavouriteItem[]): void {
    localStorage.setItem(this.FAV_KEY, JSON.stringify(list));
    this.favouritesSubject.next(list);
  }

  addFavourite(id: number): void {
    const favs = this.favouritesSubject.value;
    const item = favs.find(f => f.id === id);

    if (item) {
      item.qty += 1;
    } else {
      favs.push({ id: id, qty: 1 });
    }

    this.saveFavourites(favs);
  }

  decreaseFavourite(id: number): void {
    let favs = this.favouritesSubject.value;
    const item = favs.find(f => f.id === id);

    if (!item) return;

    item.qty -= 1;

    if (item.qty <= 0) {
      favs = favs.filter(f => f.id !== id);
    }

    this.saveFavourites(favs);
  }

  removeFavourite(id: number): void {
    let favs = this.favouritesSubject.value;
    favs = favs.filter(f => f.id !== id);
    this.saveFavourites(favs);
  }

  isFavourite(id: number): boolean {
    return this.favouritesSubject.value.some(f => f.id === id);
  }

  getQty(id: number): number {
    const item = this.favouritesSubject.value.find(f => f.id === id);
    return item ? item.qty : 0;
  }
}