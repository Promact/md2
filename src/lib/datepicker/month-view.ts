import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  AfterContentInit
} from '@angular/core';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';


/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * @docs-private
 */
export class Md2CalendarCell {
  constructor(public value: number, public displayValue: string, public enabled: boolean) { }
}


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

  /** A function used to filter which dates are selectable. */
  @Input() dateFilter: (date: Date) => boolean;

  /** Emits when a new date is selected. */
  @Output() selectedChange = new EventEmitter<Date>();

  /** Handles when a new date is selected. */
  _cellClicked(cell: Md2CalendarCell): void {
    if (!cell.enabled || this._selectedDate == cell.value) {
      return;
    }
    this.selectedChange.emit(new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(),
      cell.value, this.activeDate.getHours(), this.activeDate.getMinutes(),
      this.activeDate.getSeconds()));
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

    return cellNumber == this.activeDate.getDate() - 1;
  }





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

  constructor(private _locale: DateLocale, private _util: DateUtil) {
    this._weekdays = this._locale.narrowDays.slice(this._locale.firstDayOfWeek)
      .concat(this._locale.narrowDays.slice(0, this._locale.firstDayOfWeek));
  }

  ngAfterContentInit(): void {
    this._init();
  }


  /** Initializes this month view. */
  private _init() {
    this._selectedDate = this._getDateInCurrentMonth(this.selected);
    this._todayDate = this._getDateInCurrentMonth(this._util.today());

    let firstOfMonth = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(), 1,
      this.activeDate.getHours(), this.activeDate.getMinutes(), this.activeDate.getSeconds());
    this._firstWeekOffset =
      (DAYS_PER_WEEK + firstOfMonth.getDay() - this._locale.firstDayOfWeek) % DAYS_PER_WEEK;

    this._createWeekCells();
  }

  /** Creates Md2CalendarCells for the dates in this month. */
  private _createWeekCells() {
    let daysInMonth = new Date(this.activeDate.getFullYear(),
      this.activeDate.getMonth() + 1, 0).getDate();
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
