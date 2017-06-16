var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewEncapsulation } from '@angular/core';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '../core/keyboard/keycodes';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
import { slideCalendar } from './datepicker-animations';
/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
var Md2Calendar = (function () {
    function Md2Calendar(_elementRef, _ngZone, _locale, _util) {
        var _this = this;
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._locale = _locale;
        this._util = _util;
        this.type = 'date';
        /** Whether the calendar should be started in month or year view. */
        this.startView = 'month';
        this.timeInterval = 1;
        /** Emits when the currently selected date changes. */
        this.selectedChange = new EventEmitter();
        /** Date filter for the month and year views. */
        this._dateFilterForViews = function (date) {
            return !!date &&
                (!_this.dateFilter || _this.dateFilter(date)) &&
                (!_this.minDate || _this._util.compareDate(date, _this.minDate) >= 0) &&
                (!_this.maxDate || _this._util.compareDate(date, _this.maxDate) <= 0);
        };
        /** Whether the calendar is in month view. */
        this._currentView = 'month';
        this._clockView = 'hour';
    }
    Object.defineProperty(Md2Calendar.prototype, "_activeDate", {
        /**
         * The current active date. This determines which time period is shown and which date is
         * highlighted when using keyboard navigation.
         */
        get: function () { return this._clampedActiveDate; },
        set: function (value) {
            var oldActiveDate = this._clampedActiveDate;
            this._clampedActiveDate = this._util.clampDate(value, this.minDate, this.maxDate);
            if (oldActiveDate && this._clampedActiveDate && this._currentView === 'month' &&
                !this._util.isSameMonthAndYear(oldActiveDate, this._clampedActiveDate)) {
                if (this._util.isInNextMonth(oldActiveDate, this._clampedActiveDate)) {
                    this.calendarState('right');
                }
                else {
                    this.calendarState('left');
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_yearLabel", {
        /** The label for the current calendar view. */
        get: function () {
            return this._locale.getYearName(this._activeDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_monthYearLabel", {
        get: function () {
            return this._currentView === 'month' ? this._locale.getMonthLabel(this._activeDate) :
                this._locale.getYearName(this._activeDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_dateLabel", {
        get: function () {
            return this._locale.getDateLabel(this._activeDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_hoursLabel", {
        get: function () {
            return ('0' + this._locale.getHoursLabel(this._activeDate)).slice(-2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_minutesLabel", {
        get: function () {
            return ('0' + this._locale.getMinutesLabel(this._activeDate)).slice(-2);
        },
        enumerable: true,
        configurable: true
    });
    Md2Calendar.prototype.ngAfterContentInit = function () {
        this._activeDate = this.startAt || this._util.today();
        this._elementRef.nativeElement.focus();
        if (this.type === 'month') {
            this._currentView = 'year';
        }
        else if (this.type === 'time') {
            this._currentView = 'clock';
        }
        else {
            this._currentView = this.startView || 'month';
        }
    };
    /** Handles date selection in the month view. */
    Md2Calendar.prototype._dateSelected = function (date) {
        if (this.type == 'date') {
            if (!this._util.sameDate(date, this.selected)) {
                this.selectedChange.emit(date);
            }
        }
        else {
            this._activeDate = date;
            this._currentView = 'clock';
        }
    };
    /** Handles month selection in the year view. */
    Md2Calendar.prototype._monthSelected = function (month) {
        if (this.type == 'month') {
            if (!this._util.isSameMonthAndYear(month, this.selected)) {
                this.selectedChange.emit(this._util.getFirstDateOfMonth(month));
            }
        }
        else {
            this._activeDate = month;
            this._currentView = 'month';
            this._clockView = 'hour';
        }
    };
    Md2Calendar.prototype._timeSelected = function (date) {
        if (this._clockView !== 'minute') {
            this._activeDate = date;
            this._clockView = 'minute';
        }
        else {
            if (!this._util.sameDateAndTime(date, this.selected)) {
                this.selectedChange.emit(date);
            }
        }
    };
    Md2Calendar.prototype._onActiveDateChange = function (date) {
        this._activeDate = date;
    };
    Md2Calendar.prototype._yearClicked = function () {
        this._currentView = 'year';
    };
    Md2Calendar.prototype._dateClicked = function () {
        this._currentView = 'month';
    };
    Md2Calendar.prototype._hoursClicked = function () {
        this._currentView = 'clock';
        this._clockView = 'hour';
    };
    Md2Calendar.prototype._minutesClicked = function () {
        this._currentView = 'clock';
        this._clockView = 'minute';
    };
    /** Handles user clicks on the previous button. */
    Md2Calendar.prototype._previousClicked = function () {
        this._activeDate = this._currentView === 'month' ?
            this._util.addCalendarMonths(this._activeDate, -1) :
            this._util.addCalendarYears(this._activeDate, -1);
    };
    /** Handles user clicks on the next button. */
    Md2Calendar.prototype._nextClicked = function () {
        this._activeDate = this._currentView === 'month' ?
            this._util.addCalendarMonths(this._activeDate, 1) :
            this._util.addCalendarYears(this._activeDate, 1);
    };
    /** Whether the previous period button is enabled. */
    Md2Calendar.prototype._previousEnabled = function () {
        if (!this.minDate) {
            return true;
        }
        return !this.minDate || !this._isSameView(this._activeDate, this.minDate);
    };
    /** Whether the next period button is enabled. */
    Md2Calendar.prototype._nextEnabled = function () {
        return !this.maxDate || !this._isSameView(this._activeDate, this.maxDate);
    };
    /** Handles keydown events on the calendar body. */
    Md2Calendar.prototype._handleCalendarBodyKeydown = function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        if (this._currentView === 'month') {
            this._handleCalendarBodyKeydownInMonthView(event);
        }
        else if (this._currentView === 'year') {
            this._handleCalendarBodyKeydownInYearView(event);
        }
        else {
            this._handleCalendarBodyKeydownInClockView(event);
        }
    };
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    Md2Calendar.prototype._isSameView = function (date1, date2) {
        return this._currentView === 'month' ?
            this._util.getYear(date1) == this._util.getYear(date2) &&
                this._util.getMonth(date1) == this._util.getMonth(date2) :
            this._util.getYear(date1) == this._util.getYear(date2);
    };
    /** Handles keydown events on the calendar body when calendar is in month view. */
    Md2Calendar.prototype._handleCalendarBodyKeydownInMonthView = function (event) {
        switch (event.keyCode) {
            case LEFT_ARROW:
                this._activeDate = this._util.addCalendarDays(this._activeDate, -1);
                break;
            case RIGHT_ARROW:
                this._activeDate = this._util.addCalendarDays(this._activeDate, 1);
                break;
            case UP_ARROW:
                this._activeDate = this._util.addCalendarDays(this._activeDate, -7);
                break;
            case DOWN_ARROW:
                this._activeDate = this._util.addCalendarDays(this._activeDate, 7);
                break;
            case HOME:
                this._activeDate = this._util.addCalendarDays(this._activeDate, 1 - this._util.getDate(this._activeDate));
                break;
            case END:
                this._activeDate = this._util.addCalendarDays(this._activeDate, (this._util.getNumDaysInMonth(this._activeDate) -
                    this._util.getDate(this._activeDate)));
                break;
            case PAGE_UP:
                this._activeDate = event.altKey ?
                    this._util.addCalendarYears(this._activeDate, -1) :
                    this._util.addCalendarMonths(this._activeDate, -1);
                break;
            case PAGE_DOWN:
                this._activeDate = event.altKey ?
                    this._util.addCalendarYears(this._activeDate, 1) :
                    this._util.addCalendarMonths(this._activeDate, 1);
                break;
            case ENTER:
                if (this._dateFilterForViews(this._activeDate)) {
                    this._dateSelected(this._activeDate);
                    // Prevent unexpected default actions such as form submission.
                    event.preventDefault();
                }
                return;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /** Handles keydown events on the calendar body when calendar is in year view. */
    Md2Calendar.prototype._handleCalendarBodyKeydownInYearView = function (event) {
        switch (event.keyCode) {
            case LEFT_ARROW:
                this._activeDate = this._util.addCalendarMonths(this._activeDate, -1);
                break;
            case RIGHT_ARROW:
                this._activeDate = this._util.addCalendarMonths(this._activeDate, 1);
                break;
            case UP_ARROW:
                this._activeDate = this._prevMonthInSameCol(this._activeDate);
                break;
            case DOWN_ARROW:
                this._activeDate = this._nextMonthInSameCol(this._activeDate);
                break;
            case HOME:
                this._activeDate = this._util.addCalendarMonths(this._activeDate, -this._util.getMonth(this._activeDate));
                break;
            case END:
                this._activeDate = this._util.addCalendarMonths(this._activeDate, 11 - this._util.getMonth(this._activeDate));
                break;
            case PAGE_UP:
                this._activeDate =
                    this._util.addCalendarYears(this._activeDate, event.altKey ? -10 : -1);
                break;
            case PAGE_DOWN:
                this._activeDate =
                    this._util.addCalendarYears(this._activeDate, event.altKey ? 10 : 1);
                break;
            case ENTER:
                this._monthSelected(this._activeDate);
                break;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /** Handles keydown events on the calendar body when calendar is in month view. */
    Md2Calendar.prototype._handleCalendarBodyKeydownInClockView = function (event) {
        switch (event.keyCode) {
            case UP_ARROW:
                this._activeDate = this._clockView == 'hour' ?
                    this._util.addCalendarHours(this._activeDate, 1) :
                    this._util.addCalendarMinutes(this._activeDate, 1);
                break;
            case DOWN_ARROW:
                this._activeDate = this._clockView == 'hour' ?
                    this._util.addCalendarHours(this._activeDate, -1) :
                    this._util.addCalendarMinutes(this._activeDate, -1);
                break;
            case ENTER:
                this._timeSelected(this._activeDate);
                return;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /**
     * Determine the date for the month that comes before the given month in the same column in the
     * calendar table.
     */
    Md2Calendar.prototype._prevMonthInSameCol = function (date) {
        // Determine how many months to jump forward given that there are 2 empty slots at the beginning
        // of each year.
        var increment = this._util.getMonth(date) <= 4 ? -5 :
            (this._util.getMonth(date) >= 7 ? -7 : -12);
        return this._util.addCalendarMonths(date, increment);
    };
    /**
     * Determine the date for the month that comes after the given month in the same column in the
     * calendar table.
     */
    Md2Calendar.prototype._nextMonthInSameCol = function (date) {
        // Determine how many months to jump forward given that there are 2 empty slots at the beginning
        // of each year.
        var increment = this._util.getMonth(date) <= 4 ? 7 :
            (this._util.getMonth(date) >= 7 ? 5 : 12);
        return this._util.addCalendarMonths(date, increment);
    };
    Md2Calendar.prototype.calendarState = function (direction) {
        this._calendarState = direction;
    };
    Md2Calendar.prototype._calendarStateDone = function () {
        this._calendarState = '';
    };
    return Md2Calendar;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2Calendar.prototype, "type", void 0);
__decorate([
    Input(),
    __metadata("design:type", Date)
], Md2Calendar.prototype, "startAt", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2Calendar.prototype, "startView", void 0);
__decorate([
    Input(),
    __metadata("design:type", Date)
], Md2Calendar.prototype, "selected", void 0);
__decorate([
    Input(),
    __metadata("design:type", Date)
], Md2Calendar.prototype, "minDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Date)
], Md2Calendar.prototype, "maxDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], Md2Calendar.prototype, "timeInterval", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], Md2Calendar.prototype, "dateFilter", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], Md2Calendar.prototype, "selectedChange", void 0);
Md2Calendar = __decorate([
    Component({selector: 'md2-calendar',
        template: "<div class=\"md2-calendar-header\"><div *ngIf=\"type!=='time'\" class=\"md2-calendar-header-year\" [class.active]=\"_currentView == 'year'\" (click)=\"_yearClicked()\">{{ _yearLabel }}</div><div class=\"md2-calendar-header-date-time\"><span *ngIf=\"type!=='time'\" class=\"md2-calendar-header-date\" [class.active]=\"_currentView == 'month'\" (click)=\"_dateClicked()\">{{ _dateLabel }}</span> <span *ngIf=\"type!=='date'\" class=\"md2-calendar-header-time\" [class.active]=\"_currentView == 'clock'\"><span class=\"md2-calendar-header-hours\" [class.active]=\"_clockView == 'hour'\" (click)=\"_hoursClicked()\">{{ _hoursLabel }}</span>:<span class=\"md2-calendar-header-minutes\" [class.active]=\"_clockView == 'minute'\" (click)=\"_minutesClicked()\">{{ _minutesLabel }}</span></span></div></div><div class=\"md2-calendar-content\" [ngSwitch]=\"_currentView\"><div class=\"md2-month-content\" *ngIf=\"_currentView === 'month' || _currentView === 'year'\"><div class=\"md2-calendar-controls\"><div class=\"md2-calendar-previous-button\" [class.disabled]=\"!_previousEnabled()\" (click)=\"_previousClicked()\" aria-label=\"Previous month\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path></svg></div><div class=\"md2-calendar-period-button\" [@slideCalendar]=\"_calendarState\" (@slideCalendar.done)=\"_calendarStateDone()\"><strong>{{ _monthYearLabel }}</strong></div><div class=\"md2-calendar-next-button\" [class.disabled]=\"!_nextEnabled()\" (click)=\"_nextClicked()\" aria-label=\"Next month\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path></svg></div></div></div><md2-month-view *ngSwitchCase=\"'month'\" [activeDate]=\"_activeDate\" [selected]=\"selected\" [dateFilter]=\"_dateFilterForViews\" (selectedChange)=\"_dateSelected($event)\"></md2-month-view><md2-year-view *ngSwitchCase=\"'year'\" [activeDate]=\"_activeDate\" [selected]=\"selected\" [dateFilter]=\"_dateFilterForViews\" (selectedChange)=\"_monthSelected($event)\"></md2-year-view><md2-clock *ngSwitchDefault [startView]=\"_clockView\" [interval]=\"timeInterval\" [min]=\"minDate\" [max]=\"maxDate\" [selected]=\"_activeDate\" (activeDateChange)=\"_onActiveDateChange($event)\" (selectedChange)=\"_timeSelected($event)\"></md2-clock></div>",
        styles: [".md2-calendar{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:block;outline:0}.md2-calendar[mode=landscape]{display:flex}.md2-calendar-header{padding:16px;font-size:14px;background-color:#106cc8;color:#fff;box-sizing:border-box}[mode=landscape] .md2-calendar-header{width:150px;min-width:150px}.md2-calendar-header-date-time,.md2-calendar-header-year{width:100%;font-weight:500;white-space:nowrap}.md2-calendar-header-date-time{font-size:30px;line-height:34px}[mode=landscape] .md2-calendar-header-date-time{white-space:normal;word-wrap:break-word}.md2-calendar-header-date:not(.active),.md2-calendar-header-hours:not(.active),.md2-calendar-header-minutes:not(.active),.md2-calendar-header-year:not(.active){cursor:pointer;opacity:.6}.md2-calendar-header-time{padding-left:8px}.md2-calendar-header-time:not(.active){opacity:.6}.md2-calendar-header-time:not(.active) .md2-calendar-header-hours,.md2-calendar-header-time:not(.active) .md2-calendar-header-minutes{cursor:pointer;opacity:1}[mode=landscape] .md2-calendar-header-time{display:block;padding-left:0}.md2-calendar-content{width:100%;padding:0 8px 8px 8px;outline:0;box-sizing:border-box;overflow:hidden}[mode=landscape] .md2-calendar-content{padding-top:8px}.md2-calendar-controls{display:flex;justify-content:space-between}.md2-calendar-period-button{display:inline-block;height:48px;padding:12px;outline:0;border:0;background:0 0;box-sizing:border-box}.md2-calendar-next-button,.md2-calendar-previous-button{display:inline-block;width:48px;height:48px;padding:12px;outline:0;border:0;cursor:pointer;background:0 0;box-sizing:border-box}.md2-calendar-next-button.disabled,.md2-calendar-previous-button.disabled{color:rgba(0,0,0,.38);pointer-events:none}.md2-calendar-next-button svg,.md2-calendar-previous-button svg{fill:currentColor;vertical-align:top}.md2-calendar-table{border-spacing:0;border-collapse:collapse;width:100%}.md2-calendar-table-header{color:rgba(0,0,0,.38)}.md2-calendar-table-header th{text-align:center;font-size:11px;padding:0 0 8px 0}@media (min-width:480px){.md2-calendar[mode=auto]{display:flex}.md2-calendar[mode=auto] .md2-calendar-header{width:150px;min-width:150px}.md2-calendar[mode=auto] .md2-calendar-header-date-time{white-space:normal;word-wrap:break-word}.md2-calendar[mode=auto] .md2-calendar-header-time{display:block;padding-left:0}.md2-calendar[mode=auto] .md2-calendar-content{padding-top:8px}} /*# sourceMappingURL=calendar.css.map */ "],
        host: {
            '[class.md2-calendar]': 'true',
            'tabindex': '0',
            '(keydown)': '_handleCalendarBodyKeydown($event)',
        },
        animations: [slideCalendar],
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
    }),
    __metadata("design:paramtypes", [ElementRef, NgZone,
        DateLocale, DateUtil])
], Md2Calendar);
export { Md2Calendar };
//# sourceMappingURL=calendar.js.map