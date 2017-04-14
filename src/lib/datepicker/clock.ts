import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { DateUtil } from './date-util';
import { DateLocale } from './date-locale';
import {
  DOWN_ARROW,
  END, ENTER,
  HOME,
  LEFT_ARROW,
  PAGE_DOWN,
  PAGE_UP,
  RIGHT_ARROW,
  UP_ARROW
} from '../core/keyboard/keycodes';

const CLOCK_RADIUS = 50;
const CLOCK_INNER_RADIUS = 27.5;
const CLOCK_OUTER_RADIUS = 41.25;
const CLOCK_TICK_RADIUS = 7.0833;

/**
 * A clock that is used as part of the datepicker.
 * @docs-private
 */
@Component({
  moduleId: module.id,
  selector: 'md2-clock',
  templateUrl: 'clock.html',
  styleUrls: ['clock.css'],
  host: {
    'role': 'clock',
    '(mousedown)': '_handleMousedown($event)',
  },
  encapsulation: ViewEncapsulation.None,
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Md2Clock implements AfterContentInit {
  /** A date representing the period (hour or minute) to start the clock in. */
  @Input()
  get startAt() { return this._startAt; }
  set startAt(value: any) { this._startAt = this._locale.parseDate(value); }
  private _startAt: Date;

  /** Whether the clock should be started in hour or minute view. */
  @Input() startView: 'hour' | 'minute' = 'hour';

  /** The currently selected date. */
  @Input()
  get selected() { return this._selected; }
  set selected(value: any) {
    this._selected = this._locale.parseDate(value);
    this._getTimeInCurrentDate(this._selected);
  }
  private _selected: Date;
  private _hour: number;
  private _minute: number;

  /** The minimum selectable date. */
  @Input()
  get min(): Date { return this._min; };
  set min(date: Date) { this._min = this._locale.parseDate(date); }
  private _min: Date;

  /** The maximum selectable date. */
  @Input()
  get max(): Date { return this._max; };
  set max(date: Date) { this._max = this._locale.parseDate(date); }
  private _max: Date;

  /** A function used to filter which dates are selectable. */
  @Input() dateFilter: (date: Date) => boolean;

  /** Emits when the currently selected date changes. */
  @Output() selectedChange = new EventEmitter<Date>();

  /** Date filter for the hour and minute views. */
  _dateFilterForViews = (date: Date) => {
    return !!date &&
      (!this.dateFilter || this.dateFilter(date)) &&
      (!this.min || this._util.isSameDay(date, this.min)) &&
      (!this.max || this._util.isSameDay(date, this.max));
  }

  /**
   * The current active date. This determines which time period is shown and which date is
   * highlighted when using keyboard navigation.
   */
  get _activeDate() { return this._clampedActiveDate; }
  set _activeDate(value: Date) {
    this._clampedActiveDate = this._util.clampDate(value, this.min, this.max);
    //this._init();
  }

  /** Grid of calendar cells representing the dates of the month. */
  _hours: Array<Object> = [];
  _minutes: Array<Object> = [];

  private _clampedActiveDate: Date;

  /** Whether the clock is in hour view. */
  _hourView: boolean;

  get _hand(): any {
    let deg = 0;
    let radius = CLOCK_OUTER_RADIUS;
    if (this._hourView) {
      let inner = this._activeDate.getHours() > 0 && this._activeDate.getHours() < 13;
      radius = inner ? CLOCK_INNER_RADIUS : CLOCK_OUTER_RADIUS;
      deg = Math.round(this._activeDate.getHours() * (360 / (24 / 2)));
    } else {
      deg = Math.round(this._activeDate.getMinutes() * (360 / 60));
    }
    return {
      'transform': `rotate(${deg}deg)`,
      'height': `${radius}%`,
      'margin-top': `${50 - radius}%`
    };
  }

  private mouseMoveListener: any;
  private mouseUpListener: any;

  constructor(private _element: ElementRef, private _locale: DateLocale,
    private _util: DateUtil) {
    this.mouseMoveListener = (event: any) => { this._handleMousemove(event); };
    this.mouseUpListener = (event: any) => { this._handleMouseup(event); };
  }

  ngAfterContentInit() {
    this._activeDate = this.startAt || this._util.today();
    this._hourView = this.startView != 'minute';
    this._init();
  }

  /** Handles date selection in the hour view. */
  _minuteSelected(date: Date): void {
    //if ((!date || !this.selected) && date != this.selected || this._util.isSameDay(date, this.selected)) {
    this.selectedChange.emit(date);
    //}
  }

  /** Initializes this clock view. */
  private _init() {
    this._hours.length = 0;

    for (let i = 0; i < 24; i++) {
      let radian = i / 6 * Math.PI;
      let inner = i > 0 && i < 13,
        radius = inner ? CLOCK_INNER_RADIUS : CLOCK_OUTER_RADIUS;
      this._hours.push({
        hour: i === 0 ? '00' : i,
        top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
        left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS
      });
    }

    for (let i = 0; i < 60; i += 5) {
      let radian = i / 30 * Math.PI;
      this._minutes.push({
        minute: i === 0 ? '00' : i,
        top: CLOCK_RADIUS - Math.cos(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
        left: CLOCK_RADIUS + Math.sin(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS
      });
    }
  }

  /** Handles hour selection in the minute view. */
  _hourSelected(hour: Date): void {
    this._activeDate = hour;
    this._hourView = false;
  }

  /** Handles user clicks on the previous button. */
  _previousClicked(): void {
    this._activeDate = this._hourView ?
      this._util.incrementHours(this._activeDate, -1) :
      this._util.incrementYears(this._activeDate, -1);
  }

  /** Handles user clicks on the next button. */
  _nextClicked(): void {
    this._activeDate = this._hourView ?
      this._util.incrementHours(this._activeDate, 1) : this._util.incrementMinutes(this._activeDate, 1);
  }

  /** Whether the previous period button is enabled. */
  _previousEnabled(): boolean {
    if (!this.min) {
      return true;
    }
    return !this.min || !this._isSameView(this._activeDate, this.min);
  }

  /** Whether the next period button is enabled. */
  _nextEnabled(): boolean {
    return !this.max || !this._isSameView(this._activeDate, this.max);
  }

  /** Whether the two dates represent the same view in the current view mode (hour or minute). */
  private _isSameView(date1: Date, date2: Date): boolean {
    return this._hourView ?
      date1.getFullYear() == date2.getFullYear() && date1.getHours() == date2.getHours() :
      date1.getFullYear() == date2.getFullYear();
  }

  /** Handles keydown events on the clock body. */
  _handleClockBodyKeydown(event: KeyboardEvent): void {
    if (this._hourView) {
      switch (event.keyCode) {
        case UP_ARROW:
          this._activeDate = this._util.incrementHours(this._activeDate, -1);
          break;
        case DOWN_ARROW:
          this._activeDate = this._util.incrementHours(this._activeDate, 1);
          break;
        case ENTER:
          this._hourSelected(this._activeDate);
          break;
        default:
          return;
      }
    } else {
      switch (event.keyCode) {
        case UP_ARROW:
          this._activeDate = this._util.incrementMinutes(this._activeDate, -1);
          break;
        case DOWN_ARROW:
          this._activeDate = this._util.incrementMinutes(this._activeDate, 1);
          break;
        case ENTER:
          if (this._dateFilterForViews(this._activeDate)) {
            this._minuteSelected(this._activeDate);
            break;
          }
          return;
        default:
          return;
      }
    }
    event.preventDefault();
  }

  /** Handles mousedown events on the clock body. */
  _handleMousedown(event: any) {
    this.setTime(event);
    document.addEventListener('mousemove', this.mouseMoveListener);
    document.addEventListener('touchmove', this.mouseMoveListener);
    document.addEventListener('mouseup', this.mouseUpListener);
    document.addEventListener('touchend', this.mouseUpListener);
  }

  _handleMousemove(event: any) {
    event.preventDefault();
    this.setTime(event);
    console.log('moving');
  }

  _handleMouseup(event: any) {
    document.removeEventListener('mousemove', this.mouseMoveListener);
    document.removeEventListener('touchmove', this.mouseMoveListener);
    document.removeEventListener('mouseup', this.mouseUpListener);
    document.removeEventListener('touchend', this.mouseUpListener);
    //if (!cell.enabled || this._selectedDate == cell.value) {
    //  return;
    //}
    if (this._hourView) {
      this._hourSelected(this._activeDate);
    } else {
      this.selectedChange.emit(this._activeDate);
    }
    console.log('up');
  }

  /**
   * Set Time
   * @param event
   */
  private setTime(event: any) {
    let trigger = this._element.nativeElement;
    let triggerRect = trigger.getBoundingClientRect();
    let width = trigger.offsetWidth;
    let height = trigger.offsetHeight;
    let pageX = event.pageX !== undefined ? event.pageX : event.touches[0].pageX;
    let pageY = event.pageY !== undefined ? event.pageY : event.touches[0].pageY;
    let x = (width / 2) - (pageX - triggerRect.left - window.pageXOffset);
    let y = (height / 2) - (pageY - triggerRect.top - window.pageYOffset);
    let radian = Math.atan2(-x, y);
    let unit = Math.PI / (this._hourView ? 6 : 30);
    let z = Math.sqrt(x * x + y * y);
    let inner = false;//this._hourView && z < (CLOCK_OUTER_RADIUS + CLOCK_INNER_RADIUS) / 2;
    let value = 0;

    if (radian < 0) { radian = Math.PI * 2 + radian; }
    value = Math.round(radian / unit);
    radian = value * unit;

    if (this._hourView) {
      if (value === 12) { value = 0; }
      value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
      this._activeDate.setHours(value);
      //this._activeDate = new Date(this._activeDate.getFullYear(),
      //  this._activeDate.getMonth(), this._activeDate.getDate(), value,
      //  this._activeDate.getMinutes(), this._activeDate.getSeconds());
    } else {
      if (value === 60) { value = 0; }
      this._activeDate.setMinutes(value);
      //this._activeDate = new Date(this._activeDate.getFullYear(),
      //  this._activeDate.getMonth(), this._activeDate.getDate(), this._activeDate.getHours(),
      //  value, this._activeDate.getSeconds());

    }
    //this._time = this._hour + ':' + this._minute;
    //this._emitChangeEvent();
  }

  /**
   * Gets the time given in the Date falls on.
   * Returns null if the given Time is in another Date.
   */
  private _getTimeInCurrentDate(date: Date) {
    this._hour = date ? date.getHours() : null;
    this._minute = date ? date.getMinutes() : null;
  }
}