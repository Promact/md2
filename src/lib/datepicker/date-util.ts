import { DateLocale } from './date-locale';

export class DateUtil {

  _locale: DateLocale = new DateLocale();

  parseDateMap: any = {
    'y': 0,      // placeholder -> ctorIndex
    'Y': [0, -2000],
    'M': [1, 1], // placeholder -> [ctorIndex, offset|value array]
    'n': [1, this._locale.getMonthNames('short')],
    'N': [1, this._locale.getMonthNames('long')],
    'd': 2,
    'm': 4,
    'H': 3,
    'h': 3,
    'K': [3, 1],
    'k': [3, 1],
    's': 5,
    'S': 6,
    'a': [3, ['am', 'pm']],
    'A': [3, ['AM', 'PM']]
  };

  replace(s: string, regexp: any, sub?: string) {
    return (s != null ? '' + s : '').replace(regexp, sub != null ? sub : '');
  }

  startsWith(base: any, start: any) {
    return start != null && base.substr(0, start.length) == start;
  }

  isType(s: any, o: any) {
    return typeof s == o;
  }

  isFunction(f: any) {
    return this.isType(f, 'function');
  }

  isList(v: any) {
    return !!v && v.length != null && !this.isString(v) && !this.isNode(v) && !this.isFunction(v);
  }

  isString(s: any) {
    return this.isType(s, 'string');
  }

  isObject(f: any) {
    return !!f && this.isType(f, 'object');
  }

  isNode(n: any) {
    return n && n['nodeType'];
  }

  isNumber(n: any) {
    return this.isType(n, 'number');
  }

  getFindFunc(findFunc: any) {
    return this.isFunction(findFunc) ? findFunc : (obj: any, index: any) => {
      if (findFunc === obj) {
        return index;
      }
    };
  }

  getFindIndex(list: any, index: any, defaultIndex: any) {
    return index == null ? defaultIndex :
      index < 0 ? Math.max(list.length + index, 0) : Math.min(list.length, index);
  }

  find(list: any, findFunc: any, startIndex?: any, endIndex?: any) {
    let f = this.getFindFunc(findFunc);
    let e = this.getFindIndex(list, endIndex, list.length);
    let r: any;
    for (let i = this.getFindIndex(list, startIndex, 0); i < e; i++) {
      if ((r = f.call(list, list[i], i)) != null) {
        return r;
      }
    }
  }

  parseDate(date: string, fmt: string) {
    let indexMap: any = {}; // contains reGroupPosition -> typeLetter or [typeLetter, value array]
    let reIndex = 1;
    let timezoneOffsetMatch: any;
    let timezoneIndex: any;
    let match: any;

    let format = this.replace(fmt, /^\?/);
    if (format != fmt && !this.replace(date, /^\s+|\s+$/g)) {
      return null;
    }

    if (match = /^\[([+-])(\d\d)(\d\d)\]\s*(.*)/.exec(format)) {
      timezoneOffsetMatch = match;
      format = match[4];
    }

    let parser = new RegExp(format.replace(/(.)(\1*)(?:\[([^\]]*)\])?/g,
      (wholeMatch, placeholderChar, placeholderDigits, param) => {
        if (/[dmhkyhs]/i.test(placeholderChar)) {
          indexMap[reIndex++] = placeholderChar;
          let plen = placeholderDigits.length + 1;
          return '(\\d' + (plen < 2 ? '+' : ('{1,' + plen + '}')) + ')';
        } else if (placeholderChar == 'z') {
          timezoneIndex = reIndex;
          reIndex += 3;
          return '([+-])(\\d\\d)(\\d\\d)';
        } else if (/[NnaA]/.test(placeholderChar)) {
          indexMap[reIndex++] = [placeholderChar, param && param.split(',')];
          return '([a-zA-Z\\u0080-\\u1fff]+)';
        } else if (/w/i.test(placeholderChar)) {
          return '[a-zA-Z\\u0080-\\u1fff]+';
        } else if (/\s/.test(placeholderChar)) {
          return '\\s+';
        } else {
          return this.replace(wholeMatch, /[\\\[\]\/{}()*+?.$|^-]/g, '\\$&');
        }
      }));

    if (!(match = parser.exec(date))) {
      return undefined;
    }

    let ctorArgs = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 1; i < reIndex; i++) {
      let matchVal = match[i];
      let indexEntry: any = indexMap[i];
      if (this.isList(indexEntry)) { // for a, n or N
        let placeholderChar = indexEntry[0];
        let mapEntry = this.parseDateMap[placeholderChar];
        let ctorIndex = mapEntry[0];
        let valList = indexEntry[1] || mapEntry[1];
        let listValue = this.find(valList,
          (v: any, index: any) => {
            if (this.startsWith(matchVal.toLowerCase(), v.toLowerCase())) {
              return index;
            }
          });
        if (listValue == null) {
          return undefined;
        }
        if (placeholderChar == 'a' || placeholderChar == 'A') {
          ctorArgs[ctorIndex] += listValue * 12;
        } else {
          ctorArgs[ctorIndex] = listValue;
        }
      } else if (indexEntry) { // for numeric values (yHmMs)
        let value = parseFloat(matchVal);
        let mapEntry = this.parseDateMap[indexEntry];
        if (this.isList(mapEntry)) {
          ctorArgs[mapEntry[0]] += value - mapEntry[1];
        } else {
          ctorArgs[mapEntry] += value;
        }
      }
    }
    let d = new Date(ctorArgs[0], ctorArgs[1], ctorArgs[2], ctorArgs[3], ctorArgs[4],
      ctorArgs[5], ctorArgs[6]);
    return d;
  }

  today(): Date {
    return new Date();
  }

  parse(value: any): Date | null {
    let timestamp = typeof value == 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  getYear(date: Date): number {
    return date.getFullYear();
  }

  getMonth(date: Date): number {
    return date.getMonth();
  }

  getDate(date: Date): number {
    return date.getDate();
  }

  getHours(date: Date): number {
    return date.getHours();
  }

  getMinutes(date: Date): number {
    return date.getMinutes();
  }

  getSeconds(date: Date): number {
    return date.getSeconds();
  }

  createDate(year: number, month: number, date: number,
    hours: number, minutes: number, seconds: number): Date {
    // Check for invalid month and date (except upper bound on date which we have to check after
    // creating the Date).
    if (month < 0 || month > 11 || date < 1) {
      return null;
    }

    let result = this._createDateWithOverflow(year, month, date, hours, minutes, seconds);

    // Check that the date wasn't above the upper bound for the month, causing the month to
    // overflow.
    if (result.getMonth() != month) {
      return null;
    }

    return result;
  }

  clone(date: Date): Date {
    return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date),
      this.getHours(date), this.getMinutes(date), this.getSeconds(date));
  }

  getNumDaysInMonth(date: Date): number {
    return this.getDate(this._createDateWithOverflow(
      this.getYear(date), this.getMonth(date) + 1, 0, 0, 0, 0));
  }

  addCalendarYears(date: Date, years: number): Date {
    return this.addCalendarMonths(date, years * 12);
  }

  addCalendarMonths(date: Date, months: number): Date {
    let newDate = this._createDateWithOverflow(
      this.getYear(date), this.getMonth(date) + months, this.getDate(date), this.getHours(date),
      this.getMinutes(date), this.getSeconds(date));

    // It's possible to wind up in the wrong month if the original month has more days than the new
    // month. In this case we want to go to the last day of the desired month.
    // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
    // guarantee this.
    if (this.getMonth(newDate) != ((this.getMonth(date) + months) % 12 + 12) % 12) {
      newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0,
        this.getHours(newDate), this.getMinutes(newDate), this.getSeconds(newDate));
    }

    return newDate;
  }

  addCalendarDays(date: Date, days: number): Date {
    return this._createDateWithOverflow(
      this.getYear(date), this.getMonth(date), this.getDate(date) + days,
      this.getHours(date), this.getMinutes(date), this.getSeconds(date));
  }

  addCalendarHours(date: Date, hours: number): Date {
    return this._createDateWithOverflow(
      this.getYear(date), this.getMonth(date), this.getDate(date),
      this.getHours(date) + hours, this.getMinutes(date), this.getSeconds(date));
  }

  addCalendarMinutes(date: Date, minutes: number): Date {
    return this._createDateWithOverflow(
      this.getYear(date), this.getMonth(date), this.getDate(date),
      this.getHours(date), this.getMinutes(date) + minutes, this.getSeconds(date));
  }
  getISODateString(date: Date): string {
    return [
      date.getUTCFullYear(),
      this._2digit(date.getUTCMonth() + 1),
      this._2digit(date.getUTCDate())
    ].join('-');
  }

  /** Creates a date but allows the month and date to overflow. */
  private _createDateWithOverflow(year: number, month: number, date: number,
    hours: number, minutes: number, seconds: number) {
    let result = new Date(year, month, date, hours, minutes, seconds);

    // We need to correct for the fact that JS native Date treats years in range [0, 99] as
    // abbreviations for 19xx.
    if (year >= 0 && year < 100) {
      result.setFullYear(this.getYear(result) - 1900);
    }
    return result;
  }

  /**
   * Pads a number to make it two digits.
   * @param n The number to pad.
   * @returns The padded number.
   */
  private _2digit(n: number) {
    return ('00' + n).slice(-2);
  }

  compareDate(first: Date, second: Date): number {
    return this.getYear(first) - this.getYear(second) ||
      this.getMonth(first) - this.getMonth(second) ||
      this.getDate(first) - this.getDate(second);
  }

  /**
   * Gets the first day of the month for the given date's month.
   * @param {Date} date
   * @returns {Date}
   */
  getFirstDateOfWeek(date: Date, firstDayOfWeek: number) {
    let day: number = date.getDate() - ((7 + date.getDay() - firstDayOfWeek) % 7);
    return new Date(date.getFullYear(), date.getMonth(), day, date.getHours(), date.getMinutes());
  }

  /**
   * Gets the first day of the month for the given date's month.
   * @param {Date} date
   * @returns {Date}
   */
  getFirstDateOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  /**
   * Gets the number of days in the month for the given date's month.
   * @param date
   * @returns {number}
   */
  getNumberOfDaysInMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  /**
   * Get an arbitrary date in the month after the given date's month.
   * @param date
   * @returns {Date}
   */
  getDateInNextMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1,
      date.getHours(), date.getMinutes());
  }

  /**
   * Get an arbitrary date in the month before the given date's month.
   * @param date
   * @returns {Date}
   */
  getDateInPreviousMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1,
      date.getHours(), date.getMinutes());
  }

  /**
   * Gets whether two dates have the same year.
   * @param {Date} d1
   * @param {Date} d2
   * @returns {boolean}
   */
  isSameYear(d1: Date, d2: Date) {
    return d1 && d2 && d1.getFullYear() === d2.getFullYear();
  }

  /**
   * Gets whether two dates have the same month and year.
   * @param {Date} d1
   * @param {Date} d2
   * @returns {boolean}
   */
  isSameMonthAndYear(d1: Date, d2: Date) {
    return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
  }

  /**
   * Gets whether two dates are the same day (not not necesarily the same time).
   * @param {Date} d1
   * @param {Date} d2
   * @returns {boolean}
   */
  isSameDay(d1: Date, d2: Date) {
    return d1 && d2 && d1.getDate() == d2.getDate() && this.isSameMonthAndYear(d1, d2);
  }

  /**
   * Gets whether two dates are the same hours.
   * @param {Date} d1
   * @param {Date} d2
   * @returns {boolean}
   */
  isSameHour(d1: Date, d2: Date) {
    return d1 && d2 && d1.getHours() == d2.getHours() && this.isSameDay(d1, d2);
  }

  /**
   * Gets whether two dates are the same minutes.
   * @param {Date} d1
   * @param {Date} d2
   * @returns {boolean}
   */
  isSameMinute(d1: Date, d2: Date) {
    return d1 && d2 && d1.getMinutes() == d2.getMinutes() && this.isSameHour(d1, d2);
  }

  /**
   * Gets whether a date is in the month immediately after some date.
   * @param {Date} startDate The date from which to compare.
   * @param {Date} endDate The date to check.
   * @returns {boolean}
   */
  isInNextMonth(startDate: Date, endDate: Date) {
    let nextMonth = this.getDateInNextMonth(startDate);
    return this.isSameMonthAndYear(nextMonth, endDate);
  }

  /**
   * Gets whether a date is in the month immediately before some date.
   * @param {Date} startDate The date from which to compare.
   * @param {Date} endDate The date to check.
   * @returns {boolean}
   */
  isInPreviousMonth(startDate: Date, endDate: Date) {
    let previousMonth = this.getDateInPreviousMonth(startDate);
    return this.isSameMonthAndYear(endDate, previousMonth);
  }

  /**
   * Gets the midpoint between two dates.
   * @param {Date} d1
   * @param {Date} d2
   * @returns {Date}
   */
  getDateMidpoint(d1: Date, d2: Date) {
    return this.createDateAtMidnight((d1.getTime() + d2.getTime()) / 2);
  }

  /**
   * Gets the week of the month that a given date occurs in.
   * @param {Date} date
   * @returns {number} Index of the week of the month (zero-based).
   */
  getWeekOfMonth(date: Date) {
    let firstDayOfMonth = this.getFirstDateOfMonth(date);
    return Math.floor((firstDayOfMonth.getDay() + date.getDate() - 1) / 7);
  }

  /**
   * Gets a new date incremented by the given number of minutes. Number of minutes can be negative.
   * @param {Date} date
   * @param {number} numberOfMinutes
   * @returns {Date}
   */
  incrementMinutes(date: Date, numberOfMinutes: number) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
      date.getHours(), date.getMinutes() + numberOfMinutes);
  }

  /**
   * Gets a new date incremented by the given number of hours. Number of hours can be negative.
   * @param {Date} date
   * @param {number} numberOfHours
   * @returns {Date}
   */
  incrementHours(date: Date, numberOfHours: number) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
      date.getHours() + numberOfHours, date.getMinutes());
  }

  /**
   * Gets a new date incremented by the given number of days. Number of days can be negative.
   * @param {Date} date
   * @param {number} numberOfDays
   * @returns {Date}
   */
  incrementDays(date: Date, numberOfDays: number) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + numberOfDays,
      date.getHours(), date.getMinutes());
  }

  /**
   * Gets a new date incremented by the given number of months. Number of months can be negative.
   * If the date of the given month does not match the target month, the date will be set to the
   * last day of the month.
   * @param {Date} date
   * @param {number} numberOfMonths
   * @returns {Date}
   */
  incrementMonths(date: Date, numberOfMonths: number) {
    // If the same date in the target month does not actually exist, the Date object will
    // automatically advance *another* month by the number of missing days.
    // For example, if you try to go from Jan. 30 to Feb. 30, you'll end up on March 2.
    // So, we check if the month overflowed and go to the last day of the target month instead.
    let dateInTargetMonth = new Date(date.getFullYear(), date.getMonth() + numberOfMonths, 1,
      date.getHours(), date.getMinutes());
    let numberOfDaysInMonth = this.getNumberOfDaysInMonth(dateInTargetMonth);
    if (numberOfDaysInMonth < date.getDate()) {
      dateInTargetMonth.setDate(numberOfDaysInMonth);
    } else {
      dateInTargetMonth.setDate(date.getDate());
    }

    return dateInTargetMonth;
  }

  /**
   * Get the integer distance between two months. This *only* considers the month and year
   * portion of the Date instances.
   *
   * @param {Date} start
   * @param {Date} end
   * @returns {number} Number of months between `start` and `end`. If `end` is before `start`
   *     chronologically, this number will be negative.
   */
  getMonthDistance(start: Date, end: Date) {
    return (12 * (end.getFullYear() - start.getFullYear())) + (end.getMonth() - start.getMonth());
  }

  /**
   * Gets the last day of the month for the given date.
   * @param {Date} date
   * @returns {Date}
   */
  getLastDateOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), this.getNumberOfDaysInMonth(date),
      date.getHours(), date.getMinutes());
  }

  /**
   * Checks whether a date is valid.
   * @param {Date} date
   * @return {boolean} Whether the date is a valid Date.
   */
  isValidDate(date: Date) {
    return date != null && date.getTime && !isNaN(date.getTime());
  }

  /**
   * Sets a date's time to midnight.
   * @param {Date} date
   */
  setDateTimeToMidnight(date: Date) {
    if (this.isValidDate(date)) {
      date.setHours(0, 0, 0, 0);
    }
  }

  /**
   * Creates a date with the time set to midnight.
   * Drop-in replacement for two forms of the Date constructor:
   * 1. No argument for Date representing now.
   * 2. Single-argument value representing number of seconds since Unix Epoch
   * or a Date object.
   * @param {number|Date=} value
   * @return {Date} New date with time set to midnight.
   */
  createDateAtMidnight(value: any) {
    let date: Date;
    if (!value) {
      date = new Date();
    } else {
      date = new Date(value);
    }
    this.setDateTimeToMidnight(date);
    return date;
  }

  /**
   * Checks if a date is within a min and max range, ignoring the time component.
   * If minDate or maxDate are not dates, they are ignored.
   * @param {Date} date
   * @param {Date} minDate
   * @param {Date} maxDate
   */
  isDateWithinRange(date: Date, minDate: Date, maxDate: Date) {
    let dateAtMidnight = this.createDateAtMidnight(date);
    let minDateAtMidnight = this.isValidDate(minDate) ? this.createDateAtMidnight(minDate) : null;
    let maxDateAtMidnight = this.isValidDate(maxDate) ? this.createDateAtMidnight(maxDate) : null;
    return (!minDateAtMidnight || minDateAtMidnight <= dateAtMidnight) &&
      (!maxDateAtMidnight || maxDateAtMidnight >= dateAtMidnight);
  }

  /**
   * Checks if a date is within a min and max range.
   * If minDate or maxDate are not dates, they are ignored.
   * @param {Date} date
   * @param {Date} minDate
   * @param {Date} maxDate
   */
  isFullDateWithinRange(date: Date, minDate: Date, maxDate: Date) {
    minDate = this.isValidDate(minDate) ? minDate : null;
    maxDate = this.isValidDate(maxDate) ? maxDate : null;
    return (!minDate || minDate <= date) &&
      (!maxDate || maxDate >= date);
  }

  /**
   * Gets a new date incremented by the given number of years. Number of years can be negative.
   * See `incrementMonths` for notes on overflow for specific dates.
   * @param {Date} date
   * @param {number} numberOfYears
   * @returns {Date}
   */
  incrementYears(date: Date, numberOfYears: number) {
    return this.incrementMonths(date, numberOfYears * 12);
  }

  /**
   * Get the integer distance between two years. This *only* considers the year portion of the
   * Date instances.
   *
   * @param {Date} start
   * @param {Date} end
   * @returns {number} Number of months between `start` and `end`. If `end` is before `start`
   *     chronologically, this number will be negative.
   */
  getYearDistance(start: Date, end: Date) {
    return end.getFullYear() - start.getFullYear();
  }

  /**
   * Clamps a date between a minimum and a maximum date.
   * @param {Date} date Date to be clamped
   * @param {Date=} minDate Minimum date
   * @param {Date=} maxDate Maximum date
   * @return {Date}
   */
  clampDate(date: Date, minDate: Date, maxDate: Date) {
    let boundDate = date;
    if (minDate && date < minDate) {
      boundDate = new Date(minDate.getTime());
    }
    if (maxDate && date > maxDate) {
      boundDate = new Date(maxDate.getTime());
    }
    return boundDate;
  }

  /**
   * Extracts and parses the timestamp from a DOM node.
   * @param  {HTMLElement} node Node from which the timestamp will be extracted.
   * @return {number} Time since epoch.
   */
  getTimestampFromNode(node: any) {
    if (node && node.hasAttribute('data-timestamp')) {
      return Number(node.getAttribute('data-timestamp'));
    }
  }

  /**
   * Checks if a month is within a min and max range, ignoring the date and time components.
   * If minDate or maxDate are not dates, they are ignored.
   * @param {Date} date
   * @param {Date} minDate
   * @param {Date} maxDate
   */
  isMonthWithinRange(date: Date, minDate: Date, maxDate: Date) {
    let month = date.getMonth();
    let year = date.getFullYear();

    return (!minDate || minDate.getFullYear() < year || minDate.getMonth() <= month) &&
      (!maxDate || maxDate.getFullYear() > year || maxDate.getMonth() >= month);
  }

  /**
   * Compares two dates.
   * @param first The first date to compare.
   * @param second The second date to compare.
   * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
   *     a number greater than 0 if the first date is later.
   */
  compareDateAndTime(first: Date, second: Date): number {
    return this.getYear(first) - this.getYear(second) ||
      this.getMonth(first) - this.getMonth(second) ||
      this.getDate(first) - this.getDate(second) ||
      this.getHours(first) - this.getDate(second) ||
      this.getMinutes(first) - this.getDate(second) ||
      this.getSeconds(first) - this.getDate(second);
  }

  /**
   * Checks if two dates are equal.
   * @param first The first date to check.
   * @param second The second date to check.
   * @returns {boolean} Whether the two dates are equal.
   *     Null dates are considered equal to other null dates.
   */
  sameDate(first: Date | null, second: Date | null): boolean {
    return first && second ? !this.compareDate(first, second) : first == second;
  }

  /**
   * Checks if two dates are equal.
   * @param first The first date to check.
   * @param second The second date to check.
   * @returns {boolean} Whether the two dates are equal.
   *     Null dates are considered equal to other null dates.
   */
  sameDateAndTime(first: Date | null, second: Date | null): boolean {
    return first && second ? !this.compareDateAndTime(first, second) : first == second;
  }

}
