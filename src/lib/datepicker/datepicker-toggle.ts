import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {Md2Datepicker} from './datepicker';
import {Md2DatepickerIntl} from './datepicker-intl';


@Component({
  moduleId: module.id,
  selector: 'button[md2DatepickerToggle]',
  template: '',
  styleUrls: ['datepicker-toggle.css'],
  host: {
    'type': 'button',
    'class': 'md2-datepicker-toggle',
    '[attr.aria-label]': '_intl.openCalendarLabel',
    '(click)': '_open($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Md2DatepickerToggle<D> {
  /** Datepicker instance that the button will toggle. */
  @Input('md2DatepickerToggle') datepicker: Md2Datepicker<D>;

  constructor(public _intl: Md2DatepickerIntl) {}

  _open(event: Event): void {
    if (this.datepicker) {
      this.datepicker.open();
      event.stopPropagation();
    }
  }
}
