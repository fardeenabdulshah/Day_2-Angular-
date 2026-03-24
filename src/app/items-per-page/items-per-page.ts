import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-items-per-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="items-per-page">
      <input 
        type="number"
        [(ngModel)]="itemsPerPage"
        (ngModelChange)="onChange()"
        min="1"
        class="items-input"
      >
    </section>
  `,
  styles: [`
    .items-per-page {
      padding: 20px;
      text-align: center;
    }
    .items-input {
      width: 150px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  `]
})
export class ItemsPerPageComponent {

  @Input() itemsPerPage: number =8;
  @Output() itemsPerPageChange = new EventEmitter<number>();

  onChange(): void {
    if (this.itemsPerPage > 0) {
      this.itemsPerPageChange.emit(this.itemsPerPage);
    }
  }
}