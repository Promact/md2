import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Input,
  AfterContentInit,
  Output,
  EventEmitter
} from '@angular/core';
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
    this._activeYear = this._getYearInCurrentDate(this._activeDate);
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
    this._selectedYear = this._getYearInCurrentDate(this.selected);
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

  /** Emits when a new month is selected. */
  @Output() selectedChange = new EventEmitter<Date>();

  /** Grid of calendar cells representing the months of the year. */
  _years: Array<number>;

  /**
   * The month in this year that the selected Date falls on.
   * Null if the selected Date is in a different year.
   */
  _selectedYear: number;
  _activeYear: number;

  constructor(private _element: ElementRef,
    private _locale: DateLocale, private _util: DateUtil) { }

  ngAfterContentInit() {
    this._init();
  }

  /** Handles when a new month is selected. */
  _yearSelected(year: number) {
    this.selectedChange.emit(new Date(year, this.activeDate.getMonth(), this._activeDate.getDate(),
      this.activeDate.getHours(), this.activeDate.getMinutes(), this.activeDate.getSeconds()));
  }

  /** Initializes this month view. */
  private _init() {
    this._selectedYear = this._getYearInCurrentDate(this.selected);
    this._createYears();
  }

  /** Create years. */
  private _createYears() {
    let startYear = this._minDate ? this._minDate.getFullYear() : 1900;
    let endYear = this._maxDate ? this._maxDate.getFullYear() :
      this._util.today().getFullYear() + 100;
    this._years = [];
    for (let i = startYear; i <= endYear; i++) {
      this._years.push(i);
    }
    this._setScrollTop();
  }

  /** Set Scroll of the years container. */
  private _setScrollTop(): void {
    setTimeout(() => {
      const scrollContainer =
        this._element.nativeElement;
      const selectedIndex = (this._selectedYear ? this._selectedYear : this._activeYear) - 1900;
      scrollContainer.scrollTop = 20 + (selectedIndex * 40) - (scrollContainer.clientHeight / 2);
    }, 10);
  }

  /**
   * Gets the month in this year that the given Date falls on.
   * Returns null if the given Date is in another year.
   */
  private _getYearInCurrentDate(date: Date) {
    return date ? date.getFullYear() : null;
  }
}
