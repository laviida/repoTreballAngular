import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLoginButton]'
})
export class LoginButtonDirective {

  constructor(private e: ElementRef,
    private r: Renderer2) { }

  @HostListener("mouseenter")
  enter() {
    this.r.setStyle(this.e.nativeElement, "background", "#03e9f4");
    this.r.setStyle(this.e.nativeElement, "color", "#fff");
    this.r.setStyle(this.e.nativeElement, "border-radius", "5px");
    this.r.setStyle(this.e.nativeElement, "box-shadow", "0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,0 0 100px #03e9f4");
  }

  @HostListener('mouseleave')
  leave() {
    this.r.setStyle(this.e.nativeElement, "background", "none");
    this.r.setStyle(this.e.nativeElement, "color", "#fff");
    this.r.setStyle(this.e.nativeElement, "border-radius", "0px");
    this.r.setStyle(this.e.nativeElement, "box-shadow", "none");
  }

}
