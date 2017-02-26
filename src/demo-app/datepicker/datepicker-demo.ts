import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'datepicker-demo',
  templateUrl: 'datepicker-demo.html',
  styles: [` .type { width: 150px; padding: 16px 0; } `]
})
export class DatepickerDemo {
  isRequired = false;
  isDisabled = false;
  type: string = 'date';
  types: Array<any> = [
    { text: 'Date', value: 'date' },
    { text: 'Time', value: 'time' },
    { text: 'Date Time', value: 'datetime' }];

  date: Date = null;
  minDate: Date = null;
  maxDate: Date = null;

  setDate() {
    this.date = new Date();
  }
  setDateRange() {
    this.minDate = new Date();
    this.minDate.setMonth(this.minDate.getMonth() - 3);
    this.maxDate = new Date();
    this.maxDate.setMonth(this.maxDate.getMonth() + 3);
  }
}
