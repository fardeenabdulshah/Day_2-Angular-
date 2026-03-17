import { Component ,EventEmitter,Input,Output} from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css',
})
export class Child {
  @Input() userName:string|undefined

  // @Output() SimpleData=new EventEmitter<{name:string,price:number}>();
  // addProduct() {
  //   const product = { name: 'Phone', price: 500 };
  //   this.productAdded.emit(product);
  // }
}
