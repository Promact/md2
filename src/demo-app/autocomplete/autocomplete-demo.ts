import { Component } from '@angular/core';

@Component({
  selector: 'autocomplete-demo',
  templateUrl: '../autocomplete/autocomplete-demo.html'
})
export class AutocompleteDemo {
  isRequired = false;
  isDisabled = false;
  item: string = null;
  items: Array<any> = [
    { name: 'Vadodara', value: '1' },
    { name: 'Rajkot', value: '2' },
    { name: 'Delhi', value: '3' },
    { name: 'Chennai', value: '4' },
    { name: 'Mumbai', value: '5' },
    { name: 'Goa', value: '6' }
  ];
}
