import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, PortalModule } from '../core';
import { Md2Datepicker } from './datepicker';
import { Md2Clock } from './clock';
import { DateUtil } from './date-util';
import { DateLocale } from './date-locale';
import { StyleModule } from '../core/style/index';


export * from './datepicker';
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
    Md2Clock,
  ],
  declarations: [
    Md2Datepicker,
    Md2Clock,
  ],
  providers: [DateLocale, DateUtil],
  entryComponents: [
    Md2Datepicker,
  ]
})
export class Md2DatepickerModule { }
