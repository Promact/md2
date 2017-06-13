import { AfterContentInit, EventEmitter } from '@angular/core';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
import { Md2CalendarCell } from './calendar-body';
import { MdDateFormats } from '../core/datetime/date-formats';
/**
 * An internal component used to display a single year in the datepicker.
 * @docs-private
 */
export declare class Md2YearView implements AfterContentInit {
    private _locale;
    _util: DateUtil;
    private _dateFormats;
    /** The date to display in this year view (everything other than the year is ignored). */
    activeDate: Date;
    private _activeDate;
    /** The currently selected date. */
    selected: Date;
    private _selected;
    /** A function used to filter which dates are selectable. */
    dateFilter: (date: Date) => boolean;
    /** Emits when a new month is selected. */
    selectedChange: EventEmitter<Date>;
    /** Grid of calendar cells representing the months of the year. */
    _months: Md2CalendarCell[][];
    /** The label for this year (e.g. "2017"). */
    _yearLabel: string;
    /** The month in this year that today falls on. Null if today is in a different year. */
    _todayMonth: number;
    /**
     * The month in this year that the selected Date falls on.
     * Null if the selected Date is in a different year.
     */
    _selectedMonth: number;
    _calendarState: string;
    constructor(_locale: DateLocale, _util: DateUtil, _dateFormats: MdDateFormats);
    ngAfterContentInit(): void;
    /** Handles when a new month is selected. */
    _monthSelected(month: number): void;
    /** Initializes this month view. */
    private _init();
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    private _getMonthInCurrentYear(date);
    /** Creates an MdCalendarCell for the given month. */
    private _createCellForMonth(month, monthName);
    /** Whether the given month is enabled. */
    private _isMonthEnabled(month);
    private calendarState(direction);
    _calendarStateDone(): void;
}
