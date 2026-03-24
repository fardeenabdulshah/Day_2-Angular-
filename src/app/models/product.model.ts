export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  category: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface FavouriteItem {
  id: number;
  qty: number;
}