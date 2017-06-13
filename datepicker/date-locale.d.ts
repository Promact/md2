export interface Months {
    long: Array<string>;
    short: Array<string>;
    narrow: Array<string>;
}
export interface DaysOfWeek {
    long: Array<string>;
    short: Array<string>;
    narrow: Array<string>;
}
export declare class DateLocale {
    locale: any;
    months: Months;
    daysOfWeek: DaysOfWeek;
    dates: string[];
    hours: string[];
    minutes: string[];
    firstDayOfWeek: number;
    getDayOfWeek(date: Date): number;
    getMonthNames(style: 'long' | 'short' | 'narrow'): string[];
    getDateNames(): string[];
    getHourNames(): string[];
    getMinuteNames(): string[];
    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];
    getYearName(date: Date): string;
    getFirstDayOfWeek(): number;
    format(date: Date, displayFormat: Object): string;
    getDateLabel(d: Date): string;
    getHoursLabel(d: Date): string;
    getMinutesLabel(d: Date): string;
    getMonthLabel(d: Date): string;
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param s The string to strip direction characters from.
     * @returns The stripped string.
     */
    private _stripDirectionalityCharacters(s);
}
