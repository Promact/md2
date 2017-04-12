import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
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

/**
 * A clock that is used as part of the datepicker.
 * @docs-private
 */
@Component({
  moduleId: module.id,
  selector: 'md2-clock',
  templateUrl: 'clock.html',
  styleUrls: ['clock.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  get minDate(): Date { return this._minDate; };
  set minDate(date: Date) { this._minDate = this._locale.parseDate(date); }
  private _minDate: Date;

  /** The maximum selectable date. */
  @Input()
  get maxDate(): Date { return this._maxDate; };
  set maxDate(date: Date) { this._maxDate = this._locale.parseDate(date); }
  private _maxDate: Date;

  /** A function used to filter which dates are selectable. */
  @Input() dateFilter: (date: Date) => boolean;

  /** Emits when the currently selected date changes. */
  @Output() selectedChange = new EventEmitter<Date>();

  /** Date filter for the hour and minute views. */
  _dateFilterForViews = (date: Date) => {
    return !!date &&
      (!this.dateFilter || this.dateFilter(date)) &&
      (!this.minDate || this._util.isSameDay(date, this.minDate)) &&
      (!this.maxDate || this._util.isSameDay(date, this.maxDate));
  }

  /**
   * The current active date. This determines which time period is shown and which date is
   * highlighted when using keyboard navigation.
   */
  get _activeDate() { return this._clampedActiveDate; }
  set _activeDate(value: Date) {
    this._clampedActiveDate = this._util.clampDate(value, this.minDate, this.maxDate);
    this._init();
  }

  /** Grid of calendar cells representing the dates of the month. */
  _hours: Array<Object> = [];
  _minutes: Array<Object> = [];

  private _clampedActiveDate: Date;

  /** Whether the clock is in hour view. */
  _hourView: boolean;

  /** The label for the current clock view. */
  get _label(): string {
    return this._hourView ?
      this._locale.getCalendarMonthHeaderLabel(this._activeDate) :
      this._locale.getCalendarYearHeaderLabel(this._activeDate);
  }

  get _hand(): any {
    let CLOCK_INNER_RADIUS = 27.5;
    let CLOCK_OUTER_RADIUS = 41.25;

    let deg = 0;
    let radius = CLOCK_OUTER_RADIUS;
    //if (this._view) {
    let inner = this._hour > 0 && this._hour < 13;
    radius = inner ? CLOCK_INNER_RADIUS : CLOCK_OUTER_RADIUS;
    deg = Math.round(this._hour * (360 / (24 / 2)));
    //} else {
    //  deg = Math.round(this._minute * (360 / 60));
    //}

    return {
      'transform': `rotate(${deg}deg)`,
      'height': `${radius}%`,
      'margin-top': `${50 - radius}%`
    };
  }

  constructor(private _locale: DateLocale, private _util: DateUtil) { }

  ngAfterContentInit() {
    this._activeDate = this.startAt || this._util.today();
    this._hourView = this.startView != 'minute';
    this._init();
  }

  /** Handles date selection in the hour view. */
  _dateSelected(date: Date): void {
    if ((!date || !this.selected) && date != this.selected || this._util.isSameDay(date, this.selected)) {
      this.selectedChange.emit(date);
    }
  }

  /** Initializes this month view. */
  private _init() {
    //this._selected = this._getMonthInCurrentYear(this.selected);
    //this._todayMonth = this._getMonthInCurrentYear(SimpleDate.today());
    //this._yearLabel = this._locale.getCalendarYearHeaderLabel(this.activeDate);

    // First row of months only contains 5 elements so we can fit the year label on the same row.
    //this._hours = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11]].map(row => row.map(
    //  month => this._createCellForMonth(month)));
    let CLOCK_RADIUS = 50;
    let CLOCK_INNER_RADIUS = 27.5;
    let CLOCK_OUTER_RADIUS = 41.25;
    let CLOCK_TICK_RADIUS = 7.0833;

    this._hours.length = 0;

    for (let i = 0; i < 24; i++) {
      //let x = -(50 * (Math.sin(-Math.PI * (i / 6))));
      //let y = -(50 * (Math.cos(-Math.PI * (i / 6))));
      //this._hours.push({
      //  hour: i === 0 ? '00' : i,
      //  top: y,
      //  left: x
      //});

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
    this._hourView = true;
  }

  /** Handles user clicks on the period label. */
  _currentPeriodClicked(): void {
    this._hourView = !this._hourView;
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
    if (!this.minDate) {
      return true;
    }
    return !this.minDate || !this._isSameView(this._activeDate, this.minDate);
  }

  /** Whether the next period button is enabled. */
  _nextEnabled(): boolean {
    return !this.maxDate || !this._isSameView(this._activeDate, this.maxDate);
  }

  /** Whether the two dates represent the same view in the current view mode (hour or minute). */
  private _isSameView(date1: Date, date2: Date): boolean {
    return this._hourView ?
      date1.getFullYear() == date2.getFullYear() && date1.getHours() == date2.getHours() :
      date1.getFullYear() == date2.getFullYear();
  }

  /** Handles keydown events on the clock body. */
  _handleClockBodyKeydown(event: KeyboardEvent): void {
    // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
    // disabled ones from being selected. This may not be ideal, we should look into whether
    // navigation should skip over disabled dates, and if so, how to implement that efficiently.
    if (this._hourView) {
      this._handleCalendarBodyKeydownInMonthView(event);
    } else {
      this._handleCalendarBodyKeydownInYearView(event);
    }
  }

  /** Handles keydown events on the clock body when clock is in hour view. */
  private _handleCalendarBodyKeydownInMonthView(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case LEFT_ARROW:
        this._activeDate = this._util.incrementDays(this._activeDate, -1);
        break;
      case RIGHT_ARROW:
        this._activeDate = this._util.incrementDays(this._activeDate, 1);
        break;
      case UP_ARROW:
        this._activeDate = this._util.incrementDays(this._activeDate, -7);
        break;
      case DOWN_ARROW:
        this._activeDate = this._util.incrementDays(this._activeDate, 7);
        break;
      case HOME:
        this._activeDate = this._util.getFirstDateOfMonth(this._activeDate);
        break;
      case END:
        this._activeDate = this._util.getLastDateOfMonth(this._activeDate);
        break;
      case PAGE_UP:
        this._activeDate = event.altKey ?
          this._util.incrementYears(this._activeDate, -1) :
          this._util.incrementHours(this._activeDate, -1);
        break;
      case PAGE_DOWN:
        this._activeDate = event.altKey ?
          this._util.incrementYears(this._activeDate, 1) :
          this._util.incrementHours(this._activeDate, 1);
        break;
      case ENTER:
        if (this._dateFilterForViews(this._activeDate)) {
          this._dateSelected(this._activeDate);
          break;
        }
        return;
      default:
        // Don't prevent default on keys that we don't explicitly handle.
        return;
    }

    event.preventDefault();
  }

  /** Handles keydown events on the clock body when clock is in minute view. */
  private _handleCalendarBodyKeydownInYearView(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case LEFT_ARROW:
        this._activeDate = this._util.incrementHours(this._activeDate, -1);
        break;
      case RIGHT_ARROW:
        this._activeDate = this._util.incrementHours(this._activeDate, 1);
        break;
      case UP_ARROW:
        this._activeDate = this._prevMonthInSameCol(this._activeDate);
        break;
      case DOWN_ARROW:
        this._activeDate = this._nextMonthInSameCol(this._activeDate);
        break;
      case HOME:
        this._activeDate = this._util.incrementHours(this._activeDate, -this._activeDate.getHours());
        break;
      case END:
        this._activeDate = this._util.incrementHours(this._activeDate, 11 - this._activeDate.getHours());
        break;
      case PAGE_UP:
        this._activeDate = this._util.incrementYears(this._activeDate, event.altKey ? -10 : -1);
        break;
      case PAGE_DOWN:
        this._activeDate = this._util.incrementYears(this._activeDate, event.altKey ? 10 : 1);
        break;
      case ENTER:
        this._hourSelected(this._activeDate);
        break;
      default:
        // Don't prevent default on keys that we don't explicitly handle.
        return;
    }

    event.preventDefault();
  }

  /**
   * Determine the date for the hour that comes before the given hour in the same column in the
   * clock table.
   */
  private _prevMonthInSameCol(date: Date) {
    // Determine how many hours to jump forward given that there are 2 empty slots at the beginning
    // of each minute.
    let increment = date.getHours() <= 4 ? -5 : (date.getHours() >= 7 ? -7 : -12);
    return this._util.incrementHours(date, increment);
  }

  /**
   * Determine the date for the hour that comes after the given hour in the same column in the
   * clock table.
   */
  private _nextMonthInSameCol(date: Date): Date {
    // Determine how many hours to jump forward given that there are 2 empty slots at the beginning
    // of each minute.
    let increment = date.getHours() <= 4 ? 7 : (date.getHours() >= 7 ? 5 : 12);
    return this._util.incrementHours(date, increment);
  }

  /**
   * Gets the month in this year that the given Date falls on.
   * Returns null if the given Date is in another year.
   */
  private _getTimeInCurrentDate(date: Date) {
    this._hour = date ? date.getHours() : null;
    this._minute = date ? date.getMinutes() : null;
  }
}