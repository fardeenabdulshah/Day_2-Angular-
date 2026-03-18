import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {Child} from './child/child'//this is the child component
import { CommonModule} from '@angular/common';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Password } from '@mui/icons-material';
import { FormsModule, NgForm } from '@angular/forms';
import {Customdirective} from './appdirectives/customdirective'
import {Loginform} from './loginform/loginform'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Child,CommonModule,ReactiveFormsModule,FormsModule,Customdirective,Loginform,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
//  userName = signal('hello sam');
  
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

// // users=["anil","sam","adam","rahul","pater"]; 
// // islogged=true;

// // role='user';
// // pColor="red";
// // student=['sam','peter','vijay'];
// // user=true;

// //                reactive form

// loginForm=new FormGroup({
//   name:new FormControl('',[Validators.required]),
//   email:new FormControl('',[Validators.required,Validators.minLength(5)]),
//   Password:new FormControl('',[Validators.required,Validators.maxLength(50),Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])

// });

// handleProfile(){
//   console.log(this.loginForm.value);
// }

// reset(){
//   this.loginForm.setValue({
//     name:'',
//     email:'',
//     Password:''

//   });
// }

// get name(){
//   return this.loginForm.get('name');
// }
// get email(){
//   return this.loginForm.get('email');
// }
// get password(){
//   return this.loginForm.get('Password');
// }
// // addDetails(data: NgForm) {
// //     console.log(data);
    
// //   }

//   // two way data binding
//   //name="sam"



}



