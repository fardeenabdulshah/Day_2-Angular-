import { Component, forwardRef } from '@angular/core';
import { List } from '../list/list';

@Component({
  selector: 'app-list-item',
  imports: [forwardRef(()=>List)],
  templateUrl: './list-item.html',
  styleUrl: './list-item.css',
})
export class ListItem {

}
