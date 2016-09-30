import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'autocomplete-demo',
  templateUrl: 'autocomplete-demo.html'
})
export class AutocompleteDemo {
  private items: Array<any> = [
    { name: 'Vadodara', value: '1' },
    { name: 'Rajkot', value: '2' },
    { name: 'Delhi', value: '3' },
    { name: 'Chennai', value: '4' },
    { name: 'Mumbai', value: '5' },
    { name: 'Goa', value: '6' }
  ];
  private item: any;
  private change(value: any) {
    console.log('Changed data: ', value);
  }
}
