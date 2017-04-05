import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  AfterContentInit
} from '@angular/core';
import { Md2CalendarCell } from './calendar-table';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';


const DAYS_PER_WEEK = 7;


/**
 * An internal component used to display a single month in the datepicker.
 * @docs-private
 */
@Component({
  moduleId: module.id,
  selector: 'md2-month-view',
  templateUrl: 'month-view.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Md2MonthView implements AfterContentInit {
  /**
   * The date to display in this month view (everything other than the month and year is ignored).
   */
  @Input()
  get activeDate() { return this._activeDate; }
  set activeDate(value) {
    let oldActiveDate = this._activeDate;
    this._activeDate = this._locale.parseDate(value) || this._util.today();
    if (!this._util.isSameMonthAndYear(oldActiveDate, this._activeDate)) {
      this._init();
    }
  }
  private _activeDate = this._util.today();

  /** The currently selected date. */
  @Input()
  get selected() { return this._selected; }
  set selected(value) {
    this._selected = this._locale.parseDate(value);
    this._selectedDate = this._getDateInCurrentMonth(this.selected);
  }
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

  /** Emits when a new date is active. */
  @Output() activeDateChange = new EventEmitter<Date>();

  /** Emits when a new date is selected. */
  @Output() selectedChange = new EventEmitter<Date>();

  /** The label for this month (e.g. "January 2017"). */
  _monthLabel: string;

  /** Grid of calendar cells representing the dates of the month. */
  _weeks: Md2CalendarCell[][];

  /** The number of blank cells in the first row before the 1st of the month. */
  _firstWeekOffset: number;

  /** The names of the weekdays. */
  _weekdays: string[];

  /**
   * The date of the month that the currently selected Date falls on.
   * Null if the currently selected Date is in another month.
   */
  _selectedDate: number;

  /** The date of the month that today falls on. Null if today is in another month. */
  _todayDate: number;

  /** The label for the current calendar view. */
  get _label(): string {
    return this._locale.getCalendarMonthHeaderLabel(this._activeDate);
  }

  constructor(private _locale: DateLocale, private _util: DateUtil) {
    this._weekdays = this._locale.narrowDays.slice(this._locale.firstDayOfWeek)
      .concat(this._locale.narrowDays.slice(0, this._locale.firstDayOfWeek));
  }

  ngAfterContentInit(): void {
    this._init();
  }

  /** Handles when a new date is selected. */
  _dateSelected(date: number) {
    if (this._selectedDate == date) {
      return;
    }
    this.selectedChange.emit(new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(), date,
      this.activeDate.getHours(), this.activeDate.getMinutes(), this.activeDate.getSeconds()));
  }

  /** Handles user clicks on the previous button. */
  _previousClicked(): void {
    this.activeDate = this._util.incrementMonths(this._activeDate, -1);
    this.activeDateChange.emit(this._activeDate);
  }

  /** Handles user clicks on the next button. */
  _nextClicked(): void {
    this.activeDate = this._util.incrementMonths(this._activeDate, 1);
    this.activeDateChange.emit(this._activeDate);
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
    return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth();
  }

  /** Initializes this month view. */
  private _init() {
    this._selectedDate = this._getDateInCurrentMonth(this.selected);
    this._todayDate = this._getDateInCurrentMonth(this._util.today());
    this._monthLabel = this._locale.shortMonths[this.activeDate.getMonth()].toLocaleUpperCase();

    let firstOfMonth = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(), 1,
      this.activeDate.getHours(), this.activeDate.getMinutes(), this.activeDate.getSeconds());
    this._firstWeekOffset =
      (DAYS_PER_WEEK + firstOfMonth.getDay() - this._locale.firstDayOfWeek) % DAYS_PER_WEEK;

    this._createWeekCells();
  }

  /** Creates Md2CalendarCells for the dates in this month. */
  private _createWeekCells() {
    let daysInMonth = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 0).getDate();
    this._weeks = [[]];
    for (let i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++ , cell++) {
      if (cell == DAYS_PER_WEEK) {
        this._weeks.push([]);
        cell = 0;
      }
      let enabled = !this.dateFilter ||
        this.dateFilter(new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(), i + 1));
      this._weeks[this._weeks.length - 1]
        .push(new Md2CalendarCell(i + 1, this._locale.dates[i + 1], enabled));
    }
  }

  /**
   * Gets the date in this month that the given Date falls on.
   * Returns null if the given Date is in another month.
   */
  private _getDateInCurrentMonth(date: Date): number {
    return this._util.isSameMonthAndYear(date, this.activeDate) ? date.getDate() : null;
  }
}
