import {Component, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {Md2AccordionTab} from './accordiontab';

@Component({
  selector: 'md2-accordion',
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': 'mdClass',
    '[class.md2-accordion]': 'true'
  },
  styles: [`
    .md2-accordion { display: block; }
  `],
  encapsulation: ViewEncapsulation.None
})

export class Md2Accordion {

  @Input() multiple: boolean;

  @Input('md-class') mdClass: string;

  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  @Output() open: EventEmitter<any> = new EventEmitter<any>();

  public tabs: Md2AccordionTab[] = [];

  addTab(tab: Md2AccordionTab) {
    this.tabs.push(tab);
  }
}