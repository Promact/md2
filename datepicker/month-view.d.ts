import { AfterContentInit, EventEmitter } from '@angular/core';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
import { Md2CalendarCell } from './calendar-body';
import { MdDateFormats } from '../core/datetime/date-formats';
/**
 * An internal component used to display a single month in the datepicker.
 * @docs-private
 */
export declare class Md2MonthView implements AfterContentInit {
    private _locale;
    private _util;
    private _dateFormats;
    /**
     * The date to display in this month view (everything other than the month and year is ignored).
     */
    activeDate: Date;
    private _activeDate;
    /** The currently selected date. */
    selected: Date;
    private _selected;
    /** A function used to filter which dates are selectable. */
    dateFilter: (date: Date) => boolean;
    /** Emits when a new date is selected. */
    selectedChange: EventEmitter<Date>;
    /** Grid of calendar cells representing the dates of the month. */
    _weeks: Md2CalendarCell[][];
    /** The number of blank cells in the first row before the 1st of the month. */
    _firstWeekOffset: number;
    /**
     * The date of the month that the currently selected Date falls on.
     * Null if the currently selected Date is in another month.
     */
    _selectedDate: number;
    /** The date of the month that today falls on. Null if today is in another month. */
    _todayDate: number;
    /** The names of the weekdays. */
    _weekdays: {
        long: string;
        narrow: string;
    }[];
    _calendarState: string;
    constructor(_locale: DateLocale, _util: DateUtil, _dateFormats: MdDateFormats);
    ngAfterContentInit(): void;
    /** Handles when a new date is selected. */
    _dateSelected(date: number): void;
    /** Initializes this month view. */
    private _init();
    /** Creates MdCalendarCells for the dates in this month. */
    private _createWeekCells();
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     */
    private _getDateInCurrentMonth(date);
    private calendarState(direction);
    _calendarStateDone(): void;
}
