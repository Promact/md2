import { NgModule } from '@angular/core';
import { Md2MonthView } from './month-view';
import { CommonModule } from '@angular/common';
import { Md2YearView } from './year-view';
import { DateUtil } from './date-util';
import { DateLocale } from './date-locale';
import { OverlayModule, PortalModule } from '../core';
import { Md2Datepicker } from './datepicker';
import { Md2Clock } from './clock';
import { Md2Clock1 } from './clock1';
import { Md2Calendar } from './calendar';
import { StyleModule } from '../core/style/index';


export * from './calendar';
export * from './datepicker';
export * from './month-view';
export * from './year-view';
export * from './clock';
export * from './clock1';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    StyleModule,
  ],
  exports: [
    Md2Datepicker,
    Md2Calendar,
    Md2Clock,
    Md2Clock1
  ],
  declarations: [
    Md2Calendar,
    Md2Datepicker,
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
