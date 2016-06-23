import {Component, ElementRef, OnInit, AfterViewInit} from '@angular/core';

@Component({
  selector: 'code-prettify',
  template: `{{code}}`
})
export class CodePrettify implements OnInit {
  private code: string;
  private element: ElementRef;
  constructor(element: ElementRef) {
    this.element = element;
  }

  ngOnInit() {
    console.log(this.element);
    this.code = this.element.nativeElement.innerHTML;
  }

  //ngAfterContentInit

  private ngAfterViewInit(): void {
    console.log(this.element);
  }

}