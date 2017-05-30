import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Md2Datepicker } from './datepicker';
import { Md2DatepickerIntl } from './datepicker-intl';


@Component({
  moduleId: module.id,
  selector: 'button[md2DatepickerToggle]',
  template: '',
  styleUrls: ['datepicker-toggle.css'],
  host: {
    '[attr.type]': 'type',
    '[class.md2-datepicker-toggle]': 'true',
    '[attr.aria-label]': '_intl.openCalendarLabel',
    '(click)': '_open($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Md2DatepickerToggle<D> {
  @Input('md2DatepickerToggle') datepicker: Md2Datepicker<D>;

  @Input() type: string = 'button';

  constructor(public _intl: Md2DatepickerIntl) { }

  _open(event: Event): void {
    if (this.datepicker) {
      this.datepicker.open();
      event.stopPropagation();
    }
  }
}
