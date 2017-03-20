import { ElementRef, EventEmitter } from '@angular/core';
import { DateLocale } from './date-locale';
export declare class Md2Calendar {
    private _element;
    private _locale;
    private _selected;
    private _date;
    _days: Array<any>;
    dates: Array<any>;
    _view: boolean;
    constructor(_element: ElementRef, _locale: DateLocale);
    selectedChange: EventEmitter<Date>;
    selected: Date;
    date: Date;
    view: string;
    /** Emits an event when the user selects a time. */
    _emitChangeEvent(): void;
    /**
     * render Calendar
     */
    private renderCalendar();
}
