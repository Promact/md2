import { AfterContentInit, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
export declare class Md2Calendar implements AfterContentInit {
    private _elementRef;
    private _ngZone;
    private _locale;
    private _util;
    type: 'date' | 'time' | 'month' | 'datetime';
    /** A date representing the period (month or year) to start the calendar in. */
    startAt: Date;
    /** Whether the calendar should be started in month or year view. */
    startView: 'clock' | 'month' | 'year';
    /** The currently selected date. */
    selected: Date;
    /** The minimum selectable date. */
    minDate: Date;
    /** The maximum selectable date. */
    maxDate: Date;
    timeInterval: number;
    /** A function used to filter which dates are selectable. */
    dateFilter: (date: Date) => boolean;
    /** Emits when the currently selected date changes. */
    selectedChange: EventEmitter<Date>;
    /** Date filter for the month and year views. */
    _dateFilterForViews: (date: Date) => boolean;
    /**
     * The current active date. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     */
    _activeDate: Date;
    private _clampedActiveDate;
    /** Whether the calendar is in month view. */
    _currentView: 'clock' | 'month' | 'year';
    _clockView: 'hour' | 'minute';
    /** The label for the current calendar view. */
    readonly _yearLabel: string;
    readonly _monthYearLabel: string;
    readonly _dateLabel: string;
    readonly _hoursLabel: string;
    readonly _minutesLabel: string;
    _calendarState: string;
    constructor(_elementRef: ElementRef, _ngZone: NgZone, _locale: DateLocale, _util: DateUtil);
    ngAfterContentInit(): void;
    /** Handles date selection in the month view. */
    _dateSelected(date: Date): void;
    /** Handles month selection in the year view. */
    _monthSelected(month: Date): void;
    _timeSelected(date: Date): void;
    _onActiveDateChange(date: Date): void;
    _yearClicked(): void;
    _dateClicked(): void;
    _hoursClicked(): void;
    _minutesClicked(): void;
    /** Handles user clicks on the previous button. */
    _previousClicked(): void;
    /** Handles user clicks on the next button. */
    _nextClicked(): void;
    /** Whether the previous period button is enabled. */
    _previousEnabled(): boolean;
    /** Whether the next period button is enabled. */
    _nextEnabled(): boolean;
    /** Handles keydown events on the calendar body. */
    _handleCalendarBodyKeydown(event: KeyboardEvent): void;
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    private _isSameView(date1, date2);
    /** Handles keydown events on the calendar body when calendar is in month view. */
    private _handleCalendarBodyKeydownInMonthView(event);
    /** Handles keydown events on the calendar body when calendar is in year view. */
    private _handleCalendarBodyKeydownInYearView(event);
    /** Handles keydown events on the calendar body when calendar is in month view. */
    private _handleCalendarBodyKeydownInClockView(event);
    /**
     * Determine the date for the month that comes before the given month in the same column in the
     * calendar table.
     */
    private _prevMonthInSameCol(date);
    /**
     * Determine the date for the month that comes after the given month in the same column in the
     * calendar table.
     */
    private _nextMonthInSameCol(date);
    private calendarState(direction);
    _calendarStateDone(): void;
}
