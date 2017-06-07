import {
  Injectable,
} from '@angular/core';

/** Whether the browser supports the Intl API. */
const SUPPORTS_INTL_API = false;//typeof Intl != 'undefined';

/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  return Array.apply(null, Array(length)).map((v: undefined, i: number) => valueFunction(i));
}

/** Date locale info. TODO(mmalerba): Integrate with i18n solution once we know what we're doing. */
@Injectable()
export class DateLocale {
  formatDate: (date: Date) => string;
  parseDate(value: any) {
    if (value instanceof Date) {
      return value;
    }
    let timestamp = typeof value == 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }
  dates = [null].concat(
    SUPPORTS_INTL_API ? this._createDatesArray('numeric') : range(31, i => String(i + 1)));
  private _createDatesArray(format: string) {
    let dtf = new Intl.DateTimeFormat(undefined, { day: format });
    return range(31, i => dtf.format(new Date(2017, 0, i + 1)));
  }
  getCalendarMonthHeaderLabel = this._createFormatFunction({ month: 'long', year: 'numeric' }) ||
  ((date: Date) => this.shortMonths[date.getMonth()] + ' ' + date.getFullYear());

  getCalendarYearHeaderLabel = this._createFormatFunction({ year: 'numeric' }) ||
  ((date: Date) => String(date.getFullYear()));

  private _createFormatFunction(options: Object): (date: Date) => string {
    if (SUPPORTS_INTL_API) {
      let dtf = new Intl.DateTimeFormat(undefined, options);
      return (date: Date) => dtf.format(date);
    }
    return null;
  }

  firstDayOfWeek = 0;

  fullMonths = SUPPORTS_INTL_API ? this._createMonthsArray('long') :
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

  shortMonths = SUPPORTS_INTL_API ? this._createMonthsArray('short') :
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  narrowMonths = SUPPORTS_INTL_API ? this._createMonthsArray('narrow') :
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  months = this.fullMonths.map((val, index) => {
    return { full: val, short: this.shortMonths[index], xshort: this.narrowMonths[index] };
  });


  fullDays = SUPPORTS_INTL_API ? this._createDaysArray('long') :
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  shortDays = SUPPORTS_INTL_API ? this._createDaysArray('short') :
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  narrowDays = SUPPORTS_INTL_API ? this._createDaysArray('narrow') :
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  days = this.fullDays.map((val, index) => {
    return { full: val, short: this.shortDays[index], xshort: this.narrowDays[index] };
  });


  getDays() {
    return this.days.slice(this.firstDayOfWeek, this.days.length)
      .concat(this.days.slice(0, this.firstDayOfWeek));
  }

  getDayLabel(d: number) { return `${d}`; }

  getDateLabel(d: Date) {
    return `${this.days[d.getDay()].short}, ${this.months[d.getMonth()].short} ${d.getDate()}`;
  }

  getMonthLabel(m: number, y: number) { return `${this.months[m].full} ${y}`; }

  getYearLabel(y: number) { return `${y}`; }

  private _createMonthsArray(format: string) {
    let dtf = new Intl.DateTimeFormat(undefined, { month: format });
    return range(12, i => dtf.format(new Date(2017, i, 1)));
  }

  private _createDaysArray(format: string) {
    let dtf = new Intl.DateTimeFormat(undefined, { weekday: format });
    return range(7, i => dtf.format(new Date(2017, 0, i + 1)));
  }

}
