import {
  AfterContentInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Output,
  Optional,
  EventEmitter,
  Self,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { DateAdapter } from '../core/datetime/index';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
import {
  coerceBooleanProperty,
  ENTER,
  TAB,
  ESCAPE,
  HOME,
  END,
  PAGE_UP,
  PAGE_DOWN,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
  DOWN_ARROW,
  Overlay,
  OverlayState,
  OverlayRef,
  PositionStrategy,
  RepositionScrollStrategy,
  ScrollDispatcher,
  TemplatePortal,
  HorizontalConnectionPos,
  VerticalConnectionPos,
} from '../core';
import { fadeInContent, slideCalendar } from './datepicker-animations';
import { Subscription } from 'rxjs/Subscription';

import { ClockView } from './clock';

/** Change event object emitted by Md2Select. */
export class Md2DateChange {
  constructor(public source: Md2Datepicker, public value: Date) { }
}

export type Type = 'date' | 'time' | 'datetime';
export type Mode = 'auto' | 'portrait' | 'landscape';
export type Container = 'inline' | 'dialog';

@Component({
  moduleId: module.id,
  selector: 'md2-datepicker',
  templateUrl: 'datepicker.html',
  styleUrls: ['datepicker.css'],
  host: {
    'role': 'datepicker',
    '[class.md2-datepicker-disabled]': 'disabled',
    '[class.md2-datepicker-opened]': 'panelOpen',
    '[attr.aria-label]': 'placeholder',
    '[attr.aria-required]': 'required.toString()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-invalid]': '_control?.invalid || "false"',
    '(window:resize)': '_handleWindowResize($event)'
  },
  animations: [
    fadeInContent,
    slideCalendar
  ],
  //encapsulation: ViewEncapsulation.None
})
export class Md2Datepicker implements AfterContentInit, OnDestroy, ControlValueAccessor,
  Validator {

  private _portal: TemplatePortal;
  private _overlayRef: OverlayRef;
  private _backdropSubscription: Subscription;

  private _value: Date = null;

  private _panelOpen = false;

  private _openOnFocus: boolean = false;
  private _type: Type = 'date';
  private _mode: Mode = 'auto';
  private _container: Container = 'inline';
  private _format: string;
  private _required: boolean = false;
  private _disabled: boolean = false;

  private today: Date = new Date();

  _years: Array<number> = [];
  _dates: Array<Object> = [];

  _isYearsVisible: boolean;
  _isCalendarVisible: boolean;
  _clockView: ClockView = 'hour';
  _calendarState: string;

  _weekDays: Array<any>;

  _prevMonth: number = 1;
  _currMonth: number = 2;
  _nextMonth: number = 3;

  _transformOrigin: string = 'top';
  _panelDoneAnimating: boolean = false;

  _inputFocused: boolean = false;

  _onChange = (value: any) => { };
  _onTouched = () => { };
  private _validatorOnChange = () => { };

  @ViewChild('portal') _templatePortal: TemplateRef<any>;
  @ViewChild('input') _input: ElementRef;

  /** Event emitted when the select has been opened. */
  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the select has been closed. */
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the selected date has been changed by the user. */
  @Output() change: EventEmitter<Md2DateChange> = new EventEmitter<Md2DateChange>();


  /** The view that the calendar should start in. */
  @Input() startView: 'month' | 'year' = 'month';

  /** A function used to filter which dates are selectable. */
  @Input() dateFilter: (date: Date) => boolean;

  /** Date filter for the month and year views. */
  _dateFilterForViews = (date: Date) => {
    return !!date &&
      (!this.dateFilter || this.dateFilter(date)) &&
      (!this.min || this._dateAdapter.compareDate(date, this.min) >= 0) &&
      (!this.max || this._dateAdapter.compareDate(date, this.max) <= 0);
  }

  constructor(private _element: ElementRef, private _overlay: Overlay,
    @Optional() public _dateAdapter: DateAdapter<Date>,
    private _viewContainerRef: ViewContainerRef, private _locale: DateLocale,
    private _scrollDispatcher: ScrollDispatcher,
    private _util: DateUtil, @Self() @Optional() public _control: NgControl) {
    if (this._control) {
      this._control.valueAccessor = this;
    }

    this._weekDays = this._locale.getDays();

    this.getYears();
  }

  ngAfterContentInit() {
    this.activeDate = this._activeDate || this._util.today();
  }

  ngOnDestroy() { this.destroyPanel(); }

  registerOnValidatorChange(fn: () => void): void {
    this._validatorOnChange = fn;
  }

  @Input() placeholder: string;
  @Input() okLabel: string = 'Ok';
  @Input() cancelLabel: string = 'Cancel';
  @Input() tabindex: number = 0;
  @Input() enableDates: Array<Date> = [];
  @Input() disableDates: Array<Date> = [];
  @Input() disableWeekDays: Array<number> = [];
  @Input() timeInterval: number = 1;

  @Input()
  get type() { return this._type; }
  set type(value: Type) {
    this._type = value || 'date';
    this._input.nativeElement.value = this._formatDate(this._value);
  }

  @Input()
  get format() {
    return this._format || (this.type === 'date' ?
      'dd/MM/y' : this.type === 'time' ? 'HH:mm' : this.type === 'datetime' ?
        'dd/MM/y HH:mm' : 'dd/MM/y');
  }
  set format(value: string) {
    if (this._format !== value) {
      this._format = value;
      this._input.nativeElement.value = this._formatDate(this._value);
    }
  }

  @Input()
  get mode() { return this._mode; }
  set mode(value: Mode) {
    this._mode = value || 'auto';
  }

  @Input()
  get container() { return this._container; }
  set container(value: Container) {
    if (this._container !== value) {
      this._container = value || 'inline';
      this.destroyPanel();
    }
  }

  @Input()
  get value() { return this._value; }
  set value(value: Date) {
    this._value = this.coerceDateProperty(value);
    if (this._value) { this.activeDate = this._value; }
    setTimeout(() => {
      this._input.nativeElement.value = this._formatDate(this._value);
    });
  }

  get activeDate(): Date { return this._activeDate; }
  set activeDate(value: Date) {
    this._activeDate = this._util.clampDate(value, this.min, this.max);
  }
  private _activeDate: Date;

  get minutes(): string {
    return ('0' + this._activeDate.getMinutes()).slice(-2);
  }
  get hours(): string {
    if (!this.is12HourClock()) {
      return ('0' + this._activeDate.getHours()).slice(-2);
    } else {
      return ('0' + this._getHours12(this._activeDate)).slice(-2);
    }
  }

  /**
   * Return the am/pm part of the hour description
   * @param upperCase  boolean if true return AM/PM, default false
   * @return string the am/pm part of the hour description
   */
  private _ampm(upperCase: boolean = false): string {
    if (this.is12HourClock()) {
      if (upperCase) {
        return (this._activeDate.getHours() < 12) ? 'AM' : 'PM';
      } else {
        return (this._activeDate.getHours() < 12) ? 'am' : 'pm';
      }
    } else {
      return '';
    }
  }

  @Input() selected: Date;

  @Input()
  get required(): boolean { return this._required; }
  set required(value) { this._required = coerceBooleanProperty(value); }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value) { this._disabled = coerceBooleanProperty(value); }

  /** The minimum selectable date. */
  @Input()
  get min(): Date { return this._min; }
  set min(date: Date) {
    this._min = this._util.parse(date);
    this.getYears();
    this._validatorOnChange();
  }
  private _min: Date;

  /** The maximum selectable date. */
  @Input()
  get max(): Date { return this._max; }
  set max(date: Date) {
    this._max = this._util.parse(date);
    this.getYears();
    this._validatorOnChange();
  }
  private _max: Date;

  @Input()
  get openOnFocus(): boolean { return this._openOnFocus; }
  set openOnFocus(value: boolean) { this._openOnFocus = coerceBooleanProperty(value); }

  @Input()
  set isOpen(value: boolean) {
    if (value && !this.panelOpen) {
      this.open();
    }
  }

  get panelOpen(): boolean {
    return this._panelOpen;
  }

  get getDateLabel(): string {
    return this._locale.getDateLabel(this.activeDate);
  }

  get getMonthLabel(): string {
    return this._locale.getMonthLabel(this.activeDate.getMonth(), this.activeDate.getFullYear());
  }

  /** The form control validator for the min date. */
  private _minValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return (!this.min || !control.value ||
      this._util.compareDate(this.min, control.value) < 0) ?
      null : { 'mdDatepickerMin': { 'min': this.min, 'actual': control.value } };
  }

  /** The form control validator for the max date. */
  private _maxValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return (!this.max || !control.value ||
      this._util.compareDate(this.max, control.value) > 0) ?
      null : { 'mdDatepickerMax': { 'max': this.max, 'actual': control.value } };
  }

  _dateFilter: (date: Date | null) => boolean;

  /** The form control validator for the date filter. */
  private _filterValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return !this._util || !control.value || this._dateFilter(control.value) ?
      null : { 'mdDatepickerFilter': true };
  }

  private _validator: ValidatorFn =
  Validators.compose([this._minValidator, this._maxValidator, this._filterValidator]);

  toggle(): void {
    this.panelOpen ? this.close() : this.open();
  }

  /** Opens the overlay panel. */
  open(): void {
    if (this.disabled) { return; }
    this._isCalendarVisible = this.type !== 'time' ? true : false;
    this._createOverlay();

    if (!this._portal) {
      this._portal = new TemplatePortal(this._templatePortal, this._viewContainerRef);
    }

    this._overlayRef.attach(this._portal);
    this._subscribeToBackdrop();
    this._panelOpen = true;
    this.selected = this.value || new Date(1, 0, 1);
    this.activeDate = this.value || this.today;
    this.generateCalendar();
  }

  /** Closes the overlay panel and focuses the host element. */
  close(): void {
    setTimeout(() => {
      this._panelOpen = false;
      if (this._openOnFocus) {
        this._openOnFocus = false;
        setTimeout(() => { this._openOnFocus = true; }, 100);
      }
      if (this._overlayRef) {
        this._overlayRef.detach();
        this._backdropSubscription.unsubscribe();
      }
      this._focusHost();

      this._isYearsVisible = false;
      this._isCalendarVisible = this.type !== 'time' ? true : false;
      this._clockView = 'hour';
    }, 10);
  }

  /** Removes the panel from the DOM. */
  destroyPanel(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;

      this._cleanUpSubscriptions();
    }
  }

  _onPanelDone(): void {
    if (this.panelOpen) {
      this._focusPanel();
      this.onOpen.emit();
    } else {
      this.onClose.emit();
    }
  }

  _onFadeInDone(): void {
    this._panelDoneAnimating = this.panelOpen;
  }

  _handleWindowResize(event: Event) {
    if (this.container === 'inline') {
      this.close();
    }
  }

  private _focusPanel(): void {
    let el: any = document.querySelectorAll('.md2-datepicker-panel')[0];
    el.focus();
  }

  private _focusHost(): void {
    this._element.nativeElement.querySelectorAll('input')[0].focus();
  }

  private coerceDateProperty(value: any): Date {
    let v: Date = null;
    if (this._util.isValidDate(value)) {
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
    return v;
  }

  @HostListener('click', ['$event'])
  _handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
  }

  _handleKeydown(event: KeyboardEvent) {
    if (this.disabled) { return; }

    if (this.panelOpen) {
      event.preventDefault();
      event.stopPropagation();

      switch (event.keyCode) {
        case TAB:
        case ESCAPE: this._onBlur(); this.close(); break;
      }
      let date = this.activeDate;
      if (this._isYearsVisible) {
        switch (event.keyCode) {
          case ENTER: this._onClickOk(); break;

          case DOWN_ARROW:
            if (this.activeDate.getFullYear() < (this.today.getFullYear() + 100)) {
              this.activeDate = this._util.incrementYears(date, 1);
              this._scrollToSelectedYear();
            }
            break;
          case UP_ARROW:
            if (this.activeDate.getFullYear() > 1900) {
              this.activeDate = this._util.incrementYears(date, -1);
              this._scrollToSelectedYear();
            }
            break;
        }

      } else if (this._isCalendarVisible) {
        switch (event.keyCode) {
          case ENTER: this._dateSelected(this.activeDate); break;

          case RIGHT_ARROW:
            this.activeDate = this._util.incrementDays(date, 1);
            break;
          case LEFT_ARROW:
            this.activeDate = this._util.incrementDays(date, -1);
            break;

          case PAGE_DOWN:
            if (event.shiftKey) {
              this.activeDate = this._util.incrementYears(date, 1);
            } else {
              this.activeDate = this._util.incrementMonths(date, 1);
            }
            break;
          case PAGE_UP:
            if (event.shiftKey) {
              this.activeDate = this._util.incrementYears(date, -1);
            } else {
              this.activeDate = this._util.incrementMonths(date, -1);
            }
            break;

          case DOWN_ARROW:
            this.activeDate = this._util.incrementDays(date, 7);
            break;
          case UP_ARROW:
            this.activeDate = this._util.incrementDays(date, -7);
            break;

          case HOME:
            this.activeDate = this._util.getFirstDateOfMonth(date);
            break;
          case END:
            this.activeDate = this._util.getLastDateOfMonth(date);
            break;
        }
        if (!this._util.isSameMonthAndYear(date, this.activeDate)) {
          this.generateCalendar();
        }
      } else if (this._clockView === 'hour') {
        switch (event.keyCode) {
          case ENTER: this._hourSelected(this.activeDate.getHours()); break;

          case UP_ARROW:
            this.activeDate = this._util.incrementHours(date, 1);
            break;
          case DOWN_ARROW:
            this.activeDate = this._util.incrementHours(date, -1);
            break;
        }
      } else {
        switch (event.keyCode) {
          case ENTER:
            this._minuteSelected(this.activeDate.getMinutes());
            break;

          case UP_ARROW:
            this.activeDate = this._util.incrementMinutes(date, 1);
            break;
          case DOWN_ARROW:
            this.activeDate = this._util.incrementMinutes(date, -1);
            break;
        }
      }
    } else {
      switch (event.keyCode) {
        case ENTER:
          event.preventDefault();
          event.stopPropagation();
          this.open();
          break;
      }
    }
  }

  _onBlur() {
    if (!this.panelOpen) {
      this._onTouched();
    }
  }

  _handleFocus(event: Event) {
    this._inputFocused = true;
    if (!this.panelOpen && this.openOnFocus) {
      this.open();
    }
  }

  _handleBlur(event: Event) {
    this._inputFocused = false;
    if (!this.panelOpen) {
      this._onTouched();
    }
    let el: any = event.target;
    let date: Date = this._util.parseDate(el.value, this.format);
    if (!date) {
      date = this._util.parse(el.value, this.format);
    }
    if (this._util.isValidDate(date)) {
      let d: Date = new Date(this.value);
      if (this.type !== 'time') {
        d.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      }
      if (this.type !== 'date') {
        d.setHours(date.getHours(), date.getMinutes());
      }
      if (!this._util.isSameMinute(this.value, d)) {
        this.value = d;
        this._emitChangeEvent();
      }
    } else {
      if (this.value) {
        this.value = null;
        this._emitChangeEvent();
      }
    }
  }

  /**
   * Display Years
   */
  _showYear() {
    this._isYearsVisible = true;
    this._isCalendarVisible = true;
    //this._scrollToSelectedYear();
  }

  private getYears() {
    let startYear = this.min ? this.min.getFullYear() : 1900,
      endYear = this._max ? this._max.getFullYear() : this.today.getFullYear() + 100;
    this._years = [];
    for (let i = startYear; i <= endYear; i++) {
      this._years.push(i);
    }
  }

  private _scrollToSelectedYear() {
    setTimeout(() => {
      let yearContainer: any = document.querySelector('.md2-calendar-years'),
        selectedYear: any = document.querySelector('.md2-calendar-year.selected');
      yearContainer.scrollTop = (selectedYear.offsetTop + 20) - yearContainer.clientHeight / 2;
    }, 0);
  }

  /**
   * select year
   * @param year
   */
  _setYear(year: number) {
    this.activeDate = new Date(year, this.activeDate.getMonth(), this.activeDate.getDate(),
      this.activeDate.getHours(), this.activeDate.getMinutes());
    this.generateCalendar();
    this._isYearsVisible = false;
  }

  /**
   * Display Calendar
   */
  _showCalendar() {
    this._isYearsVisible = false;
    this._isCalendarVisible = true;
  }

  /**
   * Toggle Hour visiblity
   */
  _toggleHours(value: ClockView) {
    this._isYearsVisible = false;
    this._isCalendarVisible = false;
    this._clockView = value;
  }

  /**
   * Ok Button Event
   */
  _onClickOk() {
    if (this._isYearsVisible) {
      this.generateCalendar();
      this._isYearsVisible = false;
      this._isCalendarVisible = true;
    } else if (this._isCalendarVisible) {
      this._dateSelected(this.activeDate);
    } else if (this._clockView === 'hour') {
      this._clockView = 'minute';
    } else {
      this.value = this.activeDate;
      this._emitChangeEvent();
      this._onBlur();
      this.close();
    }
  }

  /**
   * Date Selection Event
   * @param event Event Object
   * @param date Date Object
   */
  _onClickDate(event: Event, date: any) {
    event.preventDefault();
    event.stopPropagation();
    if (date.disabled) { return; }
    if (date.calMonth === this._prevMonth) {
      this._updateMonth(-1);
    } else if (date.calMonth === this._currMonth) {
      this._dateSelected(date.date);
    } else if (date.calMonth === this._nextMonth) {
      this._updateMonth(1);
    }
  }

  /**
   * date selected
   * @param date Date Object
   */
  _dateSelected(date: Date): void {
    if (this.type === 'date') {
      this.value = date;
      this._emitChangeEvent();
      this._onBlur();
      this.close();
    } else {
      this.selected = date;
      this.activeDate = date;
      this._isCalendarVisible = false;
      this._clockView = 'hour';
    }
  }

  /**
   * Update Month
   * @param noOfMonths increment number of months
   */
  _updateMonth(noOfMonths: number) {
    this.activeDate = this._util.incrementMonths(this.activeDate, noOfMonths);
    this.generateCalendar();
    if (noOfMonths > 0) {
      this.calendarState('right');
    } else {
      this.calendarState('left');
    }
  }

  /**
   * Check is Before month enabled or not
   * @return boolean
   */
  _isBeforeMonth() {
    return !this.min ? true :
      this.min && this._util.getMonthDistance(this.activeDate, this.min) < 0;
  }

  /**
   * Check is After month enabled or not
   * @return boolean
   */
  _isAfterMonth() {
    return !this._max ? true :
      this._max && this._util.getMonthDistance(this.activeDate, this._max) > 0;
  }

  _onActiveDateChange(date: Date) {
    this.activeDate = date;
  }

  _onDateChange(date: Date) {
    this.value = date;
    if (this._isYearsVisible) {
      this._isYearsVisible = false;
    } else {
      this._dateSelected(date);
    }
  }

  _onTimeChange(event: Date) {
    this.value = event;
    if (this._clockView === 'hour') {
      this._clockView = 'minute';
    } else {
      this._emitChangeEvent();
      this._clockView = 'hour';
      this._onBlur();
      this.close();
    }
  }

  /**
   * Check the date is enabled or not
   * @param date Date Object
   * @return boolean
   */
  private _isDisabledDate(date: Date): boolean {
    for (let d of this.enableDates) {
      if (this._util.isSameDay(date, d)) { return false; }
    }
    for (let d of this.disableDates) {
      if (this._util.isSameDay(date, d)) { return true; }
    }
    for (let d of this.disableWeekDays) {
      if (date.getDay() === d) { return true; }
    }
    return !this._util.isDateWithinRange(date, this.min, this._max);
  }

  /**
   * Generate Month Calendar
   */
  private generateCalendar(): void {
    this._dates.length = 0;
    let year = this.activeDate.getFullYear();
    let month = this.activeDate.getMonth();
    let firstDayOfMonth = this._util.getFirstDateOfMonth(this.activeDate);
    let calMonth = this._prevMonth;
    let date = this._util.getFirstDateOfWeek(firstDayOfMonth, this._locale.firstDayOfWeek);
    do {
      let week: Array<any> = [];
      for (let i = 0; i < 7; i++) {
        if (date.getDate() === 1) {
          if (calMonth === this._prevMonth) {
            calMonth = this._currMonth;
          } else {
            calMonth = this._nextMonth;
          }
        }
        week.push({
          date: date,
          index: date.getDate(),
          calMonth: calMonth,
          today: this._util.isSameDay(this.today, date),
          disabled: this._isDisabledDate(date)
        });
        date = new Date(date.getTime());
        date.setDate(date.getDate() + 1);
      }
      this._dates.push(week);
    } while ((date.getMonth() <= month) && (date.getFullYear() === year));
  }

  /**
   * Set hours
   * @param hour number of hours
   */
  _hourSelected(hour: number) {
    this._clockView = 'minute';
    this.activeDate = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(),
      this.activeDate.getDate(), hour, this.activeDate.getMinutes());
  }

  /**
   * Set minutes
   * @param minute number of minutes
   */
  _minuteSelected(minute: number) {
    this.activeDate = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(),
      this.activeDate.getDate(), this.activeDate.getHours(), minute);
    this.selected = this.activeDate;
    this.value = this.activeDate;
    this._emitChangeEvent();
    this._onBlur();
    this.close();
  }

  /** Emits an event when the user selects a date. */
  _emitChangeEvent(): void {
    this._onChange(this.value);
    this.change.emit(new Md2DateChange(this, this.value));
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

  /**
   * Get an hour of the date in the 12-hour format
   * @param date Date Object
   * @return hour of the date in the 12-hour format
   */
  private _getHours12(date: Date): number {
    let hrs = date.getHours();
    if (hrs == 0) {
      hrs = 12;
    } else if (hrs > 12) {
      hrs -= 12;
    }
    return hrs;
  }

  public is12HourClock(): boolean {
    return /[aA]/.test(this.format);
  }

  /**
   * format date
   * @param date Date Object
   * @return string with formatted date
   */
  private _formatDate(date: Date): string {
    if (!this.format || !date) { return ''; }

    let format = this.format;

    // Years
    if (format.indexOf('yy') > -1) {
      format = format.replace('yy', ('00' + date.getFullYear()).slice(-2));
    } else if (format.indexOf('y') > -1) {
      format = format.replace('y', '' + date.getFullYear());
    }

    // Days
    if (format.indexOf('dd') > -1) {
      format = format.replace('dd', ('0' + date.getDate()).slice(-2));
    } else if (format.indexOf('d') > -1) {
      format = format.replace('d', '' + date.getDate());
    }

    // Hours
    if (/[aA]/.test(format)) {
      // 12-hour
      if (format.indexOf('HH') > -1) {
        format = format.replace('HH', ('0' + this._getHours12(date)).slice(-2));
      } else if (format.indexOf('H') > -1) {
        format = format.replace('H', '' + this._getHours12(date));
      }
      format = format.replace('A', ((date.getHours() < 12) ? 'AM' : 'PM'))
        .replace('a', ((date.getHours() < 12) ? 'am' : 'pm'));
    } else {
      // 24-hour
      if (format.indexOf('HH') > -1) {
        format = format.replace('HH', ('0' + date.getHours()).slice(-2));
      } else if (format.indexOf('H') > -1) {
        format = format.replace('H', '' + date.getHours());
      }
    }

    // Minutes
    if (format.indexOf('mm') > -1) {
      format = format.replace('mm', ('0' + date.getMinutes()).slice(-2));
    } else if (format.indexOf('m') > -1) {
      format = format.replace('m', '' + date.getMinutes());
    }

    // Seconds
    if (format.indexOf('ss') > -1) {
      format = format.replace('ss', ('0' + date.getSeconds()).slice(-2));
    } else if (format.indexOf('s') > -1) {
      format = format.replace('s', '' + date.getSeconds());
    }

    // Months
    if (format.indexOf('MMMM') > -1) {
      format = format.replace('MMMM', this._locale.months[date.getMonth()].full);
    } else if (format.indexOf('MMM') > -1) {
      format = format.replace('MMM', this._locale.months[date.getMonth()].short);
    } else if (format.indexOf('MM') > -1) {
      format = format.replace('MM', ('0' + (date.getMonth() + 1)).slice(-2));
    } else if (format.indexOf('M') > -1) {
      format = format.replace('M', '' + (date.getMonth() + 1));
    }

    return format;
  }

  private _subscribeToBackdrop(): void {
    this._backdropSubscription = this._overlayRef.backdropClick().subscribe(() => {
      this.close();
    });
  }

  /**
   *  This method creates the overlay from the provided panel's template and saves its
   *  OverlayRef so that it can be attached to the DOM when open is called.
   */
  private _createOverlay(): void {
    if (!this._overlayRef) {
      let config = new OverlayState();
      if (this.container === 'inline') {
        config.positionStrategy = this._createPickerPositionStrategy();
        config.hasBackdrop = true;
        config.backdropClass = 'cdk-overlay-transparent-backdrop';
        config.scrollStrategy = new RepositionScrollStrategy(this._scrollDispatcher);
      } else {
        config.positionStrategy = this._overlay.position()
          .global()
          .centerHorizontally()
          .centerVertically();
        config.hasBackdrop = true;
      }
      this._overlayRef = this._overlay.create(config);
    }
  }

  /** Create the popup PositionStrategy. */
  private _createPickerPositionStrategy(): PositionStrategy {
    return this._overlay.position()
      .connectedTo(this._element,
      { originX: 'start', originY: 'top' },
      { overlayX: 'start', overlayY: 'top' }
      )
      .withFallbackPosition(
      { originX: 'end', originY: 'top' },
      { overlayX: 'end', overlayY: 'top' }
      )
      .withFallbackPosition(
      { originX: 'start', originY: 'bottom' },
      { overlayX: 'start', overlayY: 'bottom' }
      )
      .withFallbackPosition(
      { originX: 'end', originY: 'bottom' },
      { overlayX: 'end', overlayY: 'bottom' }
      );
  }

  private _cleanUpSubscriptions(): void {
    if (this._backdropSubscription) {
      this._backdropSubscription.unsubscribe();
    }
  }

  private calendarState(direction: string): void {
    this._calendarState = direction;
    setTimeout(() => this._calendarState = '', 180);
  }

}
