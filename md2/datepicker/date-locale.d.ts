/** Date locale info. TODO(mmalerba): Integrate with i18n solution once we know what we're doing. */
export declare class DateLocale {
    firstDayOfWeek: number;
    months: {
        full: string;
        short: string;
    }[];
    days: {
        full: string;
        short: string;
        xshort: string;
    }[];
    getDays(): {
        full: string;
        short: string;
        xshort: string;
    }[];
    getDayLabel(d: number): string;
    getDateLabel(d: Date): string;
    getMonthLabel(m: number, y: number): string;
    getYearLabel(y: number): string;
    /**
     * Gets the first day of the month for the given date's month.
     * @param {Date} date
     * @returns {Date}
     */
    getFirstDateOfWeek(date: Date): Date;
    /**
     * Gets the first day of the month for the given date's month.
     * @param {Date} date
     * @returns {Date}
     */
    getFirstDateOfMonth(date: Date): Date;
    /**
     * Gets the number of days in the month for the given date's month.
     * @param date
     * @returns {number}
     */
    getNumberOfDaysInMonth(date: Date): number;
    /**
     * Get an arbitrary date in the month after the given date's month.
     * @param date
     * @returns {Date}
     */
    getDateInNextMonth(date: Date): Date;
    /**
     * Get an arbitrary date in the month before the given date's month.
     * @param date
     * @returns {Date}
     */
    getDateInPreviousMonth(date: Date): Date;
    /**
     * Gets whether two dates have the same month and year.
     * @param {Date} d1
     * @param {Date} d2
     * @returns {boolean}
     */
    isSameMonthAndYear(d1: Date, d2: Date): boolean;
    /**
     * Gets whether two dates are the same day (not not necesarily the same time).
     * @param {Date} d1
     * @param {Date} d2
     * @returns {boolean}
     */
    isSameDay(d1: Date, d2: Date): boolean;
    /**
     * Gets whether a date is in the month immediately after some date.
     * @param {Date} startDate The date from which to compare.
     * @param {Date} endDate The date to check.
     * @returns {boolean}
     */
    isInNextMonth(startDate: Date, endDate: Date): boolean;
    /**
     * Gets whether a date is in the month immediately before some date.
     * @param {Date} startDate The date from which to compare.
     * @param {Date} endDate The date to check.
     * @returns {boolean}
     */
    isInPreviousMonth(startDate: Date, endDate: Date): boolean;
    /**
     * Gets the midpoint between two dates.
     * @param {Date} d1
     * @param {Date} d2
     * @returns {Date}
     */
    getDateMidpoint(d1: Date, d2: Date): Date;
    /**
     * Gets the week of the month that a given date occurs in.
     * @param {Date} date
     * @returns {number} Index of the week of the month (zero-based).
     */
    getWeekOfMonth(date: Date): number;
    /**
     * Gets a new date incremented by the given number of minutes. Number of minutes can be negative.
     * @param {Date} date
     * @param {number} numberOfMinutes
     * @returns {Date}
     */
    incrementMinutes(date: Date, numberOfMinutes: number): Date;
    /**
     * Gets a new date incremented by the given number of hours. Number of hours can be negative.
     * @param {Date} date
     * @param {number} numberOfHours
     * @returns {Date}
     */
    incrementHours(date: Date, numberOfHours: number): Date;
    /**
     * Gets a new date incremented by the given number of days. Number of days can be negative.
     * @param {Date} date
     * @param {number} numberOfDays
     * @returns {Date}
     */
    incrementDays(date: Date, numberOfDays: number): Date;
    /**
     * Gets a new date incremented by the given number of months. Number of months can be negative.
     * If the date of the given month does not match the target month, the date will be set to the
     * last day of the month.
     * @param {Date} date
     * @param {number} numberOfMonths
     * @returns {Date}
     */
    incrementMonths(date: Date, numberOfMonths: number): Date;
    /**
     * Get the integer distance between two months. This *only* considers the month and year
     * portion of the Date instances.
     *
     * @param {Date} start
     * @param {Date} end
     * @returns {number} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    getMonthDistance(start: Date, end: Date): number;
    /**
     * Gets the last day of the month for the given date.
     * @param {Date} date
     * @returns {Date}
     */
    getLastDateOfMonth(date: Date): Date;
    /**
     * Checks whether a date is valid.
     * @param {Date} date
     * @return {boolean} Whether the date is a valid Date.
     */
    isValidDate(date: Date): boolean;
    /**
     * Sets a date's time to midnight.
     * @param {Date} date
     */
    setDateTimeToMidnight(date: Date): void;
    /**
     * Creates a date with the time set to midnight.
     * Drop-in replacement for two forms of the Date constructor:
     * 1. No argument for Date representing now.
     * 2. Single-argument value representing number of seconds since Unix Epoch
     * or a Date object.
     * @param {number|Date=} value
     * @return {Date} New date with time set to midnight.
     */
    createDateAtMidnight(value: any): Date;
    /**
     * Checks if a date is within a min and max range, ignoring the time component.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {Date} date
     * @param {Date} minDate
     * @param {Date} maxDate
     */
    isDateWithinRange(date: Date, minDate: Date, maxDate: Date): boolean;
    /**
     * Gets a new date incremented by the given number of years. Number of years can be negative.
     * See `incrementMonths` for notes on overflow for specific dates.
     * @param {Date} date
     * @param {number} numberOfYears
     * @returns {Date}
     */
    incrementYears(date: Date, numberOfYears: number): Date;
    /**
     * Get the integer distance between two years. This *only* considers the year portion of the
     * Date instances.
     *
     * @param {Date} start
     * @param {Date} end
     * @returns {number} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    getYearDistance(start: Date, end: Date): number;
    /**
     * Clamps a date between a minimum and a maximum date.
     * @param {Date} date Date to be clamped
     * @param {Date=} minDate Minimum date
     * @param {Date=} maxDate Maximum date
     * @return {Date}
     */
    clampDate(date: Date, minDate: Date, maxDate: Date): Date;
    /**
     * Extracts and parses the timestamp from a DOM node.
     * @param  {HTMLElement} node Node from which the timestamp will be extracted.
     * @return {number} Time since epoch.
     */
    getTimestampFromNode(node: any): number;
    /**
     * Checks if a month is within a min and max range, ignoring the date and time components.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {Date} date
     * @param {Date} minDate
     * @param {Date} maxDate
     */
    isMonthWithinRange(date: Date, minDate: Date, maxDate: Date): boolean;
}
