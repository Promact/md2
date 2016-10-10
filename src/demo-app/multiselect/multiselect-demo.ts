import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'multiselect',
  templateUrl: 'multiselect-demo.html'
})
export class MultiselectDemo {
  private items: Array<any> =
  [
    { name: 'Vadodara', value: '1', disabled: false },
    { name: 'Rajkot', value: '2', disabled: false },
    { name: 'Delhi', value: '3', disabled: false },
    { name: 'Chennai', value: '4', disabled: true },
    { name: 'Mumbai', value: '5', disabled: false },
    { name: 'Goa', value: '6', disabled: true }
  ];
  private item: Array<any> = [{ name: 'Birmingham', value: '2' }, { name: 'Dortmund', value: '3' }];
  private change(value: any) {
    console.log('Changed data: ', value);
  }
}
