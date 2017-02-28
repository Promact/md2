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
export var Md2Clock = (function () {
    function Md2Clock(_element) {
        this._element = _element;
        this._view = true;
        this.selectedChange = new EventEmitter();
        this.renderCalendar();
    }
    Object.defineProperty(Md2Clock.prototype, "selected", {
        get: function () { return this._selected; },
        set: function (value) {
            if (this._selected !== value) {
                this._selected = value || new Date();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "view", {
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
    Md2Clock.prototype._emitChangeEvent = function () {
        this.selectedChange.emit(this.selected);
    };
    /**
     * render Calendar
     */
    Md2Clock.prototype.renderCalendar = function () {
    };
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Clock.prototype, "selectedChange", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Clock.prototype, "selected", null);
    __decorate([
        Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], Md2Clock.prototype, "view", null);
    Md2Clock = __decorate([
        Component({selector: 'md2-calendar',
            template: "<!--<div class=\"md2-calendar-years\" [class.active]=\"!_view\"> <div class=\"md2-calendar-years-content\"> <div *ngFor=\"let y of _years\" class=\"md2-calendar-year\" [class.selected]=\"y === _viewDay.year\" (click)=\"_setYear(y)\">{{y}}</div> </div> </div> <div class=\"md2-calendar-month\" [class.active]=\"_view\"> <div class=\"md2-calendar-month-header\"> <div class=\"md2-button\" [class.disabled]=\"!_isBeforeMonth()\" (click)=\"_isBeforeMonth() && _updateMonth(-1)\"> <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path> </svg> </div> <div class=\"md2-calendar-month-year\">{{_viewDay.month}} {{_viewDay.year}}</div> <div class=\"md2-button\" [class.disabled]=\"!_isAfterMonth()\" (click)=\"_isAfterMonth() && _updateMonth(1)\"> <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path> </svg> </div> </div> <table class=\"md2-calendar-dates\"> <thead><tr><th *ngFor=\"let day of _weekDays\">{{day.xshort}}</th></tr></thead> <tbody> <tr *ngFor=\"let w of _dates\"> <td *ngFor=\"let d of w\"> <div class=\"md2-calendar-day\" [class.today]=\"d.today\" [class.focus]=\"_dateUtil.isSameDay(displayDate, d.date)\" [class.selected]=\"_dateUtil.isSameDay(selected, d.date)\" [class.disabled]=\"d.disabled\" [class.prev-month]=\"d.calMonth===_prevMonth\" [class.curr-month]=\"d.calMonth===_currMonth\" [class.next-month]=\"d.calMonth===_nextMonth\" (click)=\"_onClickDate($event,d)\">{{d.dateObj.day}}</div> </td> </tr> </tbody> </table> </div>--> ",
            styles: [" /*# sourceMappingURL=calendar.css.map */ "],
            host: {
                'role': 'calendar'
            },
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], Md2Clock);
    return Md2Clock;
}());
//# sourceMappingURL=calendar.js.map