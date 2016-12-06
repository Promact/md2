import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'datepicker-demo',
  templateUrl: 'datepicker-demo.html',
})
export class DatepickerDemo {
  disabled: boolean = true;
  datetime: any = '';
  datetime1: any = '2016-09-15 12:10';
  date: any = '2016-09-15';
  time: any = '12:10';
  minDate: any = '2016-07-15';
  maxDate: any = '2016-12-15';
  handleChange(value: any) {
    console.log('Changed data: ', value);
  }
}
