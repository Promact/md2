import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'md-chips-demo',
  templateUrl: 'chips-demo.html'
})
export class ChipsDemo {
  isDisabled: boolean = false;
  isRemovable: boolean = true;

  item: Array<any>;
  itemsData: Array<any> = [
    { name: 'Vadodara', value: '1' },
    { name: 'Mumbai', value: '5' },
    { name: 'Goa', value: '6' }
  ];
  
  items: Array<any> = [
    { text: 'Vadodaraa', id: '8' },
    { text: 'Mumbaia', id: '2' },
    { text: 'Goaa', id: '4' }
  ];

  validPattern = /^[0-9]*$/;
  handleChange(value: any) {
    console.log('Changed data: ', value);
  }
}
