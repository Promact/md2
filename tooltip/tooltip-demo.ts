import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'tooltip-demo',
  templateUrl: 'tooltip-demo.html'
})
export class TooltipDemo {
  position: string = 'below';
  delay: number = 0;
}
