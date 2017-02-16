import { AfterContentInit, ElementRef, OnDestroy, EventEmitter, Renderer, QueryList, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Md2DateUtil } from './dateUtil';
import { DateLocale } from './date-locale';
import { Overlay, Portal } from '../core';
/** Change event object emitted by Md2Select. */
export declare class Md2DateChange {
    source: Md2Datepicker;
    date: Date;
    constructor(source: Md2Datepicker, date: Date);
}
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
export declare class Md2Datepicker implements AfterContentInit, OnDestroy, ControlValueAccessor {
    private _element;
    private overlay;
    private _renderer;
    private _dateUtil;
    private _locale;
    _control: NgControl;
    private _overlayRef;
    private _backdropSubscription;
    private _date;
    private _panelOpen;
    private _selected;
    private _openOnFocus;
    private mouseMoveListener;
    private mouseUpListener;
    _transformOrigin: string;
    _panelDoneAnimating: boolean;
    templatePortals: QueryList<Portal<any>>;
    /** Event emitted when the select has been opened. */
    onOpen: EventEmitter<void>;
    /** Event emitted when the select has been closed. */
    onClose: EventEmitter<void>;
    /** Event emitted when the selected date has been changed by the user. */
    change: EventEmitter<Md2DateChange>;
    constructor(_element: ElementRef, overlay: Overlay, _renderer: Renderer, _dateUtil: Md2DateUtil, _locale: DateLocale, _control: NgControl);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    date: Date;
    selected: Date;
    openOnFocus: boolean;
    isOpen: boolean;
    readonly panelOpen: boolean;
    toggle(): void;
    /** Opens the overlay panel. */
    open(): void;
    /** Closes the overlay panel and focuses the host element. */
    close(): void;
    /** Removes the panel from the DOM. */
    destroyPanel(): void;
    _onPanelDone(): void;
    _onFadeInDone(): void;
    private _focusPanel();
    private _focusHost();
    private coerceDateProperty(value, fallbackValue?);
    private _format;
    private _required;
    private _disabled;
    private _isInitialized;
    _onChange: (value: any) => void;
    _onTouched: () => void;
    _isYearsVisible: boolean;
    _isCalendarVisible: boolean;
    _isHoursVisible: boolean;
    _weekDays: Array<any>;
    _hours: Array<Object>;
    _minutes: Array<Object>;
    _prevMonth: number;
    _currMonth: number;
    _nextMonth: number;
    _years: Array<number>;
    _dates: Array<Object>;
    private today;
    private _displayDate;
    _viewDay: IDay;
    _viewValue: string;
    _clock: any;
    private _min;
    private _max;
    type: 'date' | 'time' | 'datetime';
    name: string;
    id: string;
    placeholder: string;
    tabindex: number;
    format: string;
    required: boolean;
    disabled: boolean;
    min: Date;
    max: Date;
    displayDate: Date;
    _handleClick(event: MouseEvent): void;
    _handleKeydown(event: KeyboardEvent): void;
    _onFocus(): void;
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
    _handleMousedown(event: MouseEvent): void;
    _handleMousemove(event: MouseEvent): void;
    _handleMouseup(event: MouseEvent): void;
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
    /** Emits an event when the user selects a date. */
    _emitChangeEvent(): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => {}): void;
    private _subscribeToBackdrop();
    /**
     *  This method creates the overlay from the provided panel's template and saves its
     *  OverlayRef so that it can be attached to the DOM when open is called.
     */
    private _createOverlay();
    private _cleanUpSubscriptions();
}
export declare const MD2_DATEPICKER_DIRECTIVES: typeof Md2Datepicker[];
export declare class Md2DatepickerModule {
    static forRoot(): ModuleWithProviders;
}
