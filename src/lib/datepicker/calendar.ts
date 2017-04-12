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
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Md2Calendar implements AfterContentInit {
  /** A date representing the period (month or year) to start the calendar in. */
  @Input()
  get startAt() { return this._startAt; }
  set startAt(value: any) { this._startAt = this._locale.parseDate(value); }
  private _startAt: Date;

  /** Whether the calendar should be started in month or year view. */
  @Input() startView: 'month' | 'year' = 'month';

  /** The currently selected date. */
  @Input()
  get selected() { return this._selected; }
  set selected(value: any) { this._selected = this._locale.parseDate(value); }
  private _selected: Date;

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

  /** Date filter for the month and year views. */
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
  }
  private _clampedActiveDate: Date;

  /** Whether the calendar is in month view. */
  _monthView: boolean;

  /** The label for the current calendar view. */
  get _label(): string {
    return this._monthView ?
      this._locale.getCalendarMonthHeaderLabel(this._activeDate) :
      this._locale.getCalendarYearHeaderLabel(this._activeDate);
  }

  constructor(private _locale: DateLocale, private _util: DateUtil) { }

  ngAfterContentInit() {
    this._activeDate = this.startAt || this._util.today();
    this._monthView = this.startView != 'year';
  }

  /** Handles date selection in the month view. */
  _dateSelected(date: Date): void {
    if ((!date || !this.selected) && date != this.selected ||
      this._util.isSameDay(date, this.selected)) {
      this.selectedChange.emit(date);
    }
  }

  /** Handles month selection in the year view. */
  _monthSelected(month: Date): void {
    this._activeDate = month;
    this._monthView = true;
  }

  /** Handles user clicks on the period label. */
  _currentPeriodClicked(): void {
    this._monthView = !this._monthView;
  }

  /** Handles user clicks on the previous button. */
  _previousClicked(): void {
    this._activeDate = this._monthView ?
      this._util.incrementMonths(this._activeDate, -1) :
      this._util.incrementYears(this._activeDate, -1);
  }

  /** Handles user clicks on the next button. */
  _nextClicked(): void {
    this._activeDate = this._monthView ?
      this._util.incrementMonths(this._activeDate, 1) :
      this._util.incrementYears(this._activeDate, 1);
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

  /** Whether the two dates represent the same view in the current view mode (month or year). */
  private _isSameView(date1: Date, date2: Date): boolean {
    return this._monthView ?
      date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() :
      date1.getFullYear() == date2.getFullYear();
  }

  /** Handles keydown events on the calendar body. */
  _handleCalendarBodyKeydown(event: KeyboardEvent): void {
    // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
    // disabled ones from being selected. This may not be ideal, we should look into whether
    // navigation should skip over disabled dates, and if so, how to implement that efficiently.
    if (this._monthView) {
      this._handleCalendarBodyKeydownInMonthView(event);
    } else {
      this._handleCalendarBodyKeydownInYearView(event);
    }
  }

  /** Handles keydown events on the calendar body when calendar is in month view. */
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
          this._util.incrementMonths(this._activeDate, -1);
        break;
      case PAGE_DOWN:
        this._activeDate = event.altKey ?
          this._util.incrementYears(this._activeDate, 1) :
          this._util.incrementMonths(this._activeDate, 1);
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

  /** Handles keydown events on the calendar body when calendar is in year view. */
  private _handleCalendarBodyKeydownInYearView(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case LEFT_ARROW:
        this._activeDate = this._util.incrementMonths(this._activeDate, -1);
        break;
      case RIGHT_ARROW:
        this._activeDate = this._util.incrementMonths(this._activeDate, 1);
        break;
      case UP_ARROW:
        this._activeDate = this._prevMonthInSameCol(this._activeDate);
        break;
      case DOWN_ARROW:
        this._activeDate = this._nextMonthInSameCol(this._activeDate);
        break;
      case HOME:
        this._activeDate = this._util.incrementMonths(this._activeDate,
          -this._activeDate.getMonth());
        break;
      case END:
        this._activeDate = this._util.incrementMonths(this._activeDate,
          11 - this._activeDate.getMonth());
        break;
      case PAGE_UP:
        this._activeDate = this._util.incrementYears(this._activeDate, event.altKey ? -10 : -1);
        break;
      case PAGE_DOWN:
        this._activeDate = this._util.incrementYears(this._activeDate, event.altKey ? 10 : 1);
        break;
      case ENTER:
        this._monthSelected(this._activeDate);
        break;
      default:
        // Don't prevent default on keys that we don't explicitly handle.
        return;
    }

    event.preventDefault();
  }

  /**
   * Determine the date for the month that comes before the given month in the same column in the
   * calendar table.
   */
  private _prevMonthInSameCol(date: Date) {
    // Determine how many months to jump forward given that there are 2 empty slots at the beginning
    // of each year.
    let increment = date.getMonth() <= 4 ? -5 : (date.getMonth() >= 7 ? -7 : -12);
    return this._util.incrementMonths(date, increment);
  }

  /**
   * Determine the date for the month that comes after the given month in the same column in the
   * calendar table.
   */
  private _nextMonthInSameCol(date: Date): Date {
    // Determine how many months to jump forward given that there are 2 empty slots at the beginning
    // of each year.
    let increment = date.getMonth() <= 4 ? 7 : (date.getMonth() >= 7 ? 5 : 12);
    return this._util.incrementMonths(date, increment);
  }
}
