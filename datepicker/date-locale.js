var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, } from '@angular/core';
/** Whether the browser supports the Intl API. */
var SUPPORTS_INTL_API = !!Intl;
/** Creates an array and fills it with values. */
function range(length, valueFunction) {
    return Array.apply(null, Array(length)).map(function (v, i) { return valueFunction(i); });
}
/** Date locale info. TODO(mmalerba): Integrate with i18n solution once we know what we're doing. */
var DateLocale = (function () {
    function DateLocale() {
        var _this = this;
        this.dates = [null].concat(SUPPORTS_INTL_API ? this._createDatesArray('numeric') : range(31, function (i) { return String(i + 1); }));
        this.getCalendarMonthHeaderLabel = this._createFormatFunction({ month: 'long', year: 'numeric' }) ||
            (function (date) { return _this.shortMonths[date.getMonth()] + ' ' + date.getFullYear(); });
        this.getCalendarYearHeaderLabel = this._createFormatFunction({ year: 'numeric' }) ||
            (function (date) { return String(date.getFullYear()); });
        this.firstDayOfWeek = 0;
        this.fullMonths = SUPPORTS_INTL_API ? this._createMonthsArray('long') :
            [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];
        this.shortMonths = SUPPORTS_INTL_API ? this._createMonthsArray('short') :
            ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.narrowMonths = SUPPORTS_INTL_API ? this._createMonthsArray('narrow') :
            ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
        this.months = this.fullMonths.map(function (val, index) {
            return { full: val, short: _this.shortMonths[index], xshort: _this.narrowMonths[index] };
        });
        this.fullDays = SUPPORTS_INTL_API ? this._createDaysArray('long') :
            ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.shortDays = SUPPORTS_INTL_API ? this._createDaysArray('short') :
            ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.narrowDays = SUPPORTS_INTL_API ? this._createDaysArray('narrow') :
            ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        this.days = this.fullDays.map(function (val, index) {
            return { full: val, short: _this.shortDays[index], xshort: _this.narrowDays[index] };
        });
    }
    DateLocale.prototype.parseDate = function (value) {
        if (value instanceof Date) {
            return value;
        }
        var timestamp = typeof value == 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    };
    DateLocale.prototype._createDatesArray = function (format) {
        var dtf = new Intl.DateTimeFormat(undefined, { day: format });
        return range(31, function (i) { return dtf.format(new Date(2017, 0, i + 1)); });
    };
    DateLocale.prototype._createFormatFunction = function (options) {
        if (SUPPORTS_INTL_API) {
            var dtf_1 = new Intl.DateTimeFormat(undefined, options);
            return function (date) { return dtf_1.format(date); };
        }
        return null;
    };
    DateLocale.prototype.getDays = function () {
        return this.days.slice(this.firstDayOfWeek, this.days.length)
            .concat(this.days.slice(0, this.firstDayOfWeek));
    };
    DateLocale.prototype.getDayLabel = function (d) { return "" + d; };
    DateLocale.prototype.getDateLabel = function (d) {
        return this.days[d.getDay()].short + ", " + this.months[d.getMonth()].short + " " + d.getDate();
    };
    DateLocale.prototype.getMonthLabel = function (m, y) { return this.months[m].full + " " + y; };
    DateLocale.prototype.getYearLabel = function (y) { return "" + y; };
    DateLocale.prototype._createMonthsArray = function (format) {
        var dtf = new Intl.DateTimeFormat(undefined, { month: format });
        return range(12, function (i) { return dtf.format(new Date(2017, i, 1)); });
    };
    DateLocale.prototype._createDaysArray = function (format) {
        var dtf = new Intl.DateTimeFormat(undefined, { weekday: format });
        return range(7, function (i) { return dtf.format(new Date(2017, 0, i + 1)); });
    };
    return DateLocale;
}());
DateLocale = __decorate([
    Injectable()
], DateLocale);
export { DateLocale };
//# sourceMappingURL=date-locale.js.map