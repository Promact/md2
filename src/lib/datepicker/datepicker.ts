import {
  AfterContentInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  Output,
  Optional,
  EventEmitter,
  Renderer,
  Self,
  ViewEncapsulation,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Md2DateUtil } from './dateUtil';
import { DateLocale } from './date-locale';
import {
  OverlayModule,
} from '../core';
import { transformPlaceholder, transformPanel, fadeInContent } from '../select/select-animations';

import {
  coerceBooleanProperty,
  ENTER,
  SPACE,
  TAB,
  ESCAPE,
  HOME,
  END,
  PAGE_UP,
  PAGE_DOWN,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
  DOWN_ARROW
} from '../core/core';

export interface IDay {
  year: number;
  month: string;
  date: string;
  day: string;
  hour: string;
  minute: string;
}

export interface IDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export interface IWeek {
  dateObj: IDate;
  date: Date;
  calMonth: number;
  today: boolean;
  disabled: boolean;
}

let nextId = 0;

@Component({
  moduleId: module.id,
  selector: 'md2-datepicker',
  templateUrl: 'datepicker.html',
  styleUrls: ['datepicker.css'],
  host: {
    'role': 'datepicker',
    '[id]': 'id',
    '[class.md2-datepicker-disabled]': 'disabled',
    '[attr.tabindex]': 'disabled ? -1 : tabindex',
    '[attr.aria-label]': 'placeholder',
    '[attr.aria-required]': 'required.toString()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-invalid]': '_control?.invalid || "false"',
    '(keydown)': '_handleKeydown($event)',
    '(blur)': '_onBlur()'
  },
  animations: [
    transformPlaceholder,
    transformPanel,
    fadeInContent
  ],
  encapsulation: ViewEncapsulation.None
})
export class Md2Datepicker implements AfterContentInit, ControlValueAccessor {

  private _panelOpen = false;
  private _selected: Date = null;

  _transformOrigin: string = 'top';
  _panelDoneAnimating: boolean = false;

  _positions = [
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom',
    },
  ];

  constructor(private _element: ElementRef, private _renderer: Renderer,
    private _dateUtil: Md2DateUtil, private _locale: DateLocale,
    @Self() @Optional() public _control: NgControl) {
    if (this._control) {
      this._control.valueAccessor = this;
    }

    this._weekDays = _locale.days;

    this.getYears();
    this.generateClock();
    // this.mouseMoveListener = (event: MouseEvent) => { this.onMouseMoveClock(event); };
    // this.mouseUpListener = (event: MouseEvent) => { this.onMouseUpClock(event); };
  }

  ngAfterContentInit() {
    this._isInitialized = true;
    this._isCalendarVisible = this.type !== 'time' ? true : false;
  }

  @Input()
  get selected() { return this._selected; }
  set selected(value: Date) { this._selected = value; }

  get panelOpen(): boolean {
    return this._panelOpen;
  }

  toggle(): void {
    this.panelOpen ? this.close() : this.open();
  }

  /** Opens the overlay panel. */
  open(): void {
    if (this.disabled) { return; }
    this._panelOpen = true;
    this._showDatepicker();
  }

  /** Closes the overlay panel and focuses the host element. */
  close(): void {
    this._panelOpen = false;
    //if (!this._value) {
    //  this._placeholderState = '';
    //}
    this._focusHost();
  }

  _onPanelDone(): void {
    if (this.panelOpen) {
      //this._focusCorrectOption();
      //this.onOpen.emit();
    } else {
      //this.onClose.emit();
    }
  }

  _onFadeInDone(): void {
    this._panelDoneAnimating = this.panelOpen;
  }

  private _focusHost(): void {
    this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
  }

  // private mouseMoveListener: any;
  // private mouseUpListener: any;

  private _value: Date = null;
  private _readonly: boolean = false;
  private _required: boolean = false;
  private _disabled: boolean = false;
  private _isInitialized: boolean = false;

  _onChange = (value: any) => { };
  _onTouched = () => { };

  _isYearsVisible: boolean;
  _isCalendarVisible: boolean;
  _isHoursVisible: boolean = true;

  _weekDays: Array<any>;

  _hours: Array<Object> = [];
  _minutes: Array<Object> = [];

  _prevMonth: number = 1;
  _currMonth: number = 2;
  _nextMonth: number = 3;

  _years: Array<number> = [];
  _dates: Array<Object> = [];
  private today: Date = new Date();
  private _displayDate: Date = null;
  _viewDay: IDay = { year: 0, month: '', date: '', day: '', hour: '', minute: '' };
  _viewValue: string = '';

  _clock: any = {
    dialRadius: 120,
    outerRadius: 99,
    innerRadius: 66,
    tickRadius: 17,
    hand: { x: 0, y: 0 },
    x: 0, y: 0,
    dx: 0, dy: 0,
    moved: false
  };

  private _min: Date = null;
  private _max: Date = null;

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  @Input() type: 'date' | 'time' | 'datetime' = 'date';
  @Input() name: string = '';
  @Input() id: string = 'md2-datepicker-' + (++nextId);
  @Input() placeholder: string;
  @Input() format: string = this.type === 'date' ?
    'DD/MM/YYYY' : this.type === 'time' ? 'HH:mm' : this.type === 'datetime' ?
      'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY';
  @Input() tabindex: number = 0;

  @Input()
  get readonly(): boolean { return this._readonly; }
  set readonly(value) { this._readonly = coerceBooleanProperty(value); }

  @Input()
  get required(): boolean { return this._required; }
  set required(value) { this._required = coerceBooleanProperty(value); }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value) { this._disabled = coerceBooleanProperty(value); }

  @Input() set min(value: Date) {
    if (value && this._dateUtil.isValidDate(value)) {
      this._min = new Date(value);
      this._min.setHours(0, 0, 0, 0);
      this.getYears();
    } else { this._min = null; }
  }
  @Input() set max(value: Date) {
    if (value && this._dateUtil.isValidDate(value)) {
      this._max = new Date(value);
      this._max.setHours(0, 0, 0, 0);
      this.getYears();
    } else { this._max = null; }
  }

  @Input()
  get value(): any { return this._value; }
  set value(value: any) {
    if (value && value !== this._value) {
      if (this._dateUtil.isValidDate(value)) {
        this._value = value;
      } else {
        if (this.type === 'time') {
          this._value = new Date('1-1-1 ' + value);
        } else {
          this._value = new Date(value);
        }
      }
      this._viewValue = this._formatDate(this._value);
      let date = '';
      if (this.type !== 'time') {
        date += this._value.getFullYear() + '-' + (this._value.getMonth() + 1) +
          '-' + this._value.getDate();
      }
      if (this.type === 'datetime') {
        date += ' ';
      }
      if (this.type !== 'date') {
        date += this._value.getHours() + ':' + this._value.getMinutes();
      }
      if (this._isInitialized) {
        if (this._control) {
          this._onChange(date);
        }
        this.change.emit(date);
      }
    }
  }

  get displayDate(): Date {
    if (this._displayDate && this._dateUtil.isValidDate(this._displayDate)) {
      return this._displayDate;
    } else {
      return this.today;
    }
  }
  set displayDate(date: Date) {
    if (date && this._dateUtil.isValidDate(date)) {
      if (this._min && this._min > date) {
        date = this._min;
      }
      if (this._max && this._max < date) {
        date = this._max;
      }
      this._displayDate = date;
      this._viewDay = {
        year: date.getFullYear(),
        month: this._locale.months[date.getMonth()].full,
        date: this._prependZero(date.getDate() + ''),
        day: this._locale.days[date.getDay()].full,
        hour: this._prependZero(date.getHours() + ''),
        minute: this._prependZero(date.getMinutes() + '')
      };
    }
  }

  @HostListener('click', ['$event'])
  _handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
  }

  _handleKeydown(event: KeyboardEvent) {
    if (this.disabled) { return; }

    if (this.panelOpen) {
      event.preventDefault();
      event.stopPropagation();

      switch (event.keyCode) {
        case TAB:
        case ESCAPE: this._onBlur(); this.close(); break;
      }
      let displayDate = this.displayDate;
      if (this._isYearsVisible) {
        switch (event.keyCode) {
          case ENTER:
          case SPACE: this._onClickOk(); break;

          case DOWN_ARROW:
            if (this.displayDate.getFullYear() < (this.today.getFullYear() + 100)) {
              this.displayDate = this._dateUtil.incrementYears(displayDate, 1);
              this._scrollToSelectedYear();
            }
            break;
          case UP_ARROW:
            if (this.displayDate.getFullYear() > 1900) {
              this.displayDate = this._dateUtil.incrementYears(displayDate, -1);
              this._scrollToSelectedYear();
            }
            break;
        }

      } else if (this._isCalendarVisible) {
        switch (event.keyCode) {
          case ENTER:
          case SPACE: this.setDate(this.displayDate); break;

          case RIGHT_ARROW:
            this.displayDate = this._dateUtil.incrementDays(displayDate, 1);
            break;
          case LEFT_ARROW:
            this.displayDate = this._dateUtil.incrementDays(displayDate, -1);
            break;

          case PAGE_DOWN:
            if (event.shiftKey) {
              this.displayDate = this._dateUtil.incrementYears(displayDate, 1);
            } else {
              this.displayDate = this._dateUtil.incrementMonths(displayDate, 1);
            }
            break;
          case PAGE_UP:
            if (event.shiftKey) {
              this.displayDate = this._dateUtil.incrementYears(displayDate, -1);
            } else {
              this.displayDate = this._dateUtil.incrementMonths(displayDate, -1);
            }
            break;

          case DOWN_ARROW:
            this.displayDate = this._dateUtil.incrementDays(displayDate, 7);
            break;
          case UP_ARROW:
            this.displayDate = this._dateUtil.incrementDays(displayDate, -7);
            break;

          case HOME:
            this.displayDate = this._dateUtil.getFirstDateOfMonth(displayDate);
            break;
          case END:
            this.displayDate = this._dateUtil.getLastDateOfMonth(displayDate);
            break;
        }
        if (!this._dateUtil.isSameMonthAndYear(displayDate, this.displayDate)) {
          this.generateCalendar();
        }
      } else if (this._isHoursVisible) {
        switch (event.keyCode) {
          case ENTER:
          case SPACE: this.setHour(this.displayDate.getHours()); break;

          case UP_ARROW:
            this.displayDate = this._dateUtil.incrementHours(displayDate, 1); this._resetClock();
            break;
          case DOWN_ARROW:
            this.displayDate = this._dateUtil.incrementHours(displayDate, -1); this._resetClock();
            break;
        }
      } else {
        switch (event.keyCode) {
          case ENTER:
          case SPACE:
            this.setMinute(this.displayDate.getMinutes());
            break;

          case UP_ARROW:
            this.displayDate = this._dateUtil.incrementMinutes(displayDate, 1); this._resetClock();
            break;
          case DOWN_ARROW:
            this.displayDate = this._dateUtil.incrementMinutes(displayDate, -1); this._resetClock();
            break;
        }
      }
    } else {
      switch (event.keyCode) {
        case ENTER:
        case SPACE:
          event.preventDefault();
          event.stopPropagation();
          this._showDatepicker();
          break;
      }
    }
  }

  _onBlur() {
    if (!this.panelOpen) {
      this._onTouched();
    }
    //this._isYearsVisible = false;
    //this._isCalendarVisible = this.type !== 'time' ? true : false;
    //this._isHoursVisible = true;
    //this._onTouched();
  }


  /**
   * Display Years
   */
  _showYear() {
    this._isYearsVisible = true;
    this._isCalendarVisible = true;
    this._scrollToSelectedYear();
  }

  private getYears() {
    let startYear = this._min ? this._min.getFullYear() : 1900,
      endYear = this._max ? this._max.getFullYear() : this.today.getFullYear() + 100;
    this._years = [];
    for (let i = startYear; i <= endYear; i++) {
      this._years.push(i);
    }
  }

  private _scrollToSelectedYear() {
    setTimeout(() => {
      let yearContainer = this._element.nativeElement.querySelector('.md2-calendar-years'),
        selectedYear = this._element.nativeElement.querySelector('.md2-calendar-year.selected');
      yearContainer.scrollTop = (selectedYear.offsetTop + 20) - yearContainer.clientHeight / 2;
    }, 0);
  }

  /**
   * select year
   * @param year
   */
  _setYear(year: number) {
    let date = this.displayDate;
    this.displayDate = new Date(year, date.getMonth(), date.getDate(),
      date.getHours(), date.getMinutes());
    this.generateCalendar();
    this._isYearsVisible = false;
  }

  /**
   * Display Datepicker
   */
  _showDatepicker() {
    if (this.disabled || this.readonly) { return; }
    this.selected = this.value || new Date(1, 0, 1);
    this.displayDate = this.value || this.today;
    this.generateCalendar();
    this._resetClock();
    this._element.nativeElement.focus();
  }

  /**
   * Display Calendar
   */
  _showCalendar() {
    this._isYearsVisible = false;
    this._isCalendarVisible = true;
  }

  /**
   * Toggle Hour visiblity
   */
  _toggleHours(value: boolean) {
    this._isYearsVisible = false;
    this._isCalendarVisible = false;
    this._isYearsVisible = false;
    this._isHoursVisible = value;
    this._resetClock();
  }

  /**
   * Ok Button Event
   */
  _onClickOk() {
    if (this._isYearsVisible) {
      this.generateCalendar();
      this._isYearsVisible = false;
      this._isCalendarVisible = true;
    } else if (this._isCalendarVisible) {
      this.setDate(this.displayDate);
    } else if (this._isHoursVisible) {
      this._isHoursVisible = false;
      this._resetClock();
    } else {
      this.value = this.displayDate;
      this._onBlur();
      this.close();
    }
  }

  /**
   * Date Selection Event
   * @param event Event Object
   * @param date Date Object
   */
  _onClickDate(event: Event, date: any) {
    event.preventDefault();
    event.stopPropagation();
    if (date.disabled) { return; }
    if (date.calMonth === this._prevMonth) {
      this._updateMonth(-1);
    } else if (date.calMonth === this._currMonth) {
      this.setDate(new Date(date.dateObj.year, date.dateObj.month,
        date.dateObj.day, this.displayDate.getHours(), this.displayDate.getMinutes()));
    } else if (date.calMonth === this._nextMonth) {
      this._updateMonth(1);
    }
  }

  /**
   * Set Date
   * @param date Date Object
   */
  private setDate(date: Date) {
    if (this.type === 'date') {
      this.value = date;
      this._onBlur();
      this.close();
    } else {
      this.selected = date;
      this.displayDate = date;
      this._isCalendarVisible = false;
      this._isHoursVisible = true;
      this._resetClock();
    }
  }

  /**
   * Update Month
   * @param noOfMonths increment number of months
   */
  _updateMonth(noOfMonths: number) {
    this.displayDate = this._dateUtil.incrementMonths(this.displayDate, noOfMonths);
    this.generateCalendar();
  }

  /**
   * Check is Before month enabled or not
   * @return boolean
   */
  _isBeforeMonth() {
    return !this._min ? true :
      this._min && this._dateUtil.getMonthDistance(this.displayDate, this._min) < 0;
  }

  /**
   * Check is After month enabled or not
   * @return boolean
   */
  _isAfterMonth() {
    return !this._max ? true :
      this._max && this._dateUtil.getMonthDistance(this.displayDate, this._max) > 0;
  }

  /**
   * Check the date is enabled or not
   * @param date Date Object
   * @return boolean
   */
  private _isDisabledDate(date: Date): boolean {
    if (this._min && this._max) {
      return (this._min > date) || (this._max < date);
    } else if (this._min) {
      return (this._min > date);
    } else if (this._max) {
      return (this._max < date);
    } else {
      return false;
    }

    // if (this.disableWeekends) {
    //   let dayNbr = this.getDayNumber(date);
    //   if (dayNbr === 0 || dayNbr === 6) {
    //     return true;
    //   }
    // }
    // return false;
  }

  /**
   * Generate Month Calendar
   */
  private generateCalendar(): void {
    let year = this.displayDate.getFullYear();
    let month = this.displayDate.getMonth();

    this._dates.length = 0;

    let firstDayOfMonth = this._dateUtil.getFirstDateOfMonth(this.displayDate);
    let numberOfDaysInMonth = this._dateUtil.getNumberOfDaysInMonth(this.displayDate);
    let numberOfDaysInPrevMonth = this._dateUtil.getNumberOfDaysInMonth(
      this._dateUtil.incrementMonths(this.displayDate, -1));

    let dayNbr = 1;
    let calMonth = this._prevMonth;
    for (let i = 1; i < 7; i++) {
      let week: IWeek[] = [];
      if (i === 1) {
        let prevMonth = numberOfDaysInPrevMonth - firstDayOfMonth.getDay() + 1;
        for (let j = prevMonth; j <= numberOfDaysInPrevMonth; j++) {
          let iDate: IDate = { year: year, month: month - 1, day: j, hour: 0, minute: 0 };
          let date: Date = new Date(year, month - 1, j);
          week.push({
            date: date,
            dateObj: iDate,
            calMonth: calMonth,
            today: this._dateUtil.isSameDay(this.today, date),
            disabled: this._isDisabledDate(date)
          });
        }

        calMonth = this._currMonth;
        let daysLeft = 7 - week.length;
        for (let j = 0; j < daysLeft; j++) {
          let iDate: IDate = { year: year, month: month, day: dayNbr, hour: 0, minute: 0 };
          let date: Date = new Date(year, month, dayNbr);
          week.push({
            date: date,
            dateObj: iDate,
            calMonth: calMonth,
            today: this._dateUtil.isSameDay(this.today, date),
            disabled: this._isDisabledDate(date)
          });
          dayNbr++;
        }
      } else {
        for (let j = 1; j < 8; j++) {
          if (dayNbr > numberOfDaysInMonth) {
            dayNbr = 1;
            calMonth = this._nextMonth;
          }
          let iDate: IDate = {
            year: year,
            month: calMonth === this._currMonth ? month : month + 1,
            day: dayNbr, hour: 0, minute: 0
          };
          let date: Date = new Date(year, iDate.month, dayNbr);
          week.push({
            date: date,
            dateObj: iDate,
            calMonth: calMonth,
            today: this._dateUtil.isSameDay(this.today, date),
            disabled: this._isDisabledDate(date)
          });
          dayNbr++;
        }
      }
      this._dates.push(week);
    }
  }

  /**
   * Select Hour
   * @param event Event Object
   * @param hour number of hours
   */
  _onClickHour(event: Event, hour: number) {
    event.preventDefault();
    event.stopPropagation();
    this.setHour(hour);
  }

  /**
   * Select Minute
   * @param event Event Object
   * @param minute number of minutes
   */
  _onClickMinute(event: Event, minute: number) {
    event.preventDefault();
    event.stopPropagation();
    this.setMinute(minute);
  }

  /**
   * Set hours
   * @param hour number of hours
   */
  private setHour(hour: number) {
    let date = this.displayDate;
    this._isHoursVisible = false;
    this.displayDate = new Date(date.getFullYear(), date.getMonth(),
      date.getDate(), hour, date.getMinutes());
    this._resetClock();
  }

  /**
   * Set minutes
   * @param minute number of minutes
   */
  private setMinute(minute: number) {
    let date = this.displayDate;
    this.displayDate = new Date(date.getFullYear(), date.getMonth(),
      date.getDate(), date.getHours(), minute);
    this.selected = this.displayDate;
    this.value = this.displayDate;
    this._onBlur();
    this.close();
  }

  // private onMouseDownClock(event: MouseEvent) {
  //  document.addEventListener('mousemove', this.mouseMoveListener);
  //  document.addEventListener('mouseup', this.mouseUpListener);



  //  // let offset = this.offset(event.currentTarget)
  //  // this._clock.x = offset.left + this._clock.dialRadius;
  //  // this._clock.y = offset.top + this._clock.dialRadius;
  //  // this._clock.dx = event.pageX - this._clock.x;
  //  // this._clock.dy = event.pageY - this._clock.y;
  //  // let z = Math.sqrt(this._clock.dx * this._clock.dx + this._clock.dy * this._clock.dy);
  //  // if (z < this._clock.outerRadius - this._clock.tickRadius || z > this._clock.outerRadius
  //  //  + this._clock.tickRadius) { return; }
  //  // event.preventDefault();
  //  // this.setClockHand(this._clock.dx, this._clock.dy);

  //  // // this.onMouseMoveClock = this.onMouseMoveClock.bind(this);
  //  // // this.onMouseUpClock = this.onMouseUpClock.bind(this);
  //  // document.addEventListener('mousemove', this.onMouseMoveClock);
  //  // document.addEventListener('mouseup', this.onMouseUpClock);
  // }

  // onMouseMoveClock(event: MouseEvent) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   let x = event.pageX - this._clock.x,
  //     y = event.pageY - this._clock.y;
  //   this._clock.moved = true;
  //   this._setClockHand(x, y);// , false, true
  //   // if (!moved && x === dx && y === dy) {
  //   //   // Clicking in chrome on windows will trigger a mousemove event
  //   //   return;
  //   // }
  // }

  // onMouseUpClock(event: MouseEvent) {
  //   event.preventDefault();
  //   document.removeEventListener('mousemove', this.mouseMoveListener);
  //   document.removeEventListener('mouseup', this.mouseUpListener);
  //   // let space = false;

  //   let x = event.pageX - this._clock.x,
  //     y = event.pageY - this._clock.y;
  //   if ((space || this._clockEvent.moved) && x === this._clockEvent.dx && 
  //    y === this._clockEvent.dy) {
  //     this.setClockHand(x, y);
  //   }
  //   // if (this._isHoursVisible) {
  //   //   // self.toggleView('minutes', duration / 2);
  //   // } else {
  //   //   // if (options.autoclose) {
  //   //   //   self.minutesView.addClass('clockpicker-dial-out');
  //   //   //   setTimeout(function () {
  //   //   //     self.done();
  //   //   //   }, duration / 2);
  //   //   // }
  //   // }

  //   if ((space || moved) && x === dx && y === dy) {
  //     self.setHand(x, y);
  //   }
  //   if (self.currentView === 'hours') {
  //     self.toggleView('minutes', duration / 2);
  //   } else {
  //     if (options.autoclose) {
  //       self.minutesView.addClass('clockpicker-dial-out');
  //       setTimeout(function () {
  //         self.done();
  //       }, duration / 2);
  //     }
  //   }
  //   plate.prepend(canvas);

  //   // Reset cursor style of body
  //   clearTimeout(movingTimer);
  //   $body.removeClass('clockpicker-moving');

  // }

  /**
   * reser clock hands
   */
  private _resetClock() {
    let hour = this.displayDate.getHours();
    let minute = this.displayDate.getMinutes();

    let value = this._isHoursVisible ? hour : minute,
      unit = Math.PI / (this._isHoursVisible ? 6 : 30),
      radian = value * unit,
      radius = this._isHoursVisible && value > 0 && value < 13 ?
        this._clock.innerRadius : this._clock.outerRadius,
      x = Math.sin(radian) * radius,
      y = - Math.cos(radian) * radius;
    this._setClockHand(x, y);
  }

  /**
   * set clock hand
   * @param x number of x position
   * @param y number of y position
   */
  private _setClockHand(x: number, y: number) {
    let radian = Math.atan2(x, y),
      unit = Math.PI / (this._isHoursVisible ? 6 : 30),
      z = Math.sqrt(x * x + y * y),
      inner = this._isHoursVisible && z < (this._clock.outerRadius + this._clock.innerRadius) / 2,
      radius = inner ? this._clock.innerRadius : this._clock.outerRadius,
      value = 0;

    if (radian < 0) { radian = Math.PI * 2 + radian; }
    value = Math.round(radian / unit);
    radian = value * unit;
    if (this._isHoursVisible) {
      if (value === 12) { value = 0; }
      value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
    } else {
      if (value === 60) { value = 0; }
    }

    this._clock.hand = {
      x: Math.sin(radian) * radius,
      y: Math.cos(radian) * radius
    };
  }

  /**
   * render Click
   */
  private generateClock() {
    this._hours.length = 0;

    for (let i = 0; i < 24; i++) {
      let radian = i / 6 * Math.PI;
      let inner = i > 0 && i < 13,
        radius = inner ? this._clock.innerRadius : this._clock.outerRadius;
      this._hours.push({
        hour: i === 0 ? '00' : i,
        top: this._clock.dialRadius - Math.cos(radian) * radius - this._clock.tickRadius,
        left: this._clock.dialRadius + Math.sin(radian) * radius - this._clock.tickRadius
      });
    }

    for (let i = 0; i < 60; i += 5) {
      let radian = i / 30 * Math.PI;
      this._minutes.push({
        minute: i === 0 ? '00' : i,
        top: this._clock.dialRadius - Math.cos(radian) * this._clock.outerRadius -
        this._clock.tickRadius,
        left: this._clock.dialRadius + Math.sin(radian) * this._clock.outerRadius -
        this._clock.tickRadius
      });
    }
  }

  /**
   * format date
   * @param date Date Object
   * @return string with formatted date
   */
  private _formatDate(date: Date): string {
    return this.format
      .replace('YYYY', date.getFullYear() + '')
      .replace('MM', this._prependZero((date.getMonth() + 1) + ''))
      .replace('DD', this._prependZero(date.getDate() + ''))
      .replace('HH', this._prependZero(date.getHours() + ''))
      .replace('mm', this._prependZero(date.getMinutes() + ''))
      .replace('ss', this._prependZero(date.getSeconds() + ''));
  }

  /**
   * Prepend Zero
   * @param value String value
   * @return string with prepend Zero
   */
  private _prependZero(value: string): string {
    return parseInt(value) < 10 ? '0' + value : value;
  }

  /**
   * Get Offset
   * @param element HtmlElement
   * @return top, left offset from page
   */
  private _offset(element: any) {
    let top = 0, left = 0;
    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);

    return {
      top: top,
      left: left
    };
  }

  writeValue(value: any): void {
    if (value && value !== this._value) {
      if (this._dateUtil.isValidDate(value)) {
        this._value = value;
      } else {
        if (this.type === 'time') {
          this._value = new Date('1-1-1 ' + value);
        } else {
          this._value = new Date(value);
        }
      }
      this._viewValue = this._formatDate(this._value);
      let date = '';
      if (this.type !== 'time') {
        date += this._value.getFullYear() + '-' + (this._value.getMonth() + 1) +
          '-' + this._value.getDate();
      }
      if (this.type === 'datetime') {
        date += ' ';
      }
      if (this.type !== 'date') {
        date += this._value.getHours() + ':' + this._value.getMinutes();
      }
    } else {
      this._value = null;
      this._viewValue = null;
    }
  }

  registerOnChange(fn: (value: any) => void): void { this._onChange = fn; }

  registerOnTouched(fn: () => {}): void { this._onTouched = fn; }


  ///**
  // * Calculates the y-offset of the select's overlay panel in relation to the
  // * top start corner of the trigger. It has to be adjusted in order for the
  // * selected option to be aligned over the trigger when the panel opens.
  // */
  //private _calculateOverlayOffset(selectedIndex: number, scrollBuffer: number,
  //  maxScroll: number): number {
  //  let optionOffsetFromPanelTop: number;

  //  if (this._scrollTop === 0) {
  //    optionOffsetFromPanelTop = selectedIndex * SELECT_OPTION_HEIGHT;
  //  } else if (this._scrollTop === maxScroll) {
  //    const firstDisplayedIndex = this.options.length - SELECT_MAX_OPTIONS_DISPLAYED;
  //    const selectedDisplayIndex = selectedIndex - firstDisplayedIndex;

  //    // Because the panel height is longer than the height of the options alone,
  //    // there is always extra padding at the top or bottom of the panel. When
  //    // scrolled to the very bottom, this padding is at the top of the panel and
  //    // must be added to the offset.
  //    optionOffsetFromPanelTop =
  //      selectedDisplayIndex * SELECT_OPTION_HEIGHT + SELECT_PANEL_PADDING_Y;
  //  } else {
  //    // If the option was scrolled to the middle of the panel using a scroll buffer,
  //    // its offset will be the scroll buffer minus the half height that was added to
  //    // center it.
  //    optionOffsetFromPanelTop = scrollBuffer - SELECT_OPTION_HEIGHT / 2;
  //  }

  //  // The final offset is the option's offset from the top, adjusted for the height
  //  // difference, multiplied by -1 to ensure that the overlay moves in the correct
  //  // direction up the page.
  //  return optionOffsetFromPanelTop * -1 - SELECT_OPTION_HEIGHT_ADJUSTMENT;
  //}

  ///**
  // * Checks that the attempted overlay position will fit within the viewport.
  // * If it will not fit, tries to adjust the scroll position and the associated
  // * y-offset so the panel can open fully on-screen. If it still won't fit,
  // * sets the offset back to 0 to allow the fallback position to take over.
  // */
  //private _checkOverlayWithinViewport(maxScroll: number): void {
  //  const viewportRect = this._viewportRuler.getViewportRect();
  //  const triggerRect = this._getTriggerRect();

  //  const topSpaceAvailable = triggerRect.top - SELECT_PANEL_VIEWPORT_PADDING;
  //  const bottomSpaceAvailable =
  //    viewportRect.height - triggerRect.bottom - SELECT_PANEL_VIEWPORT_PADDING;

  //  const panelHeightTop = Math.abs(this._offsetY);
  //  const totalPanelHeight =
  //    Math.min(this.options.length * SELECT_OPTION_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
  //  const panelHeightBottom = totalPanelHeight - panelHeightTop - triggerRect.height;

  //  if (panelHeightBottom > bottomSpaceAvailable) {
  //    this._adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
  //  } else if (panelHeightTop > topSpaceAvailable) {
  //    this._adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
  //  } else {
  //    this._transformOrigin = this._getOriginBasedOnOption();
  //  }
  //}

  ///** Adjusts the overlay panel up to fit in the viewport. */
  //private _adjustPanelUp(panelHeightBottom: number, bottomSpaceAvailable: number) {
  //  const distanceBelowViewport = panelHeightBottom - bottomSpaceAvailable;

  //  // Scrolls the panel up by the distance it was extending past the boundary, then
  //  // adjusts the offset by that amount to move the panel up into the viewport.
  //  this._scrollTop -= distanceBelowViewport;
  //  this._offsetY -= distanceBelowViewport;
  //  this._transformOrigin = this._getOriginBasedOnOption();

  //  // If the panel is scrolled to the very top, it won't be able to fit the panel
  //  // by scrolling, so set the offset to 0 to allow the fallback position to take
  //  // effect.
  //  if (this._scrollTop <= 0) {
  //    this._scrollTop = 0;
  //    this._offsetY = 0;
  //    this._transformOrigin = `50% bottom 0px`;
  //  }
  //}

  ///** Adjusts the overlay panel down to fit in the viewport. */
  //private _adjustPanelDown(panelHeightTop: number, topSpaceAvailable: number,
  //  maxScroll: number) {
  //  const distanceAboveViewport = panelHeightTop - topSpaceAvailable;

  //  // Scrolls the panel down by the distance it was extending past the boundary, then
  //  // adjusts the offset by that amount to move the panel down into the viewport.
  //  this._scrollTop += distanceAboveViewport;
  //  this._offsetY += distanceAboveViewport;
  //  this._transformOrigin = this._getOriginBasedOnOption();

  //  // If the panel is scrolled to the very bottom, it won't be able to fit the
  //  // panel by scrolling, so set the offset to 0 to allow the fallback position
  //  // to take effect.
  //  if (this._scrollTop >= maxScroll) {
  //    this._scrollTop = maxScroll;
  //    this._offsetY = 0;
  //    this._transformOrigin = `50% top 0px`;
  //    return;
  //  }
  //}

  ///** Sets the transform origin point based on the selected option. */
  //private _getOriginBasedOnOption(): string {
  //  const originY =
  //    Math.abs(this._offsetY) - SELECT_OPTION_HEIGHT_ADJUSTMENT + SELECT_OPTION_HEIGHT / 2;
  //  return `50% ${originY}px 0px`;
  //}

}

export const MD2_DATEPICKER_DIRECTIVES = [Md2Datepicker];

@NgModule({
  imports: [CommonModule, OverlayModule],
  exports: MD2_DATEPICKER_DIRECTIVES,
  declarations: MD2_DATEPICKER_DIRECTIVES,
})
export class Md2DatepickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2DatepickerModule,
      providers: [Md2DateUtil, DateLocale]
    };
  }
}
