import { Component } from '@angular/core';

@Component({
  selector: 'tooltip-demo',
  templateUrl: '../tooltip/tooltip-demo.html'
})
export class TooltipDemo {
  tooltip: string = 'Tooltip!';
  position: string = 'below';
  delay: number = 0;
}
