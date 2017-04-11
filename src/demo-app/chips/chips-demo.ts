import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'md-chips-demo',
  templateUrl: 'chips-demo.html'
})
export class ChipsDemo {
  _item: Array<any>;
  _itemsData: Array<any> = [
    { name: 'Vadodara', value: '1' },
    { name: 'Mumbai', value: '5' },
    { name: 'Goa', value: '6' }
  ];
  _items: Array<any> = [
    { text: 'Vadodaraa', value: '8' },
    { text: 'Mumbaia', value: '2' },
    { text: 'Goaa', value: '4' }
  ];
  _validPattern = /^[0-9]*$/;
  handleChange(value: any) {
    console.log('Changed data: ', value);
  }
}
