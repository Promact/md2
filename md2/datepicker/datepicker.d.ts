import { AfterContentInit, OnDestroy, EventEmitter, ModuleWithProviders } from '@angular/core';
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
export declare class Md2Datepicker implements AfterContentInit, OnDestroy, ControlValueAccessor {
    private dateUtil;
    constructor(dateUtil: Md2DateUtil);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private _value;
    private _disabled;
    private _onTouchedCallback;
    private _onChangeCallback;
    private isDatepickerVisible;
    private isCalendarVisible;
    private isHoursVisible;
    private months;
    private days;
    private hours;
    private minutes;
    private prevMonth;
    private currMonth;
    private nextMonth;
    private dates;
    private today;
    private _displayDate;
    private selectedDate;
    private displayDay;
    private displayInputDate;
    private clock;
    change: EventEmitter<any>;
    type: 'date' | 'time' | 'datetime';
    disabled: boolean;
    name: string;
    id: string;
    class: string;
    placeholder: string;
    format: string;
    tabindex: number;
    private _minDate;
    private _maxDate;
    min: string;
    max: string;
    value: any;
    displayDate: Date;
    private onClick(event);
    private onKeyDown(event);
    private onBlur();
    /**
     * Display Datepicker
     */
    private showDatepicker();
    /**
     * Display Calendar
     */
    private showCalendar();
    /**
     * Toggle Hour visiblity
     */
    private toggleHours(value);
    /**
     * Ok Button Event
     */
    private onClickOk();
    /**
     * Date Selection Event
     * @param event Event Object
     * @param date Date Object
     */
    private onClickDate(event, date);
    /**
     * Set Date
     * @param date Date Object
     */
    private setDate(date);
    /**
     * Update Month
     * @param noOfMonths increment number of months
     */
    private updateMonth(noOfMonths);
    /**
     * Check is Before month enabled or not
     * @return boolean
     */
    private isBeforeMonth();
    /**
     * Check is After month enabled or not
     * @return boolean
     */
    private isAfterMonth();
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
    private onClickHour(event, hour);
    /**
     * Select Minute
     * @param event Event Object
     * @param minute number of minutes
     */
    private onClickMinute(event, minute);
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
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
export declare const MD2_DATEPICKER_DIRECTIVES: typeof Md2Datepicker[];
export declare class Md2DatepickerModule {
    static forRoot(): ModuleWithProviders;
}
