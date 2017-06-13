var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { 
// ChangeDetectionStrategy,
Component, ElementRef, EventEmitter, Input, Output, } from '@angular/core';
import { DateUtil } from './date-util';
import { DateLocale } from './date-locale';
export var CLOCK_RADIUS = 50;
export var CLOCK_INNER_RADIUS = 27.5;
export var CLOCK_OUTER_RADIUS = 41.25;
export var CLOCK_TICK_RADIUS = 7.0833;
/**
 * A clock that is used as part of the datepicker.
 * @docs-private
 */
var Md2Clock = (function () {
    function Md2Clock(_element, _locale, _util) {
        var _this = this;
        this._element = _element;
        this._locale = _locale;
        this._util = _util;
        this.interval = 1;
        this.twelvehour = false;
        /** Emits when the currently selected date changes. */
        this.selectedChange = new EventEmitter();
        this.activeDateChange = new EventEmitter();
        /** Hours and Minutes representing the clock view. */
        this._hours = [];
        this._minutes = [];
        /** Whether the clock is in hour view. */
        this._hourView = true;
        this.mouseMoveListener = function (event) { _this._handleMousemove(event); };
        this.mouseUpListener = function (event) { _this._handleMouseup(event); };
    }
    Object.defineProperty(Md2Clock.prototype, "activeDate", {
        /**
         * The date to display in this clock view.
         */
        get: function () { return this._activeDate; },
        set: function (value) {
            var oldActiveDate = this._activeDate;
            this._activeDate = this._util.clampDate(value, this.min, this.max);
            if (!this._util.isSameMinute(oldActiveDate, this._activeDate)) {
                this._init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "selected", {
        /** The currently selected date. */
        get: function () { return this._selected; },
        set: function (value) {
            this._selected = this._util.parse(value);
            if (this._selected) {
                this.activeDate = this._selected;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "min", {
        /** The minimum selectable date. */
        get: function () { return this._min; },
        set: function (date) { this._min = this._util.parse(date); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "max", {
        /** The maximum selectable date. */
        get: function () { return this._max; },
        set: function (date) { this._max = this._util.parse(date); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "startView", {
        /** Whether the clock should be started in hour or minute view. */
        set: function (value) {
            this._hourView = value != 'minute';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "_hand", {
        get: function () {
            this._selectedHour = this._util.getHours(this.activeDate);
            this._selectedMinute = this._util.getMinutes(this.activeDate);
            var deg = 0;
            var radius = CLOCK_OUTER_RADIUS;
            if (this._hourView) {
                var outer = this.activeDate.getHours() > 0 && this.activeDate.getHours() < 13;
                radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
                if (this.twelvehour) {
                    radius = CLOCK_OUTER_RADIUS;
                }
                deg = Math.round(this.activeDate.getHours() * (360 / (24 / 2)));
            }
            else {
                deg = Math.round(this.activeDate.getMinutes() * (360 / 60));
            }
            return {
                'transform': "rotate(" + deg + "deg)",
                'height': radius + "%",
                'margin-top': 50 - radius + "%"
            };
        },
        enumerable: true,
        configurable: true
    });
    Md2Clock.prototype.ngAfterContentInit = function () {
        this.activeDate = this._activeDate || this._util.today();
        this._init();
    };
    /** Handles mousedown events on the clock body. */
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
        this.selectedChange.emit(this.activeDate);
    };
    /** Initializes this clock view. */
    Md2Clock.prototype._init = function () {
        this._hours.length = 0;
        this._minutes.length = 0;
        var hourNames = this._locale.getHourNames();
        var minuteNames = this._locale.getMinuteNames();
        if (this.twelvehour) {
            for (var i = 1; i < (hourNames.length / 2) + 1; i++) {
                var radian = i / 6 * Math.PI;
                var radius = CLOCK_OUTER_RADIUS;
                var date = new Date(this.activeDate.getTime());
                date.setHours(i + 1, 0, 0, 0);
                var enabled = this._util.isFullDateWithinRange(date, this.min, this.max);
                this._hours.push({
                    value: i,
                    displayValue: i === 0 ? '00' : hourNames[i],
                    enabled: enabled,
                    top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                    left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS,
                });
            }
        }
        else {
            for (var i = 0; i < hourNames.length; i++) {
                var radian = i / 6 * Math.PI;
                var outer = i > 0 && i < 13, radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
                var date = new Date(this.activeDate.getTime());
                date.setHours(i + 1, 0, 0, 0);
                var enabled = this._util.isFullDateWithinRange(date, this.min, this.max);
                this._hours.push({
                    value: i,
                    displayValue: i === 0 ? '00' : hourNames[i],
                    enabled: enabled,
                    top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                    left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS,
                    fontSize: i > 0 && i < 13 ? '' : '80%'
                });
            }
        }
        for (var i = 0; i < minuteNames.length; i += 5) {
            var radian = i / 30 * Math.PI;
            var date = new Date(this.activeDate.getTime());
            date.setMinutes(i, 0, 0);
            var enabled = this._util.isFullDateWithinRange(date, this.min, this.max);
            this._minutes.push({
                value: i,
                displayValue: i === 0 ? '00' : minuteNames[i],
                enabled: enabled,
                top: CLOCK_RADIUS - Math.cos(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
                left: CLOCK_RADIUS + Math.sin(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
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
        var unit = Math.PI / (this._hourView ? 6 : (this.interval ? (30 / this.interval) : 30));
        var z = Math.sqrt(x * x + y * y);
        var outer = this._hourView && z > ((width * (CLOCK_OUTER_RADIUS / 100)) +
            (width * (CLOCK_INNER_RADIUS / 100))) / 2;
        var value = 0;
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        value = Math.round(radian / unit);
        radian = value * unit;
        var date = new Date(this.activeDate.getTime());
        if (this._hourView) {
            if (this.twelvehour) {
                value = value === 0 ? 12 : value;
            }
            else {
                if (value === 12) {
                    value = 0;
                }
                value = outer ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
            }
            date.setHours(value);
        }
        else {
            if (this.interval) {
                value *= this.interval;
            }
            if (value === 60) {
                value = 0;
            }
            date.setMinutes(value);
        }
        this.activeDate = this._util.clampDate(date, this.min, this.max);
        this.activeDateChange.emit(this.activeDate);
    };
    return Md2Clock;
}());
__decorate([
    Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Md2Clock.prototype, "activeDate", null);
__decorate([
    Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Md2Clock.prototype, "selected", null);
__decorate([
    Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Md2Clock.prototype, "min", null);
__decorate([
    Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Md2Clock.prototype, "max", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], Md2Clock.prototype, "startView", null);
__decorate([
    Input(),
    __metadata("design:type", Function)
], Md2Clock.prototype, "dateFilter", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], Md2Clock.prototype, "interval", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Md2Clock.prototype, "twelvehour", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], Md2Clock.prototype, "selectedChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], Md2Clock.prototype, "activeDateChange", void 0);
Md2Clock = __decorate([
    Component({selector: 'md2-clock',
        template: "<div class=\"md2-clock\"><div class=\"md2-clock-center\"></div><div class=\"md2-clock-hand\" [ngStyle]=\"_hand\"></div><div class=\"md2-clock-hours\" [class.active]=\"_hourView\"><div *ngFor=\"let item of _hours\" class=\"md2-clock-cell\" [class.md2-clock-cell-selected]=\"_selectedHour == item.value\" [class.md2-clock-cell-disabled]=\"!item.enabled\" [style.top]=\"item.top+'%'\" [style.left]=\"item.left+'%'\" [style.fontSize]=\"item.fontSize\">{{ item.displayValue }}</div></div><div class=\"md2-clock-minutes\" [class.active]=\"!_hourView\"><div *ngFor=\"let item of _minutes\" class=\"md2-clock-cell\" [class.md2-clock-cell-selected]=\"_selectedMinute == item.value\" [class.md2-clock-cell-disabled]=\"!item.enabled\" [style.top]=\"item.top+'%'\" [style.left]=\"item.left+'%'\">{{ item.displayValue }}</div></div></div>",
        styles: [":host{position:relative;display:block;min-width:224px;margin:8px;font-size:14px;box-sizing:border-box;user-select:none}.md2-clock{position:relative;width:100%;height:0;padding-top:100%;background-color:#e0e0e0;border-radius:50%}.md2-clock-center{position:absolute;top:50%;left:50%;width:2%;height:2%;margin:-1%;border-radius:50%;background-color:#106cc8}.md2-clock-hand{position:absolute;top:0;right:0;bottom:0;left:0;width:1px;margin:0 auto;background-color:#106cc8;transform-origin:bottom}.md2-clock-hand::before{content:'';position:absolute;top:-4px;left:-4px;width:8px;height:8px;border-radius:50%;background-color:#106cc8}.md2-clock-hours,.md2-clock-minutes{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;visibility:hidden;transition:350ms;transform:scale(1.2)}.md2-clock-hours.active,.md2-clock-minutes.active{opacity:1;visibility:visible;transform:scale(1)}.md2-clock-minutes{transform:scale(.8)}.md2-clock-cell{position:absolute;display:flex;width:14.1666%;height:14.1666%;color:rgba(0,0,0,.87);justify-content:center;box-sizing:border-box;border-radius:50%;align-items:center;cursor:pointer}.md2-clock-cell:not(.md2-clock-cell-selected):not(.md2-clock-cell-disabled):hover{background-color:rgba(0,0,0,.1)}.md2-clock-cell.md2-clock-cell-disabled{color:rgba(0,0,0,.38);pointer-events:none}.md2-clock-cell.md2-clock-cell-selected{color:#fff;background-color:#1279e0} /*# sourceMappingURL=clock.css.map */ "],
        host: {
            'role': 'clock',
            '(mousedown)': '_handleMousedown($event)',
        },
    }),
    __metadata("design:paramtypes", [ElementRef,
        DateLocale, DateUtil])
], Md2Clock);
export { Md2Clock };
//# sourceMappingURL=clock.js.map