import { AfterContentInit, ElementRef, EventEmitter, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Md2DateUtil } from './dateUtil';
export interface IDay {
    year: number;
    month: string;
    date: string;
    day: string;
    hour: string;
    minute: string;
}
export interface IDate {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
}
export interface IWeek {
    dateObj: IDate;
    date: Date;
    calMonth: number;
    today: boolean;
    disabled: boolean;
}
export declare const MD2_DATEPICKER_CONTROL_VALUE_ACCESSOR: any;
export declare class Md2Datepicker implements AfterContentInit, ControlValueAccessor {
    private _dateUtil;
    private _element;
    constructor(_dateUtil: Md2DateUtil, _element: ElementRef);
    ngAfterContentInit(): void;
    private _value;
    private _readonly;
    private _required;
    private _disabled;
    private _isInitialized;
    private _onTouchedCallback;
    private _onChangeCallback;
    private _isDatepickerVisible;
    private _isYearsVisible;
    private _isCalendarVisible;
    private _isHoursVisible;
    private _months;
    private _days;
    private _hours;
    private _minutes;
    private _prevMonth;
    private _currMonth;
    private _nextMonth;
    private _years;
    private _dates;
    private _today;
    private _displayDate;
    private _selectedDate;
    private _displayDay;
    private _displayInputDate;
    private _clock;
    private _minDate;
    private _maxDate;
    change: EventEmitter<any>;
    type: 'date' | 'time' | 'datetime';
    name: string;
    id: string;
    class: string;
    placeholder: string;
    format: string;
    tabindex: number;
    readonly: boolean;
    required: boolean;
    disabled: boolean;
    min: string;
    max: string;
    value: any;
    displayDate: Date;
    private _handleClick(event);
    private _handleKeydown(event);
    private _onBlur();
    /**
     * Display Years
     */
    private _showYear();
    private _getYears();
    private _scrollToSelectedYear();
    /**
     * select year
     * @param year
     */
    private _setYear(year);
    /**
     * Display Datepicker
     */
    private _showDatepicker();
    /**
     * Display Calendar
     */
    private _showCalendar();
    /**
     * Toggle Hour visiblity
     */
    private _toggleHours(value);
    /**
     * Ok Button Event
     */
    private _onClickOk();
    /**
     * Date Selection Event
     * @param event Event Object
     * @param date Date Object
     */
    private _onClickDate(event, date);
    /**
     * Set Date
     * @param date Date Object
     */
    private _setDate(date);
    /**
     * Update Month
     * @param noOfMonths increment number of months
     */
    private _updateMonth(noOfMonths);
    /**
     * Check is Before month enabled or not
     * @return boolean
     */
    private _isBeforeMonth();
    /**
     * Check is After month enabled or not
     * @return boolean
     */
    private _isAfterMonth();
    /**
     * Check the date is enabled or not
     * @param date Date Object
     * @return boolean
     */
    private _isDisabledDate(date);
    /**
     * Generate Month Calendar
     */
    private _generateCalendar();
    /**
     * Select Hour
     * @param event Event Object
     * @param hour number of hours
     */
    private _onClickHour(event, hour);
    /**
     * Select Minute
     * @param event Event Object
     * @param minute number of minutes
     */
    private _onClickMinute(event, minute);
    /**
     * Set hours
     * @param hour number of hours
     */
    private _setHour(hour);
    /**
     * Set minutes
     * @param minute number of minutes
     */
    private _setMinute(minute);
    /**
     * reser clock hands
     */
    private _resetClock();
    /**
     * set clock hand
     * @param x number of x position
     * @param y number of y position
     */
    private _setClockHand(x, y);
    /**
     * render Click
     */
    private _generateClock();
    /**
     * format date
     * @param date Date Object
     * @return string with formatted date
     */
    private _formatDate(date);
    /**
     * Prepend Zero
     * @param value String value
     * @return string with prepend Zero
     */
    private _prependZero(value);
    /**
     * Get Offset
     * @param element HtmlElement
     * @return top, left offset from page
     */
    private _offset(element);
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
export declare const MD2_DATEPICKER_DIRECTIVES: typeof Md2Datepicker[];
export declare class Md2DatepickerModule {
    static forRoot(): ModuleWithProviders;
}
