import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'select-demo',
  templateUrl: 'select-demo.html'
})
export class SelectDemo {
  constructor() {
    setTimeout(() => {
      this.items.push({ name: 'Manjalpur', value: '7', disabled: false });
      this.items.push({ name: 'Sitabag', value: '8', disabled: false });
      this.items.push({ name: 'Vasna', value: '9', disabled: false, selected: true });
      this.items.push({ name: 'Gorva', value: '10', disabled: false });
    }, 3000);
    setTimeout(() => {
      //this.item = '8';
    }, 5000);
  }
  private items: Array<any> =
  [
    { name: 'Vadodara', value: '1', disabled: false },
    { name: 'Rajkot', value: '2', disabled: false },
    { name: 'Delhi', value: '3', disabled: false },
    { name: 'Chennai', value: '4', disabled: true },
    { name: 'Mumbai', value: '5', disabled: false },
    { name: 'Goa', value: '6', disabled: true }
  ];
  private item: string = '3';
  private change(value: any) {
    console.log('Changed data: ', value);
  }
}