import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Md2AccordionTab } from './accordiontab';
import { coerceBooleanProperty } from '../core/core';
@Component({
  moduleId: module.id,
  selector: 'md2-accordion',
  template: `<ng-content></ng-content>`,
  styleUrls: ['accordion.css'],
  host: {
    '[class]': 'class',
    '[class.md2-accordion]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})

export class Md2Accordion {

  private _multiple: boolean;

  @Input()
  get multiple(): boolean { return this._multiple; }
  set multiple(value) { this._multiple = coerceBooleanProperty(value); }

  @Input() class: string = '';

  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  @Output() open: EventEmitter<any> = new EventEmitter<any>();

  public tabs: Md2AccordionTab[] = [];

  /**
   * Add or append tab in accordion
   * @param tab object of Md2AccordionTab
   */
  addTab(tab: Md2AccordionTab) {
    this.tabs.push(tab);
  }
}
