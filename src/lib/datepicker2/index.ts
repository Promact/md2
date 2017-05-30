import { NgModule } from '@angular/core';
import { Md2MonthView } from './month-view';
import { CommonModule } from '@angular/common';
import { Md2CalendarBody } from './calendar-body';
import { Md2YearView } from './year-view';
import { Md2ClockView } from './clock-view';
import { OverlayModule } from '../core/overlay/overlay-directives';
import { Md2Datepicker, Md2DatepickerContent } from './datepicker';
import { Md2DatepickerInput } from './datepicker-input';
import { Md2Calendar } from './calendar';
import { Md2DatepickerToggle } from './datepicker-toggle';
import { StyleModule } from '../core/style/index';
import { Md2DatepickerIntl } from './datepicker-intl';



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
    Md2Datepicker,
    Md2DatepickerContent,
    Md2DatepickerInput,
    Md2DatepickerToggle,
  ],
  declarations: [
    Md2Calendar,
    Md2CalendarBody,
    Md2Datepicker,
    Md2DatepickerContent,
    Md2DatepickerInput,
    Md2DatepickerToggle,
    Md2MonthView,
    Md2YearView,
    Md2ClockView,
  ],
  providers: [Md2DatepickerIntl],
  entryComponents: [
    Md2DatepickerContent,
  ]
})
export class Md2Datepicker2Module { }
