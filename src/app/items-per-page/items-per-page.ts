import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-items-per-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl:'./items-per-page.html' ,
  styleUrl: './items-per-page.css'
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