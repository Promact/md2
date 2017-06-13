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
/**
 * An internal component used to display a single year in the datepicker.
 * @docs-private
 */
var Md2YearView = (function () {
    function Md2YearView(_locale, _util, _dateFormats) {
        this._locale = _locale;
        this._util = _util;
        this._dateFormats = _dateFormats;
        /** Emits when a new month is selected. */
        this.selectedChange = new EventEmitter();
        if (!this._dateFormats) {
            throw Error('MD_DATE_FORMATS');
        }
        this._activeDate = this._util.today();
    }
    Object.defineProperty(Md2YearView.prototype, "activeDate", {
        /** The date to display in this year view (everything other than the year is ignored). */
        get: function () { return this._activeDate; },
        set: function (value) {
            var oldActiveDate = this._activeDate;
            this._activeDate = value || this._util.today();
            if (oldActiveDate && this._activeDate &&
                !this._util.isSameYear(oldActiveDate, this._activeDate)) {
                this._init();
                // if (oldActiveDate < this._activeDate) {
                //  this.calendarState('right');
                // } else {
                //  this.calendarState('left');
                // }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2YearView.prototype, "selected", {
        /** The currently selected date. */
        get: function () { return this._selected; },
        set: function (value) {
            this._selected = value;
            this._selectedMonth = this._getMonthInCurrentYear(this.selected);
        },
        enumerable: true,
        configurable: true
    });
    Md2YearView.prototype.ngAfterContentInit = function () {
        this._init();
    };
    /** Handles when a new month is selected. */
    Md2YearView.prototype._monthSelected = function (month) {
        this.selectedChange.emit(this._util.createDate(this._util.getYear(this.activeDate), month, this._util.getDate(this.activeDate), this._util.getHours(this.activeDate), this._util.getMinutes(this.activeDate), this._util.getSeconds(this.activeDate)));
    };
    /** Initializes this month view. */
    Md2YearView.prototype._init = function () {
        var _this = this;
        this._selectedMonth = this._getMonthInCurrentYear(this.selected);
        this._todayMonth = this._getMonthInCurrentYear(this._util.today());
        this._yearLabel = this._locale.getYearName(this.activeDate);
        var monthNames = this._locale.getMonthNames('short');
        // First row of months only contains 5 elements so we can fit the year label on the same row.
        this._months = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11]].map(function (row) { return row.map(function (month) { return _this._createCellForMonth(month, monthNames[month]); }); });
    };
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    Md2YearView.prototype._getMonthInCurrentYear = function (date) {
        return this._util.isSameYear(date, this.activeDate) ?
            this._util.getMonth(date) : null;
    };
    /** Creates an MdCalendarCell for the given month. */
    Md2YearView.prototype._createCellForMonth = function (month, monthName) {
        var ariaLabel = this._locale.format(this._util.createDate(this._util.getYear(this.activeDate), month, 1, this._util.getHours(this.activeDate), this._util.getMinutes(this.activeDate), this._util.getSeconds(this.activeDate)), this._dateFormats.display.monthYearA11yLabel);
        return new Md2CalendarCell(month, monthName.toLocaleUpperCase(), ariaLabel, this._isMonthEnabled(month));
    };
    /** Whether the given month is enabled. */
    Md2YearView.prototype._isMonthEnabled = function (month) {
        if (!this.dateFilter) {
            return true;
        }
        var firstOfMonth = this._util.createDate(this._util.getYear(this.activeDate), month, 1, this._util.getHours(this.activeDate), this._util.getMinutes(this.activeDate), this._util.getSeconds(this.activeDate));
        // If any date in the month is enabled count the month as enabled.
        for (var date = firstOfMonth; this._util.getMonth(date) == month; date = this._util.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    };
    Md2YearView.prototype.calendarState = function (direction) {
        this._calendarState = direction;
    };
    Md2YearView.prototype._calendarStateDone = function () {
        this._calendarState = '';
    };
    return Md2YearView;
}());
__decorate([
    Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Md2YearView.prototype, "activeDate", null);
__decorate([
    Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Md2YearView.prototype, "selected", null);
__decorate([
    Input(),
    __metadata("design:type", Function)
], Md2YearView.prototype, "dateFilter", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], Md2YearView.prototype, "selectedChange", void 0);
Md2YearView = __decorate([
    Component({selector: 'md2-year-view',
        template: "<table class=\"md2-calendar-table\"><thead class=\"md2-calendar-table-header\"></thead><tbody [@slideCalendar]=\"_calendarState\" (@slideCalendar.done)=\"_calendarStateDone()\" md2-calendar-body role=\"grid\" allowDisabledSelection=\"true\" [label]=\"_yearLabel\" [rows]=\"_months\" [todayValue]=\"_todayMonth\" [selectedValue]=\"_selectedMonth\" [labelMinRequiredCells]=\"2\" [activeCell]=\"_util.getMonth(activeDate)\" (selectedValueChange)=\"_monthSelected($event)\"></tbody></table>",
        animations: [slideCalendar],
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
    }),
    __param(2, Optional()), __param(2, Inject(MD_DATE_FORMATS)),
    __metadata("design:paramtypes", [DateLocale, DateUtil, Object])
], Md2YearView);
export { Md2YearView };
//# sourceMappingURL=year-view.js.map