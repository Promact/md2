import { AfterContentInit, ElementRef, OnDestroy, EventEmitter, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, Validator } from '@angular/forms';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
import { Overlay } from '../core';
import { ClockView } from './clock';
/** Change event object emitted by Md2Select. */
export declare class Md2DateChange {
    source: Md2Datepicker;
    value: Date;
    constructor(source: Md2Datepicker, value: Date);
}
export declare type Type = 'date' | 'time' | 'datetime';
export declare type Mode = 'auto' | 'portrait' | 'landscape';
export declare type Container = 'inline' | 'dialog';
export declare type PanelPositionX = 'before' | 'after';
export declare type PanelPositionY = 'above' | 'below';
export declare class Md2Datepicker implements AfterContentInit, OnDestroy, ControlValueAccessor, Validator {
    private _element;
    private overlay;
    private _viewContainerRef;
    private _locale;
    private _util;
    _control: NgControl;
    private _portal;
    private _overlayRef;
    private _backdropSubscription;
    private _value;
    private _panelOpen;
    private _openOnFocus;
    private _type;
    private _mode;
    private _container;
    private _format;
    private _required;
    private _disabled;
    private today;
    _years: Array<number>;
    _dates: Array<Object>;
    _isYearsVisible: boolean;
    _isCalendarVisible: boolean;
    _clockView: ClockView;
    _calendarState: string;
    _weekDays: Array<any>;
    _prevMonth: number;
    _currMonth: number;
    _nextMonth: number;
    _transformOrigin: string;
    _panelDoneAnimating: boolean;
    _inputFocused: boolean;
    _onChange: (value: any) => void;
    _onTouched: () => void;
    private _validatorOnChange;
    _templatePortal: TemplateRef<any>;
    _input: ElementRef;
    /** Event emitted when the select has been opened. */
    onOpen: EventEmitter<void>;
    /** Event emitted when the select has been closed. */
    onClose: EventEmitter<void>;
    /** Event emitted when the selected date has been changed by the user. */
    change: EventEmitter<Md2DateChange>;
    constructor(_element: ElementRef, overlay: Overlay, _viewContainerRef: ViewContainerRef, _locale: DateLocale, _util: DateUtil, _control: NgControl);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    registerOnValidatorChange(fn: () => void): void;
    placeholder: string;
    okLabel: string;
    cancelLabel: string;
    tabindex: number;
    enableDates: Array<Date>;
    disableDates: Array<Date>;
    disableWeekDays: Array<number>;
    timeInterval: number;
    /** Position of the menu in the X axis. */
    positionX: PanelPositionX;
    /** Position of the menu in the Y axis. */
    positionY: PanelPositionY;
    overlapTrigger: boolean;
    type: Type;
    format: string;
    mode: Mode;
    container: Container;
    value: Date;
    activeDate: Date;
    private _activeDate;
    readonly minutes: string;
    readonly hours: string;
    /**
     * Return the am/pm part of the hour description
     * @param upperCase  boolean if true return AM/PM, default false
     * @return string the am/pm part of the hour description
     */
    private _ampm(upperCase?);
    selected: Date;
    required: boolean;
    disabled: boolean;
    /** The minimum selectable date. */
    min: Date;
    private _min;
    /** The maximum selectable date. */
    max: Date;
    private _max;
    openOnFocus: boolean;
    isOpen: boolean;
    readonly panelOpen: boolean;
    readonly getDateLabel: string;
    readonly getMonthLabel: string;
    /** The form control validator for the min date. */
    private _minValidator;
    /** The form control validator for the max date. */
    private _maxValidator;
    _dateFilter: (date: Date | null) => boolean;
    /** The form control validator for the date filter. */
    private _filterValidator;
    private _validator;
    toggle(): void;
    /** Opens the overlay panel. */
    open(): void;
    /** Closes the overlay panel and focuses the host element. */
    close(): void;
    /** Removes the panel from the DOM. */
    destroyPanel(): void;
    _onPanelDone(): void;
    _onFadeInDone(): void;
    _handleWindowResize(event: Event): void;
    private _focusPanel();
    private _focusHost();
    private coerceDateProperty(value);
    _handleClick(event: MouseEvent): void;
    _handleKeydown(event: KeyboardEvent): void;
    _onBlur(): void;
    _handleFocus(event: Event): void;
    _handleBlur(event: Event): void;
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
     * Display Calendar
     */
    _showCalendar(): void;
    /**
     * Toggle Hour visiblity
     */
    _toggleHours(value: ClockView): void;
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
     * date selected
     * @param date Date Object
     */
    _dateSelected(date: Date): void;
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
    _onActiveTimeChange(event: Date): void;
    _onTimeChange(event: Date): void;
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
     * Set hours
     * @param hour number of hours
     */
    _hourSelected(hour: number): void;
    /**
     * Set minutes
     * @param minute number of minutes
     */
    _minuteSelected(minute: number): void;
    /** Emits an event when the user selects a date. */
    _emitChangeEvent(): void;
    validate(c: AbstractControl): ValidationErrors | null;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => {}): void;
    setDisabledState(isDisabled: boolean): void;
    /**
     * Get an hour of the date in the 12-hour format
     * @param date Date Object
     * @return hour of the date in the 12-hour format
     */
    private _getHours12(date);
    is12HourClock(): boolean;
    /**
     * format date
     * @param date Date Object
     * @return string with formatted date
     */
    private _formatDate(date);
    private _subscribeToBackdrop();
    /**
     *  This method creates the overlay from the provided panel's template and saves its
     *  OverlayRef so that it can be attached to the DOM when open is called.
     */
    private _createOverlay();
    private _cleanUpSubscriptions();
    private calendarState(direction);
}
