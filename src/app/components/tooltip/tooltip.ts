import {Component} from '@angular/core';
import {TOOLTIP_DIRECTIVES} from '../../../components/tooltip/tooltip';

@Component({
  selector: 'tooltip',
  templateUrl: './app/components/tooltip/tooltip.html',
  directives: [TOOLTIP_DIRECTIVES]
})
export class Tooltip {
  public dynamicTooltip: string = 'Hello, World!';
  public dynamicTooltipText: string = 'dynamic';
  public htmlTooltip: string = 'I\'ve been made <b>bold</b>!';
}
