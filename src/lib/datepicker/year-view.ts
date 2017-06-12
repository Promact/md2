import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
import { Md2CalendarCell } from './calendar-body';
import { MD_DATE_FORMATS, MdDateFormats } from '../core/datetime/date-formats';
import { slideCalendar } from './datepicker-animations';


/**
 * An internal component used to display a single year in the datepicker.
 * @docs-private
 */
@Component({
  moduleId: module.id,
  selector: 'md2-year-view',
  templateUrl: 'year-view.html',
  animations: [slideCalendar],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Md2YearView implements AfterContentInit {
  /** The date to display in this year view (everything other than the year is ignored). */
  @Input()
  get activeDate(): Date { return this._activeDate; }
  set activeDate(value: Date) {
    let oldActiveDate = this._activeDate;
    this._activeDate = value || this._util.today();
    if (oldActiveDate && this._activeDate &&
      !this._util.isSameYear(oldActiveDate, this._activeDate)) {
      this._init();
      // if (oldActiveDate < this._activeDate) {
      //  this.calendarState('right');
      // } else {
      //  this.calendarState('left');
      // }
    }
  }
  private _activeDate: Date;

  /** The currently selected date. */
  @Input()
  get selected(): Date { return this._selected; }
  set selected(value: Date) {
    this._selected = value;
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

  _calendarState: string;

  constructor(private _locale: DateLocale, private _util: DateUtil,
    @Optional() @Inject(MD_DATE_FORMATS) private _dateFormats: MdDateFormats) {
    if (!this._dateFormats) {
      throw Error('MD_DATE_FORMATS');
    }

    this._activeDate = this._util.today();
  }

  ngAfterContentInit() {
    this._init();
  }

  /** Handles when a new month is selected. */
  _monthSelected(month: number) {
    this.selectedChange.emit(this._util.createDate(
      this._util.getYear(this.activeDate), month,
      this._util.getDate(this.activeDate),
      this._util.getHours(this.activeDate),
      this._util.getMinutes(this.activeDate),
      this._util.getSeconds(this.activeDate)));
  }

  /** Initializes this month view. */
  private _init() {
    this._selectedMonth = this._getMonthInCurrentYear(this.selected);
    this._todayMonth = this._getMonthInCurrentYear(this._util.today());
    this._yearLabel = this._locale.getYearName(this.activeDate);

    let monthNames = this._locale.getMonthNames('short');
    // First row of months only contains 5 elements so we can fit the year label on the same row.
    this._months = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11]].map(row => row.map(
      month => this._createCellForMonth(month, monthNames[month])));
  }

  /**
   * Gets the month in this year that the given Date falls on.
   * Returns null if the given Date is in another year.
   */
  private _getMonthInCurrentYear(date: Date) {
    return this._util.isSameYear(date, this.activeDate) ?
      this._util.getMonth(date) : null;
  }

  /** Creates an MdCalendarCell for the given month. */
  private _createCellForMonth(month: number, monthName: string) {
    let ariaLabel = this._locale.format(
      this._util.createDate(this._util.getYear(this.activeDate), month, 1,
        this._util.getHours(this.activeDate),
        this._util.getMinutes(this.activeDate),
        this._util.getSeconds(this.activeDate)),
      this._dateFormats.display.monthYearA11yLabel);
    return new Md2CalendarCell(
      month, monthName.toLocaleUpperCase(), ariaLabel, this._isMonthEnabled(month));
  }

  /** Whether the given month is enabled. */
  private _isMonthEnabled(month: number) {
    if (!this.dateFilter) {
      return true;
    }

    let firstOfMonth = this._util.createDate(
      this._util.getYear(this.activeDate), month, 1,
      this._util.getHours(this.activeDate),
      this._util.getMinutes(this.activeDate),
      this._util.getSeconds(this.activeDate));

    // If any date in the month is enabled count the month as enabled.
    for (let date = firstOfMonth; this._util.getMonth(date) == month;
      date = this._util.addCalendarDays(date, 1)) {
      if (this.dateFilter(date)) {
        return true;
      }
    }

    return false;
  }

  private calendarState(direction: string): void {
    this._calendarState = direction;
  }

  _calendarStateDone() {
    this._calendarState = '';
  }

}
