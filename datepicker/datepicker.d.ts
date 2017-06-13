import { ElementRef, EventEmitter, OnDestroy, ViewContainerRef, NgZone } from '@angular/core';
import { AbstractControl, ControlValueAccessor, ValidationErrors } from '@angular/forms';
import { Overlay } from '../core/overlay/overlay';
import { Dir } from '../core/rtl/dir';
import { Md2Calendar } from './calendar';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
import 'rxjs/add/operator/first';
/** Change event object emitted by Md2Select. */
export declare class Md2DateChange {
    source: Md2Datepicker;
    value: Date;
    constructor(source: Md2Datepicker, value: Date);
}
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * Md2Calendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
 */
export declare class Md2DatepickerContent {
    datepicker: Md2Datepicker;
    _calendar: Md2Calendar;
    /**
     * Handles keydown event on datepicker content.
     * @param event The event.
     */
    _handleKeydown(event: KeyboardEvent): void;
}
export declare const MD2_DATEPICKER_VALUE_ACCESSOR: any;
export declare const MD2_DATEPICKER_VALIDATORS: any;
export declare class Md2Datepicker implements OnDestroy, ControlValueAccessor {
    private _element;
    private _overlay;
    private _ngZone;
    private _viewContainerRef;
    private _locale;
    private _util;
    private _dir;
    _onChange: (value: any) => void;
    _onTouched: () => void;
    _validatorOnChange: () => void;
    _inputFocused: boolean;
    /** The date to open the calendar to initially. */
    startAt: Date;
    /** The view that the calendar should start in. */
    startView: 'clock' | 'month' | 'year';
    /**
     * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
     * than a popup and elements have more padding to allow for bigger touch targets.
     */
    touchUi: boolean;
    tabindex: number;
    mode: 'auto' | 'portrait' | 'landscape';
    placeholder: string;
    timeInterval: number;
    type: 'date' | 'time' | 'month' | 'datetime';
    private _type;
    format: string;
    private _format;
    /** The minimum valid date. */
    min: Date;
    _minDate: Date;
    /** The maximum valid date. */
    max: Date;
    _maxDate: Date;
    dateFilter: (date: Date | null) => boolean;
    _dateFilter: (date: Date | null) => boolean;
    required: boolean;
    private _required;
    disabled: boolean;
    private _disabled;
    value: Date;
    private _value;
    _inputValue: string;
    openOnFocus: boolean;
    private _openOnFocus;
    isOpen: boolean;
    /** Event emitted when the select has been opened. */
    onOpen: EventEmitter<void>;
    /** Event emitted when the select has been closed. */
    onClose: EventEmitter<void>;
    /** Event emitted when the selected date has been changed by the user. */
    change: EventEmitter<Md2DateChange>;
    /** Emits new selected date when selected date changes. */
    selectedChanged: EventEmitter<Date>;
    /** Whether the calendar is open. */
    opened: boolean;
    /** The id for the datepicker calendar. */
    id: string;
    /** The currently selected date. */
    _selected: Date;
    /** A reference to the overlay when the calendar is opened as a popup. */
    private _popupRef;
    /** A reference to the overlay when the calendar is opened as a dialog. */
    private _dialogRef;
    /** A portal containing the calendar for this datepicker. */
    private _calendarPortal;
    private _inputSubscription;
    /** The form control validator for the min date. */
    private _minValidator;
    /** The form control validator for the max date. */
    private _maxValidator;
    /** The form control validator for the date filter. */
    private _filterValidator;
    /** The combined form control validator for this input. */
    private _validator;
    constructor(_element: ElementRef, _overlay: Overlay, _ngZone: NgZone, _viewContainerRef: ViewContainerRef, _locale: DateLocale, _util: DateUtil, _dir: Dir);
    ngOnDestroy(): void;
    registerOnValidatorChange(fn: () => void): void;
    validate(c: AbstractControl): ValidationErrors | null;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => {}): void;
    setDisabledState(isDisabled: boolean): void;
    _handleFocus(): void;
    _handleBlur(event: Event): void;
    private coerceDateProperty(value);
    /**
     * format date
     * @param date Date Object
     * @return string with formatted date
     */
    private _formatDate(date);
    /**
     * Get an hour of the date in the 12-hour format
     * @param date Date Object
     * @return hour of the date in the 12-hour format
     */
    private _getHours12(hours);
    /** Selects the given date and closes the currently open popup or dialog. */
    _selectAndClose(date: Date): void;
    /** Emits an event when the user selects a date. */
    _emitChangeEvent(): void;
    /** Open the calendar. */
    open(): void;
    /** Close the calendar. */
    close(): void;
    /** Open the calendar as a dialog. */
    private _openAsDialog();
    /** Open the calendar as a popup. */
    private _openAsPopup();
    /** Create the dialog. */
    private _createDialog();
    /** Create the popup. */
    private _createPopup();
    /** Create the popup PositionStrategy. */
    private _createPopupPositionStrategy();
}
