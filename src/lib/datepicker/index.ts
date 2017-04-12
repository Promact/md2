import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, PortalModule } from '../core';
import { Md2Datepicker } from './datepicker';
import { Md2DatepickerPanel } from './datepicker-panel';
import { Md2Calendar } from './calendar';
import { Md2MonthView } from './month-view';
import { Md2YearView } from './year-view';
import { Md2Clock } from './clock';
import { Md2Clock1 } from './clock1';
import { DateUtil } from './date-util';
import { DateLocale } from './date-locale';
import { StyleModule } from '../core/style/index';


export * from './datepicker';
export * from './calendar';
export * from './month-view';
export * from './year-view';
export * from './clock';
export * from './clock1';
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
    Md2DatepickerPanel,
    Md2Calendar,
    Md2Clock,
    Md2Clock1
  ],
  declarations: [
    Md2Datepicker,
    Md2DatepickerPanel,
    Md2Calendar,
    Md2MonthView,
    Md2YearView,
    Md2Clock,
    Md2Clock1
  ],
  providers: [DateLocale, DateUtil],
  entryComponents: [
    Md2Datepicker,
  ]
})
export class Md2DatepickerModule { }
