import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'select-demo',
  templateUrl: 'select-demo.html',
  styleUrls: ['select-demo.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectDemo {
  isRequired = false;
  isDisabled = false;
  isDisabledMultiple = false;
  item: any = null;
  itemMultiple: any = null;
  search: string = null;

  items: Array<any> =
  [
    { name: 'Vadodara', value: '1' },
    { name: 'Rajkot', value: '2' },
    { name: 'Delhi', value: '3' },
    { name: 'Chennai', value: '4' },
    { name: 'Mumbai', value: '5' },
    { name: 'Goa', value: '6' }
  ];
  setValue() {
    this.itemMultiple = ['2'];
  }
}
