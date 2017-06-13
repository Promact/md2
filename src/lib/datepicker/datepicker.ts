import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  NgZone,
  Self,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { coerceBooleanProperty } from '../core';
import { Overlay } from '../core/overlay/overlay';
import { OverlayRef } from '../core/overlay/overlay-ref';
import { ComponentPortal } from '../core/portal/portal';
import { OverlayState } from '../core/overlay/overlay-state';
import { Dir } from '../core/rtl/dir';
import { PositionStrategy } from '../core/overlay/position/position-strategy';
import { Subscription } from 'rxjs/Subscription';
import { DateAdapter } from '../core/datetime/index';
import { ESCAPE } from '../core/keyboard/keycodes';
import { Md2Calendar } from './calendar';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
import 'rxjs/add/operator/first';

/** Change event object emitted by Md2Select. */
export class Md2DateChange {
  constructor(public source: Md2Datepicker, public value: Date) { }
}

/** Used to generate a unique ID for each datepicker instance. */
let datepickerUid = 0;


/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * Md2Calendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
 */
@Component({
  moduleId: module.id,
  selector: 'md2-datepicker-content',
  templateUrl: 'datepicker-content.html',
  styleUrls: ['datepicker-content.css'],
  host: {
    'class': 'md2-datepicker-content',
    '[class.md2-datepicker-content-touch]': 'datepicker?.touchUi',
    '(keydown)': '_handleKeydown($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Md2DatepickerContent {
  datepicker: Md2Datepicker;

  @ViewChild(Md2Calendar) _calendar: Md2Calendar;

  /**
   * Handles keydown event on datepicker content.
   * @param event The event.
   */
  _handleKeydown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case ESCAPE:
        this.datepicker.close();
        break;
      default:
        /* Return so that we don't preventDefault on keys that are not explicitly handled. */
        return;
    }

    event.preventDefault();
  }
}


export const MD2_DATEPICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Md2Datepicker),
  multi: true
};

export const MD2_DATEPICKER_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => Md2Datepicker),
  multi: true
};

/* Component responsible for managing the datepicker popup/dialog. */
@Component({
  moduleId: module.id,
  selector: 'md2-datepicker',
  templateUrl: 'datepicker.html',
  styleUrls: ['datepicker.css'],
  providers: [MD2_DATEPICKER_VALUE_ACCESSOR, MD2_DATEPICKER_VALIDATORS],
  host: {
    'role': 'datepicker',
    '[class.md2-datepicker-disabled]': 'disabled',
    '[class.md2-datepicker-opened]': 'opened',
    '[attr.aria-label]': 'placeholder',
    '[attr.aria-required]': 'required.toString()',
    '[attr.aria-disabled]': 'disabled.toString()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class Md2Datepicker implements OnDestroy, ControlValueAccessor {

  _onChange: (value: any) => void = () => { };
  _onTouched = () => { };
  _validatorOnChange = () => { };

  _inputFocused: boolean = false;

  /** The date to open the calendar to initially. */
  @Input() startAt: Date;

  /** The view that the calendar should start in. */
  @Input() startView: 'clock' | 'month' | 'year' = 'month';

  /**
   * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
   * than a popup and elements have more padding to allow for bigger touch targets.
   */
  @Input() touchUi = false;
  @Input() tabindex: number = 0;
  @Input() mode: 'auto' | 'portrait' | 'landscape' = 'auto';
  @Input() placeholder: string;
  @Input() timeInterval: number = 1;


  @Input()
  get type() { return this._type; }
  set type(value: 'date' | 'time' | 'month' | 'datetime') {
    this._type = value || 'date';
    this._inputValue = this._formatDate(this._value);
  }
  private _type: 'date' | 'time' | 'month' | 'datetime' = 'date';

  @Input()
  get format() {
    return this._format || (this.type === 'month' ? 'MMMM y' : this.type === 'date' ?
      'dd/MM/y' : this.type === 'time' ? 'HH:mm' : this.type === 'datetime' ?
        'dd/MM/y HH:mm' : 'dd/MM/y');
  }
  set format(value: string) {
    if (this._format !== value) {
      this._format = value;
      this._inputValue = this._formatDate(this._value);
    }
  }
  private _format: string;

  /** The minimum valid date. */
  @Input()
  get min(): Date { return this._minDate; }
  set min(value: Date) {
    this._minDate = value;
    this._validatorOnChange();
  }
  _minDate: Date;

  /** The maximum valid date. */
  @Input()
  get max(): Date { return this._maxDate; }
  set max(value: Date) {
    this._maxDate = value;
    this._validatorOnChange();
  }
  _maxDate: Date;

  @Input() set dateFilter(filter: (date: Date | null) => boolean) {
    this._dateFilter = filter;
    this._validatorOnChange();
  }
  _dateFilter: (date: Date | null) => boolean;

  @Input()
  get required(): boolean { return this._required; }
  set required(value) { this._required = coerceBooleanProperty(value); }
  private _required: boolean = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value) { this._disabled = coerceBooleanProperty(value); }
  private _disabled: boolean = false;

  @Input()
  get value() { return this._value; }
  set value(value: Date) {
    this._value = this.coerceDateProperty(value);
    this._selected = this._value;
    this.startAt = this._value;
    setTimeout(() => {
      this._inputValue = this._formatDate(this._value);
    });
  }
  private _value: Date;

  _inputValue: string = '';

  @Input()
  get openOnFocus(): boolean { return this._openOnFocus; }
  set openOnFocus(value: boolean) { this._openOnFocus = coerceBooleanProperty(value); }
  private _openOnFocus: boolean;

  @Input()
  set isOpen(value: boolean) {
    if (value && !this.opened) { this.open(); }
  }

  /** Event emitted when the select has been opened. */
  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the select has been closed. */
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the selected date has been changed by the user. */
  @Output() change: EventEmitter<Md2DateChange> = new EventEmitter<Md2DateChange>();

  /** Emits new selected date when selected date changes. */
  @Output() selectedChanged = new EventEmitter<Date>();

  /** Whether the calendar is open. */
  opened = false;

  /** The id for the datepicker calendar. */
  id = `md2-datepicker-${datepickerUid++}`;

  /** The currently selected date. */
  _selected: Date = null;

  /** A reference to the overlay when the calendar is opened as a popup. */
  private _popupRef: OverlayRef;

  /** A reference to the overlay when the calendar is opened as a dialog. */
  private _dialogRef: OverlayRef;

  /** A portal containing the calendar for this datepicker. */
  private _calendarPortal: ComponentPortal<Md2DatepickerContent>;

  private _inputSubscription: Subscription;

  /** The form control validator for the min date. */
  private _minValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return (!this.min || !control.value ||
      this._util.compareDate(this.min, control.value) <= 0) ?
      null : { 'md2DatepickerMin': { 'min': this.min, 'actual': control.value } };
  }

  /** The form control validator for the max date. */
  private _maxValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return (!this.max || !control.value ||
      this._util.compareDate(this.max, control.value) >= 0) ?
      null : { 'md2DatepickerMax': { 'max': this.max, 'actual': control.value } };
  }

  /** The form control validator for the date filter. */
  private _filterValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return !this._dateFilter || !control.value || this._dateFilter(control.value) ?
      null : { 'md2DatepickerFilter': true };
  }

  /** The combined form control validator for this input. */
  private _validator: ValidatorFn =
  Validators.compose([this._minValidator, this._maxValidator, this._filterValidator]);

  constructor(private _element: ElementRef,
    private _overlay: Overlay,
    private _ngZone: NgZone,
    private _viewContainerRef: ViewContainerRef,
    private _locale: DateLocale,
    private _util: DateUtil,
    @Optional() private _dir: Dir) {
  }

  ngOnDestroy() {
    this.close();
    if (this._popupRef) {
      this._popupRef.dispose();
    }
    if (this._dialogRef) {
      this._dialogRef.dispose();
    }
    if (this._inputSubscription) {
      this._inputSubscription.unsubscribe();
    }
  }

  registerOnValidatorChange(fn: () => void): void {
    this._validatorOnChange = fn;
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this._validator ? this._validator(c) : null;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void { this._onChange = fn; }

  registerOnTouched(fn: () => {}): void { this._onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleFocus() {
    this._inputFocused = true;
    if (!this.opened && this.openOnFocus) {
      this.open();
    }
  }

  _handleBlur(event: Event) {
    this._inputFocused = false;
    if (!this.opened) {
      this._onTouched();
    }
    let el: any = event.target;
    let date: Date = this._util.parseDate(el.value, this.format);
    if (!date) {
      date = this._util.parse(el.value);
    }
    if (date != null && date.getTime && !isNaN(date.getTime())) {

      let d: Date = new Date(this.value);
      if (this.type !== 'time') {
        d.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      }
      if (this.type !== 'date') {
        d.setHours(date.getHours(), date.getMinutes());
      }
      if (!this._util.isSameMinute(this.value, d)) {
        this.value = this._util.createDate(d.getFullYear(),
          d.getMonth(),
          d.getDate(),
          d.getHours(),
          d.getMinutes(),
          d.getSeconds());
        this._emitChangeEvent();
      }
    } else {
      if (this.value) {
        this.value = null;
        this._emitChangeEvent();
      }
    }
  }

  private coerceDateProperty(value: any): Date {
    let v: Date = null;
    if (value != null && value.getTime && !isNaN(value.getTime())) {
      v = value;
    } else {
      if (value && this.type === 'time') {
        let t = value + '';
        v = new Date();
        v.setHours(parseInt(t.substring(0, 2)));
        v.setMinutes(parseInt(t.substring(3, 5)));
      } else {
        let timestamp = Date.parse(value);
        v = isNaN(timestamp) ? null : new Date(timestamp);
      }
    }
    let d: Date = v ? this._util.createDate(v.getFullYear(),
      v.getMonth(),
      v.getDate(),
      v.getHours(),
      v.getMinutes(),
      v.getSeconds()) : null;
    return d;
  }

  /**
   * format date
   * @param date Date Object
   * @return string with formatted date
   */
  private _formatDate(date: Date): string {
    if (!this.format || !date) { return ''; }

    let format = this.format;

    /* Years */
    if (format.indexOf('yy') > -1) {
      format = format.replace('yy', ('00' + this._util.getYear(date)).slice(-2));
    } else if (format.indexOf('y') > -1) {
      format = format.replace('y', '' + this._util.getYear(date));
    }

    /* Days */
    if (format.indexOf('dd') > -1) {
      format = format.replace('dd', ('0' + this._util.getDate(date)).slice(-2));
    } else if (format.indexOf('d') > -1) {
      format = format.replace('d', '' + this._util.getDate(date));
    }

    /* Hours */
    if (/[aA]/.test(format)) {
      /* 12-hour */
      if (format.indexOf('HH') > -1) {
        format = format.replace('HH',
          ('0' + this._getHours12(this._util.getHours(date))).slice(-2));
      } else if (format.indexOf('H') > -1) {
        format = format.replace('H',
          '' + this._getHours12(this._util.getHours(date)));
      }
      format = format.replace('A', ((this._util.getHours(date) < 12) ? 'AM' : 'PM'))
        .replace('a', ((this._util.getHours(date) < 12) ? 'am' : 'pm'));
    } else {
      /* 24-hour */
      if (format.indexOf('HH') > -1) {
        format = format.replace('HH', ('0' + this._util.getHours(date)).slice(-2));
      } else if (format.indexOf('H') > -1) {
        format = format.replace('H', '' + this._util.getHours(date));
      }
    }

    /* Minutes */
    if (format.indexOf('mm') > -1) {
      format = format.replace('mm', ('0' + this._util.getMinutes(date)).slice(-2));
    } else if (format.indexOf('m') > -1) {
      format = format.replace('m', '' + this._util.getMinutes(date));
    }

    /* Seconds */
    if (format.indexOf('ss') > -1) {
      format = format.replace('ss', ('0' + this._util.getSeconds(date)).slice(-2));
    } else if (format.indexOf('s') > -1) {
      format = format.replace('s', '' + this._util.getSeconds(date));
    }

    /* Months */
    if (format.indexOf('MMMM') > -1) {
      format = format.replace('MMMM',
        this._locale.getMonthNames('long')[this._util.getMonth(date)]);
    } else if (format.indexOf('MMM') > -1) {
      format = format.replace('MMM',
        this._locale.getMonthNames('short')[this._util.getMonth(date)]);
    } else if (format.indexOf('MM') > -1) {
      format = format.replace('MM', ('0' + (this._util.getMonth(date) + 1)).slice(-2));
    } else if (format.indexOf('M') > -1) {
      format = format.replace('M', '' + (this._util.getMonth(date) + 1));
    }

    return format;
  }

  /**
   * Get an hour of the date in the 12-hour format
   * @param date Date Object
   * @return hour of the date in the 12-hour format
   */
  private _getHours12(hours: number): number {
    if (hours == 0) {
      hours = 12;
    } else if (hours > 12) {
      hours -= 12;
    }
    return hours;
  }

  /** Selects the given date and closes the currently open popup or dialog. */
  _selectAndClose(date: Date): void {
    let oldValue = this._selected;
    this.value = date;
    if (!this._util.sameDateAndTime(oldValue, this._selected)) {
      this._emitChangeEvent();
    }
    this.close();
  }

  /** Emits an event when the user selects a date. */
  _emitChangeEvent(): void {
    this._onChange(this.value);
    this.change.emit(new Md2DateChange(this, this.value));
  }

  /** Open the calendar. */
  open(): void {
    if (this.opened) { return; }

    if (!this._calendarPortal) {
      this._calendarPortal = new ComponentPortal(Md2DatepickerContent, this._viewContainerRef);
    }

    this.touchUi ? this._openAsDialog() : this._openAsPopup();
    this.opened = true;
    this.onOpen.emit();
  }

  /** Close the calendar. */
  close(): void {
    if (!this.opened) {
      return;
    }
    if (this._popupRef && this._popupRef.hasAttached()) {
      this._popupRef.detach();
    }
    if (this._dialogRef && this._dialogRef.hasAttached()) {
      this._dialogRef.detach();
    }
    if (this._calendarPortal && this._calendarPortal.isAttached) {
      this._calendarPortal.detach();
    }
    this.opened = false;
    this.onClose.emit();
  }

  /** Open the calendar as a dialog. */
  private _openAsDialog(): void {
    if (!this._dialogRef) {
      this._createDialog();
    }

    if (!this._dialogRef.hasAttached()) {
      let componentRef: ComponentRef<Md2DatepickerContent> =
        this._dialogRef.attach(this._calendarPortal);
      componentRef.instance.datepicker = this;
    }

    this._dialogRef.backdropClick().subscribe(() => this.close());
  }

  /** Open the calendar as a popup. */
  private _openAsPopup(): void {
    if (!this._popupRef) {
      this._createPopup();
    }

    if (!this._popupRef.hasAttached()) {
      let componentRef: ComponentRef<Md2DatepickerContent> =
        this._popupRef.attach(this._calendarPortal);
      componentRef.instance.datepicker = this;

      /* Update the position once the calendar has rendered. */
      this._ngZone.onStable.first().subscribe(() => this._popupRef.updatePosition());
    }

    this._popupRef.backdropClick().subscribe(() => this.close());
  }

  /** Create the dialog. */
  private _createDialog(): void {
    const overlayState = new OverlayState();
    overlayState.positionStrategy = this._overlay.position().global()
      .centerHorizontally()
      .centerVertically();
    overlayState.hasBackdrop = true;
    overlayState.backdropClass = 'cdk-overlay-dark-backdrop';
    overlayState.direction = this._dir ? this._dir.value : 'ltr';
    this._dialogRef = this._overlay.create(overlayState);
  }

  /** Create the popup. */
  private _createPopup(): void {
    const overlayState = new OverlayState();
    overlayState.positionStrategy = this._createPopupPositionStrategy();
    overlayState.hasBackdrop = true;
    overlayState.backdropClass = 'cdk-overlay-transparent-backdrop';
    overlayState.direction = this._dir ? this._dir.value : 'ltr';
    overlayState.scrollStrategy = this._overlay.scrollStrategies.reposition();

    this._popupRef = this._overlay.create(overlayState);
  }

  /** Create the popup PositionStrategy. */
  private _createPopupPositionStrategy(): PositionStrategy {
    return this._overlay.position()
      .connectedTo(this._element,
      { originX: 'start', originY: 'bottom' },
      { overlayX: 'start', overlayY: 'top' }
      )
      .withFallbackPosition(
      { originX: 'start', originY: 'top' },
      { overlayX: 'start', overlayY: 'bottom' }
      )
      .withFallbackPosition(
      { originX: 'end', originY: 'bottom' },
      { overlayX: 'end', overlayY: 'top' }
      )
      .withFallbackPosition(
      { originX: 'end', originY: 'top' },
      { overlayX: 'end', overlayY: 'bottom' });
  }
}
