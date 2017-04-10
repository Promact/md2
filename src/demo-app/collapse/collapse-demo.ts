import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'collapse-demo',
  templateUrl: '../collapse/collapse-demo.html',
  styles: [`
    .collapse { display: none; }
    .collapse.in { display: block; }
    .collapsing {
      position: relative;
      height: 0;
      overflow: hidden;
      transition: height, visibility 0.35s ease;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class CollapseDemo {
  _isCollapsedContent: boolean = false;
  _isCollapsedImage: boolean = true;
}
