import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  template: `
    <header class="header">
      <h1>Product Store</h1>
      <nav>
        <a routerLink="/" routerLinkActive="active">Home</a>
        <a routerLink="/favourites" routerLinkActive="active">Favourites</a>
      </nav>
    </header>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background-color: #222;
      color: white;
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .header nav a {
      color: white;
      text-decoration: none;
      margin-left: 20px;
      font-size: 16px;
    }
    .header nav a.active {
      text-decoration: underline;
    }
  `]
})
export class App {
  title = 'product-store';
}