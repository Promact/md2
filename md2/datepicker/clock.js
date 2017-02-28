var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
export var CLOCK_HOURS = 24;
export var CLOCK_MINUTES = 60;
export var CLOCK_RADIUS = 120;
export var CLOCK_INNER_RADIUS = 66;
export var CLOCK_OUTER_RADIUS = 99;
export var CLOCK_TICK_RADIUS = 17;
export var Md2Clock = (function () {
    function Md2Clock(_element) {
        var _this = this;
        this._element = _element;
        this._view = true;
        this._hours = [];
        this._minutes = [];
        this._hour = 0;
        this._minute = 0;
        this.timeChange = new EventEmitter();
        this.onHourChange = new EventEmitter();
        this.onMinuteChange = new EventEmitter();
        this.renderClock();
        this.mouseMoveListener = function (event) { _this._handleMousemove(event); };
        this.mouseUpListener = function (event) { _this._handleMouseup(event); };
    }
    Object.defineProperty(Md2Clock.prototype, "time", {
        get: function () { return this._time; },
        set: function (value) {
            if (this._time !== value) {
                this._time = value || '00:00';
                this._hour = parseInt(this._time.split(':')[0]);
                this._minute = parseInt(this._time.split(':')[1]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "view", {
        set: function (value) {
            if (value === 'minute') {
                this._view = false;
            }
            else {
                this._view = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "hand", {
        get: function () {
            var deg = 0;
            var radius = CLOCK_OUTER_RADIUS;
            if (this._view) {
                var inner = this._hour > 0 && this._hour < 13;
                radius = inner ? CLOCK_INNER_RADIUS : CLOCK_OUTER_RADIUS;
                deg = Math.round(this._hour * (360 / (CLOCK_HOURS / 2)));
            }
            else {
                deg = Math.round(this._minute * (360 / CLOCK_MINUTES));
            }
            return {
                'transform': "rotate(" + deg + "deg)",
                'height': radius + "px",
                'margin-top': (120 - radius) + "px"
            };
        },
        enumerable: true,
        configurable: true
    });
    Md2Clock.prototype._handleMousedown = function (event) {
        this.setTime(event);
        document.addEventListener('mousemove', this.mouseMoveListener);
        document.addEventListener('touchmove', this.mouseMoveListener);
        document.addEventListener('mouseup', this.mouseUpListener);
        document.addEventListener('touchend', this.mouseUpListener);
    };
    Md2Clock.prototype._handleMousemove = function (event) {
        event.preventDefault();
        this.setTime(event);
    };
    Md2Clock.prototype._handleMouseup = function (event) {
        document.removeEventListener('mousemove', this.mouseMoveListener);
        document.removeEventListener('touchmove', this.mouseMoveListener);
        document.removeEventListener('mouseup', this.mouseUpListener);
        document.removeEventListener('touchend', this.mouseUpListener);
        if (this._view) {
            this.onHourChange.emit(this._hour);
        }
        else {
            this.onMinuteChange.emit(this._minute);
        }
    };
    Md2Clock.prototype._handleKeydown = function (event) { };
    /** Emits an event when the user selects a time. */
    Md2Clock.prototype._emitChangeEvent = function () {
        this.timeChange.emit(this.time);
    };
    /**
     * render Click
     */
    Md2Clock.prototype.renderClock = function () {
        this._hours.length = 0;
        for (var i = 0; i < CLOCK_HOURS; i++) {
            var radian = i / 6 * Math.PI;
            var inner = i > 0 && i < 13, radius = inner ? CLOCK_INNER_RADIUS : CLOCK_OUTER_RADIUS;
            this._hours.push({
                hour: i === 0 ? '00' : i,
                top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS
            });
        }
        for (var i = 0; i < CLOCK_MINUTES; i += 5) {
            var radian = i / 30 * Math.PI;
            this._minutes.push({
                minute: i === 0 ? '00' : i,
                top: CLOCK_RADIUS - Math.cos(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
                left: CLOCK_RADIUS + Math.sin(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS
            });
        }
    };
    /**
     * Set Time
     * @param event
     */
    Md2Clock.prototype.setTime = function (event) {
        var trigger = this._element.nativeElement;
        var triggerRect = trigger.getBoundingClientRect();
        var width = trigger.offsetWidth;
        var height = trigger.offsetHeight;
        var pageX = event.pageX !== undefined ? event.pageX : event.touches[0].pageX;
        var pageY = event.pageY !== undefined ? event.pageY : event.touches[0].pageY;
        var x = (width / 2) - (pageX - triggerRect.left - window.pageXOffset);
        var y = (height / 2) - (pageY - triggerRect.top - window.pageYOffset);
        var radian = Math.atan2(-x, y);
        var unit = Math.PI / (this._view ? 6 : 30);
        var z = Math.sqrt(x * x + y * y);
        var inner = this._view && z < (CLOCK_OUTER_RADIUS + CLOCK_INNER_RADIUS) / 2;
        var value = 0;
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        value = Math.round(radian / unit);
        radian = value * unit;
        if (this._view) {
            if (value === 12) {
                value = 0;
            }
            value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
            this._hour = value;
        }
        else {
            if (value === 60) {
                value = 0;
            }
            this._minute = value;
        }
        this._time = this._hour + ':' + this._minute;
        this._emitChangeEvent();
    };
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Clock.prototype, "timeChange", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Clock.prototype, "onHourChange", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Clock.prototype, "onMinuteChange", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Clock.prototype, "time", null);
    __decorate([
        Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], Md2Clock.prototype, "view", null);
    Md2Clock = __decorate([
        Component({selector: 'md2-clock',
            template: "<div class=\"md2-clock-center\"></div> <div class=\"md2-clock-hand\" [ngStyle]=\"hand\"></div> <div class=\"md2-clock-hours\" [class.active]=\"_view\"> <div *ngFor=\"let h of _hours\" class=\"md2-clock-hour\" [class.active]=\"_hour == h.hour\" [style.top.px]=\"h.top\" [style.left.px]=\"h.left\">{{ h.hour }}</div> </div> <div class=\"md2-clock-minutes\" [class.active]=\"!_view\"> <div *ngFor=\"let m of _minutes\" class=\"md2-clock-minute\" [class.active]=\"_minute == m.minute\" [style.top.px]=\"m.top\" [style.left.px]=\"m.left\">{{ m.minute }}</div> </div> ",
            styles: ["md2-datepicker { position: relative; display: inline-block; min-width: 175px; outline: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } md2-datepicker.md2-datepicker-disabled { pointer-events: none; cursor: default; } .md2-datepicker-trigger { display: block; padding: 18px 0 18px 32px; white-space: nowrap; cursor: pointer; } .md2-datepicker-icon { position: absolute; top: 21px; left: 0; display: block; height: 24px; width: 24px; vertical-align: middle; fill: currentColor; color: rgba(0, 0, 0, 0.54); } .md2-datepicker-disabled .md2-datepicker-icon { color: rgba(0, 0, 0, 0.38); } .md2-datepicker-input { color: rgba(0, 0, 0, 0.38); border-bottom: 1px solid rgba(0, 0, 0, 0.12); display: flex; justify-content: space-between; align-items: center; height: 30px; min-width: 168px; line-height: 22px; position: relative; box-sizing: border-box; } [aria-disabled='true'] .md2-datepicker-input { background-image: linear-gradient(to right, rgba(0, 0, 0, 0.26) 0, rgba(0, 0, 0, 0.26) 33%, transparent 0); background-size: 4px 1px; background-repeat: repeat-x; border-color: transparent; background-position: 0 bottom; cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-datepicker:focus:not(.md2-datepicker-disabled) .md2-datepicker-input { color: #106cc8; border-color: #106cc8; } md2-datepicker.ng-invalid.ng-touched:not(.md2-datepicker-disabled) .md2-datepicker-input { color: #f44336; border-color: #f44336; } .md2-datepicker-placeholder { position: absolute; right: 18px; bottom: 100%; left: 0; padding: 0 2px; transform: translate3d(0, 26px, 0) scale(1); transform-origin: left top; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; transition: all 150ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md2-datepicker-placeholder.md2-floating-placeholder { left: -2px; text-align: left; transform: translate3d(0, 6px, 0) scale(0.75); } [dir='rtl'] .md2-datepicker-placeholder { right: 0; left: 18px; transform-origin: right top; } [dir='rtl'] .md2-datepicker-placeholder.md2-floating-placeholder { right: -2px; text-align: right; } [aria-required=true] .md2-datepicker-placeholder::after { content: '*'; } .md2-datepicker-value { position: relative; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; color: rgba(0, 0, 0, 0.87); } .md2-datepicker-disabled .md2-datepicker-value { color: rgba(0, 0, 0, 0.38); } [dir='rtl'] .md2-datepicker-value { left: auto; right: 0; } .md2-datepicker-arrow { width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid; margin: 0 4px; color: rgba(0, 0, 0, 0.38); } md2-datepicker:focus:not(.md2-datepicker-disabled) .md2-datepicker-arrow { color: #106cc8; } md2-datepicker.ng-invalid.ng-touched:not(.md2-datepicker-disabled) .md2-datepicker-arrow { color: #f44336; } .md2-datepicker-panel { width: 300px; border-radius: 3px; background-color: white; overflow: hidden; box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12); outline: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .md2-datepicker-header { padding: 16px; color: white; font-weight: 500; white-space: nowrap; background: #106cc8; box-sizing: border-box; } .md2-datepicker-header .hidden { display: none; } .md2-datepicker-header-year { font-size: 16px; opacity: 0.7; cursor: pointer; } .md2-datepicker-header-year.active { opacity: 1; pointer-events: none; } .md2-datepicker-header-date-time { font-size: 32px; } .md2-datepicker-header-date { opacity: 0.7; cursor: pointer; } .md2-datepicker-header-date.active { opacity: 1; pointer-events: none; } .md2-datepicker-header-time { opacity: 0.7; display: inline-block; padding-left: 8px; cursor: pointer; } .md2-datepicker-header-time.active { opacity: 1; cursor: default; } .md2-datepicker-header-time.active .md2-datepicker-header-hour, .md2-datepicker-header-time.active .md2-datepicker-header-minute { opacity: 0.7; cursor: pointer; } .md2-datepicker-header-time.active .md2-datepicker-header-hour.active, .md2-datepicker-header-time.active .md2-datepicker-header-minute.active { opacity: 1; pointer-events: none; } .md2-datepicker-content { position: relative; width: 100%; padding-top: 300px; overflow: hidden; } .md2-datepicker-calendar { position: absolute; top: 0; right: 100%; display: block; width: 100%; height: 300px; transition: 300ms; } .md2-datepicker-calendar.active { right: 0; } .md2-calendar-years { position: absolute; top: 10px; right: 100%; bottom: 10px; display: block; width: 100%; line-height: 40px; background: white; overflow-x: hidden; overflow-y: auto; transition: 300ms; } .md2-calendar-years.active { right: 0; } .md2-calendar-years .md2-calendar-years-content { display: flex; flex-direction: column; justify-content: center; min-height: 100%; } .md2-calendar-year { position: relative; display: block; margin: 0 auto; padding: 0; font-size: 17px; font-weight: 400; text-align: center; cursor: pointer; } .md2-calendar-year.selected { color: #106cc8; font-size: 26px; font-weight: 500; } .md2-calendar-month { position: absolute; left: 100%; display: block; width: 100%; font-size: 12px; font-weight: 400; text-align: center; transition: 300ms; } .md2-calendar-month.active { left: 0; } .md2-calendar-month-header { display: flex; justify-content: space-between; font-size: 14px; font-weight: 700; text-align: center; line-height: 48px; } .md2-calendar-month-header .md2-button { display: inline-block; width: 48px; height: 48px; padding: 12px; outline: none; border: 0; cursor: pointer; background: transparent; box-sizing: border-box; } .md2-calendar-month-header .md2-button svg { vertical-align: top; } .md2-calendar-month-header .md2-calendar-month-year-header { width: 100%; } .md2-calendar-dates { margin: 0 auto; } .md2-calendar-dates th { width: 35px; height: 20px; font-weight: 500; line-height: 15px; opacity: 0.5; } .md2-calendar-dates td { padding: 0; } .md2-calendar-day { position: relative; display: inline-block; width: 35px; height: 35px; border-radius: 50%; text-align: center; cursor: pointer; line-height: 35px; box-sizing: border-box; } .md2-calendar-day.today { color: #106cc8; } .md2-calendar-day:hover, .md2-calendar-day.focus { background: #e0e0e0; } .md2-calendar-day.selected, .md2-calendar-day.selected:hover { color: white; background: #106cc8; } .md2-calendar-day.disabled, .md2-calendar-day.disabled:hover { color: rgba(0, 0, 0, 0.45); background: transparent; pointer-events: none; } .md2-calendar-day.prev-month, .md2-calendar-day.next-month { visibility: hidden; } md2-clock { position: absolute; top: 0; left: 100%; display: block; width: 240px; height: 240px; margin: 30px; font-size: 14px; font-weight: 400; text-align: center; background-color: #e0e0e0; border-radius: 50%; overflow: hidden; transition: 300ms; } md2-clock.active { left: 0; } .md2-clock-center { position: absolute; top: 50%; left: 50%; height: 6px; width: 6px; margin: -3px; border-radius: 50%; background-color: #106cc8; } .md2-clock-hand { position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 1px; height: 99px; margin: 0 auto; background-color: #106cc8; transform-origin: bottom; /*transition: all 100ms;*/ } .md2-clock-hand::before { content: ''; position: absolute; top: -4px; left: -4px; width: 8px; height: 8px; border-radius: 50%; background-color: #106cc8; } .md2-clock-hours, .md2-clock-minutes { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; visibility: hidden; transition: 350ms; transform: scale(1.2); } .md2-clock-hours.active, .md2-clock-minutes.active { opacity: 1; visibility: visible; transform: scale(1); } .md2-clock-minutes { transform: scale(0.8); } .md2-clock-hour, .md2-clock-minute { position: absolute; width: 34px; height: 34px; line-height: 34px; text-align: center; border-radius: 50%; cursor: pointer; } .md2-clock-hour:hover, .md2-clock-minute:hover { background: #fafafa; } .md2-clock-hour.active, .md2-clock-minute.active { background: #65acf3; } .md2-datepicker-actions { text-align: right; } .md2-datepicker-actions .md2-button { display: inline-block; min-width: 64px; margin: 4px 8px 8px 0; padding: 0 12px; font-size: 14px; color: #106cc8; line-height: 36px; text-align: center; text-transform: uppercase; border-radius: 2px; cursor: pointer; box-sizing: border-box; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1); } .md2-datepicker-actions .md2-button:hover { background: #ebebeb; } @media (min-width: 480px) { .md2-datepicker-panel { display: flex; width: 450px; } .md2-datepicker-header { width: 150px; min-width: 150px; padding-right: 15px; white-space: normal; word-wrap: break-word; } .md2-datepicker-header-time { display: block; padding-left: 0; } } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-global-overlay-wrapper { display: flex; position: absolute; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1000; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } .cdk-overlay-dark-backdrop { background: rgba(0, 0, 0, 0.6); } /*# sourceMappingURL=datepicker.css.map */ "],
            host: {
                'role': 'clock',
                '(mousedown)': '_handleMousedown($event)',
            },
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], Md2Clock);
    return Md2Clock;
}());
//# sourceMappingURL=clock.js.map