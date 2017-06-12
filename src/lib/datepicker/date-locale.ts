import { Injectable } from '@angular/core';

const SUPPORTS_INTL_API = false;// typeof Intl != 'undefined';


/** The default month names to use if Intl API is not available. */
const DEFAULT_MONTH_NAMES = {
  'long': [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
  ],
  'short': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  'narrow': ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
};


/** The default date names to use if Intl API is not available. */
const DEFAULT_DATE_NAMES = range(31, i => String(i + 1));

/** The default hour names to use if Intl API is not available. */
const DEFAULT_HOUR_NAMES = range(24, i => String(i));

/** The default minute names to use if Intl API is not available. */
const DEFAULT_MINUTE_NAMES = range(60, i => String(i));


/** The default day of the week names to use if Intl API is not available. */
const DEFAULT_DAY_OF_WEEK_NAMES = {
  'long': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  'short': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  'narrow': ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};


/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  return Array.apply(null, Array(length)).map((v: undefined, i: number) => valueFunction(i));
}

@Injectable()
export class DateLocale {

  locale: any;
  months: any;
  days: any;
  dates: any;
  firstDayOfWeek: number = 0;

  formatDate = '';
  parseDate = '';
  isDateComplete = '';
  monthHeaderFormatter = '';
  monthFormatter = '';
  weekNumberFormatter = '';
  longDateFormatter = '';
  msgCalendar = '';
  msgOpenCalendar = '';
  firstRenderableDate = '';
  lastRenderableDate = '';

  getDayOfWeek(date: Date): number {
    return date.getDay();
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (SUPPORTS_INTL_API) {
      let dtf = new Intl.DateTimeFormat(this.locale, { month: style });
      return range(12, i => this._stripDirectionalityCharacters(dtf.format(new Date(2017, i, 1))));
    }
    return DEFAULT_MONTH_NAMES[style];
  }

  getDateNames(): string[] {
    if (SUPPORTS_INTL_API) {
      let dtf = new Intl.DateTimeFormat(this.locale, { day: 'numeric' });
      return range(31, i => this._stripDirectionalityCharacters(
        dtf.format(new Date(2017, 0, i + 1))));
    }
    return DEFAULT_DATE_NAMES;
  }

  getHourNames(): string[] {
    if (SUPPORTS_INTL_API) {
      let dtf = new Intl.DateTimeFormat(this.locale, { hour: 'numeric' });
      return range(24, i => this._stripDirectionalityCharacters(
        dtf.format(new Date(2017, 0, 0, i + 1))));
    }
    return DEFAULT_HOUR_NAMES;
  }

  getMinuteNames(): string[] {
    if (SUPPORTS_INTL_API) {
      let dtf = new Intl.DateTimeFormat(this.locale, { minute: 'numeric' });
      return range(60, i => this._stripDirectionalityCharacters(
        dtf.format(new Date(2017, 0, 0, 0, i + 1))));
    }
    return DEFAULT_MINUTE_NAMES;
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (SUPPORTS_INTL_API) {
      let dtf = new Intl.DateTimeFormat(this.locale, { weekday: style });
      return range(7, i => this._stripDirectionalityCharacters(
        dtf.format(new Date(2017, 0, i + 1))));
    }
    return DEFAULT_DAY_OF_WEEK_NAMES[style];
  }

  getYearName(date: Date): string {
    if (SUPPORTS_INTL_API) {
      let dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric' });
      return this._stripDirectionalityCharacters(dtf.format(date));
    }
    return String(date.getFullYear());
  }

  getFirstDayOfWeek(): number {
    // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
    return this.firstDayOfWeek;
  }

  format(date: Date, displayFormat: Object): string {
    if (SUPPORTS_INTL_API) {
      let dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
      return this._stripDirectionalityCharacters(dtf.format(date));
    }
    return this._stripDirectionalityCharacters(date.toDateString());
  }

  getDateLabel(d: Date): string {
    let day: string = this.getDayOfWeekNames('short')[d.getDay()];
    let date: string = this.getDateNames()[d.getDate()];
    let month: string = this.getMonthNames('short')[d.getMonth()];
    return `${day}, ${month} ${date}`;
  }

  getHoursLabel(d: Date): string { return `${this.getHourNames()[d.getHours()]}`; }

  getMinutesLabel(d: Date): string { return `${this.getMinuteNames()[d.getMinutes()]}`; }

  getMonthLabel(d: Date): string {
    return `${this.getMonthNames('long')[d.getMonth()]} ${this.getYearName(d)}`;
  }

  /**
   * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
   * other browsers do not. We remove them to make output consistent and because they interfere with
   * date parsing.
   * @param s The string to strip direction characters from.
   * @returns The stripped string.
   */
  private _stripDirectionalityCharacters(s: string) {
    return s.replace(/[\u200e\u200f]/g, '');
  }
}
