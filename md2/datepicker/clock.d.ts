import { ElementRef, EventEmitter } from '@angular/core';
export declare const CLOCK_HOURS: number;
export declare const CLOCK_MINUTES: number;
export declare const CLOCK_RADIUS: number;
export declare const CLOCK_INNER_RADIUS: number;
export declare const CLOCK_OUTER_RADIUS: number;
export declare const CLOCK_TICK_RADIUS: number;
export declare class Md2Clock {
    private _element;
    private mouseMoveListener;
    private mouseUpListener;
    private _time;
    _view: boolean;
    _hours: Array<Object>;
    _minutes: Array<Object>;
    _hour: number;
    _minute: number;
    constructor(_element: ElementRef);
    timeChange: EventEmitter<string>;
    onHourChange: EventEmitter<number>;
    onMinuteChange: EventEmitter<number>;
    time: string;
    view: string;
    readonly hand: any;
    _handleMousedown(event: any): void;
    _handleMousemove(event: any): void;
    _handleMouseup(event: any): void;
    _handleKeydown(event: KeyboardEvent): void;
    /** Emits an event when the user selects a time. */
    _emitChangeEvent(): void;
    /**
     * render Click
     */
    private renderClock();
    /**
     * Set Time
     * @param event
     */
    private setTime(event);
}
