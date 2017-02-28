import { ElementRef, EventEmitter } from '@angular/core';
export declare class Md2Clock {
    private _element;
    private _selected;
    _view: boolean;
    constructor(_element: ElementRef);
    selectedChange: EventEmitter<Date>;
    selected: Date;
    view: string;
    /** Emits an event when the user selects a time. */
    _emitChangeEvent(): void;
    /**
     * render Calendar
     */
    private renderCalendar();
}
