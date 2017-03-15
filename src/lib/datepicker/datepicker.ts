import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Output,
  Optional,
  EventEmitter,
  Renderer,
  Self,
  ViewChildren,
  QueryList,
  ViewEncapsulation,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateLocale } from './date-locale';
import { Md2Clock } from './clock';
import {
  coerceBooleanProperty,
  ENTER,
  SPACE,
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
  OverlayModule,
  Portal,
  TemplatePortalDirective,
  PortalModule,
  HorizontalConnectionPos,
  VerticalConnectionPos,
} from '../core';
import { fadeInContent, slideCalendar } from './datepicker-animations';
import { Subscription } from 'rxjs/Subscription';

/** Change event object emitted by Md2Select. */
export class Md2DateChange {
  constructor(public source: Md2Datepicker, public value: Date) { }
}

export type Type = 'date' | 'time' | 'datetime';
export type Mode = 'auto' | 'portrait' | 'landscape';
export type Container = 'inline' | 'dialog';
export type PanelPositionX = 'before' | 'after';
export type PanelPositionY = 'above' | 'below';

@Component({
  moduleId: module.id,
  selector: 'md2-datepicker',
  templateUrl: 'datepicker.html',
  styleUrls: ['datepicker.css'],
  host: {
    'role': 'datepicker',
    '[class.md2-datepicker-disabled]': 'disabled',
    '[class.md2-datepicker-opened]': 'panelOpen',
    '[attr.tabindex]': 'disabled ? -1 : tabindex',
    '[attr.aria-label]': 'placeholder',
    '[attr.aria-required]': 'required.toString()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-invalid]': '_control?.invalid || "false"',
    '(keydown)': '_handleKeydown($event)',
    '(focus)': '_onFocus()',
    '(blur)': '_onBlur()',
    '(window:resize)': '_handleWindowResize($event)'
  },
  animations: [
    fadeInContent,
    slideCalendar
  ],
  encapsulation: ViewEncapsulation.None
})
export class Md2Datepicker implements OnDestroy, ControlValueAccessor {

  private _overlayRef: OverlayRef;
  private _backdropSubscription: Subscription;

  private _value: Date = null;
  private _selected: Date = null;
  private _date: Date = null;

  private _panelOpen = false;

  private _openOnFocus: boolean = false;
  private _type: Type = 'date';
  private _mode: Mode = 'auto';
  private _container: Container = 'inline';
  private _format: string;
  private _required: boolean = false;
  private _disabled: boolean = false;

  private today: Date = new Date();

  private _min: Date = null;
  private _max: Date = null;

  _years: Array<number> = [];
  _dates: Array<Object> = [];

  _isYearsVisible: boolean;
  _isCalendarVisible: boolean;
  _clockView: string = 'hour';
  _calendarState: string;

  _weekDays: Array<any>;

  _prevMonth: number = 1;
  _currMonth: number = 2;
  _nextMonth: number = 3;

  _transformOrigin: string = 'top';
  _panelDoneAnimating: boolean = false;

  _onChange = (value: any) => { };
  _onTouched = () => { };

  @ViewChildren(TemplatePortalDirective) templatePortals: QueryList<Portal<any>>;

  /** Event emitted when the select has been opened. */
  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the select has been closed. */
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the selected date has been changed by the user. */
  @Output() change: EventEmitter<Md2DateChange> = new EventEmitter<Md2DateChange>();

  constructor(private _element: ElementRef, private overlay: Overlay, private _renderer: Renderer,
    private _locale: DateLocale, @Self() @Optional() public _control: NgControl) {
    if (this._control) {
      this._control.valueAccessor = this;
    }

    this._weekDays = this._locale.getDays();

    this.getYears();
  }

  ngOnDestroy() { this.destroyPanel(); }

  @Input() placeholder: string;
  @Input() tabindex: number = 0;
  @Input() enableDates: Array<Date> = [];
  @Input() disableDates: Array<Date> = [];
  @Input() disableWeekDays: Array<number> = [];

  /** Position of the menu in the X axis. */
  positionX: PanelPositionX = 'after';

  /** Position of the menu in the Y axis. */
  positionY: PanelPositionY = 'below';

  overlapTrigger: boolean = true;

  @Input()
  get value() { return this._value; }
  set value(value: Date) {
    this._value = this.coerceDateProperty(value);
    if (value && value !== this._value) {
      if (this._locale.isValidDate(value)) {
        this._value = value;
      } else {
        if (this.type === 'time') {
          let t = value + '';
          this._value = new Date();
          this._value.setHours(parseInt(t.substring(0, 2)));
          this._value.setMinutes(parseInt(t.substring(3, 5)));
        } else {
          this._value = new Date(value);
        }
      }
    }
    this.date = this._value;
  }

  get date() { return this._date || this.today; }
  set date(value: Date) {
    if (value && this._locale.isValidDate(value)) {
      if (this._min && this._min > value) {
        value = this._min;
      }
      if (this._max && this._max < value) {
        value = this._max;
      }
      this._date = value;
    }
  }

  get time() { return this.date.getHours() + ':' + this.date.getMinutes(); }
  set time(value: string) {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(),
      parseInt(value.split(':')[0]), parseInt(value.split(':')[1]));
    // if (this._clockView === 'hour') {
    //  this.date.setHours(parseInt(value.split(':')[0]));
    // } else {
    //  this.date.setMinutes(parseInt(value.split(':')[1]));
    // }
  }

  @Input()
  get type() { return this._type; }
  set type(value: Type) {
    this._type = value || 'date';
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
  get selected() { return this._selected; }
  set selected(value: Date) { this._selected = value; }

  @Input()
  get format() {
    return this._format || (this.type === 'date' ?
      'dd/MM/y' : this.type === 'time' ? 'HH:mm' : this.type === 'datetime' ?
        'dd/MM/y HH:mm' : 'dd/MM/y');
  }
  set format(value: string) {
    if (this._format !== value) { this._format = value; }
  }

  @Input()
  get required(): boolean { return this._required; }
  set required(value) { this._required = coerceBooleanProperty(value); }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value) { this._disabled = coerceBooleanProperty(value); }

  @Input()
  set min(value: Date) {
    if (value && this._locale.isValidDate(value)) {
      this._min = new Date(value);
      this._min.setHours(0, 0, 0, 0);
      this.getYears();
    } else { this._min = null; }
  }

  @Input()
  set max(value: Date) {
    if (value && this._locale.isValidDate(value)) {
      this._max = new Date(value);
      this._max.setHours(0, 0, 0, 0);
      this.getYears();
    } else { this._max = null; }
  }

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

  toggle(): void {
    this.panelOpen ? this.close() : this.open();
  }

  /** Opens the overlay panel. */
  open(): void {
    if (this.disabled) { return; }
    this._isCalendarVisible = this.type !== 'time' ? true : false;
    this._createOverlay();
    this._overlayRef.attach(this.templatePortals.first);
    this._subscribeToBackdrop();
    this._panelOpen = true;
    this.selected = this.value || new Date(1, 0, 1);
    this.date = this.value || this.today;
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
      // if (!this._date) {
      //  this._placeholderState = '';
      // }
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
    this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
  }

  private coerceDateProperty(value: any, fallbackValue = new Date()): Date {
    let timestamp = Date.parse(value);
    fallbackValue = null;
    return isNaN(timestamp) ? fallbackValue : new Date(timestamp);
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
      let date = this.date;
      if (this._isYearsVisible) {
        switch (event.keyCode) {
          case ENTER:
          case SPACE: this._onClickOk(); break;

          case DOWN_ARROW:
            if (this.date.getFullYear() < (this.today.getFullYear() + 100)) {
              this.date = this._locale.incrementYears(date, 1);
              this._scrollToSelectedYear();
            }
            break;
          case UP_ARROW:
            if (this.date.getFullYear() > 1900) {
              this.date = this._locale.incrementYears(date, -1);
              this._scrollToSelectedYear();
            }
            break;
        }

      } else if (this._isCalendarVisible) {
        switch (event.keyCode) {
          case ENTER:
          case SPACE: this.setDate(this.date); break;

          case RIGHT_ARROW:
            this.date = this._locale.incrementDays(date, 1);
            break;
          case LEFT_ARROW:
            this.date = this._locale.incrementDays(date, -1);
            break;

          case PAGE_DOWN:
            if (event.shiftKey) {
              this.date = this._locale.incrementYears(date, 1);
            } else {
              this.date = this._locale.incrementMonths(date, 1);
            }
            break;
          case PAGE_UP:
            if (event.shiftKey) {
              this.date = this._locale.incrementYears(date, -1);
            } else {
              this.date = this._locale.incrementMonths(date, -1);
            }
            break;

          case DOWN_ARROW:
            this.date = this._locale.incrementDays(date, 7);
            break;
          case UP_ARROW:
            this.date = this._locale.incrementDays(date, -7);
            break;

          case HOME:
            this.date = this._locale.getFirstDateOfMonth(date);
            break;
          case END:
            this.date = this._locale.getLastDateOfMonth(date);
            break;
        }
        if (!this._locale.isSameMonthAndYear(date, this.date)) {
          this.generateCalendar();
        }
      } else if (this._clockView === 'hour') {
        switch (event.keyCode) {
          case ENTER:
          case SPACE: this.setHour(this.date.getHours()); break;

          case UP_ARROW:
            this.date = this._locale.incrementHours(date, 1);
            break;
          case DOWN_ARROW:
            this.date = this._locale.incrementHours(date, -1);
            break;
        }
      } else {
        switch (event.keyCode) {
          case ENTER:
          case SPACE:
            this.setMinute(this.date.getMinutes());
            break;

          case UP_ARROW:
            this.date = this._locale.incrementMinutes(date, 1);
            break;
          case DOWN_ARROW:
            this.date = this._locale.incrementMinutes(date, -1);
            break;
        }
      }
    } else {
      switch (event.keyCode) {
        case ENTER:
        case SPACE:
          event.preventDefault();
          event.stopPropagation();
          this.open();
          break;
      }
    }
  }

  _onFocus() {
    if (!this.panelOpen && this.openOnFocus) {
      this.open();
    }
  }

  _onBlur() {
    if (!this.panelOpen) {
      this._onTouched();
    }
  }

  _clearValue(event: Event) {
    event.stopPropagation();
    this.value = null;
  }

  /**
   * Display Years
   */
  _showYear() {
    this._isYearsVisible = true;
    this._isCalendarVisible = true;
    this._scrollToSelectedYear();
  }

  private getYears() {
    let startYear = this._min ? this._min.getFullYear() : 1900,
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
    this.date = new Date(year, this.date.getMonth(), this.date.getDate(),
      this.date.getHours(), this.date.getMinutes());
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
  _toggleHours(value: string) {
    this._isYearsVisible = false;
    this._isCalendarVisible = false;
    this._isYearsVisible = false;
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
      this.setDate(this.date);
    } else if (this._clockView === 'hour') {
      this._clockView = 'minute';
    } else {
      this.value = this.date;
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
      this.setDate(date.date);
    } else if (date.calMonth === this._nextMonth) {
      this._updateMonth(1);
    }
  }

  /**
   * Set Date
   * @param date Date Object
   */
  private setDate(date: Date) {
    if (this.type === 'date') {
      this.value = date;
      this._emitChangeEvent();
      this._onBlur();
      this.close();
    } else {
      this.selected = date;
      this.date = date;
      this._isCalendarVisible = false;
      this._clockView = 'hour';
    }
  }

  /**
   * Update Month
   * @param noOfMonths increment number of months
   */
  _updateMonth(noOfMonths: number) {
    this.date = this._locale.incrementMonths(this.date, noOfMonths);
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
    return !this._min ? true :
      this._min && this._locale.getMonthDistance(this.date, this._min) < 0;
  }

  /**
   * Check is After month enabled or not
   * @return boolean
   */
  _isAfterMonth() {
    return !this._max ? true :
      this._max && this._locale.getMonthDistance(this.date, this._max) > 0;
  }

  _onTimeChange(event: string) {
    if (this.time !== event) { this.time = event; }
  }

  _onHourChange(event: number) {
    this._clockView = 'minute';
  }

  _onMinuteChange(event: number) {
    this.value = this.date;
    this._emitChangeEvent();
    this._onBlur();
    this.close();
  }

  /**
   * Check the date is enabled or not
   * @param date Date Object
   * @return boolean
   */
  private _isDisabledDate(date: Date): boolean {
    for (let d of this.enableDates) {
      if (this._locale.isSameDay(date, d)) { return false; }
    }
    for (let d of this.disableDates) {
      if (this._locale.isSameDay(date, d)) { return true; }
    }
    for (let d of this.disableWeekDays) {
      if (date.getDay() === d) { return true; }
    }
    return !this._locale.isDateWithinRange(date, this._min, this._max);
  }

  /**
   * Generate Month Calendar
   */
  private generateCalendar(): void {
    this._dates.length = 0;
    let year = this.date.getFullYear();
    let month = this.date.getMonth();
    let firstDayOfMonth = this._locale.getFirstDateOfMonth(this.date);
    let calMonth = this._prevMonth;
    let date = this._locale.getFirstDateOfWeek(firstDayOfMonth);
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
          today: this._locale.isSameDay(this.today, date),
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
  private setHour(hour: number) {
    this._clockView = 'minute';
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(),
      this.date.getDate(), hour, this.date.getMinutes());
  }

  /**
   * Set minutes
   * @param minute number of minutes
   */
  private setMinute(minute: number) {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(),
      this.date.getDate(), this.date.getHours(), minute);
    this.selected = this.date;
    this.value = this.date;
    this._emitChangeEvent();
    this._onBlur();
    this.close();
  }

  /** Emits an event when the user selects a date. */
  _emitChangeEvent(): void {
    this._onChange(this.value);
    this.change.emit(new Md2DateChange(this, this.value));
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void { this._onChange = fn; }

  registerOnTouched(fn: () => {}): void { this._onTouched = fn; }

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
        const [posX, fallbackX]: HorizontalConnectionPos[] =
          this.positionX === 'before' ? ['end', 'start'] : ['start', 'end'];

        const [overlayY, fallbackOverlayY]: VerticalConnectionPos[] =
          this.positionY === 'above' ? ['bottom', 'top'] : ['top', 'bottom'];

        let originY = overlayY;
        let fallbackOriginY = fallbackOverlayY;

        if (!this.overlapTrigger) {
          originY = overlayY === 'top' ? 'bottom' : 'top';
          fallbackOriginY = fallbackOverlayY === 'top' ? 'bottom' : 'top';
        }
        config.positionStrategy = this.overlay.position().connectedTo(this._element,
          { originX: posX, originY: originY },
          { overlayX: posX, overlayY: overlayY })
          .withFallbackPosition(
          { originX: fallbackX, originY: originY },
          { overlayX: fallbackX, overlayY: overlayY })
          .withFallbackPosition(
          { originX: posX, originY: fallbackOriginY },
          { overlayX: posX, overlayY: fallbackOverlayY })
          .withFallbackPosition(
          { originX: fallbackX, originY: fallbackOriginY },
          { overlayX: fallbackX, overlayY: fallbackOverlayY });
        config.hasBackdrop = true;
        config.backdropClass = 'cdk-overlay-transparent-backdrop';
      } else {
        config.positionStrategy = this.overlay.position()
          .global()
          .centerHorizontally()
          .centerVertically();
        config.hasBackdrop = true;
      }
      this._overlayRef = this.overlay.create(config);
    }
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

export const MD2_DATEPICKER_DIRECTIVES = [Md2Datepicker, Md2Clock];

@NgModule({
  imports: [CommonModule, OverlayModule, PortalModule],
  exports: MD2_DATEPICKER_DIRECTIVES,
  declarations: MD2_DATEPICKER_DIRECTIVES,
  providers: [DateLocale]
})
export class Md2DatepickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2DatepickerModule,
      providers: []
    };
  }
}
