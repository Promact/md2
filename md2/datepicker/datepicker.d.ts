import { ElementRef, OnDestroy, EventEmitter, Renderer, QueryList, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DateLocale } from './date-locale';
import { Md2Clock } from './clock';
import { Overlay, Portal } from '../core';
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
export declare class Md2Datepicker implements OnDestroy, ControlValueAccessor {
    private _element;
    private overlay;
    private _renderer;
    private _locale;
    _control: NgControl;
    private _overlayRef;
    private _backdropSubscription;
    private _value;
    private _selected;
    private _date;
    private _panelOpen;
    private _openOnFocus;
    private _type;
    private _mode;
    private _container;
    private _format;
    private _required;
    private _disabled;
    private today;
    private _min;
    private _max;
    _years: Array<number>;
    _dates: Array<Object>;
    _isYearsVisible: boolean;
    _isCalendarVisible: boolean;
    _clockView: string;
    _calendarState: string;
    _weekDays: Array<any>;
    _prevMonth: number;
    _currMonth: number;
    _nextMonth: number;
    _transformOrigin: string;
    _panelDoneAnimating: boolean;
    _onChange: (value: any) => void;
    _onTouched: () => void;
    templatePortals: QueryList<Portal<any>>;
    /** Event emitted when the select has been opened. */
    onOpen: EventEmitter<void>;
    /** Event emitted when the select has been closed. */
    onClose: EventEmitter<void>;
    /** Event emitted when the selected date has been changed by the user. */
    change: EventEmitter<Md2DateChange>;
    constructor(_element: ElementRef, overlay: Overlay, _renderer: Renderer, _locale: DateLocale, _control: NgControl);
    ngOnDestroy(): void;
    placeholder: string;
    okLabel: string;
    cancelLabel: string;
    tabindex: number;
    enableDates: Array<Date>;
    disableDates: Array<Date>;
    disableWeekDays: Array<number>;
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
    date: Date;
    time: string;
    selected: Date;
    required: boolean;
    disabled: boolean;
    min: Date;
    max: Date;
    openOnFocus: boolean;
    isOpen: boolean;
    readonly panelOpen: boolean;
    readonly getDateLabel: string;
    readonly getMonthLabel: string;
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
    _onFocus(): void;
    _onBlur(): void;
    _clearValue(event: Event): void;
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
    _toggleHours(value: string): void;
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
    _onTimeChange(event: string): void;
    _onHourChange(event: number): void;
    _onMinuteChange(event: number): void;
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
    private setHour(hour);
    /**
     * Set minutes
     * @param minute number of minutes
     */
    private setMinute(minute);
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
    private calendarState(direction);
}
export declare const MD2_DATEPICKER_DIRECTIVES: (typeof Md2Clock | typeof Md2Datepicker)[];
export declare class Md2DatepickerModule {
    static forRoot(): ModuleWithProviders;
}
