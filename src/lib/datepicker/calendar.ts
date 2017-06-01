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
import { DateAdapter } from '../core/datetime/index';
import { MD_DATE_FORMATS, MdDateFormats } from '../core/datetime/date-formats';

export class Md2CalendarCell {
  constructor(public value: number,
    public displayValue: string,
    public ariaLabel: string,
    public enabled: boolean) { }
}

const DAYS_PER_WEEK = 7;


/**
 * An internal component used to display a calendar in the datepicker.
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

  @Input()
  get startView() { return this._startView; }
  set startView(value: 'month' | 'year') {
    this._startView = value;
    this._monthView = value != 'year';
    if (value === 'year') {
      this._scrollToSelectedYear();
    }
  }
  private _startView: 'month' | 'year' = 'month';

  /** Whether the calendar is in month view. */
  _monthView: boolean;

  /**
   * The date to display in this calendar (everything other than the month and year is ignored).
   */
  @Input()
  get activeDate(): Date { return this._activeDate; }
  set activeDate(value: Date) {
    let oldActiveDate = this._activeDate;
    this._activeDate = value || this._dateAdapter.today();
    if (!this._hasSameMonthAndYear(oldActiveDate, this._activeDate) && this._monthView !== undefined) {
      this._init();
    }
  }
  private _activeDate: Date;

  get _periodLabel(): string {
    return this._dateAdapter.format(this.activeDate, this._dateFormats.display.monthYearLabel)
      .toLocaleUpperCase();
  }

  /** The currently selected date. */
  @Input()
  get selected(): Date { return this._selected; }
  set selected(value: Date) {
    this._selected = value;
    this._selectedDate = this._getDateInCurrentMonth(this.selected);
  }
  private _selected: Date;

  /** The minimum selectable date. */
  @Input() minDate: Date;

  /** The maximum selectable date. */
  @Input() maxDate: Date;

  /** A function used to filter which dates are selectable. */
  @Input() dateFilter: (date: Date) => boolean;

  /** Emits when a new date is selected. */
  @Output() selectedChange = new EventEmitter<Date>();

  /** The label for this month (e.g. "January 2017"). */
  _monthLabel: string;

  /** Grid of calendar cells representing the dates of the month. */
  _weeks: Md2CalendarCell[][];

  _years: Array<number> = [];

  /** The number of blank cells in the first row before the 1st of the month. */
  _firstWeekOffset: number;

  /**
   * The date of the month that the currently selected Date falls on.
   * Null if the currently selected Date is in another month.
   */
  _selectedDate: number;

  /** The date of the month that today falls on. Null if today is in another month. */
  _todayDate: number;

  /** The names of the weekdays. */
  _weekdays: { long: string, narrow: string }[];

  constructor( @Optional() public _dateAdapter: DateAdapter<Date>,
    @Optional() @Inject(MD_DATE_FORMATS) private _dateFormats: MdDateFormats) {
    if (!this._dateAdapter) {
      throw Error('DateAdapter');
    }
    if (!this._dateFormats) {
      throw Error('MD_DATE_FORMATS');
    }

    const firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
    const narrowWeekdays = this._dateAdapter.getDayOfWeekNames('narrow');
    const longWeekdays = this._dateAdapter.getDayOfWeekNames('long');

    // Rotate the labels for days of the week based on the configured first day of the week.
    let weekdays = longWeekdays.map((long, i) => {
      return { long, narrow: narrowWeekdays[i] };
    });
    this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));

    this.activeDate = this._dateAdapter.today();
  }

  ngAfterContentInit(): void {
    this._monthView = this.startView != 'year';
    this._init();
  }

  /** Handles when a new date is selected. */
  _dateSelected(cell: Md2CalendarCell) {
    if (!cell.enabled) { return; }
    if (this._selectedDate == cell.value) {
      return;
    }
    this.selectedChange.emit(this._dateAdapter.createDate(
      this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate),
      cell.value));
  }

  /** Handles month selection in the year view. */
  _yearSelected(year: number): void {
    this.selectedChange.emit(new Date(year, this.activeDate.getMonth(), this.activeDate.getDate(),
      this.activeDate.getHours(), this.activeDate.getMinutes()));
  }

  /** Handles user clicks on the previous button. */
  _previousClicked(): void {
    this.activeDate = this._dateAdapter.addCalendarMonths(this.activeDate, -1);
  }

  /** Handles user clicks on the next button. */
  _nextClicked(): void {
    this.activeDate = this._dateAdapter.addCalendarMonths(this.activeDate, 1);
  }

  /** Whether the previous period button is enabled. */
  _previousEnabled(): boolean {
    if (!this.minDate) {
      return true;
    }
    return !this.minDate || !this._hasSameMonthAndYear(this.activeDate, this.minDate);
  }

  /** Whether the next period button is enabled. */
  _nextEnabled(): boolean {
    return !this.maxDate || !this._hasSameMonthAndYear(this.activeDate, this.maxDate);
  }

  /** The number of blank cells to put at the beginning for the first row. */
  get _firstRowOffset(): number {
    return this._weeks && this._weeks.length && this._weeks[0].length ?
      DAYS_PER_WEEK - this._weeks[0].length : 0;
  }

  _isActiveCell(rowIndex: number, colIndex: number): boolean {
    let cellNumber = rowIndex * DAYS_PER_WEEK + colIndex;

    // Account for the fact that the first row may not have as many cells.
    if (rowIndex) {
      cellNumber -= this._firstRowOffset;
    }

    return cellNumber == this._dateAdapter.getDate(this.activeDate) - 1;
  }

  /** Initializes this month view. */
  private _init() {
    this._selectedDate = this._getDateInCurrentMonth(this.selected);
    this._todayDate = this._getDateInCurrentMonth(this._dateAdapter.today());
    this._monthLabel =
      this._dateAdapter.getMonthNames('short')[this._dateAdapter.getMonth(this.activeDate)]
        .toLocaleUpperCase();

    let firstOfMonth = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),
      this._dateAdapter.getMonth(this.activeDate), 1);
    this._firstWeekOffset =
      (DAYS_PER_WEEK + this._dateAdapter.getDayOfWeek(firstOfMonth) -
        this._dateAdapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;

    this._createWeekCells();
    this._createYears();
  }

  /** Creates Md2CalendarCells for the dates in this month. */
  private _createWeekCells() {
    let daysInMonth = this._dateAdapter.getNumDaysInMonth(this.activeDate);
    let dateNames = this._dateAdapter.getDateNames();
    this._weeks = [[]];
    for (let i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++ , cell++) {
      if (cell == DAYS_PER_WEEK) {
        this._weeks.push([]);
        cell = 0;
      }
      let date = this._dateAdapter.createDate(
        this._dateAdapter.getYear(this.activeDate),
        this._dateAdapter.getMonth(this.activeDate), i + 1);
      let enabled = !this.dateFilter ||
        this.dateFilter(date);
      let ariaLabel = this._dateAdapter.format(date, this._dateFormats.display.dateA11yLabel);
      this._weeks[this._weeks.length - 1]
        .push(new Md2CalendarCell(i + 1, dateNames[i], ariaLabel, enabled));
    }
  }

  private _createYears() {
    let startYear = this.minDate ? this.minDate.getFullYear() : 1900,
      endYear = this.maxDate ? this.maxDate.getFullYear() : this._dateAdapter.today().getFullYear() + 100;
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
   * Gets the date in this month that the given Date falls on.
   * Returns null if the given Date is in another month.
   */
  private _getDateInCurrentMonth(date: Date): number {
    return this._hasSameMonthAndYear(date, this.activeDate) ?
      this._dateAdapter.getDate(date) : null;
  }

  /** Checks whether the 2 dates are non-null and fall within the same month of the same year. */
  private _hasSameMonthAndYear(d1: Date, d2: Date): boolean {
    return !!(d1 && d2 && this._dateAdapter.getMonth(d1) == this._dateAdapter.getMonth(d2) &&
      this._dateAdapter.getYear(d1) == this._dateAdapter.getYear(d2));
  }
}
