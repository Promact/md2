var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleModule, OverlayModule, PortalModule, A11yModule } from '../core';
import { Md2Datepicker, Md2DatepickerContent } from './datepicker';
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
var Md2DatepickerModule = (function () {
    function Md2DatepickerModule() {
    }
    return Md2DatepickerModule;
}());
Md2DatepickerModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            OverlayModule,
            PortalModule,
            StyleModule,
            A11yModule,
        ],
        exports: [
            Md2Datepicker,
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
            Md2DatepickerToggle,
            Md2Calendar,
            Md2MonthView,
            Md2YearView,
            Md2CalendarBody,
            Md2Clock,
        ],
        providers: [DateLocale, DateUtil],
        entryComponents: [
            Md2DatepickerContent
        ]
    })
], Md2DatepickerModule);
export { Md2DatepickerModule };
//# sourceMappingURL=index.js.map