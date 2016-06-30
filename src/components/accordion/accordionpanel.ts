import {Component, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {Md2AccordionTab} from './accordiontab';

@Component({
  selector: 'md2-accordion',
  template: `<ng-content></ng-content>`,
  host: {
    '[ngClass]': 'md2Class',
    '[class.md2-accordion]': 'true'
  },
  styles: [`
    .md2-accordion { display: block; }
  `],
  encapsulation: ViewEncapsulation.None
})

export class Md2Accordion {

  @Input() multiple: boolean;

  @Input('class') md2Class: string;

  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  @Output() open: EventEmitter<any> = new EventEmitter<any>();

  public tabs: Md2AccordionTab[] = [];

  /**
   * Add or append tab in accordion
   * @param tab
   */
  addTab(tab: Md2AccordionTab) {
    this.tabs.push(tab);
  }
}