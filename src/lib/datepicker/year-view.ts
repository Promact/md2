import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  AfterContentInit,
  Output,
  EventEmitter
} from '@angular/core';
import { Md2CalendarCell } from './calendar-table';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';


/**
 * An internal component used to display a single year in the datepicker.
 * @docs-private
 */
@Component({
  moduleId: module.id,
  selector: 'md2-year-view',
  templateUrl: 'year-view.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Md2YearView implements AfterContentInit {
  /** The date to display in this year view (everything other than the year is ignored). */
  @Input()
  get activeDate() { return this._activeDate; }
  set activeDate(value) {
    let oldActiveDate = this._activeDate;
    this._activeDate = this._locale.parseDate(value) || this._util.today();
    if (oldActiveDate.getFullYear() != this._activeDate.getFullYear()) {
      this._init();
    }
  }
  private _activeDate = this._util.today();

  /** The currently selected date. */
  @Input()
  get selected() { return this._selected; }
  set selected(value) {
    this._selected = this._locale.parseDate(value);
    this._selectedMonth = this._getMonthInCurrentYear(this.selected);
  }
  private _selected: Date;

  /** A function used to filter which dates are selectable. */
  @Input() dateFilter: (date: Date) => boolean;

  /** Emits when a new month is selected. */
  @Output() selectedChange = new EventEmitter<Date>();

  /** Grid of calendar cells representing the months of the year. */
  _months: Md2CalendarCell[][];

  /** The label for this year (e.g. "2017"). */
  _yearLabel: string;

  /** The month in this year that today falls on. Null if today is in a different year. */
  _todayMonth: number;

  /**
   * The month in this year that the selected Date falls on.
   * Null if the selected Date is in a different year.
   */
  _selectedMonth: number;

  constructor(private _locale: DateLocale, private _util: DateUtil) { }

  ngAfterContentInit() {
    this._init();
  }

  /** Handles when a new month is selected. */
  _monthSelected(month: number) {
    this.selectedChange.emit(new Date(this.activeDate.getFullYear(), month, this._activeDate.getDate(),
      this.activeDate.getHours(), this.activeDate.getMinutes(), this.activeDate.getSeconds()));
  }

  /** Initializes this month view. */
  private _init() {
    this._selectedMonth = this._getMonthInCurrentYear(this.selected);
    this._todayMonth = this._getMonthInCurrentYear(this._util.today());
    this._yearLabel = this._locale.getCalendarYearHeaderLabel(this.activeDate);

    // First row of months only contains 5 elements so we can fit the year label on the same row.
    this._months = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11]].map(row => row.map(
      month => this._createCellForMonth(month)));
  }

  /**
   * Gets the month in this year that the given Date falls on.
   * Returns null if the given Date is in another year.
   */
  private _getMonthInCurrentYear(date: Date) {
    return date && date.getFullYear() == this.activeDate.getFullYear() ? date.getMonth() : null;
  }

  /** Creates an Md2CalendarCell for the given month. */
  private _createCellForMonth(month: number) {
    return new Md2CalendarCell(
      month, this._locale.shortMonths[month].toLocaleUpperCase(), this._isMonthEnabled(month));
  }

  /** Whether the given month is enabled. */
  private _isMonthEnabled(month: number) {
    if (!this.dateFilter) {
      return true;
    }

    // If any date in the month is enabled count the month as enabled.
    for (let date = new Date(this.activeDate.getFullYear(), month, 1); date.getMonth() === month;
      date = this._util.incrementDays(date, 1)) {
      if (this.dateFilter(date)) {
        return true;
      }
    }

    return false;
  }
}
