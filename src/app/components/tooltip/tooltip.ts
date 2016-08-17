import {Component} from '@angular/core';

@Component({
  selector: 'tooltip',
  templateUrl: './app/components/tooltip/tooltip.html'
})
export class Tooltip {
  private dynamicTooltip: string = 'Hello, World!';
  private dynamicTooltipText: string = 'dynamic';
  private htmlTooltip: string = 'I\'ve been made <b>bold</b>!';
}
