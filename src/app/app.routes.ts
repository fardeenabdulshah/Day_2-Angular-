import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list';
import { ProductDetailComponent } from './product-detail/product-detail';
import { FavouritesComponent } from './favourites/favourites';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: '**', redirectTo: '' }
];