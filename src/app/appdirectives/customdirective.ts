import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appCustomdirective]',
})
export class Customdirective implements OnInit{
  constructor(private el:ElementRef) {}

  ngOnInit():void{
    this.el.nativeElement.style.backgroundColor='red';
  }
}
