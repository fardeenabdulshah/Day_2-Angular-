import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Child} from './child/child'
import { CommonModule} from '@angular/common';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Password } from '@mui/icons-material';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Child,CommonModule,ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 userName = signal('hello sam');
  
//  addedProduct?: { name: string; price: number };
//   onProductAdded(product: { name: string; price: number }) {
//     this.addedProduct = product;
//   }

//   constructor(){
//     console.log("contructor call")
//   }
//   ngOnChange(){
//     console.log("ngOnChange");
//   }
//   ngOnInit(){
//     console.log("ngOnInit");
//   }
//   ngAfterViewChecked(){
//     console.log("ngAfterViewChecked");
//   }
//   ngDoCheck(){
//     console.log("ngDoCheck");
//   }
//   ngAfterContentInit(){
//     console.log("ngAfterContentInit");
//   }
//   ngAfterContentChecked(){
//     console.log("ngAfterContentChecked");
//   }
//   ngAfterViewInit(){
//     console.log("ngAfterViewInit")
//   }


//   ngOnDestroy(){
//     console.log("ngOnDestro")

    
// }

// users=["anil","sam","adam","rahul","pater"]; 
// islogged=true;

// role='user';
// pColor="red";
// student=['sam','peter','vijay'];
// user=true;

loginForm=new FormGroup({
  name:new FormControl(''),
  email:new FormControl(''),
  Password:new FormControl('')

});

handleProfile(){
  console.log(this.loginForm.value);
}

reset(){
  this.loginForm.setValue({
    name:'',
    email:'',
    Password:''

  });
}

}



