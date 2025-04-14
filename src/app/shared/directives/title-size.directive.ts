import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appTitleSize]',
  standalone: false
})
export class TitleSizeDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.el.nativeElement.style.fontSize = '20px';
  }
}