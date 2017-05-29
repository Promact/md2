import { AfterContentInit, ElementRef, EventEmitter } from '@angular/core';
import { DateUtil } from './date-util';
import { DateLocale } from './date-locale';
export declare const CLOCK_RADIUS = 50;
export declare const CLOCK_INNER_RADIUS = 27.5;
export declare const CLOCK_OUTER_RADIUS = 41.25;
export declare const CLOCK_TICK_RADIUS = 7.0833;
export declare type ClockView = 'hour' | 'minute';
/**
 * A clock that is used as part of the datepicker.
 * @docs-private
 */
export declare class Md2Clock implements AfterContentInit {
    private _element;
    private _locale;
    private _util;
    /**
     * The date to display in this clock view.
     */
    activeDate: Date;
    private _activeDate;
    /** The currently selected date. */
    selected: Date;
    private _selected;
    /** The minimum selectable date. */
    min: Date;
    private _min;
    /** The maximum selectable date. */
    max: Date;
    private _max;
    /** Whether the clock should be started in hour or minute view. */
    startView: ClockView;
    /** A function used to filter which dates are selectable. */
    dateFilter: (date: Date) => boolean;
    interval: number;
    twelvehour: boolean;
    /** Emits when the currently selected date changes. */
    selectedChange: EventEmitter<Date>;
    activeDateChange: EventEmitter<Date>;
    /** Hours and Minutes representing the clock view. */
    _hours: Array<Object>;
    _minutes: Array<Object>;
    /** Whether the clock is in hour view. */
    _hourView: boolean;
    _selectedHour: number;
    _selectedMinute: number;
    readonly _hand: any;
    private mouseMoveListener;
    private mouseUpListener;
    constructor(_element: ElementRef, _locale: DateLocale, _util: DateUtil);
    ngAfterContentInit(): void;
    /** Handles hour selection in the clock view. */
    _hourSelected(): void;
    /** Handles minute selection in the clock view. */
    _minuteSelected(): void;
    /** Handles mousedown events on the clock body. */
    _handleMousedown(event: any): void;
    _handleMousemove(event: any): void;
    _handleMouseup(event: any): void;
    /** Initializes this clock view. */
    private _init();
    /**
     * Set Time
     * @param event
     */
    private setTime(event);
}
