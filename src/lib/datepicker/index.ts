import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleModule, OverlayModule, PortalModule, A11yModule } from '../core';
import { Md2Datepicker, Md2DatepickerContent } from './datepicker';
import { Md2DatepickerInput } from './datepicker-input';
import { Md2DatepickerToggle } from './datepicker-toggle';
import { Md2Calendar } from './calendar';
import { Md2MonthView } from './month-view';
import { Md2YearView } from './year-view';
import { Md2CalendarBody } from './calendar-body';
import { Md2Clock } from './clock';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';


export * from './datepicker';
export * from './month-view';
export * from './year-view';
export * from './calendar-body';
export * from './clock';
export * from './date-locale';
export * from './date-util';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    StyleModule,
    A11yModule,
  ],
  exports: [
    Md2Datepicker,
    Md2DatepickerContent,
    Md2DatepickerInput,
    Md2DatepickerToggle,
    Md2Calendar,
    Md2CalendarBody,
    Md2Calendar,
    Md2MonthView,
    Md2YearView,
    Md2CalendarBody,
    Md2Clock,
  ],
  declarations: [
    Md2Datepicker,
    Md2DatepickerContent,
    Md2DatepickerInput,
    Md2DatepickerToggle,
    Md2Calendar,
    Md2MonthView,
    Md2YearView,
    Md2CalendarBody,
    Md2Clock,
  ],
  providers: [DateLocale, DateUtil],
  entryComponents: [
    Md2Datepicker,
    Md2DatepickerContent
  ]
})
export class Md2DatepickerModule { }
