import { Component } from '@angular/core';

@Component({
  selector: 'datepicker-demo',
  templateUrl: '../datepicker/datepicker-demo.html',
  styles: [`
    .inline-control {
      display: inline-block;
      width: 150px;
      margin-right: 16px;
      padding: 16px 0;
    }
  `]
})
export class DatepickerDemo {
  isRequired = false;
  isDisabled = false;
  isOpenOnFocus = false;
  isOpen = false;
  today: Date = new Date();

  private _type: string = 'date';
  set type(val: string) {
    this._type = val;
    this.dateFormat = null;
  }
  get type() {
    return this._type;
  }

  types: Array<any> = [
    { text: 'Date', value: 'date' },
    { text: 'Time', value: 'time' },
    { text: 'Date Time', value: 'datetime' }];

  mode: string = 'auto';
  modes: Array<any> = [
    { text: 'Auto', value: 'auto' },
    { text: 'Portrait', value: 'portrait' },
    { text: 'Landscape', value: 'landscape' }];

  container: string = 'inline';
  containers: Array<any> = [
    { text: 'Inline', value: 'inline' },
    { text: 'Dialog', value: 'dialog' }];

  date: Date;
  minDate: Date;
  maxDate: Date;
  startAt: Date;
  enableDates: Array<Date> = [
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 7),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 5),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 7),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 8)
  ];
  disableDates: Array<Date> = [
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 2),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 2),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 5),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 9)
  ];
  disableWeekDays: Array<number> = [0, 6];

  dateFormat: string = null;
  dateFormatsDateTime: Array<any> = [
    { name: 'US:', value: 'M/d/y H:mm A' },
    { name: 'England:', value: 'dd/MM/y H:mm A' },
    { name: 'Poland:', value: 'd.MM.y HH:mm' },
    { name: 'Germany:', value: 'd.M.y HH:mm' },
    { name: 'France:', value: 'd/MM/y HH:mm' },
    { name: 'ISO 8601', value: 'y-MM-dd HH:mm' }
  ];
  dateFormatsDate: Array<any> = [
    { name: 'US:', value: 'M/d/y' },
    { name: 'England:', value: 'dd/MM/y' },
    { name: 'Poland:', value: 'd.MM.y' },
    { name: 'Germany:', value: 'd.M.y' },
    { name: 'France:', value: 'd/MM/y' },
    { name: 'ISO 8601', value: 'y-MM-dd' }
  ];
  dateFormatsTime: Array<any> = [
    { name: 'US:', value: 'H:mm A' },
    { name: 'England:', value: 'H:mm A' },
    { name: 'Poland:', value: 'HH:mm' },
    { name: 'Germany:', value: 'HH:mm' },
    { name: 'France:', value: 'HH:mm' },
    { name: 'ISO 8601', value: 'HH:mm' }
  ];
  dateFormats: { [index: string]: Array<any>; } = { 'datetime': this.dateFormatsDateTime, 'date': this.dateFormatsDate, 'time': this.dateFormatsTime };

  openDatepicker() {
    this.isOpen = true;
    setTimeout(() => {
      this.isOpen = false;
    }, 1000);
  }

  setDate() {
    this.date = new Date(this.today);
  }

  setDateRange() {
    this.minDate = new Date(this.today);
    this.minDate.setMonth(this.minDate.getMonth() - 3);
    this.maxDate = new Date(this.today);
    this.maxDate.setMonth(this.maxDate.getMonth() + 3);
  }

  touch: boolean;
  filterOdd: boolean;
  yearView: boolean;
  dateFilter = (date: Date) => date.getMonth() % 2 == 1 && date.getDate() % 2 == 0;

}
