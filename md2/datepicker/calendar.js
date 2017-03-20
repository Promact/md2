var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DateLocale } from './date-locale';
export var Md2Calendar = (function () {
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
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Calendar.prototype, "selectedChange", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Calendar.prototype, "selected", null);
    __decorate([
        Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], Md2Calendar.prototype, "view", null);
    Md2Calendar = __decorate([
        Component({selector: 'md2-calendar',
            template: "<!--<div class=\"md2-calendar-years\" [class.active]=\"!_view\"> <div class=\"md2-calendar-years-content\"> <div *ngFor=\"let y of _years\" class=\"md2-calendar-year\" [class.selected]=\"y === _viewDay.year\" (click)=\"_setYear(y)\">{{y}}</div> </div> </div>--> <!--<div class=\"md2-calendar-month\" [class.active]=\"_view\">--> <!--<div class=\"md2-calendar-month-header\"> <div class=\"md2-button\" [class.disabled]=\"!_isBeforeMonth()\" (click)=\"_isBeforeMonth() && _updateMonth(-1)\"> <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path> </svg> </div> <div class=\"md2-calendar-month-year\">{{_viewDay.month}} {{_viewDay.year}}</div> <div class=\"md2-button\" [class.disabled]=\"!_isAfterMonth()\" (click)=\"_isAfterMonth() && _updateMonth(1)\"> <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path> </svg> </div> </div>--> <!--<table class=\"md2-calendar-dates\"> <thead><tr><th *ngFor=\"let day of _weekDays\">{{day.xshort}}</th></tr></thead> <tbody> <tr *ngFor=\"let w of _dates\"> <td *ngFor=\"let d of w\"> <div class=\"md2-calendar-day\" [class.today]=\"d.today\" [class.focus]=\"_locale.isSameDay(displayDate, d.date)\" [class.selected]=\"_locale.isSameDay(selected, d.date)\" [class.disabled]=\"d.disabled\" [class.prev-month]=\"d.calMonth===_prevMonth\" [class.curr-month]=\"d.calMonth===_currMonth\" [class.next-month]=\"d.calMonth===_nextMonth\" (click)=\"_onClickDate($event,d)\">{{d.dateObj.day}}</div> </td> </tr> </tbody> </table>--> <!--</div>--> <!--<div class=\"md2-calendar-header\"> <button type=\"button\" (click)=\"_left(false, days)\"> <svg viewBox=\"0 0 24 24\" style=\"display: inline-block; color: rgba(0, 0, 0, 0.48); fill: currentcolor; height: 24px; width: 24px; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; user-select: none;\"> <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path> </svg> </button> <div class=\"md2-calendar-month-year\">{{ date | date: 'MMMM y' }}</div> <button tabindex=\"0\" type=\"button\" (click)=\"_right(false, days)\"> <svg viewBox=\"0 0 24 24\" style=\"display: inline-block; color: rgba(0, 0, 0, 0.48); fill: currentcolor; height: 24px; width: 24px; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; user-select: none;\"> <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path> </svg> </button> </div> <div class=\"md2-calendar-week-days\"> <span class=\"md2-calendar-week-day\" *ngFor=\"let day of _days\">{{ day.xshort }}</span> </div> <div class=\"md2-calendar-dates\">--> <!--[class._before]=\"day.date<dateINT\" [class.md2-calendar-date-today]=\"day.dateActive==dateToday\" [class.md2-calendar-date-focused]=\"dayActive==day.dateActive || dayActive2==day.dateActive && days2!=0\" [class.md2-calendar-date-selected]=\"days2.length!=0&&day.date<=date2INT&&day.date>INT_DATE(_value)\" [class.md2-calendar-date-disabled]=\"false\" [class._parent_S]=\"dayActive==day.dateActive && !stateSELECT && days2!=0 || dayActive2==day.dateActive && stateSELECT && days2!=0\"--> <!--<div class=\"md2-calendar-date\" *ngFor=\"let date of dates\">{{ date }}</div> </div>--> ",
            styles: [".md2-calendar-header { display: flex; justify-content: space-between; font-size: 14px; font-weight: 700; text-align: center; line-height: 48px; } .md2-calendar-header .md2-calendar-month-year { width: 100%; } .md2-calendar-header button { display: inline-block; width: 48px; height: 48px; padding: 12px; outline: none; border: 0; cursor: pointer; background: transparent; } .md2-calendar-week-day { display: inline-block; width: 40px; line-height: 40px; margin: 1px; color: rgba(0, 0, 0, 0.38); text-align: center; text-transform: uppercase; } .md2-calendar-date { display: inline-block; width: 40px; line-height: 40px; margin: 1px; text-align: center; cursor: pointer; border-radius: 50%; border: 1px solid transparent; } .md2-calendar-date.md2-calendar-date-today { border-color: #106cc8; } .md2-calendar-date.md2-calendar-date-focused, .md2-calendar-date:hover { background: #e0e0e0; } .md2-calendar-date.md2-calendar-date-selected:not(.md2-calendar-date-disabled) { background: #106cc8; color: white; border-color: transparent; } .md2-calendar-date.md2-calendar-date-disabled { cursor: default; pointer-events: none; opacity: 0.5; } /*# sourceMappingURL=calendar.css.map */ "],
            host: {
                'role': 'calendar'
            },
        }), 
        __metadata('design:paramtypes', [ElementRef, DateLocale])
    ], Md2Calendar);
    return Md2Calendar;
}());
//# sourceMappingURL=calendar.js.map