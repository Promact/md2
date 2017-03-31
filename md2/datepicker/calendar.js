var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, Input, Output, EventEmitter, } from '@angular/core';
import { DateLocale } from './date-locale';
var Md2Calendar = (function () {
    function Md2Calendar(_element, _locale) {
        this._element = _element;
        this._locale = _locale;
        this._days = this._locale.days;
        this.dates = [];
        this._view = true;
        this.selectedChange = new EventEmitter();
        this.renderCalendar();
    }
    Object.defineProperty(Md2Calendar.prototype, "selected", {
        get: function () { return this._selected; },
        set: function (value) {
            if (this._selected !== value) {
                this._selected = value || new Date();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "date", {
        get: function () { return this._date; },
        set: function (value) {
            if (this._date !== value) {
                this._date = value || new Date();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "view", {
        set: function (value) {
            if (value === 'years') {
                this._view = false;
            }
            else {
                this._view = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    /** Emits an event when the user selects a time. */
    Md2Calendar.prototype._emitChangeEvent = function () {
        this.selectedChange.emit(this.selected);
    };
    /**
     * render Calendar
     */
    Md2Calendar.prototype.renderCalendar = function () {
        //let year = this.date.getFullYear();
        //let month = this.date.getMonth();
        //this.dates.length = 0;
        //let firstDayOfMonth = this._locale.getFirstDateOfMonth(this.date);
        //let numberOfDaysInMonth = this._locale.getNumberOfDaysInMonth(this.date);
        //let numberOfDaysInPrevMonth = this._locale.getNumberOfDaysInMonth(
        //  this._locale.incrementMonths(this.date, -1));
        //let dayNbr = 1;
        ////let calMonth = this._prevMonth;
        //if (i === 1) {
        //  let prevMonth = numberOfDaysInPrevMonth - firstDayOfMonth.getDay() + 1;
        //  for (let j = prevMonth; j <= numberOfDaysInPrevMonth; j++) {
        //    let iDate: IDate = { year: year, month: month - 1, day: j, hour: 0, minute: 0 };
        //    let date: Date = new Date(year, month - 1, j);
        //    week.push({
        //      date: date,
        //      dateObj: iDate,
        //      calMonth: calMonth,
        //      today: this._locale.isSameDay(this.today, date),
        //      disabled: this._isDisabledDate(date)
        //    });
        //  }
        //  calMonth = this._currMonth;
        //  let daysLeft = 7 - week.length;
        //  for (let j = 0; j < daysLeft; j++) {
        //    let iDate: IDate = { year: year, month: month, day: dayNbr, hour: 0, minute: 0 };
        //    let date: Date = new Date(year, month, dayNbr);
        //    week.push({
        //      date: date,
        //      dateObj: iDate,
        //      calMonth: calMonth,
        //      today: this._locale.isSameDay(this.today, date),
        //      disabled: this._isDisabledDate(date)
        //    });
        //    dayNbr++;
        //  }
        //} else {
        //  for (let j = 1; j < 8; j++) {
        //    if (dayNbr > numberOfDaysInMonth) {
        //      dayNbr = 1;
        //      calMonth = this._nextMonth;
        //    }
        //    let iDate: IDate = {
        //      year: year,
        //      month: calMonth === this._currMonth ? month : month + 1,
        //      day: dayNbr, hour: 0, minute: 0
        //    };
        //    let date: Date = new Date(year, iDate.month, dayNbr);
        //    week.push({
        //      date: date,
        //      dateObj: iDate,
        //      calMonth: calMonth,
        //      today: this._locale.isSameDay(this.today, date),
        //      disabled: this._isDisabledDate(date)
        //    });
        //    dayNbr++;
        //  }
        //  this.dates.push(week);
        //}
    };
    return Md2Calendar;
}());
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2Calendar.prototype, "selectedChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Date])
], Md2Calendar.prototype, "selected", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], Md2Calendar.prototype, "view", null);
Md2Calendar = __decorate([
    Component({selector: 'md2-calendar',
        template: "",
        styles: [".md2-calendar-header{display:flex;justify-content:space-between;font-size:14px;font-weight:700;text-align:center;line-height:48px}.md2-calendar-header .md2-calendar-month-year{width:100%}.md2-calendar-header button{display:inline-block;width:48px;height:48px;padding:12px;outline:0;border:0;cursor:pointer;background:0 0}.md2-calendar-week-day{display:inline-block;width:40px;line-height:40px;margin:1px;color:rgba(0,0,0,.38);text-align:center;text-transform:uppercase}.md2-calendar-date{display:inline-block;width:40px;line-height:40px;margin:1px;text-align:center;cursor:pointer;border-radius:50%;border:1px solid transparent}.md2-calendar-date.md2-calendar-date-today{border-color:#106cc8}.md2-calendar-date.md2-calendar-date-focused,.md2-calendar-date:hover{background:#e0e0e0}.md2-calendar-date.md2-calendar-date-selected:not(.md2-calendar-date-disabled){background:#106cc8;color:#fff;border-color:transparent}.md2-calendar-date.md2-calendar-date-disabled{cursor:default;pointer-events:none;opacity:.5} /*# sourceMappingURL=calendar.css.map */ "],
        host: {
            'role': 'calendar'
        },
    }),
    __metadata("design:paramtypes", [ElementRef, DateLocale])
], Md2Calendar);
export { Md2Calendar };
//# sourceMappingURL=calendar.js.map