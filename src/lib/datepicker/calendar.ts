import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  Optional,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {
  DOWN_ARROW,
  END,
  ENTER,
  HOME,
  LEFT_ARROW,
  PAGE_DOWN,
  PAGE_UP,
  RIGHT_ARROW,
  UP_ARROW
} from '../core/keyboard/keycodes';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
import { slideCalendar } from './datepicker-animations';
import { MD_DATE_FORMATS, MdDateFormats } from '../core/datetime/date-formats';
import { MATERIAL_COMPATIBILITY_MODE } from '../core';


/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
@Component({
  moduleId: module.id,
  selector: 'md2-calendar',
  templateUrl: 'calendar.html',
  styleUrls: ['calendar.css'],
  host: {
    '[class.md2-calendar]': 'true',
    'tabindex': '0',
    '(keydown)': '_handleCalendarBodyKeydown($event)',
  },
  animations: [slideCalendar],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Md2Calendar implements AfterContentInit {

  @Input() type: 'date' | 'time' | 'datetime' = 'date';

  /** A date representing the period (month or year) to start the calendar in. */
  @Input() startAt: Date;

  /** Whether the calendar should be started in month or year view. */
  @Input() startView: 'clock' | 'month' | 'year' = 'month';

  /** The currently selected date. */
  @Input() selected: Date;

  /** The minimum selectable date. */
  @Input() minDate: Date;

  /** The maximum selectable date. */
  @Input() maxDate: Date;

  @Input() timeInterval: number = 1;

  /** A function used to filter which dates are selectable. */
  @Input() dateFilter: (date: Date) => boolean;

  /** Emits when the currently selected date changes. */
  @Output() selectedChange = new EventEmitter<Date>();

  /** Date filter for the month and year views. */
  _dateFilterForViews = (date: Date) => {
    return !!date &&
      (!this.dateFilter || this.dateFilter(date)) &&
      (!this.minDate || this._util.compareDate(date, this.minDate) >= 0) &&
      (!this.maxDate || this._util.compareDate(date, this.maxDate) <= 0);
  }

  /**
   * The current active date. This determines which time period is shown and which date is
   * highlighted when using keyboard navigation.
   */
  get _activeDate(): Date { return this._clampedActiveDate; }
  set _activeDate(value: Date) {
    let oldActiveDate = this._clampedActiveDate;
    this._clampedActiveDate = this._util.clampDate(value, this.minDate, this.maxDate);
    if (oldActiveDate && this._clampedActiveDate &&
      !this._util.isSameMonthAndYear(oldActiveDate, this._clampedActiveDate)) {
      if (this._util.isInNextMonth(oldActiveDate, this._clampedActiveDate)) {
        this.calendarState('right');
      } else {
        this.calendarState('left');
      }
    }
  }
  private _clampedActiveDate: Date;

  /** Whether the calendar is in month view. */
  _currentView: 'clock' | 'month' | 'year' = 'month';
  _clockView: 'hour' | 'minute' = 'hour';

  /** The label for the current calendar view. */
  get _yearLabel(): string {
    return this._locale.getYearName(this._activeDate);
  }

  get _monthLabel(): string {
    return this._locale.getMonthLabel(this._activeDate);
  }

  get _dateLabel(): string {
    return this._locale.getDateLabel(this._activeDate);
  }

  get _hoursLabel(): string {
    return ('0' + this._locale.getHoursLabel(this._activeDate)).slice(-2);
  }

  get _minutesLabel(): string {
    return ('0' + this._locale.getMinutesLabel(this._activeDate)).slice(-2);
  }

  _calendarState: string;

  constructor(private _elementRef: ElementRef, private _ngZone: NgZone,
    private _locale: DateLocale, private _util: DateUtil,
    @Optional() @Inject(MD_DATE_FORMATS) private _dateFormats: MdDateFormats) {
    if (!this._dateFormats) {
      throw Error('MD_DATE_FORMATS');
    }
  }

  ngAfterContentInit() {
    this._activeDate = this.startAt || this._util.today();
    this._elementRef.nativeElement.focus();
    if (this.type === 'time') {
      this._currentView = 'clock';
    } else {
      this._currentView = this.startView || 'month';
    }
  }

  /** Handles date selection in the month view. */
  _dateSelected(date: Date): void {
    if (this.type == 'date') {
      if (!this._util.sameDate(date, this.selected)) {
        this.selectedChange.emit(date);
      }
    } else {
      this._activeDate = date;
      this._currentView = 'clock';
    }
  }

  /** Handles month selection in the year view. */
  _monthSelected(month: Date): void {
    this._activeDate = month;
    this._currentView = 'month';
  }

  _timeSelected(date: Date): void {
    if (this._clockView !== 'minute') {
      this._activeDate = date;
      this._clockView = 'minute';
    } else {
      if (!this._util.sameDateAndTime(date, this.selected)) {
        this._clockView = 'hour';
        this._currentView = 'month';
        this.selectedChange.emit(date);
      }
    }
  }

  _onActiveDateChange(date: Date) {
    this._activeDate = date;
  }

  _yearClicked(): void {
    this._currentView = 'year';
  }
  _dateClicked(): void {
    this._currentView = 'month';
  }

  _hoursClicked(): void {
    this._currentView = 'clock';
    this._clockView = 'hour';
  }
  _minutesClicked(): void {
    this._currentView = 'clock';
    this._clockView = 'minute';
  }

  /** Handles user clicks on the previous button. */
  _previousClicked(): void {
    this._activeDate = this._util.addCalendarMonths(this._activeDate, -1);
  }

  /** Handles user clicks on the next button. */
  _nextClicked(): void {
    this._activeDate = this._util.addCalendarMonths(this._activeDate, 1);
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

  /** Handles keydown events on the calendar body. */
  _handleCalendarBodyKeydown(event: KeyboardEvent): void {
    // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
    // disabled ones from being selected. This may not be ideal, we should look into whether
    // navigation should skip over disabled dates, and if so, how to implement that efficiently.
    if (this._currentView === 'month') {
      this._handleCalendarBodyKeydownInMonthView(event);
    } else if (this._currentView === 'year') {
      this._handleCalendarBodyKeydownInYearView(event);
    } else {
      this._handleCalendarBodyKeydownInClockView(event);
    }
  }

  /** Whether the two dates represent the same view in the current view mode (month or year). */
  private _isSameView(date1: Date, date2: Date): boolean {
    return this._currentView === 'month' ?
      this._util.getYear(date1) == this._util.getYear(date2) &&
      this._util.getMonth(date1) == this._util.getMonth(date2) :
      this._util.getYear(date1) == this._util.getYear(date2);
  }

  /** Handles keydown events on the calendar body when calendar is in month view. */
  private _handleCalendarBodyKeydownInMonthView(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case LEFT_ARROW:
        this._activeDate = this._util.addCalendarDays(this._activeDate, -1);
        break;
      case RIGHT_ARROW:
        this._activeDate = this._util.addCalendarDays(this._activeDate, 1);
        break;
      case UP_ARROW:
        this._activeDate = this._util.addCalendarDays(this._activeDate, -7);
        break;
      case DOWN_ARROW:
        this._activeDate = this._util.addCalendarDays(this._activeDate, 7);
        break;
      case HOME:
        this._activeDate = this._util.addCalendarDays(this._activeDate,
          1 - this._util.getDate(this._activeDate));
        break;
      case END:
        this._activeDate = this._util.addCalendarDays(this._activeDate,
          (this._util.getNumDaysInMonth(this._activeDate) -
            this._util.getDate(this._activeDate)));
        break;
      case PAGE_UP:
        this._activeDate = event.altKey ?
          this._util.addCalendarYears(this._activeDate, -1) :
          this._util.addCalendarMonths(this._activeDate, -1);
        break;
      case PAGE_DOWN:
        this._activeDate = event.altKey ?
          this._util.addCalendarYears(this._activeDate, 1) :
          this._util.addCalendarMonths(this._activeDate, 1);
        break;
      case ENTER:
        if (this._dateFilterForViews(this._activeDate)) {
          this._dateSelected(this._activeDate);
          // Prevent unexpected default actions such as form submission.
          event.preventDefault();
        }
        return;
      default:
        // Don't prevent default or focus active cell on keys that we don't explicitly handle.
        return;
    }

    // Prevent unexpected default actions such as form submission.
    event.preventDefault();
  }

  /** Handles keydown events on the calendar body when calendar is in year view. */
  private _handleCalendarBodyKeydownInYearView(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case LEFT_ARROW:
        this._activeDate = this._util.addCalendarMonths(this._activeDate, -1);
        break;
      case RIGHT_ARROW:
        this._activeDate = this._util.addCalendarMonths(this._activeDate, 1);
        break;
      case UP_ARROW:
        this._activeDate = this._prevMonthInSameCol(this._activeDate);
        break;
      case DOWN_ARROW:
        this._activeDate = this._nextMonthInSameCol(this._activeDate);
        break;
      case HOME:
        this._activeDate = this._util.addCalendarMonths(this._activeDate,
          -this._util.getMonth(this._activeDate));
        break;
      case END:
        this._activeDate = this._util.addCalendarMonths(this._activeDate,
          11 - this._util.getMonth(this._activeDate));
        break;
      case PAGE_UP:
        this._activeDate =
          this._util.addCalendarYears(this._activeDate, event.altKey ? -10 : -1);
        break;
      case PAGE_DOWN:
        this._activeDate =
          this._util.addCalendarYears(this._activeDate, event.altKey ? 10 : 1);
        break;
      case ENTER:
        this._monthSelected(this._activeDate);
        break;
      default:
        // Don't prevent default or focus active cell on keys that we don't explicitly handle.
        return;
    }

    // Prevent unexpected default actions such as form submission.
    event.preventDefault();
  }

  /** Handles keydown events on the calendar body when calendar is in month view. */
  private _handleCalendarBodyKeydownInClockView(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case UP_ARROW:
        this._activeDate = this._clockView == 'hour' ? this._util.addCalendarHours(this._activeDate, 1) :
          this._util.addCalendarMinutes(this._activeDate, 1);
        break;
      case DOWN_ARROW:
        this._activeDate = this._clockView == 'hour' ? this._util.addCalendarHours(this._activeDate, -1) :
          this._util.addCalendarMinutes(this._activeDate, -1);
        break;
      case ENTER:
        this._timeSelected(this._activeDate);
        return;
      default:
        // Don't prevent default or focus active cell on keys that we don't explicitly handle.
        return;
    }

    // Prevent unexpected default actions such as form submission.
    event.preventDefault();
  }

  /**
   * Determine the date for the month that comes before the given month in the same column in the
   * calendar table.
   */
  private _prevMonthInSameCol(date: Date): Date {
    // Determine how many months to jump forward given that there are 2 empty slots at the beginning
    // of each year.
    let increment = this._util.getMonth(date) <= 4 ? -5 :
      (this._util.getMonth(date) >= 7 ? -7 : -12);
    return this._util.addCalendarMonths(date, increment);
  }

  /**
   * Determine the date for the month that comes after the given month in the same column in the
   * calendar table.
   */
  private _nextMonthInSameCol(date: Date): Date {
    // Determine how many months to jump forward given that there are 2 empty slots at the beginning
    // of each year.
    let increment = this._util.getMonth(date) <= 4 ? 7 :
      (this._util.getMonth(date) >= 7 ? 5 : 12);
    return this._util.addCalendarMonths(date, increment);
  }

  private calendarState(direction: string): void {
    this._calendarState = direction;
  }

  _calendarStateDone() {
    this._calendarState = ''
  }

}
