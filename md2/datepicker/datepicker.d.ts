import { AfterContentInit, ElementRef, EventEmitter, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
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
export declare class Md2Datepicker implements AfterContentInit, ControlValueAccessor {
    private _dateUtil;
    private element;
    _control: NgControl;
    constructor(_dateUtil: Md2DateUtil, element: ElementRef, _control: NgControl);
    ngAfterContentInit(): void;
    private _value;
    private _readonly;
    private _required;
    private _disabled;
    private _isInitialized;
    _onChange: (value: any) => void;
    _onTouched: () => void;
    _isDatepickerVisible: boolean;
    _isYearsVisible: boolean;
    _isCalendarVisible: boolean;
    _isHoursVisible: boolean;
    private months;
    _days: Array<string>;
    _hours: Array<Object>;
    _minutes: Array<Object>;
    _prevMonth: number;
    _currMonth: number;
    _nextMonth: number;
    _years: Array<number>;
    _dates: Array<Object>;
    private today;
    private _displayDate;
    _selectedDate: Date;
    _viewDay: IDay;
    _viewValue: string;
    _clock: any;
    private _min;
    private _max;
    change: EventEmitter<any>;
    type: 'date' | 'time' | 'datetime';
    name: string;
    id: string;
    placeholder: string;
    format: string;
    tabindex: number;
    readonly: boolean;
    required: boolean;
    disabled: boolean;
    min: Date;
    max: Date;
    value: any;
    displayDate: Date;
    _handleClick(event: MouseEvent): void;
    _handleKeydown(event: KeyboardEvent): void;
    _onBlur(): void;
    /**
     * Display Years
     */
    _showYear(): void;
    private getYears();
    private _scrollToSelectedYear();
    /**
     * select year
     * @param year
     */
    _setYear(year: number): void;
    /**
     * Display Datepicker
     */
    _showDatepicker(): void;
    /**
     * Display Calendar
     */
    _showCalendar(): void;
    /**
     * Toggle Hour visiblity
     */
    _toggleHours(value: boolean): void;
    /**
     * Ok Button Event
     */
    _onClickOk(): void;
    /**
     * Date Selection Event
     * @param event Event Object
     * @param date Date Object
     */
    _onClickDate(event: Event, date: any): void;
    /**
     * Set Date
     * @param date Date Object
     */
    private setDate(date);
    /**
     * Update Month
     * @param noOfMonths increment number of months
     */
    _updateMonth(noOfMonths: number): void;
    /**
     * Check is Before month enabled or not
     * @return boolean
     */
    _isBeforeMonth(): boolean;
    /**
     * Check is After month enabled or not
     * @return boolean
     */
    _isAfterMonth(): boolean;
    /**
     * Check the date is enabled or not
     * @param date Date Object
     * @return boolean
     */
    private _isDisabledDate(date);
    /**
     * Generate Month Calendar
     */
    private generateCalendar();
    /**
     * Select Hour
     * @param event Event Object
     * @param hour number of hours
     */
    _onClickHour(event: Event, hour: number): void;
    /**
     * Select Minute
     * @param event Event Object
     * @param minute number of minutes
     */
    _onClickMinute(event: Event, minute: number): void;
    /**
     * Set hours
     * @param hour number of hours
     */
    private setHour(hour);
    /**
     * Set minutes
     * @param minute number of minutes
     */
    private setMinute(minute);
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
    private generateClock();
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
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => {}): void;
}
export declare const MD2_DATEPICKER_DIRECTIVES: typeof Md2Datepicker[];
export declare class Md2DatepickerModule {
    static forRoot(): ModuleWithProviders;
}
