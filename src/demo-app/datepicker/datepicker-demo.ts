import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'datepicker-demo',
  templateUrl: 'datepicker-demo.html',
})
export class DatepickerDemo {
  date: Date = new Date(2016, 9, 15);
  time: Date = new Date(1, 1, 1, 12, 10);
  datetime: Date = new Date(2016, 9, 15, 12, 10);
  minDate: Date = new Date(2016, 7, 15);
  maxDate: Date = new Date(2016, 12, 15);
  handleChange(value: any) {
    console.log('Changed data: ', value);
  }
}
