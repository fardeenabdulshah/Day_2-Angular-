import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CapitalizePipePipe } from './capitalize-pipe-pipe';
@Component({
  selector: 'app-pipes',
  imports: [CommonModule,CapitalizePipePipe],
  templateUrl: './pipes.html',
  styleUrl: './pipes.css',
})
export class Pipes {
  date=new Date();
  name="fardeen";
}


