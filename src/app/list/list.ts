import { Component,Input } from '@angular/core';
import { ListItem } from '../list-item/list-item';

@Component({
  selector: 'app-list',
  imports: [ListItem],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {

  @Input() fromListItem=false;
}
