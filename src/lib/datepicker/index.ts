import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, PortalModule } from '../core';
import { Md2Datepicker } from './datepicker';
import { Md2Datepicker2, Md2DatepickerContent } from './datepicker2';
import { Md2DatepickerInput } from './datepicker-input';
import { Md2DatepickerToggle } from './datepicker-toggle';
import { Md2Calendar } from './calendar';
import { Md2MonthView } from './month-view';
import { Md2YearView } from './year-view';
import { Md2CalendarBody } from './calendar-body';
import { Md2Clock } from './clock';
import { Md2DatepickerIntl } from './datepicker-intl';
import { DateUtil } from './date-util';
import { DateLocale } from './date-locale';
import { StyleModule } from '../core/style/index';


export * from './datepicker';
export * from './datepicker2';
export * from './month-view';
export * from './year-view';
export * from './calendar-body';
export * from './clock';
export * from './date-util';
export * from './date-locale';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    StyleModule,
  ],
  exports: [
    Md2Datepicker,
    Md2Datepicker2,
    Md2DatepickerContent,
    Md2DatepickerInput,
    Md2DatepickerToggle,
    Md2Calendar,
    Md2CalendarBody,
    Md2Clock,
  ],
  declarations: [
    Md2Datepicker,
    Md2Datepicker2,
    Md2DatepickerContent,
    Md2DatepickerInput,
    Md2DatepickerToggle,
    Md2Calendar,
    Md2MonthView,
    Md2YearView,
    Md2CalendarBody,
    Md2Clock,
  ],
  providers: [Md2DatepickerIntl, DateLocale, DateUtil],
  entryComponents: [
    Md2Datepicker,
    Md2DatepickerContent
  ]
})
export class Md2DatepickerModule { }
