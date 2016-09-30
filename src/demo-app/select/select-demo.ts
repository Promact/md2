import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'select-demo',
  templateUrl: 'select-demo.html'
})
export class SelectDemo {
  private test: any;
  private tests: Array<any> =
  [
    { name: 'Vadodara', value: '1', disabled: false },
    { name: 'Rajkot', value: '2', disabled: false },
    { name: 'Delhi', value: '3', disabled: false },
    { name: 'Chennai', value: '4', disabled: true },
    { name: 'Mumbai', value: '5', disabled: false },
    { name: 'Goa', value: '6', disabled: true }
  ];



  private items: Array<any> =
  [
    { name: 'Vadodara', value: '1', disabled: false },
    { name: 'Rajkot', value: '2', disabled: false },
    { name: 'Delhi', value: '3', disabled: false },
    { name: 'Chennai', value: '4', disabled: true },
    { name: 'Mumbai', value: '5', disabled: false },
    { name: 'Goa', value: '6', disabled: true }
  ];
  private item: any = '3';
  private change(value: any) {
    console.log('Changed data: ', value);
  }
  private y = { name: 'x' }
  as() {
    this.item = this.y;

  }
  ys() {
    this.item = null;
  }
}