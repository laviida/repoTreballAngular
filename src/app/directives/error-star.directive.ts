import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appErrorStar]'
})
export class ErrorStarDirective {

  constructor(private e: ElementRef,
    private r: Renderer2) { }

  @HostListener("mouseenter")
  errorStarEnter() {
    this.e.nativeElement.innerHTML = "* " + this.e.nativeElement.innerHTML;
  }

  @HostListener("mouseleave")
  errorStarLeave() {
    this.e.nativeElement.innerHTML = this.e.nativeElement.innerHTML.replace("*", "");
  }
}
