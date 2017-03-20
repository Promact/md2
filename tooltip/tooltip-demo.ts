import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'tooltip-demo',
  templateUrl: 'tooltip-demo.html'
})
export class TooltipDemo {
  tooltip: string = 'Tooltip!';
  position: string = 'below';
  delay: number = 0;
}
