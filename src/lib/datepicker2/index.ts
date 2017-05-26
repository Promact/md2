import { NgModule } from '@angular/core';
import { Md2MonthView } from './month-view';
import { CommonModule } from '@angular/common';
import { Md2CalendarBody } from './calendar-body';
import { Md2YearView } from './year-view';
import { OverlayModule } from '../core/overlay/overlay-directives';
import { MdDatepicker, MdDatepickerContent } from './datepicker';
import { MdDatepickerInput } from './datepicker-input';
import { MdCalendar } from './calendar';
import { MdDatepickerToggle } from './datepicker-toggle';
import { StyleModule } from '../core/style/index';
import { MdDatepickerIntl } from './datepicker-intl';



export * from './calendar';
export * from './calendar-body';
export * from './datepicker';
export * from './datepicker-input';
export * from './datepicker-intl';
export * from './datepicker-toggle';
export * from './month-view';
export * from './year-view';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    StyleModule,
  ],
  exports: [
    MdDatepicker,
    MdDatepickerContent,
    MdDatepickerInput,
    MdDatepickerToggle,
  ],
  declarations: [
    MdCalendar,
    Md2CalendarBody,
    MdDatepicker,
    MdDatepickerContent,
    MdDatepickerInput,
    MdDatepickerToggle,
    Md2MonthView,
    Md2YearView,
  ],
  providers: [MdDatepickerIntl],
  entryComponents: [
    MdDatepickerContent,
  ]
})
export class Md2Datepicker2Module { }
