import { Component } from '@angular/core';
import { Observable,of } from 'rxjs';
import {map,filter,tap} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-basic',
  imports: [],
  templateUrl: './rxjs-basic.html',
  styleUrl: './rxjs-basic.css',
})
export class RxjsBasic {
  // constructor(){
  //   const myobs$=new Observable(value=>{
  //     value.next("This is Demo");
  //   });

  //   myobs$.subscribe(mess=>{
  //     debugger;
  //     console.log(mess);
  //   })
  // }

  // constructor(){
  //   const obj$=new Observable(data=>{
  //     data.next(1);
  //     data.next(2);
  //     data.next(3);
  //     data.complete();
  //     data.next(5);
  //   });
    
  //   obj$.subscribe({
      
  //     next:(value)=>console.log(value),
      
  //     complete:()=>console.log('Done')
  //   })
  // }

  

  // constructor(){
  //   const isCheck$=new Observable(data=>{
  //     data.next(1);
  //     data.next(2);
  //     let check=true;
  //     if(check){
  //       data.error("in this code have an error");
  //     }else{
  //       data.next(3);
  //     }


  //   })

  //   isCheck$.subscribe({
  //     next:(value)=>console.log(value),
  //     error:(err)=>console.log('error',err)
  //   })
  // }
              // map operators
  array1=of(1,2,3).pipe(
    map(value=>value*10)
  )
  .subscribe(result=>console.log(result))

  



            //filter operator
array2=of(1,2,3,4).pipe(
  filter(value=>value%2===0)
).subscribe(result=>console.log(result));



            //tap operator
// array3=of(1, 2).pipe(
//     tap(value => console.log("Inside tap:", value))
//   )
//   .subscribe(result => console.log("Final:", result));


array4=of(1,2,3,4).pipe(
  tap(value=>console.log("Before tap:",value)),
  map(value=>value*2),
  tap(value=>console.log("after tap:",value))
).subscribe(result=>console.log("result:",result));

 
}