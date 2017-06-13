var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
import { Md2CalendarCell } from './calendar-body';
import { MD_DATE_FORMATS } from '../core/datetime/date-formats';
import { slideCalendar } from './datepicker-animations';
var DAYS_PER_WEEK = 7;
/**
 * An internal component used to display a single month in the datepicker.
 * @docs-private
 */
var Md2MonthView = (function () {
    function Md2MonthView(_locale, _util, _dateFormats) {
        this._locale = _locale;
        this._util = _util;
        this._dateFormats = _dateFormats;
        /** Emits when a new date is selected. */
        this.selectedChange = new EventEmitter();
        if (!this._dateFormats) {
            throw Error('MD_DATE_FORMATS');
        }
        var firstDayOfWeek = this._locale.getFirstDayOfWeek();
        var narrowWeekdays = this._locale.getDayOfWeekNames('narrow');
        var longWeekdays = this._locale.getDayOfWeekNames('long');
        // Rotate the labels for days of the week based on the configured first day of the week.
        var weekdays = longWeekdays.map(function (long, i) {
            return { long: long, narrow: narrowWeekdays[i] };
        });
        this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
        this._activeDate = this._util.today();
    }
    Object.defineProperty(Md2MonthView.prototype, "activeDate", {
        /**
         * The date to display in this month view (everything other than the month and year is ignored).
         */
        get: function () { return this._activeDate; },
        set: function (value) {
            var oldActiveDate = this._activeDate;
            this._activeDate = value || this._util.today();
            if (oldActiveDate && this._activeDate &&
                !this._util.isSameMonthAndYear(oldActiveDate, this._activeDate)) {
                this._init();
                if (this._util.isInNextMonth(oldActiveDate, this._activeDate)) {
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
    Object.defineProperty(Md2MonthView.prototype, "selected", {
        /** The currently selected date. */
        get: function () { return this._selected; },
        set: function (value) {
            this._selected = value;
            this._selectedDate = this._getDateInCurrentMonth(this.selected);
        },
        enumerable: true,
        configurable: true
    });
    Md2MonthView.prototype.ngAfterContentInit = function () {
        this._init();
    };
    /** Handles when a new date is selected. */
    Md2MonthView.prototype._dateSelected = function (date) {
        this.selectedChange.emit(this._util.createDate(this._util.getYear(this.activeDate), this._util.getMonth(this.activeDate), date, this._util.getHours(this.activeDate), this._util.getMinutes(this.activeDate), this._util.getSeconds(this.activeDate)));
    };
    /** Initializes this month view. */
    Md2MonthView.prototype._init = function () {
        this._selectedDate = this._getDateInCurrentMonth(this.selected);
        this._todayDate = this._getDateInCurrentMonth(this._util.today());
        var firstOfMonth = this._util.createDate(this._util.getYear(this.activeDate), this._util.getMonth(this.activeDate), 1, this._util.getHours(this.activeDate), this._util.getMinutes(this.activeDate), this._util.getSeconds(this.activeDate));
        this._firstWeekOffset =
            (DAYS_PER_WEEK + this._locale.getDayOfWeek(firstOfMonth) -
                this._locale.getFirstDayOfWeek()) % DAYS_PER_WEEK;
        this._createWeekCells();
    };
    /** Creates MdCalendarCells for the dates in this month. */
    Md2MonthView.prototype._createWeekCells = function () {
        var daysInMonth = this._util.getNumDaysInMonth(this.activeDate);
        var dateNames = this._locale.getDateNames();
        this._weeks = [[]];
        for (var i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
            if (cell == DAYS_PER_WEEK) {
                this._weeks.push([]);
                cell = 0;
            }
            var date = this._util.createDate(this._util.getYear(this.activeDate), this._util.getMonth(this.activeDate), i + 1, this._util.getHours(this.activeDate), this._util.getMinutes(this.activeDate), this._util.getSeconds(this.activeDate));
            var enabled = !this.dateFilter ||
                this.dateFilter(date);
            var ariaLabel = this._locale.format(date, this._dateFormats.display.dateA11yLabel);
            this._weeks[this._weeks.length - 1]
                .push(new Md2CalendarCell(i + 1, dateNames[i], ariaLabel, enabled));
        }
    };
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     */
    Md2MonthView.prototype._getDateInCurrentMonth = function (date) {
        return this._util.isSameMonthAndYear(date, this.activeDate) ?
            this._util.getDate(date) : null;
    };
    Md2MonthView.prototype.calendarState = function (direction) {
        this._calendarState = direction;
    };
    Md2MonthView.prototype._calendarStateDone = function () {
        this._calendarState = '';
    };
    return Md2MonthView;
}());
__decorate([
    Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Md2MonthView.prototype, "activeDate", null);
__decorate([
    Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Md2MonthView.prototype, "selected", null);
__decorate([
    Input(),
    __metadata("design:type", Function)
], Md2MonthView.prototype, "dateFilter", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], Md2MonthView.prototype, "selectedChange", void 0);
Md2MonthView = __decorate([
    Component({selector: 'md2-month-view',
        template: "<table class=\"md2-calendar-table\"><thead class=\"md2-calendar-table-header\"><tr><th *ngFor=\"let day of _weekdays\" [attr.aria-label]=\"day.long\">{{day.narrow}}</th></tr></thead><tbody [@slideCalendar]=\"_calendarState\" (@slideCalendar.done)=\"_calendarStateDone()\" md2-calendar-body role=\"grid\" [rows]=\"_weeks\" [todayValue]=\"_todayDate\" [selectedValue]=\"_selectedDate\" [activeCell]=\"_util.getDate(activeDate) - 1\" (selectedValueChange)=\"_dateSelected($event)\"></tbody></table>",
        animations: [slideCalendar],
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
    }),
    __param(2, Optional()), __param(2, Inject(MD_DATE_FORMATS)),
    __metadata("design:paramtypes", [DateLocale, DateUtil, Object])
], Md2MonthView);
export { Md2MonthView };
//# sourceMappingURL=month-view.js.map