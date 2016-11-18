import {
  Component,
  Directive,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { Md2Accordion } from './accordionpanel';

@Directive({ selector: 'md2-accordion-header' })
export class Md2AccordionHeader { }

@Component({
  moduleId: module.id,
  selector: 'md2-accordion-tab',
  template: `
    <div class="md2-accordion-header" (click)="toggle($event)">
      <span>{{header}}</span>
      <ng-content select="md2-accordion-header"></ng-content>
      <span class="md2-accordion-header-icon"></span>
    </div>
    <div class="md2-accordion-tab-content">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['accordion.css'],
  host: {
    'role': 'accordion-tab',
    '[class.md2-accordion-tab-active]': 'active',
    '[class.md2-accordion-tab-disabled]': 'disabled'
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2AccordionTab {

  @Input() header: string;

  @Input() active: boolean;

  @Input() disabled: boolean;

  constructor(private accordion: Md2Accordion) {
    this.accordion.addTab(this);
  }

  /**
   * Toggle the accordion
   * @param event
   * @return if it is disabled
   */
  toggle(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    let index = this.findTabIndex();

    if (this.active) {
      this.active = !this.active;
      this.accordion.close.emit({ originalEvent: event, index: index });
    } else if (!this.accordion.multiple) {
      for (let i = 0; i < this.accordion.tabs.length; i++) {
        this.accordion.tabs[i].active = false;
      }
      this.active = true;
      this.accordion.open.emit({ originalEvent: event, index: index });
    } else {
      this.active = true;
      this.accordion.open.emit({ originalEvent: event, index: index });
    }

    event.preventDefault();
  }

  /**
   * Find index of specific tab of accordion
   * @return index number of this tab
   */
  findTabIndex() {
    let index = -1;
    for (let i = 0; i < this.accordion.tabs.length; i++) {
      if (this.accordion.tabs[i] === this) {
        index = i;
        break;
      }
    }
    return index;
  }
}
