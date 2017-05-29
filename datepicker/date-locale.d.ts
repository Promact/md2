/** Date locale info. TODO(mmalerba): Integrate with i18n solution once we know what we're doing. */
export declare class DateLocale {
    formatDate: (date: Date) => string;
    parseDate(value: any): Date;
    dates: any[];
    private _createDatesArray(format);
    getCalendarMonthHeaderLabel: (date: Date) => string;
    getCalendarYearHeaderLabel: (date: Date) => string;
    private _createFormatFunction(options);
    firstDayOfWeek: number;
    fullMonths: string[];
    shortMonths: string[];
    narrowMonths: string[];
    months: {
        full: string;
        short: string;
        xshort: string;
    }[];
    fullDays: string[];
    shortDays: string[];
    narrowDays: string[];
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
    private _createMonthsArray(format);
    private _createDaysArray(format);
}
