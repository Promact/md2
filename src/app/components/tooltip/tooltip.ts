import {Component} from '@angular/core';
import {TOOLTIP_DIRECTIVES} from '../../../components/tooltip/tooltip';

@Component({
  selector: 'tooltip',
  templateUrl: './app/components/tooltip/tooltip.html',
  directives: [TOOLTIP_DIRECTIVES]
})
export class Tooltip {
  private dynamicTooltip: string = 'Hello, World!';
  private dynamicTooltipText: string = 'dynamic';
  private htmlTooltip: string = 'I\'ve been made <b>bold</b>!';
}
