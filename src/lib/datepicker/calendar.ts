import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { DateLocale } from './date-locale';

@Component({
  moduleId: module.id,
  selector: 'md2-calendar',
  templateUrl: 'calendar.html',
  styleUrls: ['calendar.css'],
  host: {
    'role': 'calendar'
  },
  //encapsulation: ViewEncapsulation.None
})
export class Md2Calendar {

  private _selected: Date;
  private _date: Date;

  _days: Array<any> = this._locale.days;

  dates: Array<any> = [];

  _view: boolean = true;

  constructor(private _element: ElementRef, private _locale: DateLocale) {
    this.renderCalendar();
  }

  @Output() selectedChange: EventEmitter<Date> = new EventEmitter<Date>();

  @Input()
  get selected() { return this._selected; }
  set selected(value: Date) {
    if (this._selected !== value) {
      this._selected = value || new Date();
    }
  }

  get date() { return this._date; }
  set date(value: Date) {
    if (this._date !== value) {
      this._date = value || new Date();
    }
  }

  @Input()
  set view(value: string) {
    if (value === 'years') {
      this._view = false;
    } else { this._view = true; }
  }

  /** Emits an event when the user selects a time. */
  _emitChangeEvent(): void {
    this.selectedChange.emit(this.selected);
  }

  /**
   * render Calendar
   */
  private renderCalendar() {
    //let year = this.date.getFullYear();
    //let month = this.date.getMonth();

    //this.dates.length = 0;

    //let firstDayOfMonth = this._locale.getFirstDateOfMonth(this.date);
    //let numberOfDaysInMonth = this._locale.getNumberOfDaysInMonth(this.date);
    //let numberOfDaysInPrevMonth = this._locale.getNumberOfDaysInMonth(
    //  this._locale.incrementMonths(this.date, -1));

    //let dayNbr = 1;
    ////let calMonth = this._prevMonth;
    //if (i === 1) {
    //  let prevMonth = numberOfDaysInPrevMonth - firstDayOfMonth.getDay() + 1;
    //  for (let j = prevMonth; j <= numberOfDaysInPrevMonth; j++) {
    //    let iDate: IDate = { year: year, month: month - 1, day: j, hour: 0, minute: 0 };
    //    let date: Date = new Date(year, month - 1, j);
    //    week.push({
    //      date: date,
    //      dateObj: iDate,
    //      calMonth: calMonth,
    //      today: this._locale.isSameDay(this.today, date),
    //      disabled: this._isDisabledDate(date)
    //    });
    //  }

    //  calMonth = this._currMonth;
    //  let daysLeft = 7 - week.length;
    //  for (let j = 0; j < daysLeft; j++) {
    //    let iDate: IDate = { year: year, month: month, day: dayNbr, hour: 0, minute: 0 };
    //    let date: Date = new Date(year, month, dayNbr);
    //    week.push({
    //      date: date,
    //      dateObj: iDate,
    //      calMonth: calMonth,
    //      today: this._locale.isSameDay(this.today, date),
    //      disabled: this._isDisabledDate(date)
    //    });
    //    dayNbr++;
    //  }
    //} else {
    //  for (let j = 1; j < 8; j++) {
    //    if (dayNbr > numberOfDaysInMonth) {
    //      dayNbr = 1;
    //      calMonth = this._nextMonth;
    //    }
    //    let iDate: IDate = {
    //      year: year,
    //      month: calMonth === this._currMonth ? month : month + 1,
    //      day: dayNbr, hour: 0, minute: 0
    //    };
    //    let date: Date = new Date(year, iDate.month, dayNbr);
    //    week.push({
    //      date: date,
    //      dateObj: iDate,
    //      calMonth: calMonth,
    //      today: this._locale.isSameDay(this.today, date),
    //      disabled: this._isDisabledDate(date)
    //    });
    //    dayNbr++;
    //  }
    //  this.dates.push(week);
    //}
  }

}
