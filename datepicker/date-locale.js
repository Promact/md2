var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var SUPPORTS_INTL_API = typeof Intl != 'undefined';
/** The default month names to use if Intl API is not available. */
var DEFAULT_MONTH_NAMES = {
    'long': [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'
    ],
    'short': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    'narrow': ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
};
/** The default date names to use if Intl API is not available. */
var DEFAULT_DATE_NAMES = range(31, function (i) { return String(i + 1); });
/** The default hour names to use if Intl API is not available. */
var DEFAULT_HOUR_NAMES = range(24, function (i) { return String(i); });
/** The default minute names to use if Intl API is not available. */
var DEFAULT_MINUTE_NAMES = range(60, function (i) { return String(i); });
/** The default day of the week names to use if Intl API is not available. */
var DEFAULT_DAY_OF_WEEK_NAMES = {
    'long': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'short': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'narrow': ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};
/** Creates an array and fills it with values. */
function range(length, valueFunction) {
    var valuesArray = Array(length);
    for (var i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
;
;
var DateLocale = (function () {
    function DateLocale() {
        this.firstDayOfWeek = 0;
    }
    DateLocale.prototype.getDayOfWeek = function (date) {
        return date.getDay();
    };
    DateLocale.prototype.getMonthNames = function (style) {
        var _this = this;
        if (this.months) {
            return this.months[style];
        }
        if (SUPPORTS_INTL_API) {
            var dtf_1 = new Intl.DateTimeFormat(this.locale, { month: style });
            return range(12, function (i) { return _this._stripDirectionalityCharacters(dtf_1.format(new Date(2017, i, 1))); });
        }
        return DEFAULT_MONTH_NAMES[style];
    };
    DateLocale.prototype.getDateNames = function () {
        var _this = this;
        if (this.dates) {
            return this.dates;
        }
        if (SUPPORTS_INTL_API) {
            var dtf_2 = new Intl.DateTimeFormat(this.locale, { day: 'numeric' });
            return range(31, function (i) { return _this._stripDirectionalityCharacters(dtf_2.format(new Date(2017, 0, i + 1))); });
        }
        return DEFAULT_DATE_NAMES;
    };
    DateLocale.prototype.getHourNames = function () {
        var _this = this;
        if (this.hours) {
            return this.hours;
        }
        if (SUPPORTS_INTL_API) {
            var dtf_3 = new Intl.DateTimeFormat(this.locale, { hour: 'numeric' });
            return range(24, function (i) { return _this._stripDirectionalityCharacters(dtf_3.format(new Date(2017, 0, 0, i + 1))); });
        }
        return DEFAULT_HOUR_NAMES;
    };
    DateLocale.prototype.getMinuteNames = function () {
        var _this = this;
        if (this.minutes) {
            return this.minutes;
        }
        if (SUPPORTS_INTL_API) {
            var dtf_4 = new Intl.DateTimeFormat(this.locale, { minute: 'numeric' });
            return range(60, function (i) { return _this._stripDirectionalityCharacters(dtf_4.format(new Date(2017, 0, 0, 0, i + 1))); });
        }
        return DEFAULT_MINUTE_NAMES;
    };
    DateLocale.prototype.getDayOfWeekNames = function (style) {
        var _this = this;
        if (this.daysOfWeek) {
            return this.daysOfWeek[style];
        }
        if (SUPPORTS_INTL_API) {
            var dtf_5 = new Intl.DateTimeFormat(this.locale, { weekday: style });
            return range(7, function (i) { return _this._stripDirectionalityCharacters(dtf_5.format(new Date(2017, 0, i + 1))); });
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style];
    };
    DateLocale.prototype.getYearName = function (date) {
        if (SUPPORTS_INTL_API) {
            var dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric' });
            return this._stripDirectionalityCharacters(dtf.format(date));
        }
        return String(date.getFullYear());
    };
    DateLocale.prototype.getFirstDayOfWeek = function () {
        // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
        return this.firstDayOfWeek;
    };
    DateLocale.prototype.format = function (date, displayFormat) {
        if (SUPPORTS_INTL_API) {
            var dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
            return this._stripDirectionalityCharacters(dtf.format(date));
        }
        return this._stripDirectionalityCharacters(date.toDateString());
    };
    DateLocale.prototype.getDateLabel = function (d) {
        var day = this.getDayOfWeekNames('short')[d.getDay()];
        var date = this.getDateNames()[d.getDate() - 1];
        var month = this.getMonthNames('short')[d.getMonth()];
        return day + ", " + month + " " + date;
    };
    DateLocale.prototype.getHoursLabel = function (d) { return "" + this.getHourNames()[d.getHours()]; };
    DateLocale.prototype.getMinutesLabel = function (d) { return "" + this.getMinuteNames()[d.getMinutes()]; };
    DateLocale.prototype.getMonthLabel = function (d) {
        return this.getMonthNames('long')[d.getMonth()] + " " + this.getYearName(d);
    };
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param s The string to strip direction characters from.
     * @returns The stripped string.
     */
    DateLocale.prototype._stripDirectionalityCharacters = function (s) {
        return s.replace(/[\u200e\u200f]/g, '');
    };
    return DateLocale;
}());
DateLocale = __decorate([
    Injectable()
], DateLocale);
export { DateLocale };
//# sourceMappingURL=date-locale.js.map